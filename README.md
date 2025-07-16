# AI Admin Panel (mini)

## Prerequisites
- Python 3.11
- Node 18+
- Docker (optional, for one-command run)
- OpenAI & Gemini API keys

## Local dev

```bash
# back-end
cd backend
python -m venv .venv && source .venv/bin/activate
pip install fastapi uvicorn openai google-generativeai python-multipart
uvicorn app:app --reload
