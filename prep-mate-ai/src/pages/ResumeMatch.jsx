import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { matchResumeToJD } from "../services/geminiAPI";

function ResumeMatch() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState("");

  const handleFiles = async (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    const text = await file.text();
    type === "resume" ? setResumeText(text) : setJdText(text);
  };

  const handleMatch = async () => {
    if (!resumeText || !jdText) return alert("Please upload both files.");
    const output = await matchResumeToJD(resumeText, jdText);
    setResult(output);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">📄 Resume & JD Matching</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DropBox label="Upload Resume (.txt)" onDrop={(f) => handleFiles(f, "resume")} />
        <DropBox label="Upload Job Description (.txt)" onDrop={(f) => handleFiles(f, "jd")} />
      </div>

      <button
        onClick={handleMatch}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        🔍 Match Resume to JD
      </button>

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">🧠 AI Insights:</h3>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}

function DropBox({ label, onDrop }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: ".txt" });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer bg-white text-center"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">{label}</p>
    </div>
  );
}

export default ResumeMatch;
