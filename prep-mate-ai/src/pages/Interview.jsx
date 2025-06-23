import { useState, useRef } from "react";
import {
  generateQuestion,
  evaluateAnswer,
  improveAnswer,
} from "../services/geminiAPI";
import { calculateXP } from "../utils/xp";
import html2pdf from "html2pdf.js";
import { useAuth } from "../context/AuthContext";

function Interview() {
  const [role, setRole] = useState("Software Engineer");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [improvedAnswer, setImprovedAnswer] = useState("");
  const [xp, setXp] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);

  const { currentUser } = useAuth();
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
    const earnedXP = calculateXP(newCount);
    setXp(earnedXP);

    // Save to localStorage
    const feedbackItem = {
      role,
      question,
      answer,
      feedback: fb,
      improvedAnswer: "",
      xp: earnedXP,
    };

    const prev = JSON.parse(localStorage.getItem("feedbackHistory")) || [];
    localStorage.setItem("feedbackHistory", JSON.stringify([...prev, feedbackItem]));
  };

  const handleImprove = async () => {
    const improved = await improveAnswer(answer);
    setImprovedAnswer(improved);

    // Update last saved item in localStorage
    const history = JSON.parse(localStorage.getItem("feedbackHistory")) || [];
    if (history.length > 0) {
      history[history.length - 1].improvedAnswer = improved;
      localStorage.setItem("feedbackHistory", JSON.stringify(history));
    }
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">🧠 Interview Simulator</h2>
        <span className="bg-green-100 text-green-800 font-medium px-4 py-1 rounded">
          XP: {xp}
        </span>
      </div>

      {/* Role selection */}
      <div className="mb-6 max-w-md bg-white p-4 rounded shadow">
        <label className="block mb-1 text-sm font-medium text-gray-700">🎯 Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full text-sm"
        >
          <option>Software Engineer</option>
          <option>Business Analyst</option>
          <option>Product Manager</option>
        </select>
        <button
          onClick={handleStart}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full text-sm transition"
        >
          🎬 Start Interview
        </button>
      </div>

      {/* Question + Answer */}
      {question && (
        <div className="mb-6 max-w-3xl bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📝 Question</h3>
          <p className="text-gray-700 mb-3">{question}</p>

          <textarea
            rows={4}
            placeholder="Write your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-2 rounded text-sm"
          ></textarea>

          <button
            onClick={handleSubmit}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            ✅ Submit Answer
          </button>
        </div>
      )}

      {/* Feedback & Improve */}
      {feedback && (
        <>
          <div
            ref={exportRef}
            className="bg-white p-4 rounded shadow max-w-3xl mb-4"
          >
            <h3 className="font-semibold text-lg mb-2">📢 Feedback</h3>
            <p className="text-gray-700">{feedback}</p>

            {improvedAnswer && (
              <>
                <h3 className="font-semibold text-lg mt-4 mb-2">🔧 Improved Answer</h3>
                <p className="text-gray-700">{improvedAnswer}</p>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2 max-w-3xl">
            <button
              onClick={handleImprove}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm transition"
            >
              ✨ Improve My Answer
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm transition"
            >
              📄 Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Interview;
