import { AIMessage } from '@langchain/core/messages';
import { AgentState } from '../state.js';
import { createScopedLogger } from '../../utils/logger.js';

const log = createScopedLogger('report-gen');

/**
 * Report Generation node: summarizes the analysis results into a readable report.
 */

export async function reportGenNode(
  state: typeof AgentState.State,
): Promise<Partial<typeof AgentState.State>> {
  if (state.skillState !== 'done') {
    return {};
  }

  const parts: string[] = [];

  // Tower info
  if (state.towerParams) {
    const tp = state.towerParams;
    parts.push(`## 📐 塔筒参数`);
    parts.push(`- 塔型：${state.towerType ?? '未指定'}`);
    parts.push(`- 总高：${tp.totalHeight} m`);
    parts.push(`- 底径：${tp.baseDiameter} m → 顶径：${tp.topDiameter} m`);
    parts.push(`- 机头质量：${tp.massTopHead} t`);
    parts.push(`- 风轮直径：${tp.rotorDiameter} m`);
  }

  // Frequency check
  if (state.frequencyCheck) {
    const fc = state.frequencyCheck;
    const statusEmoji = fc.status === 'pass' ? '✅' : '❌';
    parts.push(`\n## ${statusEmoji} 频率避让校验`);
    parts.push(`- 塔筒估算频率：${fc.targetFreq.toFixed(3)} Hz`);
    parts.push(`- 1P（风轮转频）：${fc.rotorFreq1P.toFixed(3)} Hz`);
    parts.push(`- 3P（叶片通过）：${fc.bladeFreq3P.toFixed(3)} Hz`);
    parts.push(`- 设计策略：${fc.strategy}`);
    parts.push(`- 结论：${fc.detail}`);
  }

  // Code check results
  if (state.codeCheckResults.length > 0) {
    parts.push(`\n## 📊 规范校核结果`);
    for (const cc of state.codeCheckResults) {
      const emoji = cc.status === 'pass' ? '✅' : cc.status === 'warning' ? '⚠️' : '❌';
      parts.push(`- ${emoji} [${cc.checkType}] ${cc.clause}: ${cc.demand.toFixed(2)} / ${cc.capacity.toFixed(2)} = ${cc.ratio.toFixed(3)}`);
    }
  }

  // Analysis results
  if (state.analysisResults) {
    const ar = state.analysisResults;
    parts.push(`\n## 🔬 分析结果（${ar.engine}）`);
    parts.push(`- 最大应力：${ar.maxStress.toFixed(1)} MPa`);
    parts.push(`- 最大位移：${(ar.maxDisplacement * 1000).toFixed(1)} mm`);
    if (ar.modalResults.length > 0) {
      parts.push(`- 模态频率：`);
      for (const m of ar.modalResults) {
        parts.push(`  - 第${m.modeNumber}阶：${m.frequency.toFixed(3)} Hz — ${m.description}`);
      }
    }
  }

  const report = parts.join('\n') || '暂无分析数据。请先完成参数输入。';

  return {
    messages: [new AIMessage({ content: report })],
  };
}
