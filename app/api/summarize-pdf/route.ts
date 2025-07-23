import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a PDF file" }, { status: 400 })
    }

    // Create FormData for the Python backend
    const backendFormData = new FormData()
    backendFormData.append("file", file)

    // Call the Python FastAPI backend
    const response = await fetch(`http://localhost:8000/api/summarize`, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error("Backend summarization failed")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Summarization error:", error)
    return NextResponse.json({ error: "Summarization failed. Please try again." }, { status: 500 })
  }
}
