import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export async function POST(request: NextRequest) {
  let response;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const backendFormData = new FormData();
    backendFormData.append("file", file);

    // Try fetching from backend
    response = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: "POST",
      body: backendFormData,
    });

    // If response is not OK (like 500, 400), throw an error
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend analysis failed: ${errorText}`);
    }

    // Parse the blob (PDF)
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
  } finally {
    // Optional: Cleanup or logging
    console.log("Analysis request complete");
  }
}

