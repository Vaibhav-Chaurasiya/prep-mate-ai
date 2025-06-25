// src/pages/ResumeMatch.jsx
import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";
import { matchResumeToJD } from "../services/geminiAPI";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function ResumeMatch() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const extractTextFromPDF = async (file) => {
    try {
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
    } catch (error) {
      console.error("❌ PDF extraction failed:", error);
      throw new Error("Failed to extract PDF text.");
    }
  };

  const handleFiles = async (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    if (!file || !file.name.endsWith(".pdf")) return alert("Only PDF allowed!");

    try {
      const text = await extractTextFromPDF(file);
      if (type === "resume") {
        setResumeFile(file);
        setResumeText(text);
      } else {
        setJdFile(file);
        setJdText(text);
      }
    } catch (err) {
      alert("❌ Failed to extract PDF text.");
    }
  };

  const handleMatch = async () => {
    if (!resumeText || !jdText) return alert("Please upload both PDF files.");
    setLoading(true);
    const output = await matchResumeToJD(resumeText, jdText);
    setResult(output);
    setLoading(false);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // 🌀 scroll to result
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">📄 Resume vs JD Matcher</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <DropBox label="Upload Resume (PDF)" onDrop={(f) => handleFiles(f, "resume")} />
        <DropBox label="Upload Job Description (PDF)" onDrop={(f) => handleFiles(f, "jd")} />
      </div>

      <div className="mt-4 text-sm text-gray-700">
        {resumeFile && <p>📄 Resume: {resumeFile.name}</p>}
        {jdFile && <p>📄 JD: {jdFile.name}</p>}
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
          ref={resultRef}
          className="mt-10 bg-white p-6 rounded shadow max-w-3xl w-full"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-3 text-gray-800">🧠 Match Result</h3>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">{result}</pre>
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
      whileHover={{ scale: 1.02 }}
      className="border-2 border-dashed border-blue-400 rounded p-6 bg-white text-center cursor-pointer shadow hover:border-blue-600 transition"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700 font-medium">{label}</p>
      <p className="text-xs text-gray-500 mt-1">Only PDF supported</p>
    </motion.div>
  );
}

export default ResumeMatch;
