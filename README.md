# WTAgent — 风电塔支撑结构智能设计 Agent

[![Phase 1](https://img.shields.io/badge/Phase%201-✅%20Complete-green)](https://github.com/jzwang1021/WTAgent)
[![LangGraph](https://img.shields.io/badge/Agent-LangGraph.js-blue)](https://langchain-ai.github.io/langgraphjs/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![IEC 61400-1](https://img.shields.io/badge/Standard-IEC%2061400--1-orange)](#)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

**WTAgent**（Wind Turbine Agent）是一个基于 LLM 的风电塔筒支撑结构智能辅助设计平台。用户用自然语言描述设计需求，Agent 自主完成：塔型识别 → 参数提取 → 风荷载计算 → 结构分析 → 规范校核 → 报告生成，形成「描述 → 建模 → 分析 → 校核 → 报告」全链路闭环。

---

## 🎯 项目愿景

风电塔筒设计涉及多个专业软件（OpenFAST / SAP2000 / OpenSeesPy）、多本规范（IEC 61400、EN 1993、GB 50017/50009）和多轮迭代。WTAgent 将这些专业知识的调用、协同和校核流程封装为 LLM Agent 的 Skill 体系，让结构工程师用**对话的方式**完成风电塔设计。

> 「告诉 AI 我要一个 120m 钢制锥筒塔，II 类风场，它帮你选型、建模、验算、出报告。」

---

## 🏗️ 架构概览

```
┌─────────────────────────────────────────────────────────┐
│                    用户交互层                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │  自然语言对话 (WeChat / Web UI)                    │   │
│  └──────────────────────┬───────────────────────────┘   │
├─────────────────────────┼───────────────────────────────┤
│                    API 服务层                             │
│  ┌──────────────────────┴───────────────────────────┐   │
│  │         Fastify API Server (Node.js)              │   │
│  │     /api/chat    /api/projects    SSE 流式输出     │   │
│  └──────────────────────┬───────────────────────────┘   │
├─────────────────────────┼───────────────────────────────┤
│                  Agent 引擎层                             │
│  ┌──────────────────────┴───────────────────────────┐   │
│  │          LangGraph.js ReAct Agent                 │   │
│  │   ┌──────────┐  ┌──────────────┐  ┌──────────┐   │   │
│  │   │Supervisor│→ │ Skill Runner │→ │Report Gen│   │   │
│  │   │ (路由)   │  │ (执行 Skill)  │  │ (报告)   │   │   │
│  │   └──────────┘  └──────────────┘  └──────────┘   │   │
│  └──────────────────────┬───────────────────────────┘   │
├─────────────────────────┼───────────────────────────────┤
│                  Skill 技能层 (14 域)                     │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐    │
│  │ tower │ │ wind  │ │ freq  │ │analysis│ │ code  │    │
│  │ type  │ │ load  │ │uency  │ │        │ │ check │    │
│  └───────┘ └───────┘ └───────┘ └───────┘ └───────┘    │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐    │
│  │founda │ │fatigue│ │buckle │ │report │ │design │    │
│  │ tion  │ │       │ │       │ │       │ │ opt   │    │
│  └───────┘ └───────┘ └───────┘ └───────┘ └───────┘    │
├─────────────────────────┼───────────────────────────────┤
│                分析运行时 (三引擎)                         │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐  │
│  │  OpenFAST  │  │   SAP2000  │  │   OpenSeesPy     │  │
│  │ (气弹耦合) │  │ (结构验算) │  │ (抗震/非线性)    │  │
│  └────────────┘  └────────────┘  └──────────────────┘  │
│       ↓ 六分量内力 (Fx,Fy,Fz,Mx,My,Mz) ↓                │
└─────────────────────────────────────────────────────────┘
```

### 三软件协同逻辑

WTAgent 的核心设计决策：**三个软件通过六分量内力接口解耦，各自专注自己最擅长的部分**。

```
① OpenFAST（气动-伺服-弹性仿真）
   输入：塔筒/叶片/机舱参数 + DLC 风场
   输出：机舱处六分量内力 (Fx, Fy, Fz, Mx, My, Mz)
                  ↓
② SAP2000（结构设计验算）
   输入：六分量内力（机舱高度施加）
   输出：应力比、位移、模态频率、设计校核结果
                  ↓
③ OpenSeesPy（地震/非线性专项分析·可选）
   输入：塔筒模型 + 地震波/非线性参数
   输出：时程响应、Pushover 曲线、屈曲模态
```

---

## 📊 当前进展

### ✅ Phase 1：基础框架（2026-05-03 完成）

| 模块 | 完成内容 |
|------|---------|
| **后端架构** | Fastify API Server + LangGraph.js 三节点管线（Supervisor → Skill Runner → Report Gen） |
| **Skill 体系** | 14 个 skill 域目录结构 + YAML 自动发现加载 |
| **塔型 Handler** | ✅ `steel-tower`（钢制锥筒塔）+ ✅ `lattice-tower`（格构桁架塔）完整实现 |
| **工程工具** | 锥度比、质量估算、频率估算、1P/3P 避让校验、气动推力估算 — 共 5 个 LangChain Tool |
| **IEC RAG** | ✅ IEC 61400-1:2005 语义搜索知识库 |
| **分析运行时** | SAP2000 OAPI 模板就绪（engine-registry.ts） |
| **API** | `/api/chat`（LLM 对话 + SSE 流式）+ `/api/projects`（项目 CRUD） |
| **编译** | TypeScript 零错误编译 |

#### 🔍 IEC RAG 语义搜索（v2 升级亮点）

| 组件 | 详情 |
|------|------|
| **模型** | `paraphrase-multilingual-MiniLM-L12-v2`（384 维，中英文通用） |
| **知识库** | 14 个 RAG 块，覆盖 DLC 1-8 全部工况、分项安全系数、ULS/FLS、疲劳分析 |
| **架构** | HTTP 微服务（端口 8765，模型常驻内存）+ CLI 降级 |
| **性能** | 语义查询 ~100ms（热启动），支持中英文自然语言检索 |
| **降级策略** | `rag-tool.ts` 优先 HTTP → 不可用自动回退 Python CLI |

**RAG 测试验证（5/5 通过）：**

| 查询 | 命中 |
|------|------|
| "DLC 1.3 荷载的分项安全系数是多少？" | ✅ Table 3, §7.6.2 |
| "塔筒疲劳分析用什么方法？" | ✅ Palmgren-Miner, §7.6.3 |
| "What is the safety factor for DLC 1.1?" | ✅ §7.4.1 |
| "extreme wind speed model 50-year return period" | ✅ §7.4.6 |
| "I 类风场的参考风速和湍流强度" | ✅ Table 1, §6.2 |

---

### 🔜 Phase 2：核心功能（规划中）

- [ ] `wind-load` Skill — IEC 61400 DLC 风荷载计算
- [ ] `analysis` Skill — OpenSeesPy 静力 + 模态分析对接
- [ ] `code-check` Skill — 极限强度校核（对接 IEC RAG）
- [ ] SAP2000 运行时实际调用（格构塔建模 + 六分量荷载施加）
- [ ] OpenFAST 运行时对接（.out 文件解析 + 六分量内力提取）
- [ ] `foundation/monopile` Skill — 单桩基础设计
- [ ] 前端 Next.js 界面（ChatGPT 风格 + Three.js 可视化）
- [ ] Report 生成（Word / PDF 导出）

### 🔮 Phase 3：高级功能

- [ ] `fatigue` Skill（Miner 累积损伤 + S-N 曲线）
- [ ] `buckling` Skill（EN 1993-1-6 薄壳屈曲）
- [ ] `design-opt` Skill（壁厚/直径优化）
- [ ] 代理模型加速频率估算
- [ ] 多目标优化（重量 vs 疲劳寿命）

---

## 📁 项目结构

```
WTAgent/
├── backend/                    # TypeScript 后端
│   ├── src/
│   │   ├── agent-langgraph/   # LangGraph Agent 核心
│   │   │   ├── graph.ts       # 主图定义（节点 + 边）
│   │   │   ├── state.ts       # 状态定义（AgentState）
│   │   │   ├── nodes/         # supervisor / skill-runner / report-gen
│   │   │   ├── tools.ts       # 5 个工程 LangChain Tool
│   │   │   ├── tool-registry.ts
│   │   │   ├── rag-tool.ts    # IEC RAG 查询（HTTP + CLI 双通道）
│   │   │   └── system-prompt.ts
│   │   ├── agent-runtime/     # 分析引擎运行时
│   │   │   ├── engine-registry.ts
│   │   │   └── sap2000/       # OAPI 模板
│   │   ├── agent-skills/      # 14 个 Skill 域
│   │   │   └── tower-type/
│   │   │       ├── steel-tower/    ✅ 完整实现
│   │   │       └── lattice-tower/  ✅ 完整实现
│   │   ├── api/               # Fastify 路由
│   │   │   └── routes/        # chat.ts / project.ts
│   │   ├── services/          # skill-service.ts
│   │   ├── config/            # index.ts
│   │   ├── types/             # 全局类型定义
│   │   └── utils/             # logger / units
│   ├── package.json
│   └── tsconfig.json
├── scripts/                    # Python 脚本
│   ├── rag_server.py          # IEC RAG HTTP 微服务（端口 8765）
│   ├── rag_query.py           # CLI 查询（降级）
│   ├── precompute_embeddings.py  # 预计算 embeddings
│   └── build_rag_db.py        # RAG 知识库构建
├── docs/                       # 文档
│   ├── architecture.md        # 架构设计文档
│   └── iec/                   # IEC RAG 知识库
│       ├── embeddings.json    # 预计算 embeddings（14 chunks）
│       ├── rag-chunks.json    # RAG 数据块
│       ├── IEC-61400-1-knowledge-base.md
│       ├── 06-External-Conditions.md
│       ├── 07-Structural-Design.md
│       └── Annexes.md
├── frontend/                   # 前端（Phase 2 开发）
└── .gitignore
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **pnpm** 或 npm

### 安装

```bash
# 克隆仓库
git clone https://github.com/jzwang1021/WTAgent.git
cd WTAgent

# 后端依赖
cd backend
pnpm install

# Python 依赖（RAG 服务）
cd ..
python3 -m venv .venv
source .venv/bin/activate
pip install sentence-transformers chromadb numpy
```

### 启动 RAG 知识库服务

```bash
# 方式一：后台运行
nohup .venv/bin/python3 scripts/rag_server.py > /tmp/rag-server.log 2>&1 &

# 方式二：前台运行（调试用）
.venv/bin/python3 scripts/rag_server.py

# 验证
curl -s http://127.0.0.1:8765/health
# → {"status": "ok", "items": 14}
```

### 启动后端

```bash
cd backend
pnpm dev
# API 运行于 http://localhost:3000
```

### 测试对话

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "I类风场，120m钢制锥筒塔，顶部直径多少合适？"}'
```

---

## 🛠️ 技术栈

| 组件 | 选择 | 说明 |
|------|------|------|
| Agent 框架 | **LangGraph.js** | ReAct 循环编排，状态图管理工程管线 |
| API 服务 | **Fastify** | 高性能 Node.js 框架，SSE 原生支持 |
| 前端 | **Next.js** + Three.js | ChatGPT 风格 UI + 3D 塔筒可视化 |
| 数据库 | **SQLite + Prisma** | 轻量级，无需独立服务 |
| LLM | **DeepSeek V4 Pro** | 复杂工程推理 + 代码生成 |
| 气弹引擎 | **OpenFAST** | 风电行业标准，NREL 开源 |
| 结构引擎 | **SAP2000 OAPI** | .NET 接口，工程师主力工具 |
| 有限元引擎 | **OpenSeesPy** | 开源 Python API，抗震/非线性分析 |
| RAG 嵌入 | **paraphrase-multilingual-MiniLM-L12-v2** | 384 维，中英文通用 |
| 语言 | **TypeScript**（全栈） + Python（运行时） |

---

## 📘 核心设计概念

### 1. 频率避让（第一约束）

风电塔设计的首要约束：一阶频率必须避开 1P（风轮转频）和 3P（叶片通过频率）区间。

```
   soft-soft    │   soft-stiff (主流)   │  stiff-stiff
  (柔性)        │  f₁ ∈ [1.1×1P, 0.9×3P] │  (刚性)
                │                       │
    ·──┬──·  ·──┼──·  ·──┬──·  ·──┬──·  └──┬──·
       0Hz      1P(~0.2Hz)    3P(~0.6Hz)    f₁>3P
```

- **Soft-Stiff** 是主流设计策略（约 90% 陆上机组）
- Agent 在 draft 阶段自动用简化梁模型估算频率

### 2. Skill 定义规范

每个 Skill 是一个独立目录，包含：

```yaml
# skill.yaml — 元数据定义
id: steel-tower
domain: tower-type
triggers: [钢塔, 锥筒塔, steel tower, ...]
stages: [intent, draft, analysis, design]
capabilities: [intent-detection, model-build, frequency-check, ...]
requires: [wind-load, material/steel]
priority: 80
```

Agent 启动时自动扫描 `agent-skills/` 下所有 YAML，建立 Skill → Handler 映射。

### 3. 与 StructClaw 的关系

WTAgent 以 [StructClaw](https://github.com/nousresearch/structclaw)（建筑结构 Agent）的 LangGraph ReAct 架构为蓝本，针对风电塔领域深度定制：

| 维度 | StructClaw | WTAgent |
|------|-----------|---------|
| 领域 | 建筑结构 | 风电塔支撑结构 |
| 核心规范 | GB50017/GB50009/GB50010 | IEC 61400, EN 1993-1-6 |
| 分析引擎 | OpenSeesPy, PKPM, YJK | OpenFAST, SAP2000, OpenSeesPy |
| 关键约束 | 层间位移角、轴压比 | 频率避让、薄壳屈曲、焊缝疲劳 |

---

## 📝 最近更新

- **2026-05-04** — IEC RAG 语义搜索升级：从 TF-IDF 关键词匹配升级到 HTTP 微服务 + 多语言 embedding，查询速度 ~100ms
- **2026-05-03** — Phase 1 核心框架完成：LangGraph 三节点管线、steel-tower 与 lattice-tower 完整 handler、5 个工程工具、SAP2000 运行时模板、IEC RAG 知识库入库
- **2026-05-02** — 项目初始化，架构设计文档完成

---

## 📄 License

MIT

---

## 👤 作者

王健泽 — 大学教师，结构工程 & 防灾减灾方向

GitHub: [@jzwang1021](https://github.com/jzwang1021)