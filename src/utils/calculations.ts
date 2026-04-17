/**
 * 游戏计算工具函数
 */

import {
  Attributes,
  AttributeBonus,
  Career,
  Research,
  TimeAllocation,
} from '../types/game';
import {
  calculateIncome,
  calculateResearchXP,
  calculateAttributeBonuses,
  calculateResearchCost,
} from '../types/constants';

/**
 * 计算属性加成
 */
export function getAttributeBonuses(attributes: Attributes): AttributeBonus {
  return calculateAttributeBonuses(attributes);
}

/**
 * 计算当前工作的总收入（每小时）
 */
export function calculateHourlyIncome(
  career: Career,
  attributes: Attributes
): number {
  return calculateIncome(career, attributes);
}

/**
 * 计算每小时研究经验
 */
export function calculateHourlyResearchXP(
  research: Research,
  attributes: Attributes
): number {
  return calculateResearchXP(research, attributes);
}

/**
 * 计算每日工作收入
 */
export function calculateDailyWorkIncome(
  career: Career,
  attributes: Attributes,
  minutes: number
): number {
  return calculateHourlyIncome(career, attributes) * (minutes / 60);
}

/**
 * 计算每日研究经验
 */
export function calculateDailyResearchXP(
  research: Research,
  attributes: Attributes,
  minutes: number
): number {
  return calculateHourlyResearchXP(research, attributes) * (minutes / 60);
}

/**
 * 计算研究所需总经验
 */
export function calculateTotalResearchCost(level: number): number {
  return calculateResearchCost(level);
}

/**
 * 计算研究进度百分比
 */
export function calculateResearchProgress(
  currentLevel: number,
  xp: number
): number {
  const requiredXP = calculateTotalResearchCost(currentLevel + 1);
  const currentXP = calculateTotalResearchCost(currentLevel);
  const progress = xp - currentXP;
  return Math.min(100, Math.max(0, (progress / (requiredXP - currentXP)) * 100));
}

/**
 * 格式化货币显示
 */
export function formatMoney(amount: number): string {
  if (amount >= 100000000) {
    return (amount / 100000000).toFixed(2) + '亿';
  }
  if (amount >= 10000) {
    return (amount / 10000).toFixed(2) + '万';
  }
  return Math.floor(amount).toLocaleString();
}

/**
 * 格式化时间显示
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}小时${minutes}分钟`;
  }
  return `${minutes}分钟`;
}

/**
 * 格式化年龄显示
 */
export function formatAge(age: number): string {
  if (age < 100) {
    return `${age}岁`;
  }
  return `${Math.floor(age / 100)}岁${age % 100}个月`;
}

/**
 * 格式化百分比显示
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * 计算游戏速度（游戏时间流逝速度）
 * 默认为1倍速
 */
export function calculateGameSpeed(timeAllocation: TimeAllocation): number {
  // 基础速度：每秒
  // 实际计算会在游戏循环中实现
  return 1;
}
