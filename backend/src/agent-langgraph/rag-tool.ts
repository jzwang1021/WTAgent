/**
 * RAG Query Tool — IEC 61400-1 规范检索
 *
 * 调用 Python 脚本 rag_query.py 进行 TF-IDF 语义检索。
 * 返回最相关的规范条款内容，包含出处（章节号）和相关性评分。
 */

import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { createScopedLogger } from '../utils/logger.js';

const log = createScopedLogger('rag-tool');

interface RAGResult {
  status: string;
  query: string;
  results: Array<{
    title: string;
    section: string;
    tags: string[];
    relevance_score: number;
    content: string;
  }>;
}

/** Resolve path to rag_query.py relative to this file */
const SCRIPT_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '..', '..', '..', 'scripts', 'rag_query.py',
);

/**
 * Query the IEC 61400-1 RAG database.
 */
function queryRagDatabase(query: string, topK: number = 3): RAGResult {
  try {
    const escapedQuery = query.replace(/"/g, '\\"').replace(/'/g, "'\\''");
    const command = `python3 "${SCRIPT_PATH}" "${escapedQuery}" --top-k ${topK}`;
    const output = execSync(command, {
      timeout: 15000,
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
    });
    return JSON.parse(output) as RAGResult;
  } catch (error) {
    log.error(`RAG query failed: ${error instanceof Error ? error.message : String(error)}`);
    return { status: 'error', query, results: [] };
  }
}

/**
 * IEC 61400-1 Code Query Tool.
 * Use this tool when the user asks about:
 * - Design load cases (DLC 1.1-8.2)
 * - Partial safety factors (Table 3, γf, γm)
 * - Wind conditions (NTM, ETM, EWM, EOG, etc.)
 * - Ultimate limit state analysis
 * - Fatigue analysis (Palmgren-Miner)
 * - Wind turbine classes (I/II/III)
 * - Any IEC 61400-1 code clause
 */
export const iecCodeQuery = tool(
  (input: { query: string; topK?: number }) => {
    const result = queryRagDatabase(input.query, input.topK ?? 3);
    if (result.status === 'error' || result.results.length === 0) {
      return JSON.stringify({ status: 'not_found', message: 'No matching IEC clauses found for this query.' });
    }
    return JSON.stringify(result, null, 2);
  },
  {
    name: 'iec_code_query',
    description: 'Query the IEC 61400-1:2005 wind turbine design standard knowledge base. Returns relevant clauses with section numbers and relevance scores. Use for: DLC loads, partial safety factors, wind conditions, ULS, fatigue, turbine classes.',
    schema: z.object({
      query: z.string().describe('Search query in English, e.g. "DLC 1.3 partial safety factor" or "extreme wind speed model EWM 50-year"'),
      topK: z.number().optional().describe('Number of top results (default: 3)'),
    }),
  },
);
