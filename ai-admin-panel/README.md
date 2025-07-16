# AI Admin Panel

A lightweight, AI‑powered admin dashboard that lets teams query internal documentation through conversational search, manage the knowledge base, and track usage analytics in real time.

## Features

| Area | Details |
|------|---------|
| Chat‑based Q&A | Ask questions, receive instant answers from GPT‑4o or Gemini |
| Knowledge Base | Upload, list, delete docs; no page reloads |
| Usage Analytics | Token count & latency visualised with Recharts |
| Multi‑Model | Switch between GPT and Gemini via API |
| WordPress | Embed `<iframe src="https://yourpanel/chat?session=...">` or wrap REST calls in a plugin |
| Mobile Ready | Tailwind & responsive flex/grid everywhere |
| Privacy | All data stored on your infra; no cookies |

## Quick Start (Local)

```bash
git clone https://example.com/ai-admin-panel.git
cd ai-admin-panel
cp .env.example .env  # add your keys
# back‑end
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.app:app --reload
# front‑end (new terminal)
cd ../frontend
npm install
npm run dev
```

Navigate to **http://localhost:5173**.

## Docker

```bash
docker compose --env-file .env up --build
```

## WordPress Integration

1. Create `ai-panel.php` in your WP plugin folder:

```php
<?php
/*
Plugin Name: AI Admin Panel Embed
*/
function aipanel_iframe() {
  echo '<iframe style="width:100%;height:800px;border:none" src="https://panel.example.com"></iframe>';
}
add_shortcode("ai_panel", "aipanel_iframe");
?>
```

2. Use `[ai_panel]` in any page/post.

## Suggested Enhancements

* Add vector search with embeddings (e.g., pgvector).
* Serve the chat widget as a standalone `<script>` you can drop into any site.
* RBAC with JWT for large teams.

---

© 2025 Ivanna – MIT License
