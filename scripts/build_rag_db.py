"""
Build ChromaDB vector database from IEC 61400-1 RAG chunks.
Uses ONNX-based DefaultEmbeddingFunction (all-MiniLM-L6-v2) for speed.
English-only semantic search; Chinese queries auto-translated by LLM agent.

Usage: python scripts/build_rag_db.py
Output: docs/iec/chroma_db/ 向量数据库目录
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def build_rag_db():
    """Build ChromaDB vector database from rag-chunks.json"""

    chunks_path = os.path.join(os.path.dirname(__file__), '..', 'docs', 'iec', 'rag-chunks.json')
    with open(chunks_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)

    print(f"Loaded {len(chunks)} chunks from rag-chunks.json")

    try:
        import chromadb
        from chromadb.utils import embedding_functions

        db_dir = os.path.join(os.path.dirname(__file__), '..', 'docs', 'iec', 'chroma_db')
        os.makedirs(db_dir, exist_ok=True)

        # Fast ONNX embeddings (~80MB model, ~0.1s per query on CPU)
        print("Loading ONNX embedding model: all-MiniLM-L6-v2")
        embedding_fn = embedding_functions.DefaultEmbeddingFunction()

        client = chromadb.PersistentClient(path=db_dir)

        collection_name = "iec-61400-1-v2"
        try:
            client.delete_collection(name=collection_name)
            print(f"Deleted existing collection '{collection_name}'")
        except Exception:
            pass

        collection = client.create_collection(
            name=collection_name,
            embedding_function=embedding_fn,
            metadata={
                "description": "IEC 61400-1:2005 Design Requirements (ONNX embeddings)",
                "embedding_model": "all-MiniLM-L6-v2 (ONNX)",
                "chunk_count": len(chunks),
            }
        )

        ids = [chunk['id'] for chunk in chunks]
        documents = [chunk['content'] for chunk in chunks]
        metadatas = [{
            'title': chunk['title'],
            'section': chunk['section'],
            'tags': ','.join(chunk['tags']),
        } for chunk in chunks]

        print(f"Building ONNX embeddings for {len(chunks)} chunks...")
        collection.add(ids=ids, documents=documents, metadatas=metadatas)

        print(f"✅ Added {len(chunks)} chunks to collection '{collection_name}'")
        print(f"   Database directory: {db_dir}")

        # ── Semantic search tests ──────────────────────────────────
        test_queries = [
            "DLC 1.3 partial safety factor extreme turbulence",
            "fatigue analysis Palmgren-Miner method tower",
            "extreme wind speed 50-year parked DLC 6.1",
            "ULS ultimate limit state check gamma-f",
            "wind turbine class I reference wind speed",
        ]

        print("\n─── Semantic Search Tests (ONNX) ───")
        for q in test_queries:
            results = collection.query(query_texts=[q], n_results=2)
            print(f"\n🔍 Query: {q}")
            for i, (doc_id, meta, dist) in enumerate(zip(
                results['ids'][0], results['metadatas'][0], results['distances'][0]
            )):
                print(f"   #{i+1} [{doc_id}] {meta['title']} (§{meta['section']})  dist={dist:.4f}")

        print("\n✅ RAG database built successfully!")
        return True

    except ImportError as e:
        print(f"Dependency missing: {e}")
        print("Run: pip install chromadb")
        return False
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == '__main__':
    build_rag_db()
