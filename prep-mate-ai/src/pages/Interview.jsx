import { useState, useRef } from "react";
import {
  generateQuestion,
  evaluateAnswer,
  improveAnswer,
} from "../services/geminiAPI";
import { calculateXP } from "../utils/xp";
import html2pdf from "html2pdf.js";

function Interview() {
  const [role, setRole] = useState("Software Engineer");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [improvedAnswer, setImprovedAnswer] = useState("");
  const [xp, setXp] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);

  const exportRef = useRef();

  const handleStart = async () => {
    const q = await generateQuestion(role);
    setQuestion(q);
    setAnswer("");
    setFeedback("");
    setImprovedAnswer("");
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return alert("Please write an answer first.");
    const fb = await evaluateAnswer(answer);
    setFeedback(fb);
    const newCount = answerCount + 1;
    setAnswerCount(newCount);
    setXp(calculateXP(newCount)); // +10 XP per answer
  };

  const handleImprove = async () => {
    const improved = await improveAnswer(answer);
    setImprovedAnswer(improved);
  };

  const handleDownloadPDF = () => {
    const element = exportRef.current;
    const options = {
      margin: 0.5,
      filename: `${role.replace(/\s/g, "_")}_feedback.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🧠 AI Interview Simulator</h2>
        <div className="bg-green-100 text-green-800 px-4 py-1 rounded font-medium">
          XP: {xp}
        </div>
      </div>

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

      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Start Interview
      </button>

      {question && (
        <div className="mb-4">
          <p className="font-semibold">🔸 Question:</p>
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
        <>
          <div ref={exportRef} className="bg-gray-100 p-4 rounded mt-4">
            <h4 className="font-semibold mb-1">📝 Feedback:</h4>
            <p>{feedback}</p>

            {improvedAnswer && (
              <>
                <h4 className="font-semibold mt-4 mb-1">✨ Improved Answer:</h4>
                <p>{improvedAnswer}</p>
              </>
            )}
          </div>

          <button
            onClick={handleImprove}
            className="bg-indigo-600 text-white px-4 py-1 mt-3 rounded"
          >
            Improve My Answer
          </button>

          <button
            onClick={handleDownloadPDF}
            className="bg-orange-600 text-white px-4 py-1 mt-3 ml-2 rounded"
          >
            📄 Download Feedback as PDF
          </button>
        </>
      )}
    </div>
  );
}

export default Interview;
