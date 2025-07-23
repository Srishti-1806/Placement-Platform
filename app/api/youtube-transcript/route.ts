import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  let timeoutId: NodeJS.Timeout;

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No YouTube URL provided" }, { status: 400 });
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(url)) {
      return NextResponse.json({ error: "Please provide a valid YouTube URL" }, { status: 400 });
    }

    console.log("[INFO] Calling Python backend for YouTube transcription...");

    // Setup AbortController with timeout (5 minutes)
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 300000); // 5 mins

    const response = await fetch(`http://localhost:8000/api/youtube-transcript`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[BACKEND ERROR]:", errorText);
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("[SUCCESS] Transcription complete");
    return NextResponse.json(data);
  } catch (error: any) {
    clearTimeout(timeoutId); // ✅ FIXED: pass timeoutId

    let errorMessage = "An unexpected error occurred. Please try again later.";
    let status = 500;

    if (error.name === "AbortError") {
      errorMessage = "The transcription request timed out. Try a shorter video.";
    } else if (
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("Failed to fetch")
    ) {
      errorMessage = "Unable to connect to backend. Please ensure the Python server is running on port 8000.";
      status = 503;
    } else if (error.message.includes("Backend error")) {
      errorMessage = error.message;
    }

    console.error("[ERROR] Transcription error:", error.message || error);
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
