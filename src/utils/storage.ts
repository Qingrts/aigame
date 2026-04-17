/**
 * 游戏存档系统
 */

import localforage from 'localforage';
import { GameSave, PermanentState, PlayerState, GameSettings } from '../types/game';

const STORAGE_KEY = 'xingji_game_save';
const PERMANENT_KEY = 'xingji_game_permanent';

/**
 * 游戏保存管理类
 */
class StorageManager {
  private saveInterval: NodeJS.Timeout | null = null;

  /**
   * 保存游戏
   */
  async saveGame(saveData: GameSave): Promise<void> {
    try {
      await localforage.setItem(STORAGE_KEY, saveData);
      console.log('游戏已保存');
    } catch (error) {
      console.error('保存游戏失败:', error);
      throw error;
    }
  }

  /**
   * 加载游戏
   */
  async loadGame(): Promise<GameSave | null> {
    try {
      const saveData = await localforage.getItem<GameSave>(STORAGE_KEY);
      if (saveData) {
        console.log('游戏已加载');
      }
      return saveData;
    } catch (error) {
      console.error('加载游戏失败:', error);
      return null;
    }
  }

  /**
   * 删除存档
   */
  async deleteGame(): Promise<void> {
    try {
      await localforage.removeItem(STORAGE_KEY);
      await localforage.removeItem(PERMANENT_KEY);
      console.log('存档已删除');
    } catch (error) {
      console.error('删除存档失败:', error);
      throw error;
    }
  }

  /**
   * 保存永久状态
   */
  async savePermanentState(permState: PermanentState): Promise<void> {
    try {
      await localforage.setItem(PERMANENT_KEY, permState);
    } catch (error) {
      console.error('保存永久状态失败:', error);
      throw error;
    }
  }

  /**
   * 加载永久状态
   */
  async loadPermanentState(): Promise<PermanentState | null> {
    try {
      return await localforage.getItem<PermanentState>(PERMANENT_KEY);
    } catch (error) {
      console.error('加载永久状态失败:', error);
      return null;
    }
  }

  /**
   * 检查是否有存档
   */
  async hasSave(): Promise<boolean> {
    try {
      const data = await localforage.getItem(STORAGE_KEY);
      return data !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * 设置自动保存
   */
  setAutoSave(
    saveData: GameSave,
    intervalSeconds: number = 30,
    callback?: () => void
  ): void {
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
    }

    this.saveInterval = setInterval(async () => {
      try {
        await this.saveGame(saveData);
        callback?.();
      } catch (error) {
        console.error('自动保存失败:', error);
      }
    }, intervalSeconds * 1000);
  }

  /**
   * 停止自动保存
   */
  stopAutoSave(): void {
    if (this.saveInterval) {
      clearInterval(this.saveInterval);
      this.saveInterval = null;
    }
  }
}

export const storageManager = new StorageManager();
