import asyncio, os
from openai import AsyncOpenAI
from typing import Tuple

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

openai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

async def generate_answer(query: str, model: str = "gpt-4o") -> Tuple[str, int]:
    if model.startswith("gpt"):
        resp = await openai_client.chat.completions.create(
            model=model,
            messages=[{"role":"user","content": query}],
            temperature=0.2
        )
        answer = resp.choices[0].message.content
        usage = resp.usage.total_tokens
        return answer, usage
    # placeholder for Gemini support
    elif model.startswith("gemini"):
        # Implement Gemini call here
        await asyncio.sleep(0.1)
        return "(gemini mock) " + query, 0
    else:
        raise ValueError("Unsupported model")
