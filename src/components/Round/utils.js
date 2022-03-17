export const getRoundInstructions = (round) => {
  switch (round) {
    case 1:
      return "Describe";
    case 2:
      return "Describe in 1 word";
    case 3:
      return "Show";
    default:
      return null;
  }
};
