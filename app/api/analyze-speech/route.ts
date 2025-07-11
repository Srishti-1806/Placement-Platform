import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("file", file);

    // FIX: Use the correct backend endpoint for analyze-speech
    const response = await fetch(`${BACKEND_URL}/api/analyze-speech`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error("Backend analysis failed");
    }

    const pdfBlob = await response.blob();

    return new NextResponse(pdfBlob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=analysis_report.pdf",
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
