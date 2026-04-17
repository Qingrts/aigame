/**
 * 游戏循环 Hook
 * 使用 requestAnimationFrame 实现游戏时间流逝
 */

import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/game';
import { usePlayerStore } from '../stores/player';
import { useCareerStore } from '../stores/career';
import { useResearchStore } from '../stores/research';

export function useGameLoop(intervalMs: number = 1000) {
  const lastTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    const player = usePlayerStore.getState();
    const career = useCareerStore.getState();
    const research = useResearchStore.getState();

    // 检查游戏是否应该进行
    if (player.age <= 0 || player.money <= 0) {
      console.log('游戏尚未开始');
      return;
    }

    // 检查是否有足够的时间用于工作/研究
    const { timeAllocation } = player;
    if (timeAllocation.work <= 0 && timeAllocation.research <= 0) {
      console.log('没有分配工作或研究时间');
      return;
    }

    const gameLoop = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
        return;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      accumulatedTimeRef.current += deltaTime;

      // 当累积时间超过间隔时，执行更新
      while (accumulatedTimeRef.current >= intervalMs) {
        accumulatedTimeRef.current -= intervalMs;

        // 更新年龄
        const newAge = player.age + 1;
        usePlayerStore.getState().setAge(newAge);

        // 根据时间分配计算收益
        if (timeAllocation.work > 0 && newAge <= 50) {
          // 黑奴期：工作赚钱
          const dailyIncome = career.dailyIncome;
          usePlayerStore.getState().addMoney(dailyIncome);
        }

        if (timeAllocation.research > 0) {
          // 研究获得经验
          const dailyXP = research.dailyXP;
          research.addResearchXP(dailyXP);
        }
      }

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    return () => {
      lastTimeRef.current = 0;
      accumulatedTimeRef.current = 0;
    };
  }, [intervalMs]);
}
