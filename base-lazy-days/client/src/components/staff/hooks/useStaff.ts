import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { filterByTreatment } from '../utils';

const fakeStaff = [
  {
    id: 1,
    name: 'Divya',
    treatmentNames: ['facial', 'scrub'],
    image: {
      fileName: 'divya.jpg',
      authorName: 'Pradeep Ranjan',
      authorLink:
        'https://unsplash.com/@tinywor1d?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      platformName: 'Unsplash',
      platformLink: 'https://unsplash.com/',
    },
  },
  {
    id: 2,
    name: 'Sandra',
    treatmentNames: ['facial', 'massage'],
    image: {
      fileName: 'sandra.jpg',
      authorName: 'Pj Go',
      authorLink:
        'https://unsplash.com/@phizzahot?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      platformName: 'Unsplash',
      platformLink: 'https://unsplash.com/',
    },
  },
  {
    id: 3,
    name: 'Michael',
    treatmentNames: ['facial', 'scrub', 'massage'],
    image: {
      fileName: 'michael.jpg',
      authorName: 'Fortune Vieyra',
      authorLink:
        'https://unsplash.com/@fortunevieyra?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      platformName: 'Unsplash',
      platformLink: 'https://unsplash.com/',
    },
  },
  {
    id: 4,
    name: 'Mateo',
    treatmentNames: ['massage'],
    image: {
      fileName: 'mateo.jpg',
      authorName: 'Luis Quintero',
      authorLink:
        'https://unsplash.com/@jibarofoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      platformName: 'Unsplash',
      platformLink: 'https://unsplash.com/',
    },
  },
];

// for when we need a query function for useQuery
// async function getStaff(): Promise<Staff[]> {
//   const { data } = await axiosInstance.get('/staff');
//   return data;
// }

export function useStaff(): Staff[] {
  // TODO: get data from server via useQuery
  return fakeStaff;
}
