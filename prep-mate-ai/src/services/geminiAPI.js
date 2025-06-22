const API_URL = import.meta.env.VITE_API_URL;

// 🔁 Common Gemini fetch logic
const fetchGeminiResponse = async (prompt) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI response unavailable.";
};

// 🧠 1. Generate Interview Question
export const generateQuestion = async (role) => {
  const prompt = `You are acting as an experienced ${role} interviewer. Ask a real-world technical or behavioral interview question.`;
  return await fetchGeminiResponse(prompt);
};

// 🧠 2. Evaluate Interview Answer
export const evaluateAnswer = async (answer) => {
  const prompt = `Evaluate the following interview answer. Give detailed feedback on relevance, grammar, structure (use of STAR), and tone:\n\n"${answer}"`;
  return await fetchGeminiResponse(prompt);
};

// 🧠 3. Improve Answer Using STAR + Grammar
export const improveAnswer = async (answer) => {
  const prompt = `Improve this interview answer using proper grammar, fluency, and STAR method:\n\n"${answer}"`;
  return await fetchGeminiResponse(prompt);
};

// 🧠 4. Resume vs JD Matching
export const matchResumeToJD = async (resume, jd) => {
  const prompt = `
You are an ATS (Applicant Tracking System) evaluator.
Given the following resume and job description:

Resume:
${resume}

Job Description:
${jd}

Please evaluate:
- How well does the resume match this JD?
- What are the missing skills/keywords?
- Give a match percentage out of 100.
- Suggest improvements to align the resume.

Output in clear, short points.
`;
  return await fetchGeminiResponse(prompt);
};
