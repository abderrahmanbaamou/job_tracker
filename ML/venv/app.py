from fastapi import FastAPI
from pydantic import BaseModel

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


app = FastAPI()


class MatchRequest(BaseModel):
    skills: str
    job_description: str


@app.get("/")
def home():
    return {
        "message": "Job Tracker ML API is running"
    }


def extract_skills(text):
    """
    Extract common technical skills from text.
    """

    skills_list = [
        "javascript",
        "typescript",
        "react",
        "react.js",
        "node.js",
        "node",
        "express",
        "express.js",
        "python",
        "java",
        "c++",
        "c#",
        "php",
        "html",
        "css",
        "tailwind",
        "tailwind css",
        "bootstrap",
        "postgresql",
        "mysql",
        "mongodb",
        "sql",
        "git",
        "github",
        "docker",
        "rest api",
        "rest apis",
        "api",
        "jwt",
        "fastapi",
        "django",
        "flask",
        "angular",
        "vue",
        "next.js",
        "nextjs",
    ]

    text = text.lower()

    found_skills = []

    for skill in skills_list:
        if skill in text:
            found_skills.append(skill)

    return set(found_skills)


@app.post("/match")
def match_job(data: MatchRequest):

    

    user_skills = extract_skills(data.skills)
    job_skills = extract_skills(data.job_description)

   

    if len(job_skills) == 0:

        skill_score = 0

    else:

        matched_skills = user_skills.intersection(job_skills)

        skill_score = (
            len(matched_skills) / len(job_skills)
        ) * 100

   

    texts = [
        data.skills,
        data.job_description
    ]

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(texts)

    similarity = cosine_similarity(
        vectors[0:1],
        vectors[1:2]
    )[0][0]

    text_score = similarity * 100


    final_score = (
        skill_score * 0.7
        + text_score * 0.3
    )

    final_score = round(final_score)

    
    if final_score >= 70:

        message = "Good match"

    elif final_score >= 40:

        message = "Medium match"

    else:

        message = "Low match"

    return {
        "score": final_score,
        "message": message,
        "user_skills": sorted(user_skills),
        "job_skills": sorted(job_skills),
        "matched_skills": sorted(
            user_skills.intersection(job_skills)
        )
    }