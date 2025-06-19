import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Call the Python FastAPI backend for webcam recording
    const response = await fetch("http://localhost:8000/record-webcam", {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Backend recording failed")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Recording error:", error)
    return NextResponse.json({ error: "Recording failed. Please try again." }, { status: 500 })
  }
}
