// 🌐 Load Gemini API URL from .env
const API_URL = import.meta.env.VITE_API_URL;

// 🔁 Universal fetcher for Gemini
const fetchGeminiResponse = async (prompt) => {
  try {
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
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to fetch response from Gemini.";
  }
};

//
// 🧠 1️⃣ Generate Interview Question (Real world style)
//
export const generateQuestion = async (role) => {
  const prompt = `You are a senior interviewer for the role of ${role}.
Generate a real-world interview question that candidates usually face.
Keep it practical and job-relevant.
Limit it to 40-50 words.
Only output the question, no explanation.`;
  return await fetchGeminiResponse(prompt);
};

//
// 🧠 2️⃣ Evaluate Answer (Simple bullet feedback)
//
export const evaluateAnswer = async (answer) => {
  const prompt = `
You are an AI interview coach.

Evaluate the following interview answer:

"${answer}"

Give feedback in plain text bullet points:

Score (out of 10): X/10

Strengths:
- point 1
- point 2
- point 3

Areas of Improvement:
- point 1
- point 2
- point 3

Use very simple English. Do not use *, ** or special characters.
Be friendly and helpful.`;
  return await fetchGeminiResponse(prompt);
};

//
// 🧠 3️⃣ Improve Answer (STAR method, very simple & short)
//
export const improveAnswer = async (answer) => {
  const prompt = `
You are an AI interview coach.

Rewrite the answer below using STAR method.
Make it short, simple and easy to speak.
Use maximum 100-120 words.
Avoid long sentences and heavy words.

Answer: "${answer}"
`;
  return await fetchGeminiResponse(prompt);
};

//
// 🧠 4️⃣ Resume vs Job Description Matching (same as before)
//
export const matchResumeToJD = async (resume, jd) => {
  const prompt = `
You are an ATS evaluator.

Given the following resume and job description:

Resume:
${resume}

Job Description:
${jd}

Please evaluate:

Match Percentage: X/100

Missing Skills:
- skill 1
- skill 2
- skill 3

Suggestions:
- point 1
- point 2

Use bullet points only. No extra text or explanation.
`;
  return await fetchGeminiResponse(prompt);
};
