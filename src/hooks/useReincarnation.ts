/**
 * 轮回系统 Hook
 * 处理轮回逻辑和资源结算
 */

import { useState } from 'react';
import { useGameStore } from '../stores/game';
import { usePlayerStore } from '../stores/player';
import { useCareerStore } from '../stores/career';
import { useResearchStore } from '../stores/research';
import { calculateReincarnationResources } from '../types/constants';
import { manualSave } from './useSave';

export function useReincarnation() {
  const [reincarnating, setReincarnating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { setPlayer, setPermanent, saveGame } = useGameStore();
  const { age, money, attributes, career, timeAllocation } = usePlayerStore.getState();
  const { currentResearch } = useResearchStore.getState();
  const { currentCareer } = useCareerStore.getState();

  const handleReincarnate = async () => {
    try {
      setReincarnating(true);
      setShowConfirm(false);

      // 计算轮回资源
      const maxCareerLevel = Math.max(career.level, currentCareer?.level || 0);
      const maxResearchLevel = currentResearch.level;
      const resources = calculateReincarnationResources(maxCareerLevel, maxResearchLevel);

      // 保存当前状态
      await manualSave();

      // 创建新的人生
      const newPlayer = {
        age: 0,
        money: 0,
        timeAllocation: { sleep: 480, work: 480, research: 480 },
        attributes: { ...attributes },
        career: { ...career },
        researches: [],
        lifeOptions: [],
        hiredServices: [],
        buildings: [],
        isGameOver: false,
        gameOverReason: undefined,
      };

      // 保存永久状态（不增加轮回次数，因为这是新游戏）
      const newPermanent = {
        totalReincarnations: 0,
        bestCareerLevel: maxCareerLevel,
        bestResearchLevel: maxResearchLevel,
        totalTimeCrystals: 0,
        totalHighDimCores: 0,
        totalLifeCrystals: 0,
        techTree: {},
        transmigrators: [],
        transmigratorFragments: [],
        quantumParticles: [],
        sacredTimeline: {
          minerals: 0,
          starships: [],
          buildings: {},
        },
        civilizationStats: {
          hashValue: 0,
          cultureValue: 0,
        },
        globalAchievements: [],
      };

      // 更新游戏状态
      setPlayer(newPlayer);
      setPermanent(newPermanent);

      console.log('轮回成功！保留了:', {
        maxCareerLevel,
        maxResearchLevel,
        记忆因子: resources.记忆因子,
      });

      // 跳转到游戏开始
      window.location.reload();
    } catch (error) {
      console.error('轮回失败:', error);
      setReincarnating(false);
      setShowConfirm(true);
    }
  };

  const confirmReincarnate = () => {
    setShowConfirm(true);
  };

  const cancelReincarnate = () => {
    setShowConfirm(false);
  };

  return {
    reincarnating,
    showConfirm,
    handleReincarnate,
    confirmReincarnate,
    cancelReincarnate,
  };
}
