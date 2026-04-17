/**
 * 生活页面
 */

export function LifePage() {
  return (
    <div className="min-h-screen bg-deep-space-900 text-white p-4">
      <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
        <h2 className="text-2xl font-bold mb-4 text-green-400">🏠 生活</h2>
        <p className="text-gray-400 mb-4">生活系统 - 饮食、住宿、交通等</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">饮食</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <div className="bg-sci-fi-800/50 rounded-lg p-3 border border-sci-fi-600 hover:border-yellow-400 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-yellow-300">🍜 牛师傅牛肉面</h4>
                  <span className="text-xs bg-yellow-600/30 px-2 py-1 rounded">2</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>⏱️ 15分钟</div>
                  <div>💚 健康 +1</div>
                </div>
              </div>

              <div className="bg-sci-fi-800/50 rounded-lg p-3 border border-sci-fi-600 hover:border-blue-400 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-300">🍱 工作简餐</h4>
                  <span className="text-xs bg-blue-600/30 px-2 py-1 rounded">20</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>⏱️ 30分钟</div>
                  <div>💚 健康 +2</div>
                  <div>⚡ 精力 +5%</div>
                </div>
              </div>

              <div className="bg-sci-fi-800/50 rounded-lg p-3 border border-sci-fi-600 hover:border-purple-400 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-purple-300">🍱 饿不饿外卖</h4>
                  <span className="text-xs bg-purple-600/30 px-2 py-1 rounded">100</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>⏱️ 30分钟</div>
                  <div>⚡ 精力 +15%</div>
                </div>
              </div>

              <div className="bg-sci-fi-800/50 rounded-lg p-3 border border-sci-fi-600 hover:border-pink-400 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-pink-300">🍰 鲜花饼</h4>
                  <span className="text-xs bg-pink-600/30 px-2 py-1 rounded">200</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>⏱️ 15分钟</div>
                  <div>💚 健康 +4</div>
                  <div>⚡ 精力 +20%</div>
                </div>
              </div>

              <div className="bg-sci-fi-800/50 rounded-lg p-3 border border-sci-fi-600 hover:border-green-400 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-green-300">🍱 补贴简餐</h4>
                  <span className="text-xs bg-green-600/30 px-2 py-1 rounded">50</span>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>⏱️ 45分钟</div>
                  <div>💚 健康 +5</div>
                  <div>⚡ 精力 +30%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">住宿</h3>
            <p className="text-sm text-gray-400">住房系统功能开发中...</p>
          </div>
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">交通</h3>
            <p className="text-sm text-gray-400">交通系统功能开发中...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
