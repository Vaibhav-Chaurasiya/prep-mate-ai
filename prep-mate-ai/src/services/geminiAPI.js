export const generateQuestion = async (role) => {
  return `Can you describe a recent project you worked on as a ${role}?`;
};

export const evaluateAnswer = async (answer) => {
  return `Your answer covers the main points, but try to use the STAR method for more structure.`;
};

export const improveAnswer = async (answer) => {
  return `Improved Answer: I recently led a React project where I built a dashboard... (sample)...`;
};
