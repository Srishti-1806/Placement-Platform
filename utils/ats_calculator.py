from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
import string
import re
import logging
from typing import Dict, List, Tuple

# Configure logging
logging.basicConfig(level=logging.INFO)

# Ensure NLTK stopwords are available
def ensure_nltk_data():
    try:
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('stopwords')

ensure_nltk_data()

from nltk.corpus import stopwords

class ATSCalculator:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.TOP_JOB_KEYWORDS = 30
        self.TOP_RESUME_KEYWORDS = 50
        self.KEYWORDS_TO_MATCH = 20

    def preprocess(self, text: str) -> str:
        """Clean and preprocess text for ATS analysis"""
        if not text:
            return ""

        text = text.lower()
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        text = ' '.join(text.split())

        tokens = text.split()
        tokens = [word for word in tokens if word not in self.stop_words and len(word) > 2]

        return ' '.join(tokens)

    def extract_keywords(self, text: str, top_n: int = 20) -> List[str]:
        """Extract top keywords from text"""
        processed_text = self.preprocess(text)

        if not processed_text:
            return []

        vectorizer = TfidfVectorizer(max_features=top_n, ngram_range=(1, 2), stop_words='english')
        try:
            tfidf_matrix = vectorizer.fit_transform([processed_text])
            feature_names = vectorizer.get_feature_names_out()
            scores = tfidf_matrix.toarray()[0]

            keyword_scores = list(zip(feature_names, scores))
            keyword_scores.sort(key=lambda x: x[1], reverse=True)

            return [keyword for keyword, score in keyword_scores if score > 0]
        except Exception as e:
            logging.error(f"Keyword extraction error: {e}")
            return []

    def calculate_ats_score(self, resume_text: str, job_description: str) -> Dict:
        """Calculate comprehensive ATS score between resume and job description"""
        resume_clean = self.preprocess(resume_text)
        job_desc_clean = self.preprocess(job_description)

        if not resume_clean or not job_desc_clean:
            return {
                "overall_score": 0,
                "keyword_match": 0,
                "missing_keywords": [],
                "matched_keywords": [],
                "recommendations": ["Please provide valid resume and job description text."]
            }

        try:
            vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words='english')
            vectors = vectorizer.fit_transform([resume_clean, job_desc_clean])
            similarity_score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]

            job_keywords = self.extract_keywords(job_description, self.TOP_JOB_KEYWORDS)
            resume_keywords = self.extract_keywords(resume_text, self.TOP_RESUME_KEYWORDS)

            job_keywords_set = set(job_keywords[:self.KEYWORDS_TO_MATCH])
            resume_keywords_set = set(resume_keywords)

            matched_keywords = list(job_keywords_set & resume_keywords_set)
            missing_keywords = list(job_keywords_set - resume_keywords_set)

            keyword_match_score = (len(matched_keywords) / len(job_keywords_set)) * 100 if job_keywords_set else 0
            overall_score = (similarity_score * 0.6 + (keyword_match_score / 100) * 0.4) * 100

            recommendations = self.generate_recommendations(
                overall_score, missing_keywords, matched_keywords
            )
  
            return {
                "overall_score": round(overall_score, 2),
                "similarity_score": round(similarity_score * 100, 2),
                "keyword_match": round(keyword_match_score, 2),
                "matched_keywords": matched_keywords[:10],
                "missing_keywords": missing_keywords[:10],
                "recommendations": recommendations,
                "job_keywords": job_keywords[:15],
                "resume_keywords": resume_keywords[:15]
            }

        except Exception as e:
            logging.error(f"Error calculating ATS score: {e}")
            return {
                "overall_score": 0,
                "error": f"Error calculating ATS score: {str(e)}",
                "recommendations": ["Please check your input text and try again."]
            }

    def generate_recommendations(self, score: float, missing_keywords: List[str], matched_keywords: List[str]) -> List[str]:
        """Generate personalized recommendations based on ATS analysis"""
        recommendations = []

        if score < 30:
            recommendations.append("🔴 Low match score. Consider significant resume improvements.")
        elif score < 60:
            recommendations.append("🟡 Moderate match. Some improvements needed.")
        else:
            recommendations.append("🟢 Good match! Your resume aligns well with the job.")

        if missing_keywords:
            recommendations.append(f"📝 Add these key terms: {', '.join(missing_keywords[:5])}")

        if matched_keywords:
            recommendations.append(f"✅ Great! You have these relevant skills: {', '.join(matched_keywords[:3])}")

        if score < 70:
            recommendations.extend([
                "💡 Use exact keywords from the job description",
                "📊 Quantify your achievements with numbers",
                "🎯 Tailor your resume for this specific role",
                "📋 Include relevant certifications and skills"
            ])

        return recommendations

# Example usage
if __name__ == "__main__":
    calculator = ATSCalculator()

    resume = """
    Experienced Python developer with 3+ years in web development. 
    Skilled in Flask, Django, REST APIs, and database design. 
    Strong problem-solving abilities and excellent teamwork skills.
    Built 5+ production applications serving 10k+ users.
    """

    job = """
    We are looking for a Python developer with experience in Flask, 
    REST APIs, and SQL databases. The candidate must be a good team player 
    with strong problem-solving skills. Experience with Django is a plus.
    """

    result = calculator.calculate_ats_score(resume, job)
    print(f"✅ ATS Score: {result['overall_score']}%")
    print(f"📊 Keyword Match: {result['keyword_match']}%")
    print(f"🎯 Matched Keywords: {result['matched_keywords']}")
    print(f"❌ Missing Keywords: {result['missing_keywords']}")
