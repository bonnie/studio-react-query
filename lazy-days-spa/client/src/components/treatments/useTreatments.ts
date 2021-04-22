import type { Treatment } from '../../../../shared/types';

export function useTreatments(): Treatment[] {
  // TODO: get data from server via useQuery
  return [
    {
      id: 1,
      name: 'Massage',
      durationInMinutes: 60,
      imageUrl: 'massage.jpg',
      description:
        'This relaxing massage will leave you feeling completely tranquil.',
    },
    {
      id: 2,
      name: 'Facial',
      durationInMinutes: 30,
      imageUrl: 'facial.jpg',
      description:
        'Give your face a healthy glow with this cleansing treatment.',
    },
    {
      id: 3,
      name: 'Scrub',
      durationInMinutes: 15,
      imageUrl: 'scrub.jpg',
      description:
        'Invigorate your body and spirit with a scented Himalayan salt scrub.',
    },
  ];
}
