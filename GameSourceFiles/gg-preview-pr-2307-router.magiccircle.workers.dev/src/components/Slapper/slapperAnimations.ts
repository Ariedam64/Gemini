import { animate } from 'framer-motion';
import { delay } from '@/utils/delay';

export async function initSlapper() {
  await animate([['#slapper', { opacity: 0, scale: 4 }, { duration: 0 }]]);
}

export async function showSlapper() {
  await animate([
    [
      '#slapper',
      { opacity: 1, scale: 1 },
      { type: 'spring', stiffness: 500, damping: 30 },
    ],
  ]);
}

export async function hideSlapper() {
  await animate([
    [
      '#slapper',
      { opacity: 0, scale: 4 },
      { type: 'spring', stiffness: 500, damping: 30 },
    ],
  ]);
}

export async function fullSlapperAnimation() {
  await showSlapper();
  await delay(1);
  await hideSlapper();
}
