export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // Safety check (prevents 500 errors)
    if (!id) {
      return Response.json(
        {
          status: "error",
          message: "Missing job id",
        },
        { status: 400 }
      );
    }

    // TEMP MOCK RESPONSE (prevents crashes)
    // Replace this later when using a real video API
    return Response.json({
      id,
      status: "completed",
      video_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    });

  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}
