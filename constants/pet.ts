import { Pet } from '../types/types';

// Sample images - in a real app, these would be URLs or require statements for local images
const sampleImages = {
  dog1: require('../assets/images /dog1.jpeg'),
  dog2: require('../assets/images /dog2.jpg'),
  cat1: require('../assets/images /cat1.jpeg'),
  cat2: require('../assets/images /cat2.jpeg'),
  rabbit: require('../assets/images /rabbit.jpg'),
};

export const samplePets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    description: 'Friendly and energetic golden retriever who loves playing fetch and going for long walks. Great with kids and other pets.',
    image: sampleImages.dog1,
    adopted: false,
  },
  {
    id: '2',
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    age: 2,
    gender: 'Female',
    description: 'Beautiful siamese cat with striking blue eyes. She is affectionate but also enjoys her alone time. Litter trained and healthy.',
    image: sampleImages.cat1,
    adopted: false,
  },
  {
    id: '3',
    name: 'Max',
    type: 'Dog',
    breed: 'Beagle',
    age: 5,
    gender: 'Male',
    description: 'Gentle and well-behaved beagle with a great nose. He would make an excellent companion for an active family.',
    image: sampleImages.dog2,
    adopted: false,
  },
  {
    id: '4',
    name: 'Bella',
    type: 'Cat',
    breed: 'Domestic Shorthair',
    age: 1,
    gender: 'Female',
    description: 'Playful kitten looking for her forever home. She loves chasing toys and cuddling in warm laps.',
    image: sampleImages.cat2,
    adopted: false,
  },
  {
    id: '5',
    name: 'Thumper',
    type: 'Rabbit',
    breed: 'Holland Lop',
    age: 2,
    gender: 'Male',
    description: 'Adorable lop-eared rabbit who is litter trained and very social. Comes with his cage and supplies.',
    image: sampleImages.rabbit,
    adopted: false,
  },
];

export default samplePets;