"""
Lightweight RAG query tool for IEC 61400-1 knowledge base.
Uses keyword-based TF scoring (pure Python, no dependencies).

Usage:
  python scripts/rag_query.py "What is DLC 1.3?" --top-k 3
  python scripts/rag_query.py "fatigue safety factor" --top-k 2
"""

import json
import os
import sys
import argparse
import re
import math
from collections import Counter

def load_chunks():
    path = os.path.join(os.path.dirname(__file__), '..', 'docs', 'iec', 'rag-chunks.json')
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def tokenize(text):
    """Simple tokenizer: lowercase, split on non-alphanumeric."""
    return re.findall(r'[a-z0-9]+', text.lower())

def compute_tf(terms):
    """Term frequency."""
    count = Counter(terms)
    total = len(terms)
    return {t: c / total for t, c in count.items()}

def compute_idf(documents, all_terms):
    """Inverse document frequency."""
    N = len(documents)
    idf = {}
    for term in all_terms:
        doc_count = sum(1 for doc in documents if term in doc['terms'])
        idf[term] = math.log((N + 1) / (doc_count + 1)) + 1
    return idf

def search(query: str, top_k: int = 3) -> dict:
    chunks = load_chunks()
    
    # Build document-term matrices
    documents = []
    all_terms = set()
    
    for chunk in chunks:
        text = chunk['content'] + ' ' + chunk['title'] + ' ' + ' '.join(chunk['tags'])
        terms = tokenize(text)
        chunk['terms'] = terms
        chunk['tf'] = compute_tf(terms)
        all_terms.update(terms)
        documents.append(chunk)
    
    idf = compute_idf(documents, all_terms)
    
    # Tokenize query
    query_terms = tokenize(query)
    query_tf = compute_tf(query_terms)
    
    # Compute TF-IDF cosine similarity
    scores = []
    for doc in documents:
        dot_product = 0
        query_norm = 0
        doc_norm = 0
        
        for term, q_tf in query_tf.items():
            q_tfidf = q_tf * idf.get(term, 1)
            query_norm += q_tfidf ** 2
            
            d_tfidf = doc['tf'].get(term, 0) * idf.get(term, 1)
            doc_norm += d_tfidf ** 2
            dot_product += q_tfidf * d_tfidf
        
        query_norm = math.sqrt(query_norm) if query_norm > 0 else 1
        doc_norm = math.sqrt(doc_norm) if doc_norm > 0 else 1
        similarity = dot_product / (query_norm * doc_norm) if (query_norm * doc_norm) > 0 else 0
        
        scores.append((similarity, doc))
    
    # Sort by relevance
    scores.sort(key=lambda x: x[0], reverse=True)
    top_results = scores[:top_k]
    
    results = []
    for score, doc in top_results:
        results.append({
            "title": doc['title'],
            "section": doc['section'],
            "tags": doc['tags'],
            "relevance_score": round(score, 4),
            "content": doc['content'],
        })
    
    return {
        "status": "success",
        "query": query,
        "results": results,
    }

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Query IEC 61400-1 RAG database')
    parser.add_argument('query', type=str, help='Search query')
    parser.add_argument('--top-k', type=int, default=3, help='Number of results')
    
    args = parser.parse_args()
    result = search(args.query, args.top_k)
    print(json.dumps(result, indent=2, ensure_ascii=False))
