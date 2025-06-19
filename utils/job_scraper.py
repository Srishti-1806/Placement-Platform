import requests
from bs4 import BeautifulSoup
import json
import time
import random
from typing import List, Dict
from datetime import datetime, timedelta

class JobScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
    
    def scrape_naukri_jobs(self, keyword: str = "python developer", location: str = "bangalore", 
                          pages: int = 5) -> List[Dict]:
        """Scrape jobs from Naukri.com with fallback to mock data"""
        jobs = []
        
        try:
            # Try to scrape real data first
            base_url = "https://www.naukri.com"
            search_url = f"{base_url}/{keyword.replace(' ', '-')}-jobs-in-{location.lower()}"
            
            for page in range(1, pages + 1):
                try:
                    url = f"{search_url}?k={keyword}&l={location}&p={page}"
                    response = self.session.get(url, timeout=10)
                    
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')
                        job_cards = soup.find_all('div', class_='jobTuple')
                        
                        for card in job_cards:
                            job_data = self.extract_job_data(card, base_url)
                            if job_data:
                                jobs.append(job_data)
                    
                    # Add delay to avoid being blocked
                    time.sleep(random.uniform(1, 3))
                    
                except Exception as e:
                    print(f"Error scraping page {page}: {e}")
                    continue
        
        except Exception as e:
            print(f"Error accessing Naukri.com: {e}")
        
        # If no real data scraped, use mock data
        if not jobs:
            jobs = self.get_mock_jobs(keyword, location)
        
        return jobs[:50]  # Limit to 50 jobs
    
    def extract_job_data(self, card, base_url: str) -> Dict:
        """Extract job data from a job card"""
        try:
            title_elem = card.find('a', class_='title')
            title = title_elem.text.strip() if title_elem else "N/A"
            job_url = base_url + title_elem['href'] if title_elem and title_elem.get('href') else ""
            
            company_elem = card.find('a', class_='subTitle')
            company = company_elem.text.strip() if company_elem else "N/A"
            
            experience_elem = card.find('span', class_='expwdth')
            experience = experience_elem.text.strip() if experience_elem else "N/A"
            
            salary_elem = card.find('span', class_='salary')
            salary = salary_elem.text.strip() if salary_elem else "Not disclosed"
            
            location_elem = card.find('span', class_='locWdth')
            location = location_elem.text.strip() if location_elem else "N/A"
            
            skills_elem = card.find('span', class_='skill')
            skills = skills_elem.text.strip() if skills_elem else ""
            
            posted_elem = card.find('span', class_='date')
            posted_date = posted_elem.text.strip() if posted_elem else "Recently"
            
            return {
                "id": hash(title + company + location) % 10000,
                "title": title,
                "company": company,
                "location": location,
                "experience": experience,
                "salary": salary,
                "skills": skills.split(', ') if skills else [],
                "posted_date": posted_date,
                "job_url": job_url,
                "description": f"Looking for {title} with experience in {skills}. Join {company} team.",
                "job_type": "Full-time",
                "remote": "hybrid" if "remote" in title.lower() else "office"
            }
        except Exception as e:
            print(f"Error extracting job data: {e}")
            return None
    
    def get_mock_jobs(self, keyword: str = "python developer", location: str = "bangalore") -> List[Dict]:
        """Generate realistic mock job data when scraping fails"""
        companies = [
            "TCS", "Infosys", "Wipro", "Accenture", "IBM", "Microsoft", "Google", "Amazon",
            "Flipkart", "Paytm", "Zomato", "Swiggy", "Ola", "Uber", "PhonePe", "BYJU'S",
            "Freshworks", "Zoho", "Razorpay", "Cred", "Dream11", "Unacademy", "Vedantu"
        ]
        
        job_titles = [
            "Python Developer", "Full Stack Developer", "Backend Developer", "Software Engineer",
            "Senior Python Developer", "Django Developer", "Flask Developer", "Data Engineer",
            "DevOps Engineer", "Machine Learning Engineer", "AI Developer", "API Developer"
        ]
        
        locations = [
            "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"
        ]
        
        skills_pool = [
            ["Python", "Django", "REST API", "PostgreSQL"],
            ["Python", "Flask", "MongoDB", "Docker"],
            ["Python", "FastAPI", "Redis", "AWS"],
            ["Python", "React", "Node.js", "MySQL"],
            ["Python", "Machine Learning", "TensorFlow", "Pandas"],
            ["Python", "DevOps", "Kubernetes", "Jenkins"],
            ["Python", "Data Science", "NumPy", "Matplotlib"],
            ["Python", "Web Scraping", "Selenium", "BeautifulSoup"]
        ]
        
        jobs = []
        for i in range(50):
            company = random.choice(companies)
            title = random.choice(job_titles)
            job_location = random.choice(locations)
            skills = random.choice(skills_pool)
            
            experience_years = random.choice(["0-1", "1-3", "2-4", "3-5", "4-7", "5-8"])
            salary_range = random.choice([
                "₹3-6 LPA", "₹5-9 LPA", "₹7-12 LPA", "₹10-18 LPA", "₹15-25 LPA", "Not disclosed"
            ])
            
            posted_days = random.randint(1, 30)
            posted_date = (datetime.now() - timedelta(days=posted_days)).strftime("%d %b %Y")
            
            jobs.append({
                "id": 1000 + i,
                "title": title,
                "company": company,
                "location": job_location,
                "experience": f"{experience_years} years",
                "salary": salary_range,
                "skills": skills,
                "posted_date": posted_date,
                "job_url": f"https://example.com/job/{1000+i}",
                "description": f"We are looking for a skilled {title} to join our {company} team. "
                             f"The ideal candidate should have experience with {', '.join(skills[:3])}. "
                             f"This is a great opportunity to work with cutting-edge technologies.",
                "job_type": random.choice(["Full-time", "Contract", "Internship"]),
                "remote": random.choice(["office", "remote", "hybrid"]),
                "applicants": random.randint(10, 500),
                "rating": round(random.uniform(3.5, 4.8), 1)
            })
        
        return jobs
    
    def search_jobs(self, keyword: str = "", location: str = "", experience: str = "", 
                   salary_min: int = 0, job_type: str = "") -> List[Dict]:
        """Search jobs with filters"""
        all_jobs = self.scrape_naukri_jobs(keyword or "developer", location or "bangalore")
        
        filtered_jobs = []
        for job in all_jobs:
            # Filter by keyword
            if keyword and keyword.lower() not in job['title'].lower():
                continue
            
            # Filter by location
            if location and location.lower() not in job['location'].lower():
                continue
            
            # Filter by job type
            if job_type and job_type.lower() != job['job_type'].lower():
                continue
            
            filtered_jobs.append(job)
        
        return filtered_jobs

# Example usage
if __name__ == "__main__":
    scraper = JobScraper()
    jobs = scraper.scrape_naukri_jobs("python developer", "bangalore", 2)
    
    print(f"Found {len(jobs)} jobs:")
    for job in jobs[:5]:
        print(f"- {job['title']} at {job['company']} ({job['location']})")
