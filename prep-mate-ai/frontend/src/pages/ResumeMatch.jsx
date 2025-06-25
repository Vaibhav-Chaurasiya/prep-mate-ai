import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist";
import { matchResumeToJD } from "../services/geminiAPI";
import { motion } from "framer-motion";

// ✅ Required for pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function ResumeMatch() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      text += pageText + "\n";
    }

    return text;
  };

  const handleFiles = async (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    if (!file || !file.name.endsWith(".pdf")) return alert("Only PDF allowed!");

    const text = await extractTextFromPDF(file);
    if (type === "resume") setResumeText(text);
    else setJdText(text);
  };

  const handleMatch = async () => {
    if (!resumeText || !jdText) return alert("Upload both files");
    setLoading(true);
    const output = await matchResumeToJD(resumeText, jdText);
    setResult(output);
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-8">📄 Resume vs JD Match</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <DropBox label="Upload Resume (PDF)" onDrop={(f) => handleFiles(f, "resume")} />
        <DropBox label="Upload Job Description (PDF)" onDrop={(f) => handleFiles(f, "jd")} />
      </div>

      <button
        onClick={handleMatch}
        disabled={loading}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        {loading ? "⏳ Matching..." : "🔍 Match Resume"}
      </button>

      {result && (
        <motion.div
          className="mt-8 bg-white rounded p-6 shadow-md max-w-3xl w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">🧠 AI Insight:</h3>
          <pre className="whitespace-pre-wrap text-gray-700 text-sm">{result}</pre>
        </motion.div>
      )}
    </motion.div>
  );
}

function DropBox({ label, onDrop }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  return (
    <motion.div
      {...getRootProps()}
      className="border-2 border-dashed border-blue-400 rounded p-6 bg-white text-center cursor-pointer shadow hover:border-blue-600 transition"
      whileHover={{ scale: 1.02 }}
    >
      <input {...getInputProps()} />
      <p className="text-gray-700 font-medium">{label}</p>
      <p className="text-xs text-gray-500 mt-1">Only PDF supported</p>
    </motion.div>
  );
}

export default ResumeMatch;
