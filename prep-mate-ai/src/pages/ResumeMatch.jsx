import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { matchResumeToJD } from "../services/geminiAPI";
import * as pdfjsLib from "pdfjs-dist";

// ✅ Use CDN worker (Vite compatible)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function ResumeMatch() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFiles = async (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    let text = "";

    if (file.type === "application/pdf") {
      text = await extractTextFromPDF(file);
    } else {
      text = await file.text();
    }

    type === "resume" ? setResumeText(text) : setJdText(text);
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      text += `${pageText}\n`;
    }

    return text;
  };

  const handleMatch = async () => {
    if (!resumeText || !jdText) return alert("Please upload both files.");
    setLoading(true);
    const output = await matchResumeToJD(resumeText, jdText);
    setResult(output);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">📄 Resume & JD Matching</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DropBox label="📁 Upload Resume (.pdf/.txt)" onDrop={(f) => handleFiles(f, "resume")} />
        <DropBox label="📄 Upload Job Description (.pdf/.txt)" onDrop={(f) => handleFiles(f, "jd")} />
      </div>

      <button
        onClick={handleMatch}
        disabled={loading}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
      >
        {loading ? "⏳ Matching..." : "🔍 Match Resume to JD"}
      </button>

      {result && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">🧠 AI Insights:</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{result}</pre>
        </div>
      )}
    </div>
  );
}

function DropBox({ label, onDrop }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-blue-400 p-6 rounded bg-white text-center hover:border-blue-600 transition cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700 font-medium">{label}</p>
      <p className="text-xs text-gray-400 mt-1">Supports .txt and .pdf files</p>
    </div>
  );
}

export default ResumeMatch;
