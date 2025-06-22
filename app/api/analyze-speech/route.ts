import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const backendFormData = new FormData()
    backendFormData.append("file", file)

    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error("Backend analysis failed")
    }

    const pdfBlob = await response.blob()

    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=analysis_report.pdf",
      },
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 })
  }
}
