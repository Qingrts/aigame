/**
 * 底部导航栏组件
 */

import { cn } from '../../utils/cn';

interface Tab {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const tabs: Tab[] = [
  { id: 'reincarnation', name: '轮回', icon: '💫', color: 'text-purple-400' },
  { id: 'life', name: '生活', icon: '🏠', color: 'text-green-400' },
  { id: 'career', name: '人生', icon: '🌟', color: 'text-blue-400' },
  { id: 'combat', name: '战斗', icon: '⚔️', color: 'text-red-400' },
  { id: 'deepspace', name: '深空', icon: '🌌', color: 'text-indigo-400' },
  { id: 'collection', name: '收集', icon: '📦', color: 'text-yellow-400' },
  { id: 'shop', name: '商店', icon: '🏪', color: 'text-pink-400' },
];

interface TabBarProps {
  currentTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabBar({ currentTab, onTabChange }: TabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-sci-fi-900/95 backdrop-blur-md border-t border-sci-fi-700 z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-2 px-4 rounded-lg transition-all duration-200',
                currentTab === tab.id
                  ? 'bg-sci-fi-800 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              )}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
