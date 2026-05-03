"""
Build ChromaDB vector database from IEC 61400-1 RAG chunks.

Usage: python scripts/build_rag_db.py
Output: docs/iec/chroma_db/ 向量数据库目录
"""

import json
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def build_rag_db():
    """Build ChromaDB vector database from rag-chunks.json"""
    
    # Load chunks
    chunks_path = os.path.join(os.path.dirname(__file__), '..', 'docs', 'iec', 'rag-chunks.json')
    with open(chunks_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)
    
    print(f"Loaded {len(chunks)} chunks")
    
    try:
        import chromadb
        from chromadb.utils import embedding_functions
        
        # Use default ONNX embedding function (all-MiniLM-L6-v2)
        # This downloads a small ONNX model (~80MB) on first use
        print("Initializing ChromaDB with ONNX embedding function...")
        
        db_dir = os.path.join(os.path.dirname(__file__), '..', 'docs', 'iec', 'chroma_db')
        os.makedirs(db_dir, exist_ok=True)
        
        client = chromadb.PersistentClient(path=db_dir)
        
        # Use sentence-transformers embedding function
        embedding_fn = embedding_functions.DefaultEmbeddingFunction()
        
        # Create or get collection
        collection_name = "iec-61400-1"
        try:
            collection = client.get_collection(name=collection_name)
            print(f"Collection '{collection_name}' already exists, deleting...")
            client.delete_collection(name=collection_name)
        except:
            pass
        
        collection = client.create_collection(
            name=collection_name,
            embedding_function=embedding_fn,
            metadata={"description": "IEC 61400-1:2005 Design Requirements for Wind Turbines"}
        )
        
        # Add chunks to collection
        ids = [chunk['id'] for chunk in chunks]
        documents = [chunk['content'] for chunk in chunks]
        metadatas = [{
            'title': chunk['title'],
            'section': chunk['section'],
            'tags': ','.join(chunk['tags']),
        } for chunk in chunks]
        
        collection.add(
            ids=ids,
            documents=documents,
            metadatas=metadatas,
        )
        
        print(f"Added {len(chunks)} chunks to collection '{collection_name}'")
        print(f"DB directory: {db_dir}")
        
        # Test query
        test_queries = [
            "What is the partial safety factor for DLC 1.1?",
            "extreme wind speed model EWM 50-year",
            "fatigue analysis Palmgren-Miner",
            "DLC 6.1 yaw misalignment",
        ]
        
        print("\n--- Test Queries ---")
        for q in test_queries:
            results = collection.query(query_texts=[q], n_results=2)
            print(f"\nQuery: {q}")
            for i, (doc, meta, dist) in enumerate(zip(
                results['documents'][0],
                results['metadatas'][0],
                results['distances'][0]
            )):
                print(f"  [{i+1}] {meta['title']} (distance: {dist:.3f})")
                print(f"      {doc[:100]}...")
        
        print("\n✅ RAG database built successfully!")
        return True
        
    except ImportError:
        print("chromadb not installed. Run: pip install chromadb")
        return False
    except Exception as e:
        print(f"Error building RAG DB: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    build_rag_db()
