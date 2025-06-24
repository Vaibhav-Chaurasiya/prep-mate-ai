export const XP_PER_ANSWER = 10;

export const calculateXP = (answersCount) => {
  return answersCount * XP_PER_ANSWER;
};
