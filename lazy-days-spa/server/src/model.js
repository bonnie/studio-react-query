import { Schema } from "mongoose";

const ObjectId = Schema.ObjectId;

const Comment = new Schema({
  name: { type: String, default: "hahaha" },
  age: { type: Number, min: 18, index: true },
  bio: { type: String, match: /[a-z]/ },
  date: { type: Date, default: Date.now },
  buff: Buffer,
});

// a setter
Comment.path("name").set(function (v) {
  return capitalize(v);
});

// middleware
Comment.pre("save", function (next) {
  notify(this.get("email"));
  next();
});

/**
 * Schema definition
 */

// recursive embedded-document schema

const Comment = new Schema();

Comment.add({
  title: {
    type: String,
    index: true,
  },
  date: Date,
  body: String,
  comments: [Comment],
});

const BlogPost = new Schema({
  title: {
    type: String,
    index: true,
  },
  slug: {
    type: String,
    lowercase: true,
    trim: true,
  },
  date: Date,
  buf: Buffer,
  comments: [Comment],
  creator: Schema.ObjectId,
});

const Person = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      sparse: true,
    },
  },
  alive: Boolean,
});

/**
 * Accessing a specific schema type by key
 */

BlogPost.path("date")
  .default(function () {
    return new Date();
  })
  .set(function (v) {
    return v === "now" ? new Date() : v;
  });

/**
 * Pre hook.
 */

BlogPost.pre("save", function (next, done) {
  /* global emailAuthor */
  emailAuthor(done); // some async function
  next();
});

/**
 * Methods
 */

BlogPost.methods.findCreator = function (callback) {
  return this.db.model("Person").findById(this.creator, callback);
};

BlogPost.statics.findByTitle = function (title, callback) {
  return this.find({ title: title }, callback);
};

BlogPost.methods.expressiveQuery = function (creator, date, callback) {
  return this.find("creator", creator).where("date").gte(date).run(callback);
};

/**
 * Plugins
 */

function slugGenerator(options) {
  options = options || {};
  const key = options.key || "title";

  return function slugGenerator(schema) {
    schema.path(key).set(function (v) {
      this.slug = v
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .replace(/-+/g, "");
      return v;
    });
  };
}

BlogPost.plugin(slugGenerator());

/**
 * Define model.
 */

mongoose.model("BlogPost", BlogPost);
mongoose.model("Person", Person);
