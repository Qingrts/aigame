/**
 * 轮回页面
 */

export function ReincarnationPage() {
  return (
    <div className="min-h-screen bg-deep-space-900 text-white p-4">
      <div className="bg-sci-fi-800/50 backdrop-blur-sm rounded-lg p-6 border border-sci-fi-700">
        <h2 className="text-2xl font-bold mb-4 text-sci-fi-300">💫 轮回</h2>
        <p className="text-gray-400 mb-4">
          达到100岁或选择主动轮回，结束当前人生并保留永久强化
        </p>
        <div className="bg-sci-fi-900/50 rounded-lg p-4 space-y-4">
          <div>
            <div className="text-sm text-gray-400">当前年龄</div>
            <div className="text-xl font-bold">50 岁</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">轮回次数</div>
            <div className="text-xl font-bold">0 次</div>
          </div>
        </div>
      </div>
    </div>
  );
}
