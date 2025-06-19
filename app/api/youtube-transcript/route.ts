import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No YouTube URL provided" }, { status: 400 })
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    if (!youtubeRegex.test(url)) {
      return NextResponse.json({ error: "Please provide a valid YouTube URL" }, { status: 400 })
    }

    console.log("Calling Python backend for YouTube transcription...")

    // Call the Python FastAPI backend with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 300000) // 5 minute timeout

    try {
      const response = await fetch("http://localhost:8000/youtube-transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Backend error:", errorText)
        throw new Error(`Backend error: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log("YouTube transcription successful")
      return NextResponse.json(result)
    } catch (fetchError: any) {
      clearTimeout(timeoutId)

      if (fetchError.name === "AbortError") {
        throw new Error("Request timeout - video processing took too long")
      }

      if (fetchError.code === "ECONNREFUSED") {
        throw new Error("Backend server is not running. Please start the Python server on port 8000.")
      }

      throw fetchError
    }
  } catch (error: any) {
    console.error("YouTube transcription error:", error)

    let errorMessage = "Transcription failed. Please try again."

    if (error.message.includes("Backend server is not running")) {
      errorMessage = "Backend server is not available. Please ensure the Python server is running on port 8000."
    } else if (error.message.includes("timeout")) {
      errorMessage = "Processing timeout. Please try with a shorter video."
    } else if (error.message.includes("Invalid YouTube URL")) {
      errorMessage = "Please provide a valid YouTube URL."
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
