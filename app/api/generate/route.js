export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    // 🧠 SIMPLE LOCAL PROMPT ENHANCER (always works)
    const enhancedPrompt =
      `cinematic, ultra detailed, high quality, 4k, professional lighting, ${prompt}`;

    // 🎨 Stable Diffusion image generation
    const res = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Image API failed or is loading");
    }

    const blob = await res.blob();
    const buffer = await blob.arrayBuffer();

    const base64 = Buffer.from(buffer).toString("base64");

    return Response.json({
      image: `data:image/png;base64,${base64}`,
      enhancedPrompt,
    });

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}