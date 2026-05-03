import { type DynamicStructuredTool } from '@langchain/core/tools';

/**
 * Central registry for all agent tools.
 * Tools are callable functions that the agent can invoke during ReAct cycles.
 */
class ToolRegistry {
  private tools = new Map<string, DynamicStructuredTool>();

  register(tool: DynamicStructuredTool): void {
    if (this.tools.has(tool.name)) {
      console.warn(`[tool-registry] Overwriting existing tool: ${tool.name}`);
    }
    this.tools.set(tool.name, tool);
  }

  get(name: string): DynamicStructuredTool | undefined {
    return this.tools.get(name);
  }

  getAll(): DynamicStructuredTool[] {
    return Array.from(this.tools.values());
  }

  getNames(): string[] {
    return Array.from(this.tools.keys());
  }
}

export const toolRegistry = new ToolRegistry();
