# Deployment

## Frontend (Vercel)

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render FastAPI URL (e.g. `https://pratyush-ai.onrender.com`)
4. Deploy.

Place your resume PDF at `public/resume/Pratyush_Basu_Resume.pdf` before deploying if you want working Download Resume links.

## Backend (Render)

1. Create a new Web Service from the `backend/` directory.
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Environment variables:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL` (optional)
   - `CORS_ORIGINS` = your Vercel domain(s)

## Local development

```bash
# frontend
npm install
npm run dev

# backend
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```
