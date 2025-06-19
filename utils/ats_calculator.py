from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
import string
import re
from typing import Dict, List, Tuple

# Download required NLTK data
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

from nltk.corpus import stopwords

class ATSCalculator:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        
    def preprocess(self, text: str) -> str:
        """Clean and preprocess text for ATS analysis"""
        if not text:
            return ""
            
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        # Remove stopwords
        tokens = text.split()
        tokens = [word for word in tokens if word not in self.stop_words and len(word) > 2]
        
        return ' '.join(tokens)
    
    def extract_keywords(self, text: str, top_n: int = 20) -> List[str]:
        """Extract top keywords from text"""
        processed_text = self.preprocess(text)
        
        if not processed_text:
            return []
            
        vectorizer = TfidfVectorizer(max_features=top_n, ngram_range=(1, 2))
        try:
            tfidf_matrix = vectorizer.fit_transform([processed_text])
            feature_names = vectorizer.get_feature_names_out()
            scores = tfidf_matrix.toarray()[0]
            
            # Get top keywords with scores
            keyword_scores = list(zip(feature_names, scores))
            keyword_scores.sort(key=lambda x: x[1], reverse=True)
            
            return [keyword for keyword, score in keyword_scores if score > 0]
        except:
            return []
    
    def calculate_ats_score(self, resume_text: str, job_description: str) -> Dict:
        """Calculate comprehensive ATS score between resume and job description"""
        
        # Preprocess both texts
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
            # Calculate TF-IDF similarity
            vectorizer = TfidfVectorizer(ngram_range=(1, 2))
            vectors = vectorizer.fit_transform([resume_clean, job_desc_clean])
            similarity_score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
            
            # Extract keywords from job description
            job_keywords = self.extract_keywords(job_description, 30)
            resume_keywords = self.extract_keywords(resume_text, 50)
            
            # Find matched and missing keywords
            matched_keywords = []
            missing_keywords = []
            
            for keyword in job_keywords[:20]:  # Check top 20 job keywords
                if any(keyword.lower() in resume_keyword.lower() or 
                      resume_keyword.lower() in keyword.lower() 
                      for resume_keyword in resume_keywords):
                    matched_keywords.append(keyword)
                else:
                    missing_keywords.append(keyword)
            
            # Calculate keyword match percentage
            keyword_match_score = (len(matched_keywords) / len(job_keywords[:20])) * 100 if job_keywords else 0
            
            # Calculate overall score (weighted average)
            overall_score = (similarity_score * 0.6 + (keyword_match_score / 100) * 0.4) * 100
            
            # Generate recommendations
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
            return {
                "overall_score": 0,
                "error": f"Error calculating ATS score: {str(e)}",
                "recommendations": ["Please check your input text and try again."]
            }
    
    def generate_recommendations(self, score: float, missing_keywords: List[str], 
                               matched_keywords: List[str]) -> List[str]:
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
        
        if len(matched_keywords) > 0:
            recommendations.append(f"✅ Great! You have these relevant skills: {', '.join(matched_keywords[:3])}")
        
        # General recommendations
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
