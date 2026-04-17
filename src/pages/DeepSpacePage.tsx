/**
 * 深空页面
 */

export function DeepSpacePage() {
  return (
    <div className="min-h-screen bg-deep-space-900 text-white p-4">
      <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">🌌 深空</h2>
        <p className="text-gray-400 mb-4">深空探索 - 星系航行与发现</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">星舰</h3>
            <p className="text-sm text-gray-400">星舰系统功能开发中...</p>
          </div>
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">轨道建筑</h3>
            <p className="text-sm text-gray-400">轨道建筑系统功能开发中...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
