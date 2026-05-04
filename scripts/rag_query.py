"""
Semantic RAG query tool for IEC 61400-1 knowledge base.
Pre-computed embeddings (paraphrase-multilingual-MiniLM-L12-v2) + cosine similarity.

Fast: ~0.5s first query (model load), ~0.05s subsequent queries.
Supports Chinese + English queries naturally.

Usage:
  python scripts/rag_query.py "风机塔筒疲劳分析的安全系数是多少？"
  python scripts/rag_query.py "DLC 6.1 parked extreme wind 50-year" --top-k 3
"""

import json
import os
import sys
import argparse
import time
import numpy as np


SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
EMBEDDINGS_PATH = os.path.join(PROJECT_ROOT, 'docs', 'iec', 'embeddings.json')
CHUNKS_PATH = os.path.join(PROJECT_ROOT, 'docs', 'iec', 'rag-chunks.json')

# Lazy-loaded globals
_model = None
_items = None


def _load_model():
    global _model
    if _model is None:
        from sentence_transformers import SentenceTransformer
        _model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    return _model


def _load_items() -> list[dict]:
    global _items
    if _items is None:
        if os.path.exists(EMBEDDINGS_PATH):
            with open(EMBEDDINGS_PATH, 'r', encoding='utf-8') as f:
                _items = json.load(f)
        else:
            # Fallback: load raw chunks (no embeddings)
            with open(CHUNKS_PATH, 'r', encoding='utf-8') as f:
                _items = json.load(f)
    return _items


def semantic_search(query: str, top_k: int = 3) -> dict:
    """Embedding-based semantic search with multilingual model."""
    items = _load_items()

    # Check if embeddings are pre-computed
    if not items or 'embedding' not in items[0]:
        return {
            "status": "error",
            "query": query,
            "message": "Embeddings not pre-computed. Run: python scripts/precompute_embeddings.py",
            "results": [],
        }

    try:
        model = _load_model()
        q_emb = model.encode(query, normalize_embeddings=True)

        # Cosine similarity (embeddings are already normalized)
        scores = []
        for item in items:
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
            "query": query,
            "results": results,
        }

    except ImportError:
        return {
            "status": "error",
            "query": query,
            "message": "sentence-transformers not installed. Run: pip install sentence-transformers",
            "results": [],
        }
    except Exception as e:
        return {
            "status": "error",
            "query": query,
            "message": str(e),
            "results": [],
        }


def search(query: str, top_k: int = 3) -> dict:
    return semantic_search(query, top_k)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='IEC 61400-1 Semantic RAG Query')
    parser.add_argument('query', type=str, help='Query (Chinese or English)')
    parser.add_argument('--top-k', type=int, default=3, help='Number of results')
    args = parser.parse_args()

    t0 = time.time()
    result = search(args.query, args.top_k)
    elapsed = time.time() - t0
    result['elapsed_ms'] = round(elapsed * 1000)
    print(json.dumps(result, indent=2, ensure_ascii=False))
