import sample from 'lodash/sample';

const descriptors = [
  'Cool',
  'Wise',
  'Bold',
  'Shy',
  'Cute',
  'Fast',
  'Calm',
  'Kind',
  'Glad',
  'Neat',
  'Chic',
  'Jazzy',
  'Funky',
  'Quick',
  'Zippy',
  'Sunny',
  'Witty',
  'Brave',
  'Swift',
];

const nouns = [
  'Apple',
  'Mango',
  'Grape',
  'Peach',
  'Plum',
  'Lemon',
  'Berry',
  'Melon',
  'Guava',
  'Olive',
  'Lime',
  'Kiwi',
  'Pear',
  'Cherry',
  'Banana',
  'Papaya',
  'Lychee',
  'Citrus',
  'Tomato',
];

export function generateRandomName() {
  const randomDescriptor = sample(descriptors);
  const randomAnimal = sample(nouns);
  return `${randomDescriptor} ${randomAnimal}`;
}
