import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Zap, Droplet, Leaf, Bike, Calendar } from 'lucide-react'
import Navbar from '../components/Navbar'

// 模拟统计数据
const monthlyData = [
  { month: '7月', energy: 12, water: 0.2, carbon: 8, travel: 25 },
  { month: '8月', energy: 18, water: 0.3, carbon: 12, travel: 35 },
  { month: '9月', energy: 25, water: 0.4, carbon: 18, travel: 42 },
  { month: '10月', energy: 32, water: 0.5, carbon: 24, travel: 55 },
  { month: '11月', energy: 45, water: 0.7, carbon: 32, travel: 68 },
  { month: '12月', energy: 20, water: 0.3, carbon: 15, travel: 30 }
]

const taskDistribution = [
  { name: '节能', count: 45, color: 'bg-yellow-400', percentage: 35 },
  { name: '节水', count: 28, color: 'bg-blue-400', percentage: 22 },
  { name: '减废', count: 32, color: 'bg-green-400', percentage: 25 },
  { name: '绿色出行', count: 15, color: 'bg-teal-400', percentage: 12 },
  { name: '其他', count: 8, color: 'bg-gray-400', percentage: 6 }
]

const weeklyTrend = [
  { day: '周一', points: 15 },
  { day: '周二', points: 22 },
  { day: '周三', points: 18 },
  { day: '周四', points: 28 },
  { day: '周五', points: 35 },
  { day: '周六', points: 42 },
  { day: '周日', points: 25 }
]

function Statistics({ user, onLogout }) {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('month')

  const totalStats = {
    energy: 152.3,
    water: 2.8,
    carbon: 89.5,
    travel: 234
  }

  const maxWeeklyPoints = Math.max(...weeklyTrend.map(d => d.points))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-[1000px] mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/home')}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-green-primary flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              环保数据统计
            </h1>
          </div>
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {['week', 'month', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded text-sm transition-colors
                  ${timeRange === range ? 'bg-green-primary text-white' : 'text-gray-600'}`}
              >
                {range === 'week' ? '本周' : range === 'month' ? '本月' : '本年'}
              </button>
            ))}
          </div>
        </div>

        {/* 累计成果卡片 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-card-light">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-gray-500 text-sm">节省电量</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalStats.energy}</p>
            <p className="text-sm text-gray-400 mt-1">度</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-card-light">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-gray-500 text-sm">节约用水</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalStats.water}</p>
            <p className="text-sm text-gray-400 mt-1">吨</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-card-light">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-gray-500 text-sm">减少碳排</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalStats.carbon}</p>
            <p className="text-sm text-gray-400 mt-1">kg CO₂</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-card-light">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Bike className="w-5 h-5 text-teal-500" />
              </div>
              <span className="text-gray-500 text-sm">绿色出行</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{totalStats.travel}</p>
            <p className="text-sm text-gray-400 mt-1">公里</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 每周积分趋势 */}
          <div className="bg-white rounded-xl p-5 shadow-card-light">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-primary" />
              本周积分趋势
            </h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklyTrend.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-500">{item.points}</span>
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:from-green-600 hover:to-green-500"
                    style={{ height: `${(item.points / maxWeeklyPoints) * 100}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-gray-500">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 任务分布 */}
          <div className="bg-white rounded-xl p-5 shadow-card-light">
            <h3 className="font-semibold text-gray-800 mb-4">任务类型分布</h3>
            
            {/* 环形图模拟 */}
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  {taskDistribution.reduce((acc, item, index) => {
                    const prevTotal = taskDistribution.slice(0, index).reduce((sum, i) => sum + i.percentage, 0)
                    const colors = ['#facc15', '#60a5fa', '#4ade80', '#2dd4bf', '#9ca3af']
                    acc.push(
                      <circle
                        key={index}
                        cx="64"
                        cy="64"
                        r="50"
                        fill="none"
                        stroke={colors[index]}
                        strokeWidth="20"
                        strokeDasharray={`${item.percentage * 3.14} 314`}
                        strokeDashoffset={`-${prevTotal * 3.14}`}
                      />
                    )
                    return acc
                  }, [])}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">128</p>
                    <p className="text-xs text-gray-500">总任务</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {taskDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{item.count}次</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 月度趋势 */}
          <div className="bg-white rounded-xl p-5 shadow-card-light lg:col-span-2">
            <h3 className="font-semibold text-gray-800 mb-4">月度环保成果趋势</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-gray-500 font-medium">月份</th>
                    <th className="text-right py-3 text-gray-500 font-medium">节电(度)</th>
                    <th className="text-right py-3 text-gray-500 font-medium">节水(吨)</th>
                    <th className="text-right py-3 text-gray-500 font-medium">减碳(kg)</th>
                    <th className="text-right py-3 text-gray-500 font-medium">出行(km)</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-800">{item.month}</td>
                      <td className="py-3 text-right text-yellow-600">{item.energy}</td>
                      <td className="py-3 text-right text-blue-600">{item.water}</td>
                      <td className="py-3 text-right text-green-600">{item.carbon}</td>
                      <td className="py-3 text-right text-teal-600">{item.travel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 环保等效 */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mt-6 text-white">
          <h3 className="font-semibold mb-4">您的环保贡献相当于</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl mb-1">🌳</p>
              <p className="text-2xl font-bold">4.5</p>
              <p className="text-sm text-white/80">棵树一年吸碳量</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl mb-1">🚗</p>
              <p className="text-2xl font-bold">358</p>
              <p className="text-sm text-white/80">公里汽车碳排放</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl mb-1">💡</p>
              <p className="text-2xl font-bold">507</p>
              <p className="text-sm text-white/80">小时LED灯照明</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl mb-1">🏠</p>
              <p className="text-2xl font-bold">14</p>
              <p className="text-sm text-white/80">天家庭用水量</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
