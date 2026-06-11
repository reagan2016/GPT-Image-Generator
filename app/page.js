"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhanced, setEnhanced] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    setImage("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setImage(data.image);
      setEnhanced(data.enhancedPrompt);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🆓 AI Image Generator</h1>

      <textarea
        rows={5}
        style={{ width: "100%" }}
        placeholder="Type something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br /><br />

      <button onClick={generate} disabled={loading || !prompt}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <br /><br />

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {enhanced && <p>🧠 {enhanced}</p>}

      {loading && <p>⏳ Thinking / generating image...</p>}

      {image && (
        <img
          src={image}
          style={{ width: "100%", borderRadius: 10 }}
        />
      )}
    </main>
  );
}