import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Medal, Crown, TrendingUp, User, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'

// 排行榜数据 - 华中农业大学
const leaderboardData = {
  daily: [
    { rank: 1, name: '李明', department: '资源与环境学院', points: 45, change: 2 },
    { rank: 2, name: '王芳', department: '植物科学技术学院', points: 42, change: -1 },
    { rank: 3, name: '张伟', department: '园艺林学学院', points: 38, change: 1 },
    { rank: 4, name: '刘洋', department: '信息学院', points: 35, change: 0 },
    { rank: 5, name: '陈静', department: '生命科学技术学院', points: 32, change: 3 },
    { rank: 6, name: '赵强', department: '动物科学技术学院', points: 30, change: -2 },
    { rank: 7, name: '周琳', department: '食品科学技术学院', points: 28, change: 1 },
    { rank: 8, name: '吴磊', department: '工学院', points: 25, change: 0 },
    { rank: 9, name: '郑雪', department: '经济管理学院', points: 23, change: -1 },
    { rank: 10, name: '孙浩', department: '外国语学院', points: 20, change: 2 }
  ],
  weekly: [
    { rank: 1, name: '王芳', department: '植物科学技术学院', points: 320, change: 0 },
    { rank: 2, name: '李明', department: '资源与环境学院', points: 298, change: 1 },
    { rank: 3, name: '刘洋', department: '信息学院', points: 275, change: -1 },
    { rank: 4, name: '张伟', department: '园艺林学学院', points: 256, change: 2 },
    { rank: 5, name: '周琳', department: '食品科学技术学院', points: 234, change: 0 },
    { rank: 6, name: '陈静', department: '生命科学技术学院', points: 212, change: 3 },
    { rank: 7, name: '赵强', department: '动物科学技术学院', points: 198, change: -2 },
    { rank: 8, name: '吴磊', department: '工学院', points: 187, change: 1 },
    { rank: 9, name: '孙浩', department: '外国语学院', points: 165, change: 0 },
    { rank: 10, name: '郑雪', department: '经济管理学院', points: 154, change: -1 }
  ],
  monthly: [
    { rank: 1, name: '王芳', department: '植物科学技术学院', points: 1245, change: 0 },
    { rank: 2, name: '刘洋', department: '信息学院', points: 1180, change: 2 },
    { rank: 3, name: '李明', department: '资源与环境学院', points: 1156, change: -1 },
    { rank: 4, name: '周琳', department: '食品科学技术学院', points: 1089, change: 0 },
    { rank: 5, name: '张伟', department: '园艺林学学院', points: 1023, change: -1 },
    { rank: 6, name: '吴磊', department: '工学院', points: 987, change: 3 },
    { rank: 7, name: '陈静', department: '生命科学技术学院', points: 945, change: 0 },
    { rank: 8, name: '赵强', department: '动物科学技术学院', points: 892, change: -2 },
    { rank: 9, name: '郑雪', department: '经济管理学院', points: 856, change: 1 },
    { rank: 10, name: '孙浩', department: '外国语学院', points: 812, change: 0 }
  ]
}

// 学院排行 - 华中农业大学
const departmentRanking = [
  { rank: 1, name: '资源与环境学院', totalPoints: 15680, members: 234 },
  { rank: 2, name: '植物科学技术学院', totalPoints: 14520, members: 198 },
  { rank: 3, name: '园艺林学学院', totalPoints: 13890, members: 312 },
  { rank: 4, name: '生命科学技术学院', totalPoints: 12450, members: 256 },
  { rank: 5, name: '信息学院', totalPoints: 11230, members: 187 }
]

function Leaderboard({ user, onLogout }) {
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('daily')
  const [showDepartment, setShowDepartment] = useState(false)

  const currentData = leaderboardData[timeRange]
  const myRank = 15 // 模拟当前用户排名

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />
    return <span className="w-6 text-center font-bold text-gray-400">{rank}</span>
  }

  const getRankBg = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
    if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
    return 'bg-white border-gray-100'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-[800px] mx-auto px-4 py-6">
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
              <Trophy className="w-6 h-6" />
              环保排行榜
            </h1>
          </div>
        </div>

        {/* 我的排名 */}
        <div className="bg-gradient-to-r from-green-primary to-green-600 rounded-xl p-5 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">我的当前排名</p>
              <p className="text-4xl font-bold mt-1">#{myRank}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">
                {timeRange === 'daily' ? '今日' : timeRange === 'weekly' ? '本周' : '本月'}积分
              </p>
              <p className="text-2xl font-bold mt-1">{user?.points || 1245}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <TrendingUp className="w-4 h-4" />
            <span>距离前10名还差 156 积分，加油！</span>
          </div>
        </div>

        {/* 切换标签 */}
        <div className="flex gap-2 mb-4">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {[
              { key: 'daily', label: '今日' },
              { key: 'weekly', label: '本周' },
              { key: 'monthly', label: '本月' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setTimeRange(item.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${timeRange === item.key 
                    ? 'bg-green-primary text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowDepartment(!showDepartment)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
              ${showDepartment ? 'bg-green-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Filter className="w-4 h-4" />
            学院榜
          </button>
        </div>

        {/* 个人排行榜 */}
        {!showDepartment && (
          <div className="bg-white rounded-xl shadow-card-light overflow-hidden">
            {currentData.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 p-4 border-b last:border-0 ${getRankBg(item.rank)}`}
              >
                {/* 排名 */}
                <div className="w-8 flex justify-center">
                  {getRankIcon(item.rank)}
                </div>

                {/* 头像 */}
                <div className="w-10 h-10 rounded-full bg-green-light flex items-center justify-center">
                  <User className="w-5 h-5 text-green-primary" />
                </div>

                {/* 信息 */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.department}</p>
                </div>

                {/* 积分和变化 */}
                <div className="text-right">
                  <p className="font-bold text-orange-accent">{item.points}</p>
                  <p className={`text-xs flex items-center justify-end gap-0.5
                    ${item.change > 0 ? 'text-green-500' : item.change < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {item.change > 0 ? '↑' : item.change < 0 ? '↓' : '-'}
                    {item.change !== 0 && Math.abs(item.change)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 学院排行榜 */}
        {showDepartment && (
          <div className="bg-white rounded-xl shadow-card-light overflow-hidden">
            {departmentRanking.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 p-4 border-b last:border-0 ${getRankBg(item.rank)}`}
              >
                {/* 排名 */}
                <div className="w-8 flex justify-center">
                  {getRankIcon(item.rank)}
                </div>

                {/* 学院图标 */}
                <div className="w-10 h-10 rounded-lg bg-green-light flex items-center justify-center text-xl">
                  🏛️
                </div>

                {/* 信息 */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.members} 名成员</p>
                </div>

                {/* 总积分 */}
                <div className="text-right">
                  <p className="font-bold text-orange-accent">{item.totalPoints.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">总积分</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 说明 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          排行榜每小时更新一次，积分相同时按完成任务时间排序
        </p>
      </div>
    </div>
  )
}

export default Leaderboard
