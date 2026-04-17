/**
 * 战斗页面
 */

export function CombatPage() {
  return (
    <div className="min-h-screen bg-deep-space-900 text-white p-4">
      <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
        <h2 className="text-2xl font-bold mb-4 text-red-400">⚔️ 战斗</h2>
        <p className="text-gray-400 mb-4">战斗系统 - 宇宙防御与怪物入侵</p>
        <div className="bg-sci-fi-900/50 rounded-lg p-4">
          <h3 className="font-bold mb-2">防御塔</h3>
          <p className="text-sm text-gray-400">轨道防御塔系统功能开发中...</p>
        </div>
        <div className="bg-sci-fi-900/50 rounded-lg p-4 mt-4">
          <h3 className="font-bold mb-2">怪物波次</h3>
          <p className="text-sm text-gray-400">怪物入侵系统功能开发中...</p>
        </div>
      </div>
    </div>
  );
}
