/**
 * 游戏常量和公式
 * 基于游戏规格书 game.spec.md
 */

import { Attributes, AttributeBonus, TimeAllocation } from './game';

// ==================== 属性基础值 ====================

export const ATTRIBUTE_BASE = 10;

// ==================== 属性加成计算 ====================

/**
 * 计算属性加成
 * 属性只计算超过100的部分，基础值10无实际加成效果
 */
export function calculateAttributeBonuses(attributes: Attributes): AttributeBonus {
  const心态加成 = Math.max(0, attributes.mindset - 100) * 0.005; // +0.5%精力
  const健康加成 = Math.max(0, attributes.health - 100) * 0.0001; // +0.01基础精力
  const智商加成 = Math.max(0, attributes.iq - 100) * 0.01; // +1%研究经验
  const情商加成 = Math.max(0, attributes.eq - 100) * 0.01; // +1%工作收入
  const创意减免 = Math.max(0, attributes.creativity - 100) * 0.001; // -0.1%研究所需经验
  const运气加成 = Math.max(0, attributes.luck - 100) * 0.001; // +0.1%掉率

  return {
    精力: 1 + 心态加成,
    研究加成: 1 + 智商加成,
    工作加成: 1 + 情商加成,
    经验减免: 1 - 创意减免,
    掉率加成: 1 + 运气加成,
  };
}

// ==================== 精力系统 ====================

/**
 * 计算基础精力
 * 基础精力 = 1 + (健康-100)×0.0001 + 穿越者加成 + 科技树加成
 */
export function calculateBaseEnergy(attributes: Attributes): number {
  const健康加成 = Math.max(0, attributes.health - 100) * 0.0001;
  return 1 + 健康加成;
}

/**
 * 计算总精力
 * 精力 = 基础精力 × (1 + 心态加成) × 其他加成
 */
export function calculateTotalEnergy(attributes: Attributes): number {
  const基础精力 = calculateBaseEnergy(attributes);
  const加成 = calculateAttributeBonuses(attributes);

  return 基础精力 * 加成.精力;
}

// ==================== 工作收入计算 ====================

/**
 * 计算总收入
 * 总收入 = 基础收入 × 行业倍率 × 情商加成 × 精力加成 × 穿越者加成 × 科技树加成
 * 时薪 = 总收入 / 24
 */
export function calculateIncome(
  career: { baseIncome: number },
  attributes: Attributes
): number {
  const行业倍率 = career.baseIncome;
  const加成 = calculateAttributeBonuses(attributes);

  return 行业倍率 * 加成.工作加成;
}

// ==================== 研究经验计算 ====================

/**
 * 计算研究经验获取
 * 研究经验获取 = 基础获取(10) × 智商加成 × 精力加成 × 穿越者加成 × 科技树加成
 */
export function calculateResearchXP(
  research: { level: number; maxLevel: number },
  attributes: Attributes
): number {
  const基础获取 = 10;
  const加成 = calculateAttributeBonuses(attributes);

  return 基础获取 * 加成.研究加成 * 加成.精力;
}

/**
 * 计算研究所需经验
 * 经验 = 基础经验 × (1.5 ^ (等级-1)) × (创意加成)
 */
export function calculateResearchCost(level: number): number {
  const基础经验 = 100;
  return 基础经验 * Math.pow(1.5, level - 1);
}

// ==================== 轮回资源计算 ====================

/**
 * 计算轮回结算资源
 * 记忆因子 = 工作最高等级×10 + 研究最高等级×5
 * 时间结晶 = 消耗加速天数 ÷ 2190 (满级时空旅人后)
 * 高维核心 = 消耗加速天数 ÷ 2920 (满级高维搜索后)
 */
export function calculateReincarnationResources(
  maxCareerLevel: number,
  maxResearchLevel: number,
  acceleratedDays?: number
): {
  memoryFactor: number;
  timeCrystal: number;
  highDimCore: number;
} {
  const记忆因子 = maxCareerLevel * 10 + maxResearchLevel * 5;
  const timeCrystal = acceleratedDays ? Math.floor(acceleratedDays / 2190) : 0;
  const highDimCore = acceleratedDays ? Math.floor(acceleratedDays / 2920) : 0;

  return { 记忆因子, timeCrystal, 高维核心: highDimCore };
}

// ==================== 时间分配 ====================

/**
 * 验证时间分配是否有效 (总和为1440分钟)
 */
export function validateTimeAllocation(allocation: TimeAllocation): boolean {
  return allocation.sleep + allocation.work + allocation.research === 1440;
}

/**
 * 获取推荐的时间分配 (单位：分钟)
 */
export function getRecommendedTimeAllocation(phase: string): TimeAllocation {
  switch (phase) {
    case 'slave': // 黑奴期 (前50岁)
      return { sleep: 0, work: 1395, research: 45 }; // 23.25小时工作, 0.75小时研究
    case 'research': // 研究期 (50-70岁)
      return { sleep: 480, work: 0, research: 960 }; // 8小时睡眠, 16小时研究
    case 'balance': // 平衡期 (新手)
      return { sleep: 480, work: 480, research: 480 }; // 8小时睡眠, 8小时工作, 8小时研究
    case 'defense': // 防御期 (70-90岁)
      return { sleep: 480, work: 360, research: 600 }; // 8小时睡眠, 6小时工作, 10小时研究
    default:
      return { sleep: 480, work: 480, research: 480 };
  }
}

// ==================== 工作系统常量 ====================

export const CAREER_LEVEL_COST = [
  { from: 0, to: 300, cost: 1000 },
  { from: 300, to: 500, cost: 5000 },
  { from: 500, to: 800, cost: 20000 },
  { from: 800, to: 1000, cost: 100000 },
  { from: 1000, to: Infinity, cost: 500000 },
];

// ==================== 研究系统常量 ====================

export const RESEARCH_BASE_COST = 100;
export const RESEARCH_XP_BASE = 10;

// ==================== 穿越者升级成本 ====================

export const TRANSMIGRATOR_BASE_FRAGMENT_COST = 100;

export function calculateTransmigratorLevelCost(currentLevel: number): number {
  return TRANSMIGRATOR_BASE_FRAGMENT_COST * Math.pow(1.5, currentLevel);
}

// ==================== 量子粒子兑换 cost ====================

export const QUANTUM_PARTICLE_COSTS = {
  '精力百分比': 60,
  '研究经验': 60,
  '工作收入': 100,
  '星舰攻击力': 100,
  '基础精力': 300,
};

// ==================== 时间弹性升级消耗 ====================

export const TIME_ELASTICITY_LEVEL_COSTS = [
  { from: 0, to: 10, cost: 55 },
  { from: 10, to: 20, cost: 155 },
  { from: 20, to: 40, cost: 310 },
  { from: 40, to: 60, cost: 510 },
  { from: 60, to: 90, cost: 765 },
  { from: 90, to: 120, cost: 1065 },
  { from: 120, to: 160, cost: 1420 },
  { from: 160, to: 200, cost: 1820 },
  { from: 200, to: 250, cost: 2275 },
  { from: 250, to: 300, cost: 2775 },
  { from: 300, to: 360, cost: 3330 },
];

// ==================== 战斗系统 ====================

export const MONSTER_SCALING = {
  40: 100,
  60: 500,
  80: 2000,
  90: 4000,
};

export const ORBITAL_TURRET_BASE_ATTACKS = {
  magnetic: 1000,
  beam: 800,
  annihilator: 5000,
  deathStar: 20000,
};

// ==================== 穿越者培养优先级 ====================

export const TRANSMIGRATOR_PRIORITY = [
  'WWT', // 王文婷
  'GML', // 高曼琳
  'GTY', // 顾天音
  'LSB', // 李松柏
  'HXX', // 韩笑笑
  'WW',  // 汪雯
  'HYY', // 胡媛媛
  'LXY', // 陆星瑶
  'ZJ',  // 周瑾
  'YZZ', // 杨宗之
];
