import json, os, datetime

BASE_DIR = os.path.dirname(__file__)
USAGE_FILE = os.path.join(os.path.dirname(BASE_DIR), "usage.json")

async def record_usage(model: str, tokens: int, latency_ms: int):
    data = []
    if os.path.isfile(USAGE_FILE):
        with open(USAGE_FILE) as f:
            data = json.load(f)
    data.append({
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "model": model,
        "tokens": tokens,
        "latency_ms": latency_ms
    })
    with open(USAGE_FILE, "w") as f:
        json.dump(data, f, indent=2)
