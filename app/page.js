"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState("");
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  async function generateVideo() {
    setLoading(true);
    setStatus("Starting...");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setJobId(data.id);
    setStatus("Job created");

    pollStatus(data.id);
  }

  async function pollStatus(id) {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/status?id=${id}`);
      const data = await res.json();

      setStatus(data.status);

      if (data.status === "completed") {
        setVideoUrl(data.video_url);
        clearInterval(interval);
        setLoading(false);
      }

      if (data.status === "failed") {
        setStatus("Failed");
        setLoading(false);
        clearInterval(interval);
      }
    }, 3000);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🎬 AI Video Generator</h1>

      <textarea
        rows={5}
        style={{ width: "100%" }}
        placeholder="Describe your video..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br /><br />

      <button onClick={generateVideo} disabled={loading}>
        {loading ? "Generating..." : "Generate Video"}
      </button>

      <p>📌 Status: {status}</p>

      {jobId && <p>Job ID: {jobId}</p>}

      {videoUrl && (
        <div>
          <h3>✅ Your Video:</h3>
          <video src={videoUrl} controls width="100%" />
        </div>
      )}
    </main>
  );
}