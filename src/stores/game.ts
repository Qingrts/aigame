/**
 * 游戏全局状态管理
 */

import { create } from 'zustand';
import { PlayerState, PermanentState, GameSave } from '../types/game';
import { storageManager } from '../utils/storage';

interface GameState {
  // 状态
  initialized: boolean;
  loading: boolean;
  saving: boolean;
  player: PlayerState | null;
  permanent: PermanentState | null;
  settings: GameSave['settings'];

  // 动作
  initialize: (saveData: GameSave | null) => Promise<void>;
  loadSave: () => Promise<void>;
  saveGame: (player: PlayerState, permanent: PermanentState, settings: GameSave['settings']) => Promise<void>;
  setPlayer: (player: PlayerState) => void;
  setPermanent: (permanent: PermanentState) => void;
  setSettings: (settings: GameSave['settings']) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // 初始状态
  initialized: false,
  loading: false,
  saving: false,
  player: null,
  permanent: null,
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    autosaveInterval: 30,
    autoSaveEnabled: true,
  },

  // 初始化游戏
  initialize: async (saveData: GameSave | null) => {
    set({ loading: true });

    try {
      if (saveData) {
        // 加载已有存档
        set({
          player: saveData.player,
          permanent: saveData.permanent,
          settings: saveData.settings,
          initialized: true,
          loading: false,
        });

        console.log('游戏初始化完成', {
          age: saveData.player.age,
          money: saveData.player.money,
          reincarnations: saveData.permanent.totalReincarnations,
        });
      } else {
        // 创建新游戏
        const newGame: GameSave = {
          version: '1.0.0',
          lastSaveTime: Date.now(),
          player: {
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
            career: {
              id: 'test1',
              name: '测试员工',
              industry: 'ai',
              level: 0,
              maxLevel: 100,
              baseIncome: 100,
              unlocked: true,
            },
            researches: [],
            lifeOptions: [],
            hiredServices: [],
            buildings: [],
            isGameOver: false,
          },
          permanent: {
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
            sacredTimeline: { minerals: 0, starships: [], buildings: {} },
            civilizationStats: { hashValue: 0, cultureValue: 0 },
            globalAchievements: [],
          },
          settings: {
            soundEnabled: true,
            musicEnabled: true,
            autosaveInterval: 30,
            autoSaveEnabled: true,
          },
        };

        const saved = await storageManager.saveGame(newGame);
        if (!saved) {
          throw new Error('保存游戏失败');
        }

        set({
          player: newGame.player,
          permanent: newGame.permanent,
          settings: newGame.settings,
          initialized: true,
          loading: false,
        });

        console.log('新游戏创建完成');
      }
    } catch (error) {
      console.error('初始化游戏失败:', error);
      set({ loading: false });
      throw error;
    }
  },

  // 加载存档
  loadSave: async () => {
    set({ loading: true });
    try {
      const saveData = await storageManager.loadGame();
      if (saveData) {
        set({
          player: saveData.player,
          permanent: saveData.permanent,
          settings: saveData.settings,
          initialized: true,
          loading: false,
        });
      } else {
        set({ loading: false });
        throw new Error('未找到存档');
      }
    } catch (error) {
      console.error('加载存档失败:', error);
      set({ loading: false });
      throw error;
    }
  },

  // 保存游戏
  saveGame: async (player: PlayerState, permanent: PermanentState, settings: GameSave['settings']) => {
    set({ saving: true });
    try {
      const saveData: GameSave = {
        version: '1.0.0',
        lastSaveTime: Date.now(),
        player,
        permanent,
        settings,
      };

      await storageManager.saveGame(saveData);
      set({
        player,
        permanent,
        settings,
        saving: false,
      });
    } catch (error) {
      console.error('保存游戏失败:', error);
      set({ saving: false });
      throw error;
    }
  },

  // 设置玩家状态
  setPlayer: (player: PlayerState) => {
    set({ player });
  },

  // 设置永久状态
  setPermanent: (permanent: PermanentState) => {
    set({ permanent });
  },

  // 设置设置
  setSettings: (settings: GameSave['settings']) => {
    set({ settings });
  },

  // 重置游戏
  resetGame: () => {
    if (confirm('确定要重置游戏吗？这将清除所有进度。')) {
      set({
        player: null,
        permanent: null,
        initialized: false,
      });
    }
  },
}));
