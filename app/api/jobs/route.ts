import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get("keyword") || "developer"
    const location = searchParams.get("location") || "bangalore"
    const experience = searchParams.get("experience") || ""
    const jobType = searchParams.get("jobType") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // Call Python backend for job scraping
    const response = await fetch(`${BACKEND_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        location,
        experience,
        job_type: jobType,
        page,
        limit,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch jobs from backend")
    }

    const jobs = await response.json()

    return NextResponse.json({
      success: true,
      jobs: jobs.jobs || [],
      total: jobs.total || 0,
      page,
      totalPages: Math.ceil((jobs.total || 0) / limit),
    })
  } catch (error) {
    console.error("Job search error:", error)

    // Return mock data if backend is not available
    const mockJobs = generateMockJobs()

    return NextResponse.json({
      success: true,
      jobs: mockJobs.slice(0, 20),
      total: mockJobs.length,
      page: 1,
      totalPages: Math.ceil(mockJobs.length / 20),
      note: "Using mock data - start Python backend for real job data",
    })
  }
}

function generateMockJobs() {
  const companies = ["TCS", "Infosys", "Wipro", "Accenture", "IBM", "Microsoft", "Google", "Amazon"]
  const titles = ["Python Developer", "Full Stack Developer", "Software Engineer", "Backend Developer"]
  const locations = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune"]

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    company: companies[i % companies.length],
    location: locations[i % locations.length],
    experience: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 3) + 3} years`,
    salary: `₹${Math.floor(Math.random() * 15) + 5}-${Math.floor(Math.random() * 10) + 15} LPA`,
    skills: ["Python", "Django", "REST API", "PostgreSQL"].slice(0, Math.floor(Math.random() * 4) + 2),
    posted_date: `${Math.floor(Math.random() * 30) + 1} days ago`,
    job_type: ["Full-time", "Contract", "Internship"][Math.floor(Math.random() * 3)],
    remote: ["office", "remote", "hybrid"][Math.floor(Math.random() * 3)],
    description: `Looking for skilled ${titles[i % titles.length]} with experience in modern technologies.`,
    applicants: Math.floor(Math.random() * 500) + 10,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
  }))
}
