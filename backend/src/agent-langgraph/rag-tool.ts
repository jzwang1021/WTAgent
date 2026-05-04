/**
 * RAG Query Tool — IEC 61400-1 规范语义检索
 *
 * Two backends (auto-detected):
 *   Mode A: HTTP microservice (rag_server.py) — fast, model stays in memory
 *   Mode B: Python CLI (rag_query.py) — fallback, cold start ~15s
 */

import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { createScopedLogger } from '../utils/logger.js';

const log = createScopedLogger('rag-tool');

interface RAGResult {
  status: string;
  method?: string;
  query: string;
  elapsed_ms?: number;
  message?: string;
  results: Array<{
    chunk_id?: string;
    title: string;
    section: string;
    tags: string[];
    relevance_score: number;
    content: string;
  }>;
}

/** Project root: 4 levels up from this file */
const PROJECT_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..', '..', '..',
);

/** Rag server URL */
const RAG_SERVER_URL = process.env.RAG_SERVER_URL || 'http://127.0.0.1:8765';

/** Python CLI fallback paths */
const SCRIPT_PATH = resolve(PROJECT_ROOT, 'scripts', 'rag_query.py');
const VENV_PYTHON = resolve(PROJECT_ROOT, '.venv', 'bin', 'python3');
const PYTHON_BIN = existsSync(VENV_PYTHON) ? VENV_PYTHON : 'python3';

/**
 * Query via HTTP microservice (fast path).
 */
async function queryViaHttp(query: string, topK: number): Promise<RAGResult | null> {
  try {
    const resp = await fetch(`${RAG_SERVER_URL}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, top_k: topK }),
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) return null;
    const data = await resp.json() as RAGResult;
    return data;
  } catch {
    return null;
  }
}

/**
 * Query via Python CLI (cold start fallback).
 */
function queryViaCli(query: string, topK: number): RAGResult {
  try {
    const escapedQuery = query.replace(/"/g, '\\"').replace(/'/g, "'\\''");
    const command = `${PYTHON_BIN} "${SCRIPT_PATH}" "${escapedQuery}" --top-k ${topK}`;
    log.debug(`RAG (CLI): ${command}`);
    const output = execSync(command, {
      timeout: 30000,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
    });
    return JSON.parse(output) as RAGResult;
  } catch (error) {
    log.error(`RAG CLI failed: ${error instanceof Error ? error.message : String(error)}`);
    return { status: 'error', query, results: [] };
  }
}

/**
 * Smart query: try HTTP microservice first, fall back to CLI.
 */
async function queryRagDatabase(query: string, topK: number = 3): Promise<RAGResult> {
  // Try fast HTTP path
  const httpResult = await queryViaHttp(query, topK);
  if (httpResult) {
    log.debug(`RAG (HTTP): ${httpResult.results.length} results, ${httpResult.elapsed_ms}ms`);
    return httpResult;
  }

  // Fall back to CLI
  log.debug('RAG HTTP unavailable, falling back to CLI');
  return queryViaCli(query, topK);
}

/**
 * IEC 61400-1 Code Query Tool.
 * Semantic search over the wind turbine design standard knowledge base.
 * Supports both Chinese and English natural language queries.
 */
export const iecCodeQuery = tool(
  async (input: { query: string; topK?: number }) => {
    const result = await queryRagDatabase(input.query, input.topK ?? 3);
    if (result.status === 'error' || !result.results?.length) {
      return JSON.stringify({
        status: 'not_found',
        message: result.message || 'No matching IEC clauses found. Try rephrasing the query.',
      });
    }
    return JSON.stringify(result, null, 2);
  },
  {
    name: 'iec_code_query',
    description:
      'Semantic search over IEC 61400-1:2005 wind turbine design standard. ' +
      'Returns relevant clauses with section numbers and relevance scores. ' +
      'Supports Chinese and English queries. Use for: DLC load cases, ' +
      'partial safety factors, wind conditions, ULS, fatigue, turbine classes.',
    schema: z.object({
      query: z.string().describe(
        'Natural language query in Chinese or English. ' +
        'Examples: "DLC 1.3的分项安全系数", "fatigue analysis method for steel tower", "I类风场参考风速"'
      ),
      topK: z.number().optional().describe('Number of top results (default: 3, max: 10)'),
    }),
  },
);
