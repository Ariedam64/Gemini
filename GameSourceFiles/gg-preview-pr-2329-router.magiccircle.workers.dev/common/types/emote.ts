export type PlayerEmoteData = {
  emoteType: EmoteType;
};

export enum EmoteType {
  Idle = -1,
  Clapping = 0,
  Laughing = 1,
  Angered = 2,
  Crying = 3,
  Questioning = 4,
  Love = 5,
}

export const emoteControlTypes = [
  EmoteType.Clapping,
  EmoteType.Laughing,
  EmoteType.Angered,
  EmoteType.Crying,
  EmoteType.Questioning,
  EmoteType.Love,
];
