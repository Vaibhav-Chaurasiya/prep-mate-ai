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

      const data = await res.json();
      onTranscript(data.text); // Send result to Interview page
    } catch (error) {
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
      />
      <div className="flex gap-3 mt-2">
        <button onClick={() => setRecording(true)} className="bg-green-600 text-white px-4 py-1 rounded">
          🎙️ Start
        </button>
        <button onClick={() => setRecording(false)} className="bg-red-600 text-white px-4 py-1 rounded">
          ⏹️ Stop
        </button>
        {loading && <span className="text-sm text-gray-600">⏳ Processing...</span>}
      </div>
    </div>
  );
}

export default MicRecorder;
