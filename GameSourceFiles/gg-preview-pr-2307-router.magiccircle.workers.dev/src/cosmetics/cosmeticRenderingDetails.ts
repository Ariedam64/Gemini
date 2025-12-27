import BottomIcon from './assets/icons/icon-bottom.png';
import BrushIcon from './assets/icons/icon-color.png';
import ExpressionIcon from './assets/icons/icon-expression.png';
import MidIcon from './assets/icons/icon-mid.png';
import TopIcon from './assets/icons/icon-top.png';

export const cosmeticRenderingDetails = {
  Top: {
    name: 'Top',
    avatarArrayIdx: 2,
    guideY: 0.175,
    guideHeight: 0.203125,
    framingTransform: 'translateY(50%) scale(2)',
    icon: TopIcon,
  },
  Mid: {
    name: 'Mid',
    avatarArrayIdx: 1,
    guideY: 0.375,
    guideHeight: 0.175,
    framingTransform: 'translateY(10%) scale(1.8)',
    icon: MidIcon,
  },
  Expression: {
    name: 'Expression',
    avatarArrayIdx: 3,
    guideY: 0.4375,
    guideHeight: 0.0859375,
    framingTransform: 'translateY(30px) scale(3)',
    icon: ExpressionIcon,
  },
  Bottom: {
    name: 'Bottom',
    avatarArrayIdx: 0,
    guideY: 0.546875,
    guideHeight: 0.203125,
    framingTransform: 'translateY(-10%) scale(1.7)',
    icon: BottomIcon,
  },
  Color: {
    name: 'Color',
    avatarArrayIdx: -1,
    guideY: -1,
    guideHeight: -1,
    framingTransform: '',
    icon: BrushIcon,
  },
} as const;
