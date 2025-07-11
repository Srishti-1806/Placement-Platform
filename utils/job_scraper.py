from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import random
from typing import List, Dict
from webdriver_manager.chrome import ChromeDriverManager


class JobScraperSelenium:
    def __init__(self, driver_path: str = None):
        chrome_options = Options()
        chrome_options.add_argument("--headless")  
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--log-level=3")

        # Use ChromeDriverManager if no path provided
        if driver_path:
            self.driver = webdriver.Chrome(service=Service(driver_path), options=chrome_options)
        else:
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

        self.wait = WebDriverWait(self.driver, 10)

    def scrape_naukri_jobs(self, keyword: str = "python developer", location: str = "bangalore",
                           pages: int = 3) -> List[Dict]:
        jobs = []
        try:
            search_url = f"https://www.naukri.com/{keyword.replace(' ', '-')}-jobs-in-{location.lower()}"
            self.driver.get(search_url)

            for page in range(pages):
                self.wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'jobTuple')))
                job_cards = self.driver.find_elements(By.CLASS_NAME, 'jobTuple')

                for card in job_cards:
                    try:
                        job_data = self.extract_job_data(card)
                        if job_data:
                            jobs.append(job_data)
                    except Exception as e:
                        print(f"Error parsing job card: {e}")

                # Go to next page
                try:
                    next_button = self.driver.find_element(By.XPATH, '//a[@class="fright fs14 btn-secondary br2"]')
                    if "disabled" in next_button.get_attribute("class"):
                        break
                    next_button.click()
                    time.sleep(random.uniform(2, 4))
                except Exception as e:
                    print("No next button or end of pagination:", e)
                    break

        except Exception as e:
            print(f"Error during scraping: {e}")

        self.driver.quit()
        return jobs[:50]  # Limit to 50 jobs

    def extract_job_data(self, card) -> Dict:
        try:
            title = card.find_element(By.CLASS_NAME, "title").text
            job_url = card.find_element(By.CLASS_NAME, "title").get_attribute("href")
            company = card.find_element(By.CLASS_NAME, "subTitle").text
            location = card.find_element(By.CLASS_NAME, "locWdth").text
            experience = card.find_element(By.CLASS_NAME, "expwdth").text
            salary = card.find_element(By.CLASS_NAME, "salary").text if self.safe_find(card, "salary") else "Not disclosed"
            skills = card.find_element(By.CLASS_NAME, "tags").text if self.safe_find(card, "tags") else ""
            posted = card.find_element(By.CLASS_NAME, "type br2 fleft grey").text if self.safe_find(card, "type br2 fleft grey") else "Recently"

            return {
                "id": hash(title + company + location) % 10000,
                "title": title,
                "company": company,
                "location": location,
                "experience": experience,
                "salary": salary,
                "skills": skills.split(', ') if skills else [],
                "posted_date": posted,
                "job_url": job_url,
                "description": f"Looking for {title} with experience in {skills}. Join {company} team.",
                "job_type": "Full-time",
                "remote": "hybrid" if "remote" in title.lower() else "office"
            }
        except Exception as e:
            print("Extraction failed:", e)
            return None

    def safe_find(self, element, class_name: str):
        try:
            element.find_element(By.CLASS_NAME, class_name)
            return True
        except:
            return False



# Add alias for backward compatibility
JobScraper = JobScraperSelenium
