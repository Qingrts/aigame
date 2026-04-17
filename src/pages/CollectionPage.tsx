/**
 * 收集页面
 */

export function CollectionPage() {
  return (
    <div className="min-h-screen bg-deep-space-900 text-white p-4">
      <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">📦 收集</h2>
        <p className="text-gray-400 mb-4">收集系统 - 碎片与成就</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">量子碎片</h3>
            <p className="text-sm text-gray-400">穿越者碎片收集功能开发中...</p>
          </div>
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">成就</h3>
            <p className="text-sm text-gray-400">成就系统功能开发中...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
