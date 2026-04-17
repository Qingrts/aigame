/**
 * 职业状态管理
 */

import { create } from 'zustand';
import { Career, Industry } from '../types/game';
import { calculateDailyWorkIncome } from '../utils/calculations';

interface CareerStore {
  // 状态
  career: Career;
  currentIndustry: Industry;

  // 计算属性
  hourlyIncome: number;
  dailyIncome: number;

  // 动作
  setCareer: (career: Career) => void;
  setCurrentIndustry: (industry: Industry) => void;
  levelUp: () => void;
}

export const useCareerStore = create<CareerStore>((set, get) => ({
  // 初始状态
  career: {
    id: 'test1',
    name: '测试员工',
    industry: 'ai',
    level: 0,
    maxLevel: 100,
    baseIncome: 100,
    unlocked: true,
  },
  currentIndustry: 'ai',

  // 计算属性
  get hourlyIncome() {
    const { career, currentIndustry } = get();
    // 计算当前工作的时薪
    return calculateHourlyIncome(career, currentIndustry);
  },

  get dailyIncome() {
    const { timeAllocation } = usePlayerStore.getState();
    const { career, currentIndustry } = get();
    return calculateDailyWorkIncome(career, currentIndustry, timeAllocation.work);
  },

  // 设置职业
  setCareer: (career: Career) => {
    set({ career });
  },

  // 设置当前行业
  setCurrentIndustry: (industry: Industry) => {
    set({ currentIndustry: industry });
  },

  // 升级职业
  levelUp: () => {
    set((state) => ({
      career: {
        ...state.career,
        level: state.career.level + 1,
      },
    }));
  },
}));

/**
 * 计算时薪
 */
function calculateHourlyIncome(career: Career, industry: Industry): number {
  const 行业倍率 = 1.0; // 简化计算
  return career.baseIncome * 行业倍率;
}
