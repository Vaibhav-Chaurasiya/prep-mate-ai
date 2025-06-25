// src/components/MicRecorder.jsx
import { ReactMic } from 'react-mic';
import { useState } from 'react';

function MicRecorder({ onTranscript }) {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStop = async (recordedData) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", recordedData.blob, "audio.wav");

    try {
      const res = await fetch("http://localhost:8000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      if (data.text) {
        onTranscript(data.text);
      } else {
        alert("❌ Transcription failed: No text returned.");
      }
    } catch (error) {
      console.error("Transcription error:", error);
      alert("❌ Failed to transcribe audio.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-4">
      <ReactMic
        record={recording}
        onStop={handleStop}
        strokeColor="#4F46E5"
        backgroundColor="#F3F4F6"
        mimeType="audio/wav"
        className="w-full rounded border"
        mode="user" // ✅ ensures mic input
      />
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => setRecording(true)}
          disabled={recording || loading}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          🎙️ Start
        </button>
        <button
          onClick={() => setRecording(false)}
          disabled={!recording || loading}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          ⏹️ Stop
        </button>
        {loading && <span className="text-sm text-gray-600">⏳ Processing...</span>}
      </div>
    </div>
  );
}

export default MicRecorder;
