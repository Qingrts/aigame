/**
 * 研究状态管理
 */

import { create } from 'zustand';
import { Research, ResearchCategory } from '../types/game';
import { calculateDailyResearchXP, calculateTotalResearchCost } from '../utils/calculations';

interface ResearchStore {
  // 状态
  currentResearch: Research;
  researches: Research[];

  // 计算属性
  hourlyXP: number;
  dailyXP: number;
  currentXP: number;
  totalXP: number;
  progress: number;

  // 动作
  setCurrentResearch: (research: Research) => void;
  addResearchXP: (amount: number) => void;
  levelUp: () => void;
  addResearch: (research: Research) => void;
}

export const useResearchStore = create<ResearchStore>((set, get) => ({
  // 初始状态
  currentResearch: {
    id: 'research1',
    name: '研究概论',
    category: 'basic',
    level: 0,
    maxLevel: 100,
    effects: ['提升研究效率'],
    prerequisites: [],
    cost: { experience: 100 },
  },
  researches: [],

  // 计算属性
  get hourlyXP() {
    const { currentResearch } = get();
    return calculateHourlyResearchXP(currentResearch);
  },

  get dailyXP() {
    const { timeAllocation } = usePlayerStore.getState();
    const { currentResearch } = get();
    return calculateDailyResearchXP(currentResearch, {}, timeAllocation.research);
  },

  get currentXP() {
    return calculateTotalResearchCost(get().currentResearch.level);
  },

  get totalXP() {
    return calculateTotalResearchCost(get().currentResearch.level + 1);
  },

  get progress() {
    const { currentXP, totalXP } = get();
    return (currentXP / totalXP) * 100;
  },

  // 设置当前研究
  setCurrentResearch: (research: Research) => {
    set({ currentResearch: research });
  },

  // 添加研究经验
  addResearchXP: (amount: number) => {
    set((state) => ({
      currentResearch: {
        ...state.currentResearch,
        level: state.currentResearch.level + 1,
      },
    }));
  },

  // 升级研究
  levelUp: () => {
    set((state) => ({
      currentResearch: {
        ...state.currentResearch,
        level: state.currentResearch.level + 1,
      },
    }));
  },

  // 添加新研究
  addResearch: (research: Research) => {
    set((state) => ({
      researches: [...state.researches, research],
    }));
  },
}));

/**
 * 计算每小时研究经验
 */
function calculateHourlyResearchXP(research: Research): number {
  return 10; // 简化计算
}

/**
 * 计算每日研究经验
 */
function calculateDailyResearchXP(
  research: Research,
  attributes: any,
  hours: number
): number {
  return 10 * hours; // 简化计算
}

/**
 * 计算研究所需总经验
 */
function calculateTotalResearchCost(level: number): number {
  return 100 * Math.pow(1.5, level - 1);
}
