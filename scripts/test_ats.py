#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.ats_calculator import ATSCalculator

def test_ats_calculator():
    print("🧪 Testing ATS Calculator...")
    
    calculator = ATSCalculator()
    
    # Test data
    resume_text = """
    Experienced Python developer with 3+ years in web development. 
    Skilled in Flask, Django, REST APIs, and database design. 
    Strong problem-solving abilities and excellent teamwork skills.
    Built 5+ production applications serving 10k+ users.
    Experience with JavaScript, React, Node.js, and cloud platforms.
    """
    
    job_description = """
    We are looking for a Python developer with experience in Flask, 
    REST APIs, and SQL databases. The candidate must be a good team player 
    with strong problem-solving skills. Experience with Django and JavaScript is a plus.
    Knowledge of cloud platforms and React would be beneficial.
    """
    
    try:
        result = calculator.calculate_ats_score(resume_text, job_description)
        
        print("✅ ATS Calculation Results:")
        print(f"📊 Overall Score: {result['overall_score']}%")
        print(f"🔍 Similarity Score: {result['similarity_score']}%")
        print(f"🎯 Keyword Match: {result['keyword_match']}%")
        print(f"✅ Matched Keywords: {result['matched_keywords']}")
        print(f"❌ Missing Keywords: {result['missing_keywords']}")
        print(f"💡 Recommendations:")
        for rec in result['recommendations']:
            print(f"   • {rec}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = test_ats_calculator()
    if success:
        print("\n🎉 ATS Calculator is working correctly!")
    else:
        print("\n💥 ATS Calculator test failed!")
    
    sys.exit(0 if success else 1)
