"""
IEC 61400-1 Semantic Search Microservice.
Keeps multilingual embedding model loaded in memory for fast queries.

Start:  python scripts/rag_server.py
Port:   8765 (configurable via RAG_SERVER_PORT env var)

API:
  POST /query  {"query": "...", "top_k": 3}
  GET  /health
"""

import json
import os
import sys
import time
import numpy as np
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
EMBEDDINGS_PATH = os.path.join(PROJECT_ROOT, 'docs', 'iec', 'embeddings.json')


class RAGServer:
    """Loads model + embeddings once, serves queries."""

    def __init__(self):
        self.model = None
        self.items = []
        self._load()

    def _load(self):
        t0 = time.time()

        # Load pre-computed embeddings
        if os.path.exists(EMBEDDINGS_PATH):
            with open(EMBEDDINGS_PATH, 'r', encoding='utf-8') as f:
                self.items = json.load(f)
            print(f"Loaded {len(self.items)} embedding items")
        else:
            print(f"WARNING: {EMBEDDINGS_PATH} not found. Run precompute_embeddings.py first.")
            self.items = []

        # Load multilingual model (~12s on CPU)
        from sentence_transformers import SentenceTransformer
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
        print(f"Model loaded. Startup: {time.time()-t0:.1f}s")
        print(f"Ready on port {PORT}")

    def query(self, text: str, top_k: int = 3) -> dict:
        if not self.items:
            return {"status": "error", "message": "No embeddings loaded", "results": []}

        # Encode query
        q_emb = self.model.encode(text, normalize_embeddings=True)

        # Cosine similarity
        scores = []
        for item in self.items:
            sim = float(np.dot(q_emb, np.array(item['embedding'])))
            scores.append((sim, item))

        scores.sort(key=lambda x: x[0], reverse=True)

        results = []
        for sim, item in scores[:top_k]:
            results.append({
                "chunk_id": item['id'],
                "title": item['title'],
                "section": item['section'],
                "tags": item.get('tags', []),
                "relevance_score": round(sim, 4),
                "content": item['content'],
            })

        return {
            "status": "success",
            "method": "semantic-multilingual",
            "query": text,
            "results": results,
        }


# ── HTTP Handler ──────────────────────────────────────────────────

class RAGHandler(BaseHTTPRequestHandler):
    server_rag: RAGServer = None  # set externally

    def log_message(self, *args):
        pass  # suppress default logging

    def do_GET(self):
        if urlparse(self.path).path == '/health':
            self._json(200, {"status": "ok", "items": len(self.server_rag.items)})
        else:
            self._json(404, {"error": "not found"})

    def do_POST(self):
        if urlparse(self.path).path != '/query':
            self._json(404, {"error": "not found"})
            return

        length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(length)) if length > 0 else {}

        query_text = body.get('query', '').strip()
        top_k = min(int(body.get('top_k', 3)), 10)

        if not query_text:
            self._json(400, {"status": "error", "message": "query is required"})
            return

        t0 = time.time()
        result = self.server_rag.query(query_text, top_k)
        result['elapsed_ms'] = round((time.time() - t0) * 1000)
        self._json(200, result)

    def _json(self, status: int, data: dict):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode())


def run_server(port: int = 8765):
    rag = RAGServer()
    RAGHandler.server_rag = rag

    server = HTTPServer(('127.0.0.1', port), RAGHandler)
    print(f"IEC RAG server listening on http://127.0.0.1:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down...")
        server.shutdown()


if __name__ == '__main__':
    PORT = int(os.environ.get('RAG_SERVER_PORT', 8765))
    run_server(PORT)
