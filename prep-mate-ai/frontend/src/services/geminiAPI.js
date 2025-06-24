// 🌐 Load Gemini API URL from .env
const API_URL = import.meta.env.VITE_API_URL;

// 🔁 Universal fetch function for Gemini
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
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI response unavailable."
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to fetch response from Gemini.";
  }
};

//
// 🧠 1️⃣ Generate Interview Question (Role-Based)
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
// 🧠 2️⃣ Evaluate Written Answer (Text Interview)
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

Areas of Improvement:
- point 1
- point 2

Use very simple English. Do not use *, ** or special characters.
Be friendly and helpful.`;
  return await fetchGeminiResponse(prompt);
};

//
// 🧠 3️⃣ Improve Answer (Using STAR Method)
//
export const improveAnswer = async (answer) => {
  const prompt = `
You are an AI interview coach.

Rewrite the answer below using STAR method.
Make it short, simple and easy to speak.
Use maximum 100-120 words.
Avoid long sentences and heavy words.

Answer: "${answer}"`;
  return await fetchGeminiResponse(prompt);
};

//
// 🎙️ 4️⃣ Evaluate Audio-based Response (Tone + Emotion)
//
export const evaluateAudioAnswer = async (transcript) => {
  const prompt = `
You are an AI interviewer. Analyze this audio-transcribed interview answer.

Response:
"${transcript}"

Give bullet point feedback on:

1. Clarity and fluency
2. Speaking tone (confident, nervous, flat)
3. Emotions detected (if any)
4. Filler words or hesitations (e.g., umm, like)
5. Suggestions for improvement

Use plain English. Give 4–6 clear bullet points.`;
  return await fetchGeminiResponse(prompt);
};

//
// 📄 5️⃣ Resume vs JD Matching
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

Suggestions:
- point 1
- point 2

Use only bullet points. No extra explanation.`;
  return await fetchGeminiResponse(prompt);
};
