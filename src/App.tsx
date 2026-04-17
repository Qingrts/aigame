/**
 * 主游戏组件
 */

import { useEffect, useState } from 'react';
import { useGameStore } from './stores/game';
import { usePlayerStore } from './stores/player';
import { useGameLoop } from './hooks/useGameLoop';
import { useSave } from './hooks/useSave';
import { Button } from './components/common/Button';
import { TabBar } from './components/layout/TabBar';
import { ReincarnationPage } from './pages/ReincarnationPage';
import { LifePage } from './pages/LifePage';
import { CareerPage } from './pages/CareerPage';
import { CombatPage } from './pages/CombatPage';
import { DeepSpacePage } from './pages/DeepSpacePage';
import { CollectionPage } from './pages/CollectionPage';
import { ShopPage } from './pages/ShopPage';
import { formatMoney, formatAge } from './utils/calculations';
import './index.css';

const PAGE_COMPONENTS: Record<string, JSX.Element> = {
  reincarnation: <ReincarnationPage />,
  life: <LifePage />,
  career: <CareerPage />,
  combat: <CombatPage />,
  deepspace: <DeepSpacePage />,
  collection: <CollectionPage />,
  shop: <ShopPage />,
};

function App() {
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('career');
  const { initialized, loading: gameLoading, initialize, loadSave, settings } = useGameStore();
  const { age, money, attributes, timeAllocation } = usePlayerStore.getState();

  // 初始化游戏
  useEffect(() => {
    async function initGame() {
      try {
        setLoading(true);
        const saveData = await loadSave();
        await initialize(saveData);
      } catch (error) {
        console.error('初始化游戏失败:', error);
        // 创建新游戏
        await initialize(null);
      } finally {
        setLoading(false);
      }
    }

    initGame();
  }, [initialize, loadSave]);

  // 启动游戏循环
  useGameLoop(1000); // 每秒更新

  // 启用自动保存
  useSave();

  if (loading || gameLoading) {
    return (
      <div className="min-h-screen bg-deep-space-900 flex items-center justify-center">
        <div className="text-center text-sci-fi-400">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-lg">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-space-900 text-white pb-20">
      {/* 顶部状态栏 */}
      <header className="bg-sci-fi-900/80 backdrop-blur-sm border-b border-sci-fi-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sci-fi-400 to-sci-fi-200 bg-clip-text text-transparent">
              群星降临
            </h1>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-sci-fi-400">🌍</span>
                <span>{formatAge(age)}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400">💰</span>
                <span>{formatMoney(money)}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sci-fi-400">🔋</span>
                <span>精力: {attributes.health > 100 ? attributes.health : 10}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主游戏区域 - 仅在主页显示 */}
      {currentTab === 'career' && (
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧面板 */}
          <div className="space-y-6">
            {/* 时间分配 */}
            <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
              <h2 className="text-xl font-bold mb-4 text-sci-fi-300">时间分配</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-sm mb-2">
                    <span>睡眠</span>
                    <span>{(timeAllocation.sleep / 60).toFixed(0)}小时</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1440"
                    step="15"
                    value={timeAllocation.sleep}
                    onChange={(e) => {
                      const sleep = Math.min(1440, Math.max(0, parseInt(e.target.value)));
                      const currentResearch = timeAllocation.research;
                      const work = Math.max(0, Math.min(1440, 1440 - sleep - currentResearch));
                      usePlayerStore.setState({
                        timeAllocation: {
                          ...timeAllocation,
                          sleep,
                          research: currentResearch,
                          work,
                        },
                      });
                    }}
                    className="w-full h-2 bg-sci-fi-700 rounded-lg appearance-none cursor-pointer accent-sci-fi-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm mb-2">
                    <span>工作</span>
                    <span>{(timeAllocation.work / 60).toFixed(0)}小时</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1440"
                    step="15"
                    value={timeAllocation.work}
                    onChange={(e) => {
                      const work = Math.min(1440, Math.max(0, parseInt(e.target.value)));
                      const currentResearch = timeAllocation.research;
                      const sleep = Math.max(0, Math.min(1440, 1440 - work - currentResearch));
                      usePlayerStore.setState({
                        timeAllocation: {
                          ...timeAllocation,
                          work,
                          research: currentResearch,
                          sleep,
                        },
                      });
                    }}
                    className="w-full h-2 bg-sci-fi-700 rounded-lg appearance-none cursor-pointer accent-sci-fi-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm mb-2">
                    <span>研究</span>
                    <span>{(timeAllocation.research / 60).toFixed(0)}小时</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1440"
                    step="15"
                    value={timeAllocation.research}
                    onChange={(e) => {
                      const research = Math.min(1440, Math.max(0, parseInt(e.target.value)));
                      const currentSleep = timeAllocation.sleep;
                      const work = Math.max(0, Math.min(1440, 1440 - research - currentSleep));
                      usePlayerStore.setState({
                        timeAllocation: {
                          ...timeAllocation,
                          research,
                          sleep: currentSleep,
                          work,
                        },
                      });
                    }}
                    className="w-full h-2 bg-sci-fi-700 rounded-lg appearance-none cursor-pointer accent-sci-fi-500"
                  />
                </div>
              </div>
            </div>

            {/* 属性面板 */}
            <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
              <h2 className="text-xl font-bold mb-4 text-sci-fi-300">六维属性</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>心态:</span>
                  <span>{attributes.mindset}</span>
                </div>
                <div className="flex justify-between">
                  <span>健康:</span>
                  <span>{attributes.health}</span>
                </div>
                <div className="flex justify-between">
                  <span>智商:</span>
                  <span>{attributes.iq}</span>
                </div>
                <div className="flex justify-between">
                  <span>情商:</span>
                  <span>{attributes.eq}</span>
                </div>
                <div className="flex justify-between">
                  <span>创意:</span>
                  <span>{attributes.creativity}</span>
                </div>
                <div className="flex justify-between">
                  <span>运气:</span>
                  <span>{attributes.luck}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧面板 */}
          <div className="space-y-6">
            {/* 职业 */}
            <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
              <h2 className="text-xl font-bold mb-4 text-sci-fi-300">职业</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-sm mb-2">
                    <span>当前职业</span>
                    <span>等级 {age <= 50 ? age : 50}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={age <= 50 ? age : 50}
                    disabled={age > 50}
                    onChange={(e) => {
                      if (age <= 50) {
                        usePlayerStore.setState({
                          age: parseInt(e.target.value),
                        });
                      }
                    }}
                    className="w-full h-2 bg-sci-fi-700 rounded-lg appearance-none cursor-pointer accent-sci-fi-500 disabled:opacity-50"
                  />
                </div>

                <div className="bg-sci-fi-900/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">时薪收入</div>
                  <div className="text-xl font-bold text-yellow-400">
                    {formatMoney(100)} / 小时
                  </div>
                </div>
              </div>
            </div>

            {/* 研究 */}
            <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
              <h2 className="text-xl font-bold mb-4 text-sci-fi-300">研究</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-sm mb-2">
                    <span>当前研究</span>
                    <span>等级 {age <= 50 ? age : 50}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={age <= 50 ? age : 50}
                    disabled={age > 50}
                    onChange={(e) => {
                      if (age <= 50) {
                        usePlayerStore.setState({
                          age: parseInt(e.target.value),
                        });
                      }
                    }}
                    className="w-full h-2 bg-sci-fi-700 rounded-lg appearance-none cursor-pointer accent-sci-fi-500 disabled:opacity-50"
                  />
                </div>

                <div className="bg-sci-fi-900/50 rounded-lg p-4">
                  <div className="text-sm text-gray-400">每小时经验</div>
                  <div className="text-xl font-bold text-sci-fi-400">
                    {10} XP / 小时
                  </div>
                </div>
              </div>
            </div>

            {/* 轮回 */}
            <div className="bg-gradient-to-br from-sci-fi-800 to-sci-fi-900/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-600">
              <h2 className="text-xl font-bold mb-4 text-sci-fi-300">轮回</h2>
              <p className="text-sm text-gray-400 mb-4">
                达到100岁或选择主动轮回，结束当前人生并保留永久强化
              </p>
              <Button variant="primary" onClick={() => setCurrentTab('reincarnation')}>
                💫 开始轮回
              </Button>
            </div>
          </div>
        </div>
        </main>
      )}

      {/* 页面内容 */}
      {PAGE_COMPONENTS[currentTab]}

      {/* 底部导航栏 */}
      <TabBar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* 底部信息 */}
      <footer className="fixed bottom-20 left-0 right-0 bg-sci-fi-900/50 border-t border-sci-fi-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>游戏版本: 1.0.0 | 按回车键重新开始</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
