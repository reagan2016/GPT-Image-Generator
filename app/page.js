"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setImage("");
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setImage(data.image);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🎨 AI Image Generator</h1>

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

      {error && (
        <p style={{ color: "red" }}>
          ❌ {error}
        </p>
      )}

      {image && (
        <div>
          <h3>Result:</h3>
          <img
            src={image}
            alt="AI generated"
            style={{ width: "100%", borderRadius: 10 }}
          />
        </div>
      )}
    </main>
  );
}
