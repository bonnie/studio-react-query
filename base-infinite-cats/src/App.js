import { useState, useEffect } from "react";
import "./App.css";

const CAT_APIKEY = process.env.REACT_APP_CATAPI_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {}, [searchTerm]);

  return (
    <div className="App">
      <h1>Infinite Cats</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="enter search term"
      ></input>
    </div>
  );
}

export default App;
