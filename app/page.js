"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhanced, setEnhanced] = useState("");

  async function generate() {
    setLoading(true);
    setImage("");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setImage(data.image);
    setEnhanced(data.enhancedPrompt);

    setLoading(false);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🆓 AI Image Generator (No API Key)</h1>

      <textarea
        rows={5}
        style={{ width: "100%" }}
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br /><br />

      <button onClick={generate} disabled={loading || !prompt}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <br /><br />

      {enhanced && (
        <p>
          🧠 Enhanced Prompt: {enhanced}
        </p>
      )}

      {image && (
        <img
          src={image}
          style={{ width: "100%", borderRadius: 10 }}
        />
      )}
    </main>
  );
}