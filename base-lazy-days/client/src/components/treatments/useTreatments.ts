import type { Treatment } from '../../../../shared/types';
import { axiosInstance } from '../../axiosInstance';

const fakeTreatments = [
  {
    id: 1,
    name: 'Massage',
    durationInMinutes: 60,
    image: {
      fileName: 'massage.jpg',
      authorName: 'Mariolh',
      authorLink:
        'https://pixabay.com/users/mariolh-62451/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=567021',
      platformName: 'Pixabay',
      platformLink:
        'https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=567021',
    },
    description:
      'Restore your sense of peace and ease with a relaxing massage.',
  },
  {
    id: 2,
    name: 'Facial',
    durationInMinutes: 30,
    image: {
      fileName: 'facial.jpg',
      authorName: 'engin akyurt',
      authorLink:
        'https://unsplash.com/@enginakyurt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      platformName: 'Unsplash',
      platformLink: 'https://unsplash.com/',
    },
    description: 'Give your face a healthy glow with this cleansing treatment.',
  },
  {
    id: 3,
    name: 'Scrub',
    durationInMinutes: 15,
    image: {
      fileName: 'scrub.jpg',
      authorName: 'Monfocus',
      authorLink:
        'https://pixabay.com/users/monfocus-2516394/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5475880',
      platformName: 'Pixabay',
      platformLink:
        'https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5475880',
    },
    description:
      'Invigorate your body and spirit with a scented Himalayan salt scrub.',
  },
];

// for when we need a query function for useQuery
// async function getTreatments(): Promise<Treatment[]> {
//   const { data } = await axiosInstance.get('/treatments');
//   return data;
// }

export function useTreatments(): Treatment[] {
  // TODO: get data from server via useQuery
  return fakeTreatments;
}
