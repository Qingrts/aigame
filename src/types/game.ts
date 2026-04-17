/**
 * 游戏核心类型定义
 * 基于游戏规格书 game.spec.md
 */

// ==================== 属性系统 ====================

export interface Attributes {
  mindset: number;  // 心态 (基础值10)
  health: number;   // 健康 (基础值10)
  iq: number;       // 智商 (基础值10)
  eq: number;       // 情商 (基础值10)
  creativity: number; // 创意 (基础值10)
  luck: number;     // 运气 (基础值10)
}

// 属性计算结果
export interface AttributeBonus {
 精力: number;       // 精力
  研究加成: number;  // 研究经验加成 (百分比)
  工作加成: number;  // 工作收入加成 (百分比)
  经验减免: number;  // 研究经验减免 (百分比)
  掉率加成: number; // 掉率加成 (百分比)
}

// ==================== 时间分配系统 ====================

export interface TimeAllocation {
  sleep: number;    // 睡眠时间 (分钟, 0-1440)
  work: number;     // 工作时间 (分钟, 0-1440)
  research: number; // 研究时间 (分钟, 0-1440)
  // 约束: sleep + work + research = 1440
}

export interface TimeConsumption {
  meals: number;    // 吃饭时间 (分钟)
  commute: number;  // 通勤时间 (分钟)
  housing: number;  // 住宿时间 (分钟)
}

// ==================== 工作系统 ====================

export type Industry = 'ai' | 'entertainment' | 'starfleet' | 'research' | 'transport';

export interface IndustryConfig {
  id: Industry;
  name: string;
  baseIncomeMultiplier: number;
}

export const INDUSTRY_CONFIGS: IndustryConfig[] = [
  { id: 'starfleet', name: '星空舰队', baseIncomeMultiplier: 1.5 },
  { id: 'entertainment', name: '娱乐圈', baseIncomeMultiplier: 1.3 },
  { id: 'ai', name: 'AI', baseIncomeMultiplier: 1.2 },
  { id: 'research', name: '科研', baseIncomeMultiplier: 1.1 },
  { id: 'transport', name: '运输', baseIncomeMultiplier: 1.0 },
];

export interface Career {
  id: string;
  name: string;
  industry: Industry;
  level: number;
  maxLevel: number;
  baseIncome: number;
  unlocked: boolean;
  prerequisites?: string[];  // 前置职业或研究要求
  nextCareer?: string;      // 进阶职业ID
}

// ==================== 研究系统 ====================

export type ResearchCategory = 'basic' | 'industry' | 'life';

export interface Research {
  id: string;
  name: string;
  category: ResearchCategory;
  level: number;
  maxLevel: number;
  effects: string[];
  prerequisites: string[];
  cost: {
    experience: number;
  };
}

// 研究经验获取
export interface ResearchXP {
  base: number;     // 基础获取量
  bonus: number;    // 加成后获取量
  efficiency: number; // 效率百分比
}

// ==================== 生活系统 ====================

export interface LifeOption {
  id: string;
  name: string;
  type: 'meal' | 'housing' | 'transport' | 'hire';
  effects: Partial<{
    time: number;
   精力: number;
    健康: number;
    额外精力: number;
  }>;
  cost: number; // 每天成本
  unlocked: boolean;
}

export type HiredRole = 'researchAssistant' | 'secretary' | 'cleaner' | 'nanny';

export interface HiredService {
  role: HiredRole;
  level: number;
  efficiencyBonus: number; // 效率加成百分比
  cost: number; // 每天成本
  unlocked: boolean;
}

// ==================== 轮回系统 ====================

export interface ReincarnationResources {
  memoryFactor: number;       // 记忆因子
  timeCrystal: number;        // 时间结晶
  highDimCore: number;        // 高维核心
  reincarnationMedal: number; // 轮回勋章
}

// ==================== 穿越者系统 ====================

export interface Transmigrator {
  id: string;
  name: string;
  skill: string;
  bonusPerLevel: number;
  currentLevel: number;
  maxLevel: number;
  unlocked: boolean;
  acquisitionMethod: 'initial' | 'quantumCurrency' | 'achievement';
  priority: number; // 培养优先级
}

// 穿越者碎片
export interface TransmigratorFragment {
  transmigratorId: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
}

// ==================== 量子粒子系统 ====================

export type ParticleType =
  | '精力百分比'
  | '研究经验'
  | '工作收入'
  | '星舰攻击力'
  | '基础精力';

export interface QuantumParticle {
  type: ParticleType;
  level: number;
  maxLevel: number;
  purchaseCost: number;
  effects: {
    精力?: number;
    研究经验?: number;
    工作收入?: number;
    星舰攻击力?: number;
    基础精力?: number;
  };
}

// ==================== 科技树系统 ====================

export type TechCategory = 'life' | 'combat' | 'deepspace';

export interface TechEffect {
  name: string;
  value: number;
  description: string;
}

export interface TechNode {
  id: string;
  name: string;
  category: TechCategory;
  level: number;
  maxLevel: number;
  effects: TechEffect[];
  prerequisites: string[];
  cost: {
    timeCrystal?: number;
    highDimCore?: number;
    lifeCrystal?: number;
  };
  unlocked: boolean;
}

export interface TechTree {
  [category: string]: {
    [nodeId: string]: TechNode;
  };
}

// ==================== 轨道建筑系统 ====================

export type BuildingType = 'power' | 'weapon' | 'spaceport' | 'radar' | 'other';

export interface BuildingModule {
  id: string;
  name: string;
  effect: string;
  effectValue: number;
}

export interface OrbitalBuilding {
  id: string;
  name: string;
  type: BuildingType;
  level: number;
  modules: BuildingModule[];
}

// ==================== 星舰系统 ====================

export type StarshipType = 'small' | 'medium' | 'large' | 'flagship';

export interface StarshipBlueprint {
  id: string;
  name: string;
  type: StarshipType;
  unlockRequirements: {
    universePortLevel?: number;
    achievements?: string[];
  };
  stats: {
    attack: number;
    durability: number;
    parkingSlots: number;
  };
}

export interface Starship {
  id: string;
  blueprintId: string;
  name: string;
  type: StarshipType;
  attack: number;
  durability: number;
  parkingSlots: number;
  currentSlots: number;
  upgrades: number;
}

export interface StarshipUpgrade {
  id: string;
  currentLevel: number;
  maxLevel: number;
  cost: {
    alienCore: number;
  };
}

// ==================== 神圣时间线 ====================

export interface SacredTimeline {
  minerals: number;
  starships: Starship[];
  buildings: {
    [buildingId: string]: number;
  };
}

export interface CivilizationStats {
  hashValue: number;     // 哈希值
  cultureValue: number;  // 文化值
}

// ==================== 游戏存档结构 ====================

export interface GameSave {
  version: string;
  lastSaveTime: number;
  player: PlayerState;
  permanent: PermanentState;
  settings: GameSettings;
}

export interface PlayerState {
  age: number;
  money: number;
  timeAllocation: TimeAllocation;
  attributes: Attributes;
  career: Career;
  researches: Research[];
  lifeOptions: LifeOption[];
  hiredServices: HiredService[];
  buildings: OrbitalBuilding[];
  isGameOver: boolean;
  gameOverReason?: string;
}

export interface PermanentState {
  totalReincarnations: number;
  bestCareerLevel: number;
  bestResearchLevel: number;
  totalTimeCrystals: number;
  totalHighDimCores: number;
  totalLifeCrystals: number;
  techTree: TechTree;
  transmigrators: Transmigrator[];
  transmigratorFragments: TransmigratorFragment[];
  quantumParticles: QuantumParticle[];
  sacredTimeline: SacredTimeline;
  civilizationStats: CivilizationStats;
  globalAchievements: string[];
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  autosaveInterval: number; // 秒
  autoSaveEnabled: boolean;
}
