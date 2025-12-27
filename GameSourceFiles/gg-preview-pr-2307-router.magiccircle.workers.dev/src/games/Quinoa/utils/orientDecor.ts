import { getDefaultStore } from 'jotai';
import { playSfx } from '@/audio/useQuinoaAudio';
import {
  defaultRotation,
  flippedDefaultRotation,
} from '@/common/games/Quinoa/constants';
import type { DecorRotation } from '@/common/games/Quinoa/user-json-schema/current';
import {
  mySelectedItemRotationAtom,
  mySelectedItemRotationsAtom,
} from '@/Quinoa/atoms/myAtoms';
import { actionAtom } from '@/Quinoa/data/action/actionAtom';

const { get, set } = getDefaultStore();

export function rotateDecorClockwise() {
  const action = get(actionAtom);
  const rotations = get(mySelectedItemRotationsAtom);
  if (action !== 'placeDecor' || !rotations) {
    return;
  }
  const currentRotation = get(mySelectedItemRotationAtom);
  const availableRotations = [defaultRotation, ...rotations];
  const sortedRotations = [...new Set(availableRotations)].sort(
    (a, b) => a - b
  ) as DecorRotation[];
  const currentIndex = sortedRotations.indexOf(currentRotation);
  const isCurrentRotationValid = currentIndex !== -1;
  const effectiveCurrentIndex = isCurrentRotationValid ? currentIndex : 0;
  const nextIndex = (effectiveCurrentIndex + 1) % sortedRotations.length;
  set(mySelectedItemRotationAtom, sortedRotations[nextIndex]);
  playSfx('Decor_Rotate');
}

export function rotateDecorCounterClockwise() {
  const action = get(actionAtom);
  const rotations = get(mySelectedItemRotationsAtom);
  if (action !== 'placeDecor' || !rotations) {
    return;
  }
  const currentRotation = get(mySelectedItemRotationAtom);
  const availableRotations = [defaultRotation, ...rotations];
  const sortedRotations = [...new Set(availableRotations)].sort(
    (a, b) => a - b
  ) as DecorRotation[];
  const currentIndex = sortedRotations.indexOf(currentRotation);
  const isCurrentRotationValid = currentIndex !== -1;
  const effectiveCurrentIndex = isCurrentRotationValid ? currentIndex : 0;
  const prevIndex =
    (effectiveCurrentIndex - 1 + sortedRotations.length) %
    sortedRotations.length;
  set(mySelectedItemRotationAtom, sortedRotations[prevIndex]);
  playSfx('Decor_Rotate');
}

export function flipDecorHorizontal() {
  const rotation = get(mySelectedItemRotationAtom);
  if (rotation === defaultRotation) {
    set(mySelectedItemRotationAtom, flippedDefaultRotation);
  } else if (rotation === flippedDefaultRotation) {
    set(mySelectedItemRotationAtom, defaultRotation);
  } else {
    set(mySelectedItemRotationAtom, -rotation as DecorRotation);
  }
  playSfx('Decor_Flip');
}
