/**
 * 存档系统 Hook
 * 处理自动保存和手动保存
 */

import { useEffect } from 'react';
import { useGameStore } from '../stores/game';
import { usePlayerStore } from '../stores/player';

export function useSave() {
  const { initialized, settings, saveGame } = useGameStore();
  const { player } = useGameStore();
  const { timeAllocation } = usePlayerStore.getState();

  useEffect(() => {
    if (!initialized || !player || !settings.autoSaveEnabled) {
      return;
    }

    // 获取所有必要的数据
    const playerState = {
      age: player.age,
      money: player.money,
      timeAllocation,
      attributes: player.attributes,
      career: player.career,
      researches: player.researches,
      lifeOptions: player.lifeOptions,
      hiredServices: player.hiredServices,
      buildings: player.buildings,
      isGameOver: player.isGameOver,
      gameOverReason: player.gameOverReason,
    };

    const permanentState = {
      totalReincarnations: 0,
      bestCareerLevel: 0,
      bestResearchLevel: 0,
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

    // 保存游戏
    saveGame(playerState, permanentState, settings);

  }, [initialized, settings.autoSaveEnabled, timeAllocation, saveGame]);
}

/**
 * 手动保存游戏
 */
export async function manualSave() {
  try {
    const gameStore = useGameStore.getState();
    const playerStore = usePlayerStore.getState();
    const careerStore = useCareerStore.getState();
    const researchStore = useResearchStore.getState();

    const playerState = {
      age: playerStore.age,
      money: playerStore.money,
      timeAllocation: playerStore.timeAllocation,
      attributes: playerStore.attributes,
      career: careerStore.career,
      researches: researchStore.researches,
      lifeOptions: [],
      hiredServices: [],
      buildings: [],
      isGameOver: false,
      gameOverReason: undefined,
    };

    const permanentState = {
      totalReincarnations: 0,
      bestCareerLevel: 0,
      bestResearchLevel: 0,
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

    await gameStore.saveGame(playerState, permanentState, gameStore.settings);
    console.log('手动保存成功');
  } catch (error) {
    console.error('手动保存失败:', error);
    throw error;
  }
}

/**
 * 检查自动保存是否启用
 */
export function checkAutoSave(settings: { autoSaveEnabled: boolean }): boolean {
  return settings.autoSaveEnabled;
}
