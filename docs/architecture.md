# WTAgent 架构设计

## 1. 概述

WTAgent（Wind Turbine Agent）是一个基于 AI 的风电塔支撑结构智能辅助设计平台，以 StructClaw 的 LangGraph.js ReAct Agent 架构为蓝本，针对风电塔筒-基础一体化设计场景进行深度定制。

**设计哲学**：用户通过自然语言描述设计需求 → Agent 自主识别塔型、提取参数、分析计算、规范校核、生成报告，形成 "描述 → 建模 → 分析 → 校核 → 报告" 全链路闭环。

---

## 2. 整体架构（三层四模块）

```
┌─────────────────────────────────────────────────────────┐
│                    用户交互层                              │
│  ┌──────────────────┐  ┌──────────────────────────────┐  │
│  │  ChatGPT 风格 UI  │  │  Three.js 3D 可视化          │  │
│  │  (Next.js)         │  │  (塔筒三维、模态振型、应力云图)│  │
│  └────────┬─────────┘  └──────────┬───────────────────┘  │
│           │                       │                       │
│           └───────────┬───────────┘                       │
│                       │ REST/SSE                          │
├───────────────────────┼─────────────────────────────────┤
│                   服务端层                                 │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              Fastify API Server                      │ │
│  │  /api/chat  /api/project  /api/analysis  /api/skill │ │
│  └──────────────────────┬───────────────────────────────┘ │
│                         │                                  │
│  ┌──────────────────────┴──────────────────────────────┐  │
│  │           LangGraph.js ReAct Agent                   │  │
│  │  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐  │  │
│  │  │ State   │ │ Graph    │ │ Tools  │ │ Tool     │  │  │
│  │  │ (状态)  │ │ (图编排) │ │ (工具) │ │ Registry │  │  │
│  │  └─────────┘ └──────────┘ └────────┘ └──────────┘  │  │
│  │              + System Prompt Builder                 │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                  │
│  ┌──────────────────────┴──────────────────────────────┐  │
│  │              Agent Skills (领域技能层)                │  │
│  │  每个 skill = skill.yaml + handler + stages         │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  tower-type   │  wind-load   │  seabed-soil  │   │  │
│  │  │  frequency    │  analysis    │  code-check   │   │  │
│  │  │  foundation   │  fatigue     │  buckling     │   │  │
│  │  │  report       │  postprocess │  material     │   │  │
│  │  │  design-opt   │  concept     │               │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                  │
│  ┌──────────────────────┴──────────────────────────────┐  │
│  │         Analysis Runtime (分析运行时)                 │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │OpenFAST  │  │ OpenSees │  │   SAP2000 OAPI   │  │  │
│  │  │(气弹耦合) │  │ (有限元)  │  │  (通用结构分析)   │  │  │
│  │  └──────────┘  └──────────┘  └──────────────────┘  │  │
│  └──────────────────────┬──────────────────────────────┘  │
│                         │                                  │
│  ┌──────────────────────┴──────────────────────────────┐  │
│  │             底层服务层                                │  │
│  │  Prisma + SQLite  │  Config  │  Logger  │  Pub/Sub  │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 2.1 架构层次说明

| 层次 | 技术栈 | 说明 |
|------|--------|------|
| **用户交互层** | Next.js, Three.js, Tailwind | ChatGPT 风格对话界面 + 3D 塔筒可视化 |
| **API 服务层** | Fastify (Node.js) | REST 接口 + SSE 流式输出 |
| **Agent 引擎层** | LangGraph.js | ReAct 循环编排，状态机驱动 |
| **Skill 技能层** | YAML + TypeScript | 领域知识封装，可插拔 |
| **分析运行时** | Python 子进程 | 调用 OpenFAST / OpenSeesPy / SAP2000 |
| **底层服务** | Prisma + SQLite | 会话持久化、项目存储、配置管理 |

---

## 3. 后端目录结构（仿 StructClaw）

```
backend/
├── package.json               # 依赖声明
├── tsconfig.json              # TypeScript 配置
├── prisma/
│   ├── schema.prisma          # 数据库模型
│   └── migrations/            # 数据库迁移
├── scripts/                   # 安装/部署/工具脚本
│   ├── bootstrap.sh
│   ├── setup-conda-env.sh     # 创建 conda 环境
│   └── download-models.sh     # 下载 NREL 5MW 参考模型
├── src/
│   ├── index.ts               # 启动入口
│   ├── types/                 # 全局类型定义
│   │   ├── skill.types.ts
│   │   ├── analysis.types.ts
│   │   ├── project.types.ts
│   │   └── agent.types.ts
│   ├── config/
│   │   ├── settings.json      # LLM / DB / 分析引擎路径等
│   │   ├── settings.schema.ts # 配置校验
│   │   └── index.ts           # 热加载配置管理器
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── units.ts           # 单位转换（kN·m, MPa, Hz 等）
│   │   └── validation.ts
│   ├── services/
│   │   ├── llm-service.ts     # LLM 调用封装
│   │   ├── project-service.ts # 项目管理
│   │   └── cache-service.ts   # 分析结果缓存
│   ├── api/
│   │   ├── routes/
│   │   │   ├── chat.ts        # 对话接口
│   │   │   ├── project.ts     # 项目 CRUD
│   │   │   ├── analysis.ts    # 分析运行/状态/结果
│   │   │   └── skill.ts       # Skill 查询/管理
│   │   └── plugins/
│   │       ├── cors.ts
│   │       └── auth.ts
│   ├── skill-shared/          # Skill 公用逻辑
│   │   ├── intent-detector.ts # 通用意图识别
│   │   ├── draft-extractor.ts # 通用参数提取
│   │   └── model-builder.ts   # 通用模型构建
│   ├── agent-langgraph/       # LangGraph Agent 核心
│   │   ├── graph.ts           # 主图定义（节点 + 边）
│   │   ├── state.ts           # 状态定义（AgentState）
│   │   ├── nodes/             # 图节点
│   │   │   ├── supervisor.ts  # 监督节点（Skill 路由）
│   │   │   ├── skill-runner.ts# Skill 执行节点
│   │   │   └── report-gen.ts  # 报告生成节点
│   │   ├── tools.ts           # 工程工具函数
│   │   ├── tool-registry.ts   # 工具注册中心
│   │   └── system-prompt.ts   # 双语言系统提示词
│   ├── agent-runtime/         # 分析引擎运行时
│   │   ├── engine-registry.ts # 引擎注册中心
│   │   ├── openfast/
│   │   │   ├── runner.ts      # OpenFAST 子进程管理
│   │   │   ├── input-gen.ts   # .fst / .dat 文件生成
│   │   │   └── output-parse.ts# .out / .sum 解析
│   │   ├── opensees/
│   │   │   ├── runner.ts      # OpenSeesPy 子进程管理
│   │   │   ├── tpl-gen.ts     # 塔筒参数化模板生成
│   │   │   └── result-extract.ts
│   │   └── sap2000/
│   │       ├── runner.ts      # SAP2000 OAPI 调用
│   │       └── model-bridge.ts# 参数→SAP2000 模型桥接
│   └── agent-skills/          # 领域 Skill（14 域）
│       ├── tower-type/        # 塔型识别
│       ├── wind-load/         # 风荷载
│       ├── seabed-soil/       # 海床/岩土
│       ├── frequency/         # 频率避让
│       ├── analysis/          # 结构分析
│       ├── code-check/        # 规范校核
│       ├── foundation/        # 基础设计
│       ├── fatigue/           # 疲劳分析
│       ├── buckling/          # 屈曲分析
│       ├── report-export/     # 报告导出
│       ├── result-postprocess/# 结果后处理
│       ├── material/          # 材料
│       ├── design-opt/        # 设计优化
│       └── concept/           # 概念方案
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

### 3.1 Frontend 目录结构

```
frontend/
├── package.json
├── next.config.js
├── app/
│   ├── layout.tsx
│   ├── page.tsx               # 主页面（聊天 + 可视化）
│   ├── chat/
│   │   └── page.tsx
│   ├── project/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   └── api/
│       └── ...                # Next.js API 路由
├── components/
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── InputBar.tsx
│   │   └── StreamOutput.tsx
│   ├── visualization/
│   │   ├── ThreeScene.tsx     # Three.js 3D 场景
│   │   ├── TowerViewer.tsx    # 塔筒 3D 展示
│   │   ├── ModeShape.tsx      # 模态振型动画
│   │   └── SectionView.tsx    # 截面视图
│   └── common/
│       ├── SkillPanel.tsx     # Skill 状态面板
│       └── OutputPanel.tsx    # 分析结果面板
├── hooks/
│   ├── useChat.ts
│   ├── useSSE.ts
│   └── useThree.ts
├── lib/
│   ├── api.ts                 # API 客户端
│   └── types.ts
└── public/
    └── models/                # 3D 模型资源
```

---

## 4. Skill 体系设计

### 4.1 Skill 定义规范（YAML + Handler）

每个 Skill 是一个独立目录，包含：

```
agent-skills/<domain>/<skill-name>/
├── skill.yaml      # 元数据定义
├── handler.ts      # 核心执行逻辑
├── stages/
│   ├── intent.md   # 意图识别指导
│   ├── draft.md    # 参数提取指导
│   └── analysis.md # 分析执行指导
└── templates/      # 参数模板 / 输入文件模板
```

### 4.2 Skill YAML 示例（tower-type/steel-tower）

```yaml
id: steel-tower
domain: tower-type
source: builtin
name:
  zh: 钢制锥筒塔
  en: Steel Conical Tower
description:
  zh: 钢制锥筒式风电塔塔筒的参数识别与建模 skill。
  en: Skill for steel conical wind turbine tower parameter extraction and modeling.
triggers:
  - 钢塔
  - 锥筒塔
  - steel tower
  - conical tower
  - 圆筒塔
stages:
  - intent
  - draft
  - analysis
  - design
structureType: steel-tower
structuralTypeKeys:
  - steel-tower
  - steel-conical
capabilities:
  - intent-detection
  - draft-extraction
  - interaction-questions
  - model-build
  - frequency-check
  - report-narrative
requires:
  - wind-load
  - material/steel
conflicts:
  - lattice-tower
priority: 80
compatibility:
  minRuntimeVersion: 0.1.0
  skillApiVersion: v1
runtimeContract:
  role: entry
  provides:
    - towerGeometry
    - designBasis
```

### 4.3 14 个 Skill 域总览

| 域 | Skill 列表 | 说明 |
|----|-----------|------|
| **tower-type** | steel-tower, lattice-tower, hybrid-tower, concrete-tower | 塔型识别与参数提取 |
| **wind-load** | iec-standard, dlc-matrix, thrust-estimation | IEC 61400 风荷载 / DLC 工况 / 气动推力估算 |
| **seabed-soil** | monopile-soil, jacket-soil, gravity-soil | 海床土体参数 / p-y 曲线 / 地基刚度 |
| **frequency** | eigen-check, 1p-3p-avoidance, simplified-beam | 频率预估 / 1P/3P 避让验算 / 简化梁模型 |
| **analysis** | modal, static, seismic, combined | 模态分析 / 静力分析 / 地震 / 荷载组合 |
| **code-check** | iec-ultimate, gb-ultimate, weld-fatigue, shell-buckling | 极限强度 / 焊缝疲劳 / 薄壳屈曲 |
| **foundation** | gravity-base, monopile, jacket-pile, suction-bucket | 重力式基础 / 单桩 / 导管架桩基 / 吸力桶 |
| **fatigue** | miner-rule, rainflow, sn-curve, damage-equivalent | 疲劳损伤计算 / S-N 曲线 / 等效疲劳荷载 |
| **buckling** | shell-buckling-en, stiffener-design | 薄壳屈曲 (EN 1993-1-6) / 加劲肋设计 |
| **report-export** | docx-report, pdf-report, ppt-summary | Word/PDF/PPT 报告导出 |
| **result-postprocess** | displacement, stress, mode-shape, envelope | 结果提取 / 包络 / 可视化数据 |
| **material** | steel-s355, steel-s420, concrete-c50, rebar | 材料库（欧洲 / 国标） |
| **design-opt** | thickness-opt, diameter-opt, topology-guidance | 壁厚优化 / 直径优化 / 拓扑建议 |
| **concept** | tower-siting, turbine-selection, LCOE-estimate | 选址 / 机型选型 / 度电成本估算 |

---

## 5. LangGraph Agent 图编排

### 5.1 主图管线

```
User Input
    │
    ▼
┌──────────────────────────┐
│    Supervisor Node        │ ← 意图识别 + Skill 路由
│  intent-detector + router │
└──────────┬───────────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
┌────────┐  ┌──────────┐
│ tower- │  │ concept  │  ... 按路由分发
│ type   │  │ skill    │
└───┬────┘  └──────────┘
    │ 提取参数
    ▼
┌──────────────┐
│   draft      │  ← 参数补全（交互式询问）
│  extraction  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  frequency   │  ← 频率预检（1P/3P 避让）
│  check       │       不合格 → 提示修改方案
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  wind-load   │  ← 风荷载计算（IEC 61400）
│  apply       │       输出等效静力 / DLC 工况
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  analysis    │  ← OpenFAST / OpenSees / SAP2000
│  run         │       自动选择引擎
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  code-check  │  ← 极限强度 / 疲劳 / 屈曲
│  verify      │       校核报告
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  report-gen  │  ← 生成设计报告
│  export      │       输出 Word / PDF / PPT
└──────────────┘
       │
       ▼
   Response to User
```

### 5.2 状态定义（AgentState）

```typescript
interface WTAgentState {
  // 会话基础
  messages: Message[];
  projectId: string;

  // 塔型信息
  towerType: 'steel-conical' | 'lattice' | 'hybrid' | 'concrete' | null;
  towerParams: TowerParams;           // 高度、直径、壁厚、分段等

  // 风荷载
  windClass: 'I' | 'II' | 'III';
  turbulenceCategory: 'A' | 'B' | 'C';
  dlcCases: DLCCase[];               // 设计荷载工况
  thrustForce: number;               // 气动推力

  // 频率
  targetFrequency: number;           // 目标一阶频率
  rotorFreq1P: number;               // 风轮转频
  bladeFreq3P: number;               // 叶片通过频率
  frequencyCheck: 'pass' | 'fail' | 'pending';

  // 结构分析
  analysisEngine: 'openfast' | 'opensees' | 'sap2000' | null;
  analysisResults: AnalysisResult;
  modalResults: ModalResult;

  // 校核
  codeCheckResults: CodeCheckResult[];

  // 报告
  reportPath: string | null;

  // 当前激活的 Skill
  activeSkill: string | null;
  skillState: 'idle' | 'running' | 'awaiting_input' | 'done' | 'error';
}
```

---

## 6. 分析运行时设计

### 6.1 三引擎架构

```
┌────────────────────────────────────────────────────┐
│              Engine Registry                        │
│  根据任务类型 + 用户偏好自动选择引擎                 │
│                                                     │
│  任务类型 → 引擎映射：                               │
│  ┌────────────────────┬─────────────────────────┐ │
│  │ 气弹耦合仿真        │ OpenFAST (Python)       │ │
│  │ 塔筒屈曲分析        │ OpenSeesPy (Python)     │ │
│  │ 通用结构分析/设计    │ SAP2000 OAPI (.NET)     │ │
│  │ 基础-土相互作用      │ OpenSeesPy (Python)     │ │
│  │ 疲劳损伤计算        │ Python 计算 + 后处理     │ │
│  └────────────────────┴─────────────────────────┘ │
└────────────────────────────────────────────────────┘
```

### 6.2 运行时通信协议

- **Agent → Runtime**：通过子进程启动 Python 脚本，参数通过 JSON 文件传递
- **Runtime → Agent**：分析完成后回写 JSON 结果文件，Agent 读取
- **流式输出**：Runtime 通过 stdout 输出进度消息，Fastify SSE 推送给前端

### 6.3 数据目录约定

```
projects/
└── <project-id>/
    ├── params.json              # 项目参数
    ├── openfast/
    │   ├── Main.fst             # OpenFAST 主输入
    │   ├── Tower.dat            # 塔筒输入
    │   ├── Blade.dat            # 叶片输入
    │   └── results/
    │       ├── Main.out
    │       └── Main.sum
    ├── opensees/
    │   ├── tower_model.py       # OpenSeesPy 模型
    │   └── results/
    │       ├── modes.json
    │       └── stress.json
    ├── sap2000/
    │   ├── model.sdb            # SAP2000 模型文件
    │   └── results/
    └── report/
        ├── report.docx
        └── report.pdf
```

---

## 7. 核心技术要点（风电塔专属）

### 7.1 频率避让优先级最高

风电塔设计的第一约束：**一阶频率避开 1P 和 3P 区间**。

```
1P = 风轮转频（~0.2 Hz 对于 5MW 机组）
3P = 叶片通过频率（~0.6 Hz 对于 5MW 机组）
┌─────┼─────┼─────┼─────┼─────┼─────┼─────┤
       ↑            ↑
      soft-stiff     stiff-stiff 设计策略
      (0.22-0.31Hz)  (>0.6Hz)
```

- **Soft-Stiff** 是主流设计（一阶频率落在 1P 和 3P 之间）
- Agent 在 draft 阶段自动用简化梁模型估算频率，判断设计策略

### 7.2 风荷载（IEC 61400）

- DLC（Design Load Cases）矩阵是风电荷载的核心
- 涵盖正常运行、极端风况、故障工况、运输安装等
- Agent 根据塔型和风场等级自动选择关键 DLC

### 7.3 薄壳屈曲

- 钢制锥筒塔属于薄壳结构，屈曲是控制工况
- 按 EN 1993-1-6 或 GB 50017 进行 shell buckling 校核
- 考虑焊接缺陷系数（fabrication quality parameter）

### 7.4 焊缝疲劳

- 塔筒环焊缝和纵焊缝是疲劳敏感部位
- 采用 Miner 线性累积损伤准则
- 等效疲劳荷载法（DEL）简化计算

---

## 8. 实施路线图

### Phase 1：基础框架（当前目标）
- [ ] 搭建 backend 目录结构（agent-langgraph / agent-runtime / agent-skills）
- [ ] 实现 LangGraph 基础图（Supervisor → Skill Runner）
- [ ] 实现第一个 Skill：`tower-type/steel-tower`（参数提取）
- [ ] 实现 `frequency` Skill（简化梁模型频率估算）
- [ ] 对接 OpenSeesPy 运行时（模态分析）
- [ ] 初步前端（Next.js 聊天界面 + Three.js 基本展示）

### Phase 2：核心功能
- [ ] 实现 `wind-load` Skill（IEC 61400 DLC 计算）
- [ ] 实现 `analysis` Skill（OpenSees 静力 + 模态）
- [ ] 实现 `code-check` Skill（极限强度校核）
- [ ] 实现 `foundation/monopile` Skill
- [ ] 对接 OpenFAST 运行时
- [ ] Report 生成（Word）

### Phase 3：高级功能
- [ ] `fatigue` Skill（Miner 累积损伤）
- [ ] `buckling` Skill（EN 1993-1-6 薄壳屈曲）
- [ ] `design-opt` Skill（壁厚优化指导）
- [ ] 对接 SAP2000 OAPI
- [ ] 代理模型加速频率估算
- [ ] 多目标优化（重量 vs 疲劳寿命）

---

## 9. 与 StructClaw 的对比

| 维度 | StructClaw | WTAgent |
|------|-----------|---------|
| **领域** | 建筑结构（框架/剪力墙/网架） | 风电塔支撑结构 |
| **核心规范** | GB50017, GB50009, GB50010, GB50011, JGJ3 | IEC 61400, EN 1993-1-6, GB/T 19072, GB 50017 |
| **塔型** | — | 钢锥筒 / 格构塔 / 混合塔 / 混凝土塔 |
| **关键约束** | 层间位移角、轴压比 | 频率避让(1P/3P)、薄壳屈曲、焊缝疲劳 |
| **分析引擎** | OpenSeesPy, PKPM, YJK | OpenFAST, OpenSeesPy, SAP2000 |
| **荷载类型** | 风、地震、重力 | 风(湍流/极端)、波浪、流、冰、地震 |
| **知识库** | 国标规范条文 | IEC 标准 + NREL 5MW 参考 + 设计手册 |
| **3D 可视化** | 结构三维 + 构件 | 塔筒三维 + 模态振型 + 应力云图 |

---

## 10. 技术选型依据

| 组件 | 选择 | 理由 |
|------|------|------|
| Agent 框架 | LangGraph.js | 与 StructClaw 一致，状态图编排适合工程管线 |
| API 服务 | Fastify | 高性能 Node.js，SSE 原生支持 |
| 前端 | Next.js | React 生态成熟，SSR/SSE/流式输出支持好 |
| 3D 可视化 | Three.js | 与 StructClaw 一致，WebGL 方案成熟 |
| 数据库 | SQLite + Prisma | 轻量级项目存储，无需独立 DB 服务 |
| LLM | DeepSeek V4 Pro | 复杂工程推理 + 代码生成 |
| 有限元引擎 | OpenSeesPy | 开源，Python API 易集成，扩展灵活 |
| 气弹引擎 | OpenFAST | 风电行业标准开源工具 |
| 通用结构 | SAP2000 OAPI | .NET 接口，用户日常使用主力工具 |
| 语言 | TypeScript (全部代码) | 与 StructClaw 一致，类型安全 |
| 测试 | Jest + Playwright | 单元 + E2E |
