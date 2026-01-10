const avatarDimensions = {
  xl: {
    canvasSize: 512,
    contentSize: 0, // Unknown, unused
    hitboxSize: 150, // don't know what size this should be yet
    outline: 3,
  },
  lg: {
    canvasSize: 320,
    contentSize: 0, // Unknown, unused
    hitboxSize: 96,
    outline: 3,
  },
  md: {
    canvasSize: 160,
    contentSize: 100, // Used in <PlayerCard />
    hitboxSize: 55,
    outline: 2,
  },
  sm: {
    canvasSize: 120,
    contentSize: 0, // Unknown, unused
    hitboxSize: 36,
    outline: 2,
  },
  xs: {
    canvasSize: 80,
    contentSize: 0, // Unknown, unused
    hitboxSize: 36,
    outline: 1,
  },
  chip: {
    canvasSize: 70,
    contentSize: 0, // Unknown, unused
    hitboxSize: 36,
    outline: 2,
  },
};

export default avatarDimensions;
