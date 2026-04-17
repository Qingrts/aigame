/**
 * 人生页面
 */

export function CareerPage() {
  return (
    <div className="min-h-screen bg-deep-space-900 text-white p-4">
      <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">🌟 人生</h2>
        <p className="text-gray-400 mb-4">职业系统 - 5大行业 50级职业路径</p>
        <div className="space-y-4">
          {['AI', '娱乐圈', '星空舰队', '科研', '运输'].map((industry) => (
            <div key={industry} className="bg-sci-fi-900/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold">{industry}</span>
                <span className="text-sm text-gray-400">等级 50</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
