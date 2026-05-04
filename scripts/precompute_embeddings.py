"""
Pre-compute embeddings for IEC 61400-1 RAG chunks.
Uses paraphrase-multilingual-MiniLM-L12-v2 for Chinese+English semantic search.

Usage: python scripts/precompute_embeddings.py
Output: docs/iec/embeddings.json
"""

import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def precompute():
    chunks_path = os.path.join(os.path.dirname(__file__), '..', 'docs', 'iec', 'rag-chunks.json')
    with open(chunks_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)

    print(f"Loaded {len(chunks)} chunks")

    # Load model (one-time, ~12s)
    print("Loading multilingual model: paraphrase-multilingual-MiniLM-L12-v2")
    from sentence_transformers import SentenceTransformer
    t0 = time.time()
    model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    print(f"  Model loaded in {time.time()-t0:.1f}s")

    # Encode all chunks
    texts = [c['content'] for c in chunks]
    print(f"Encoding {len(texts)} chunks...")
    t0 = time.time()
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=True)
    print(f"  Encoding done in {time.time()-t0:.1f}s")

    # Build output
    items = []
    for i, chunk in enumerate(chunks):
        items.append({
            "id": chunk["id"],
            "title": chunk["title"],
            "section": chunk["section"],
            "tags": chunk["tags"],
            "content": chunk["content"],
            "embedding": embeddings[i].tolist(),
        })

    out_path = os.path.join(os.path.dirname(__file__), '..', 'docs', 'iec', 'embeddings.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False)

    print(f"✅ Saved {len(items)} items to {out_path}")

    # Quick tests
    test_queries = [
        "DLC 1.3荷载的分项安全系数是多少？",
        "fatigue analysis Palmgren-Miner",
        "I类风场的参考风速",
    ]
    import numpy as np
    q_embs = model.encode(test_queries, normalize_embeddings=True)
    for qi, (q, q_emb) in enumerate(zip(test_queries, q_embs)):
        scores = [(np.dot(q_emb, np.array(item["embedding"])), item) for item in items]
        scores.sort(key=lambda x: x[0], reverse=True)
        print(f"\n🔍 Query: {q}")
        for rank, (score, item) in enumerate(scores[:2]):
            print(f"   #{rank+1} [{item['id']}] {item['title']} (§{item['section']})  sim={score:.4f}")

    print("\n✅ Pre-computation complete!")


if __name__ == '__main__':
    precompute()
