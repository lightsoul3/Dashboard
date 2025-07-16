from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from pydantic import BaseModel
from typing import List
import os, uuid, datetime, json, logging, asyncio

from .logic.ai import generate_answer
from .logic.analytics import record_usage

BASE_DIR = os.path.dirname(__file__)
KB_DIR = os.path.join(BASE_DIR, "kb_files")
os.makedirs(KB_DIR, exist_ok=True)

logger = logging.getLogger("uvicorn")

app = FastAPI(title="AI Admin Panel API", version="0.1.0")

class ChatRequest(BaseModel):
    query: str
    model: str = "gpt-4o"
    session_id: str | None = None

class ChatResponse(BaseModel):
    answer: str
    model: str
    latency_ms: int

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    start = datetime.datetime.now()
    try:
        answer, token_usage = await generate_answer(req.query, model=req.model)
        latency = int((datetime.datetime.now() - start).total_seconds()*1000)
        asyncio.create_task(record_usage(model=req.model, tokens=token_usage, latency_ms=latency))
        return ChatResponse(answer=answer, model=req.model, latency_ms=latency)
    except Exception as e:
        logger.exception("Chat error")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/kb/upload")
async def upload_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4()) + "_" + file.filename
    dest = os.path.join(KB_DIR, file_id)
    with open(dest, "wb") as f:
        f.write(await file.read())
    return {"status": "uploaded", "file_id": file_id}

@app.get("/kb/list")
async def list_files():
    return {"files": os.listdir(KB_DIR)}

@app.delete("/kb/{file_id}")
async def delete_file(file_id: str):
    path = os.path.join(KB_DIR, file_id)
    if not os.path.isfile(path):
        raise HTTPException(status_code=404, detail="File not found")
    os.remove(path)
    return {"status": "deleted", "file_id": file_id}

@app.get("/analytics/usage")
async def usage():
    analytics_path = os.path.join(BASE_DIR, "usage.json")
    if not os.path.isfile(analytics_path):
        return {"data": []}
    with open(analytics_path) as f:
        return json.load(f)
