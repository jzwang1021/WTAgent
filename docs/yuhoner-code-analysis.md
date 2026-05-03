# WTdesign_yuhoner 代码分析报告

> 仓库：https://github.com/jzwang1021/WTdesign/tree/yuhoner-1
> 作者：HUANG Qinyong, HU Yuhong, LIN Henghui
> 用途：VBA→Python 转换，格构式风电塔 SAP2000/OpenFAST/OpenSees 三件套联合优化设计

## 整体工作流

```
Excel (input sheet)
  │
  ├─ module2  ──→ 桁架几何生成（分段、锥度比、斜杆角度）
  │
  ├─ module3  ──→ SAP2000 OAPI 建模（节点、杆件、材料、截面）
  │                  ├─ 塔柱(Leg)、横杆(Hrz)、斜杆(Dgn)、隔板(Dpg)
  │                  ├─ 3/4/5/6边形截面
  │                  └─ 转换段 + 顶部塔筒(可选)
  │
  ├─ module8  ──→ SAP2000 荷载施加 + 分析运行
  │                  ├─ 16个风荷载工况 (L0-1~L0-16, L45-1~L45-16)
  │                  ├─ 32个荷载组合 (COMB1~COMB32)
  │                  ├─ 极限校核(ULS) / 疲劳校核(FLS) / 正常使用(NLS)
  │                  └─ 地震工况(多遇/罕遇)
  │
  ├─ module9  ──→ 结果后处理（内力提取、包络、写入Excel）
  │
  ├─ module10 ──→ 重量计算 + 等截面管柱模型
  │
  ├─ module12 ──→ 转换段厚度/外径计算
  │
  └─ code/10/  ──→ 等截面桁架计算 (EqtubeExp), 分段模型检查 (SegModelCheck)
```

## 模块详解

### module1：基础数学
- `V_cone` / `A_cir` / `I_cir` / `A_anl` / `I_anl` — 锥体/圆/环形面积惯性矩
- `V_tapered_tube` — 锥筒体积
- `interp1` — 线性插值
- `d_i_circle` — 多边形外接圆直径

### module2：桁架几何生成
- `geometry_check` — 几何可行性检查（叶片尖端碰撞检查）
- `solve_q1/q2/q3` — 格构塔分段比例计算（3种类型）
- `divide_tool` — 分段工具（等比例/不等比例划分）
- `gen_geom` — 全塔几何参数生成

### module3：SAP2000 建模（核心，~1700行）
- `Connect_to_sap` — 主干函数：启动SAP2000 → 创建模型
- 参数化节点坐标（基于n_side=3/4/5/6的不同sign_tmp模板）
- 塔柱(Leg)：连续竖杆
- 横杆(Hrz)：水平环向连接
- 斜杆(Dgn)：X型/K型斜撑
- 隔板(Dpg)：内部分隔
- 材料定义：钢材(Q345/Q420等)、混凝土(C30/C50等)、钢绞线(Wire)
- 截面定义：Pipe/Tube/Angle + 组合截面(SD Section)
- 杆端释放(Release)控制
- 模态分析(MODAL)

### module4：辅助计算
- `Lcal` — 空间两点距离
- `ACal` — 截面面积计算（圆管/方管/角钢）
- `get_node_num` / `get_elem_num` — 各类型段节点/单元数

### module5：SAP2000 材料与截面定义
- `define_Steel_mat` — 定义钢材（中国GB规范）
- `define_C_mat` — 定义混凝土
- `define_Wire_mat` — 定义钢绞线
- `define_sect` — 定义截面（Pipe/Tube/Angle）
- `define_sectSD` — 定义组合截面（钢管混凝土）
- `define_sec_NonPrismatic` — 变截面杆件

### module7：结果提取
- `get_floor_num` — 逐层内力提取（按Obj+ObjSta分组）
- `CopySDBFile` — 复制SDB模型文件
- `ParLoad` — 参数传递给等截面管柱计算

### module8：荷载与组合（~1300行）
- `load_model` — 主函数：控制10种荷载类型
  - 1-极限校核, 2-疲劳校核, 3-节点承载力
  - 4-基底极限, 5-基底正常, 6-基底多遇地震
  - 7-钢混正常, 8-钢混极限, 9-基底罕遇, 10-自重
- 风荷载施加（L0/L45两个方向 × 16个工况）
- 自重组合系数插值（按高度变化）
- 钢框架设计（Chinese 2018规范）
- 荷载组合生成

### module9：数据输出
- `data_out` — 各类结果输出到Excel指定位置
- 按datatype分流：塔柱/斜腹杆/节点/基础

### module10：质量计算与等截面管柱模型
- `WeightCal` — 桁架各组件重量计算（Leg/Hrz/Dgn等）
- 等效管柱模型生成（用于OpenFAST输入）

### module12：转换段计算
- `TranparCal` — 过渡段厚度/外径计算
- 多边形到圆形的几何过渡

## 技术亮点

1. **参数化格构塔建模**：支持3/4/5/6边形截面，自动计算节点坐标
2. **多软件联合仿真**：SAP2000(结构)+OpenSees(抗震)+OpenFAST(气弹)
3. **Excel作为数据总线**：所有参数输入/输出通过Excel，便于人工校验
4. **完整的荷载体系**：IEC风荷载16工况 + 地震多遇/罕遇
5. **中国规范集成**：钢结构设计(GB 50017-2018)、混凝土(GB 50010)
6. **几何自检**：叶片尖端碰撞检查
