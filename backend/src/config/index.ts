import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface LLMConfig {
  provider: string;
  model: string;
  apiKey: string;
  baseUrl?: string;
  temperature: number;
  maxTokens: number;
}

export interface DatabaseConfig {
  provider: 'sqlite';
  url: string;
}

export interface AnalysisConfig {
  openfastPath?: string;
  openseesPath?: string;
  projectsDir: string;
}

export interface AppConfig {
  port: number;
  host: string;
  llm: LLMConfig;
  database: DatabaseConfig;
  analysis: AnalysisConfig;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3001,
  host: '0.0.0.0',
  llm: {
    provider: 'openai',
    model: 'deepseek-chat',
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    baseUrl: 'https://api.deepseek.com/v1',
    temperature: 0.1,
    maxTokens: 4096,
  },
  database: {
    provider: 'sqlite',
    url: 'file:./data/wtagent.db',
  },
  analysis: {
    projectsDir: './projects',
  },
};

export function loadConfig(configPath?: string): AppConfig {
  const paths = configPath
    ? [configPath]
    : [join(__dirname, '../../config/settings.json'), join(__dirname, '../../settings.json')];

  for (const p of paths) {
    if (existsSync(p)) {
      const userConfig = JSON.parse(readFileSync(p, 'utf-8'));
      return deepMerge(DEFAULT_CONFIG, userConfig);
    }
  }

  console.warn('[config] No settings.json found, using defaults');
  return DEFAULT_CONFIG;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(a: any, b: any): any {
  const result = { ...a };
  for (const key of Object.keys(b)) {
    const val = b[key];
    if (val !== undefined && typeof val === 'object' && !Array.isArray(val) && typeof result[key] === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (val !== undefined) {
      result[key] = val;
    }
  }
  return result;
}
