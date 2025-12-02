import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Flame, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'

// 模拟打卡数据
const checkinData = {
  '2024-12-01': [{ task: '拒绝一次性餐具', icon: '🥢', points: 5 }],
  '2024-12-02': [
    { task: '随手关灯', icon: '💡', points: 3 },
    { task: '绿色出行', icon: '🚲', points: 8 }
  ],
  '2024-11-30': [{ task: '节约用水', icon: '💧', points: 4 }],
  '2024-11-29': [{ task: '熄灯就寝', icon: '🌙', points: 3 }],
  '2024-11-28': [
    { task: '参与环保活动', icon: '🌳', points: 15 },
    { task: '空调合理使用', icon: '❄️', points: 5 }
  ],
  '2024-11-27': [{ task: '垃圾分类', icon: '♻️', points: 4 }],
  '2024-11-26': [{ task: '拒绝一次性餐具', icon: '🥢', points: 5 }],
  '2024-11-25': [{ task: '随手关灯', icon: '💡', points: 3 }],
  '2024-11-24': [{ task: '绿色出行', icon: '🚲', points: 8 }],
  '2024-11-23': [{ task: '节约用水', icon: '💧', points: 4 }],
  '2024-11-22': [{ task: '熄灯就寝', icon: '🌙', points: 3 }],
  '2024-11-21': [{ task: '拒绝一次性餐具', icon: '🥢', points: 5 }]
}

function Calendar({ user, onLogout }) {
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getCheckinStatus = (day) => {
    const dateStr = formatDate(day)
    return checkinData[dateStr] || null
  }

  const calculateStreak = () => {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      if (checkinData[dateStr]) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  }

  const monthlyStats = () => {
    let totalDays = 0
    let totalPoints = 0
    for (let day = 1; day <= daysInMonth; day++) {
      const data = getCheckinStatus(day)
      if (data) {
        totalDays++
        totalPoints += data.reduce((sum, item) => sum + item.points, 0)
      }
    }
    return { totalDays, totalPoints }
  }

  const stats = monthlyStats()
  const streak = calculateStreak()

  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

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
          <h1 className="text-xl font-bold text-green-primary">打卡日历</h1>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-sm opacity-90">连续打卡</span>
            </div>
            <p className="text-3xl font-bold">{streak}<span className="text-lg ml-1">天</span></p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card-light">
            <p className="text-sm text-gray-500 mb-1">本月打卡</p>
            <p className="text-2xl font-bold text-green-primary">{stats.totalDays}<span className="text-sm ml-1">天</span></p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-card-light">
            <p className="text-sm text-gray-500 mb-1">本月积分</p>
            <p className="text-2xl font-bold text-orange-accent">{stats.totalPoints}</p>
          </div>
        </div>

        {/* 日历 */}
        <div className="bg-white rounded-xl shadow-card-light p-5 mb-6">
          {/* 月份导航 */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {year}年{month + 1}月
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* 日期格子 */}
          <div className="grid grid-cols-7 gap-1">
            {/* 空白格子 */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* 日期格子 */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const checkins = getCheckinStatus(day)
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()
              const isSelected = selectedDate === day

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(selectedDate === day ? null : day)}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center relative
                    transition-all ${isToday ? 'ring-2 ring-green-primary' : ''}
                    ${isSelected ? 'bg-green-primary text-white' : 
                      checkins ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'}`}
                >
                  <span className={`text-sm ${isSelected ? 'text-white' : checkins ? 'text-green-700' : 'text-gray-700'}`}>
                    {day}
                  </span>
                  {checkins && !isSelected && (
                    <CheckCircle className="w-3 h-3 text-green-500 absolute bottom-1" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 选中日期详情 */}
        {selectedDate && (
          <div className="bg-white rounded-xl shadow-card-light p-5 animate-fadeIn">
            <h3 className="font-semibold text-gray-800 mb-3">
              {month + 1}月{selectedDate}日打卡记录
            </h3>
            {getCheckinStatus(selectedDate) ? (
              <div className="space-y-3">
                {getCheckinStatus(selectedDate).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-gray-700">{item.task}</span>
                    </div>
                    <span className="text-green-500 font-medium">+{item.points}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">当日无打卡记录</p>
            )}
          </div>
        )}

        {/* 图例 */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded" />
            <span>已打卡</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-green-primary rounded" />
            <span>今天</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
