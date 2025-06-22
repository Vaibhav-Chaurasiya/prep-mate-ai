import { useState } from "react";
import { generateQuestion, evaluateAnswer, improveAnswer } from "../services/geminiAPI";

function Interview() {
  const [role, setRole] = useState("Software Engineer");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [improvedAnswer, setImprovedAnswer] = useState("");

  const handleStart = async () => {
    const q = await generateQuestion(role);
    setQuestion(q);
    setFeedback("");
    setAnswer("");
    setImprovedAnswer("");
  };

  const handleSubmit = async () => {
    const fb = await evaluateAnswer(answer);
    setFeedback(fb);
  };

  const handleImprove = async () => {
    const improved = await improveAnswer(answer);
    setImprovedAnswer(improved);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-bold mb-4">AI Interview Simulator</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-3 py-2 w-full max-w-xs rounded"
        >
          <option>Software Engineer</option>
          <option>Business Analyst</option>
          <option>Product Manager</option>
        </select>
      </div>

      <button onClick={handleStart} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Start Interview
      </button>

      {question && (
        <div className="mb-4">
          <p className="font-semibold">🧠 Question:</p>
          <p className="mb-2">{question}</p>

          <textarea
            rows={4}
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          >
            Submit Answer
          </button>
        </div>
      )}

      {feedback && (
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h4 className="font-semibold mb-1">🔍 Feedback:</h4>
          <p>{feedback}</p>

          <button
            onClick={handleImprove}
            className="bg-indigo-600 text-white px-4 py-1 mt-3 rounded"
          >
            Improve My Answer
          </button>
        </div>
      )}

      {improvedAnswer && (
        <div className="bg-yellow-100 p-4 rounded mt-4">
          <h4 className="font-semibold mb-1">✨ Improved Answer:</h4>
          <p>{improvedAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default Interview;
