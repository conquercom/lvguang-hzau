import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown, Filter, Calendar } from 'lucide-react'
import Navbar from '../components/Navbar'

// 积分记录数据
const historyData = [
  { id: 1, type: 'earn', title: '拒绝一次性餐具', points: 5, time: '2024-12-02 12:30', icon: '🥢', status: 'success' },
  { id: 2, type: 'earn', title: '随手关灯', points: 3, time: '2024-12-02 10:15', icon: '💡', status: 'success' },
  { id: 3, type: 'spend', title: '兑换：免费打印额度', points: -100, time: '2024-12-01 16:45', icon: '🖨️', status: 'success' },
  { id: 4, type: 'earn', title: '绿色出行打卡', points: 8, time: '2024-12-01 09:00', icon: '🚲', status: 'success' },
  { id: 5, type: 'earn', title: '节约用水', points: 4, time: '2024-11-30 20:30', icon: '💧', status: 'pending' },
  { id: 6, type: 'earn', title: '发现能源浪费点', points: 10, time: '2024-11-30 14:20', icon: '🎯', status: 'success' },
  { id: 7, type: 'spend', title: '兑换：校车免费乘坐', points: -150, time: '2024-11-29 11:00', icon: '🚌', status: 'success' },
  { id: 8, type: 'earn', title: '参与环保活动', points: 15, time: '2024-11-28 15:30', icon: '🌳', status: 'success' },
  { id: 9, type: 'earn', title: '空调合理使用', points: 5, time: '2024-11-28 08:45', icon: '❄️', status: 'success' },
  { id: 10, type: 'deduct', title: '违规扣分：虚假打卡', points: -20, time: '2024-11-25 10:00', icon: '⚠️', status: 'penalty' },
  { id: 11, type: 'earn', title: '熄灯就寝', points: 3, time: '2024-11-27 22:45', icon: '🌙', status: 'success' },
  { id: 12, type: 'earn', title: '垃圾分类投放', points: 4, time: '2024-11-27 12:00', icon: '♻️', status: 'success' }
]

function PointsHistory({ user, onLogout }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all') // all, earn, spend

  const filteredHistory = filter === 'all' 
    ? historyData 
    : historyData.filter(item => {
        if (filter === 'earn') return item.type === 'earn'
        if (filter === 'spend') return item.type === 'spend' || item.type === 'deduct'
        return true
      })

  const totalEarned = historyData
    .filter(item => item.type === 'earn')
    .reduce((sum, item) => sum + item.points, 0)

  const totalSpent = historyData
    .filter(item => item.type === 'spend' || item.type === 'deduct')
    .reduce((sum, item) => sum + Math.abs(item.points), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-[800px] mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-green-primary">积分明细</h1>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-sm text-gray-500 mb-1">当前积分</p>
            <p className="text-2xl font-bold text-orange-accent">{user?.points || 1245}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-sm text-gray-500 mb-1">累计获得</p>
            <p className="text-2xl font-bold text-green-primary">+{totalEarned}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-sm text-gray-500 mb-1">累计消耗</p>
            <p className="text-2xl font-bold text-red-400">-{totalSpent}</p>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'all', label: '全部' },
            { key: 'earn', label: '获得' },
            { key: 'spend', label: '消耗' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                ${filter === item.key 
                  ? 'bg-green-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 记录列表 */}
        <div className="bg-white rounded-xl shadow-card-light overflow-hidden">
          {filteredHistory.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center gap-4 p-4 ${index !== 0 && 'border-t border-gray-100'}`}
            >
              {/* 图标 */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl
                ${item.type === 'earn' ? 'bg-green-100' : 
                  item.type === 'deduct' ? 'bg-red-100' : 'bg-orange-100'}`}>
                {item.icon}
              </div>

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-800 truncate">{item.title}</p>
                  {item.status === 'pending' && (
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded">
                      审核中
                    </span>
                  )}
                  {item.status === 'penalty' && (
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                      违规扣分
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>

              {/* 积分变化 */}
              <div className={`font-bold text-lg
                ${item.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.points > 0 ? '+' : ''}{item.points}
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              暂无记录
            </div>
          )}
        </div>

        {/* 提示 */}
        <p className="text-center text-xs text-gray-400 mt-4">
          仅显示最近30天的积分记录
        </p>
      </div>
    </div>
  )
}

export default PointsHistory
