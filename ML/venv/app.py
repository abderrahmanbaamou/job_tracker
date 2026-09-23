from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from pypdf import PdfReader

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


app = FastAPI()



class MatchRequest(BaseModel):
    skills: str
    job_description: str




SKILLS_LIST = [
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
    "kubernetes",
    "aws",
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
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "machine learning",
    "deep learning",
    "jest",
    "testing"
]




def extract_skills(text):

    text = text.lower()

    found_skills = set()

    for skill in SKILLS_LIST:

        if skill in text:
            found_skills.add(skill)

    return found_skills



def home():

    return {
        "message": "Job Tracker ML API is running"
    }



@app.post("/match")
def match_job(data: MatchRequest):

    user_skills = extract_skills(
        data.skills
    )

    job_skills = extract_skills(
        data.job_description
    )

    matched_skills = (
        user_skills.intersection(job_skills)
    )

    missing_skills = (
        job_skills - user_skills
    )


   

    if len(job_skills) == 0:

        skill_score = 0

    else:

        skill_score = (
            len(matched_skills)
            / len(job_skills)
        ) * 100


    

    texts = [
        data.skills,
        data.job_description
    ]


    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(
        texts
    )


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

        "user_skills": sorted(
            user_skills
        ),

        "job_skills": sorted(
            job_skills
        ),

        "matched_skills": sorted(
            matched_skills
        ),

        "missing_skills": sorted(
            missing_skills
        )
    }


@app.post("/analyze-cv")
async def analyze_cv(
    file: UploadFile = File(...)
):

    # Read PDF
    contents = await file.read()


    # Read PDF directly from memory
    import io

    pdf_file = io.BytesIO(contents)

    reader = PdfReader(
        pdf_file
    )


    # Extract text
    text = ""

    for page in reader.pages:

        page_text = (
            page.extract_text()
            or ""
        )

        text += page_text + "\n"


    # Extract skills
    skills = extract_skills(text)


    return {

        "filename": file.filename,

        "skills": sorted(
            skills
        ),

        "text": text
    }