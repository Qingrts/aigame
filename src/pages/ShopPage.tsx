/**
 * 商店页面
 */

export function ShopPage() {
  return (
    <div className="min-h-screen bg-deep-space-900 text-white p-4">
      <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
        <h2 className="text-2xl font-bold mb-4 text-pink-400">🏪 商店</h2>
        <p className="text-gray-400 mb-4">商店系统 - 购买物品与升级</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">量子粒子</h3>
            <p className="text-sm text-gray-400">量子粒子购买功能开发中...</p>
          </div>
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">生活服务</h3>
            <p className="text-sm text-gray-400">生活服务购买功能开发中...</p>
          </div>
          <div className="bg-sci-fi-900/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">职业培训</h3>
            <p className="text-sm text-gray-400">职业培训购买功能开发中...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
