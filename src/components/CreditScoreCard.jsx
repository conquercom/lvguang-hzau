import { Shield, AlertTriangle, CheckCircle, Info, TrendingUp, TrendingDown } from 'lucide-react'

function CreditScoreCard({ creditScore = 98 }) {
  const getScoreLevel = () => {
    if (creditScore >= 90) return { level: '优秀', color: 'text-green-500', bg: 'bg-green-500' }
    if (creditScore >= 70) return { level: '良好', color: 'text-blue-500', bg: 'bg-blue-500' }
    if (creditScore >= 50) return { level: '一般', color: 'text-yellow-500', bg: 'bg-yellow-500' }
    return { level: '较差', color: 'text-red-500', bg: 'bg-red-500' }
  }

  const scoreInfo = getScoreLevel()

  const privileges = [
    { score: 90, name: '优先兑换权', desc: '热门奖励优先兑换', unlocked: creditScore >= 90 },
    { score: 80, name: '高额任务', desc: '解锁高积分特殊任务', unlocked: creditScore >= 80 },
    { score: 70, name: '正常使用', desc: '正常使用所有功能', unlocked: creditScore >= 70 },
    { score: 50, name: '基础功能', desc: '仅可使用基础打卡', unlocked: creditScore >= 50 }
  ]

  const recentRecords = [
    { type: 'positive', event: '连续打卡7天', change: '+2', time: '3天前' },
    { type: 'positive', event: '任务审核通过率100%', change: '+1', time: '1周前' },
    { type: 'warning', event: '照片模糊警告', change: '0', time: '2周前' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-card-light overflow-hidden">
      {/* 头部 - 信誉分展示 */}
      <div className="bg-gradient-to-r from-green-primary to-green-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <p className="text-white/80 text-sm">我的信誉分</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{creditScore}</span>
                <span className="text-white/70">/100</span>
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full ${scoreInfo.bg} bg-opacity-30`}>
            <span className="font-medium">{scoreInfo.level}</span>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mt-4">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-1000"
              style={{ width: `${creditScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span>0</span>
            <span>50</span>
            <span>70</span>
            <span>90</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* 权益等级 */}
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          信誉等级权益
        </h3>
        <div className="space-y-2">
          {privileges.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                item.unlocked ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.unlocked ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                <div>
                  <p className={`font-medium ${item.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
              <span className={`text-sm ${item.unlocked ? 'text-green-500' : 'text-gray-400'}`}>
                ≥{item.score}分
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 信誉变动记录 */}
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">近期变动</h3>
        <div className="space-y-3">
          {recentRecords.map((record, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {record.type === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : record.type === 'negative' ? (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                )}
                <div>
                  <p className="text-sm text-gray-700">{record.event}</p>
                  <p className="text-xs text-gray-400">{record.time}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${
                record.change.startsWith('+') ? 'text-green-500' : 
                record.change.startsWith('-') ? 'text-red-500' : 'text-gray-400'
              }`}>
                {record.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 防作弊提示 */}
      <div className="p-5 bg-orange-50">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-orange-800 mb-1">防作弊机制说明</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• 所有打卡照片将进行 AI 智能识别验证</li>
              <li>• 照片自动添加时间、位置水印防止盗用</li>
              <li>• 重复提交相似照片将被系统标记</li>
              <li>• 虚假打卡将扣除 10-20 信誉分</li>
              <li>• 信誉分低于 50 将限制功能使用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditScoreCard
