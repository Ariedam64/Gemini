import { EmoteType } from '@/common/types/emote';

export enum AvatarSetAnimation {
  Idle = 'idle',
  Deciding = 'deciding',
  Locked = 'locked',
  Leading = 'leading',
  Losing = 'losing',
  Won = 'won',
  LookingUp = 'lookingUp',
  LookingDown = 'lookingDown',
  Pop = 'pop',
  Holding = 'holding',
  Sitting = 'sitting',
  Sleeping = 'sleeping',
}

const avatarSetAnimations = Object.values(AvatarSetAnimation);

export function getSetAnimationNameIndex(
  animationName: AvatarSetAnimation
): number {
  return avatarSetAnimations.indexOf(animationName);
}

export const expressions = [
  'Expression_Alarmed.png',
  'Expression_Annoyed.png',
  'Expression_Bashful.png',
  'Expression_Calm3.png',
  'Expression_Crying.png',
  'Expression_Cute.png',
  'Expression_Derpy.png',
  'Expression_Happy.png',
  'Expression_Mad.png',
  'Expression_Pouty.png',
  'Expression_Shocked.png',
  'Expression_Thinking.png',
  'Expression_Tired.png',
  'Expression_Loopy.png',
  'Expression_SoHappy.png',
  'Expression_Vampire.png',
  'Expression_Stressed.png',
];

export enum AvatarTriggerAnimationName {
  Talking = 'talking',
  JoinGame = 'joingame',
  JoinGameNoPop = 'joinGameNoPop',
  LeaveGame = 'leaveGame',
  Teleport = 'teleport',
  Walk = 'walk',
  Water = 'water',
  WaterGold = 'waterGold',
  Harvest = 'harvest',
  PotPlant = 'potPlant',
  PickupObject = 'pickupObject',
  DropObject = 'dropObject',
  DisappearReappear = 'disappearReappear',
  Dig = 'dig',
  ChangedOutfit = 'changedOutfit',
}

/**
 * Animations where the avatar is performing an action with a tool/item,
 * so the held item visual should be hidden to avoid visual overlap.
 */
export const HELD_ITEM_SUPPRESSING_ANIMATIONS =
  new Set<AvatarTriggerAnimationName>([
    AvatarTriggerAnimationName.Water,
    AvatarTriggerAnimationName.WaterGold,
    AvatarTriggerAnimationName.Harvest,
    AvatarTriggerAnimationName.PotPlant,
    AvatarTriggerAnimationName.Dig,
  ]);

/**
 * Duration in milliseconds to suppress the held item visual during action
 * animations. Should match or slightly exceed the Rive animation duration.
 */
export const HELD_ITEM_SUPPRESSION_DURATION_MS = 500;

export enum AvatarToggleAnimationName {
  Talking = 'talking',
  PopIn = 'popIn',
  isRickrolling = 'isRickrolling',
  isPeeking = 'isPeeking',
}

export { EmoteType };
