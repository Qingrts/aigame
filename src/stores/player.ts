/**
 * 玩家状态管理
 */

import { create } from 'zustand';
import { PlayerState, Attributes, TimeAllocation } from '../types/game';

interface PlayerStore {
  // 状态
  age: number;
  money: number;
  timeAllocation: TimeAllocation;
  attributes: Attributes;

  // 计算属性
  精力: number;
  研究加成: number;
  工作加成: number;

  // 动作
  setAge: (age: number) => void;
  setMoney: (money: number) => void;
  setTimeAllocation: (allocation: TimeAllocation) => void;
  setAttribute: (key: keyof Attributes, value: number) => void;
  incrementAge: () => void;
  addMoney: (amount: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // 初始状态
  age: 0,
  money: 0,
  timeAllocation: { sleep: 480, work: 480, research: 480 },
  attributes: {
    mindset: 10,
    health: 10,
    iq: 10,
    eq: 10,
    creativity: 10,
    luck: 10,
  },

  // 计算属性
  get 精力() {
    const { attributes } = get();
    return calculateTotalEnergy(attributes);
  },

  get 研究加成() {
    const { attributes } = get();
    const bonuses = getAttributeBonuses(attributes);
    return bonuses.研究加成;
  },

  get 工作加成() {
    const { attributes } = get();
    const bonuses = getAttributeBonuses(attributes);
    return bonuses.工作加成;
  },

  // 设置年龄
  setAge: (age: number) => {
    set({ age: Math.max(0, Math.floor(age)) });
  },

  // 设置金钱
  setMoney: (money: number) => {
    set({ money: Math.max(0, Math.floor(money)) });
  },

  // 设置时间分配
  setTimeAllocation: (allocation: TimeAllocation) => {
    set({ timeAllocation: allocation });
  },

  // 设置属性
  setAttribute: (key: keyof Attributes, value: number) => {
    const { attributes } = get();
    set({
      attributes: {
        ...attributes,
        [key]: Math.max(0, Math.floor(value)),
      },
    });
  },

  // 增加年龄
  incrementAge: () => {
    set((state) => ({
      age: state.age + 1,
    }));
  },

  // 增加金钱
  addMoney: (amount: number) => {
    set((state) => ({
      money: state.money + amount,
    }));
  },
}));

/**
 * 计算总精力
 */
function calculateTotalEnergy(attributes: Attributes): number {
  const 基础精力 = 1 + Math.max(0, attributes.health - 100) * 0.0001;
  const 心态加成 = Math.max(0, attributes.mindset - 100) * 0.005;
  return 基础精力 * (1 + 心态加成);
}

/**
 * 获取属性加成
 */
function getAttributeBonuses(attributes: Attributes) {
  const 心态加成 = Math.max(0, attributes.mindset - 100) * 0.005;
  const 健康加成 = Math.max(0, attributes.health - 100) * 0.0001;
  const 智商加成 = Math.max(0, attributes.iq - 100) * 0.01;
  const 情商加成 = Math.max(0, attributes.eq - 100) * 0.01;
  const 创意减免 = Math.max(0, attributes.creativity - 100) * 0.001;
  const 运气加成 = Math.max(0, attributes.luck - 100) * 0.001;

  return {
    精力: 1 + 心态加成,
    研究加成: 1 + 智商加成,
    工作加成: 1 + 情商加成,
    经验减免: 1 - 创意减免,
    掉率加成: 1 + 运气加成,
  };
}
