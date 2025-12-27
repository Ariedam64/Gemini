import { NewsItemId } from '@/common/news-items';
import { BASE_URL } from '@/environment';
import Crapitalism from './Crapitalism.webp';
import MonsterBash from './MonsterBash.webp';
import Political from './Political.webp';
import Rainbowpocalypse from './Rainbowpocalypse.webp';
import Strippening from './Strippening.webp';

type NewsItem =
  | {
      id: NewsItemId;
      kind: 'component';
      component: React.ReactNode;
    }
  | {
      id: NewsItemId;
      kind: 'image';
      title: string;
      imageSrc: string;
      buttonColor: string;
    };

export const newsItems: NewsItem[] = [
  {
    id: NewsItemId.SpookyContent,
    kind: 'image',
    title: 'Halloween content is here!',
    imageSrc: MonsterBash,
    buttonColor: 'Orange.Magic',
  },
  {
    id: NewsItemId.PoliticalContent,
    kind: 'image',
    title: 'Political pack just dropped!',
    imageSrc: Political,
    buttonColor: 'Red.Magic',
  },
  {
    id: NewsItemId.Crapitalism,
    kind: 'image',
    title: 'New content pack just dropped!',
    imageSrc: Crapitalism,
    buttonColor: 'Green.Magic',
  },
  {
    id: NewsItemId.Strippening,
    kind: 'image',
    title: '',
    imageSrc: Strippening,
    buttonColor: 'Cyan.Dark',
  },
  {
    id: NewsItemId.Rainbowpocalypse,
    kind: 'image',
    title: '',
    imageSrc: Rainbowpocalypse,
    buttonColor: 'Blue.Magic',
  },
  {
    id: NewsItemId.Halloween2025,
    kind: 'image',
    title: '',
    imageSrc: `${BASE_URL}/assets/presentables/Halloween.webp`,
    buttonColor: 'Orange.Magic',
  },
];
