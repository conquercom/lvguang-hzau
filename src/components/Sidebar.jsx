import { useNavigate } from 'react-router-dom'
import { Trophy, Gift, Lightbulb, ChevronRight, User } from 'lucide-react'

// 模拟排行榜数据 - 华中农业大学
const leaderboardData = [
  { rank: 1, name: '李明', department: '资源与环境学院', points: 2580 },
  { rank: 2, name: '王芳', department: '植物科学技术学院', points: 2350 },
  { rank: 3, name: '张伟', department: '园艺林学学院', points: 2180 },
  { rank: 4, name: '刘洋', department: '信息学院', points: 1990 },
  { rank: 5, name: '陈静', department: '生命科学技术学院', points: 1850 }
]

// 热门兑换数据 - 华农特色
const rewardsData = [
  { id: 1, name: '图书馆研讨室', points: 200, image: '📚' },
  { id: 2, name: '西体育馆预约', points: 300, image: '🏀' },
  { id: 3, name: '荟园免费打印', points: 100, image: '🖨️' },
  { id: 4, name: '校园巴士券', points: 150, image: '🚌' },
  { id: 5, name: '狮山书店折扣', points: 80, image: '📖' },
  { id: 6, name: '华农文创周边', points: 180, image: '🎨' }
]

// 环保小贴士
const tips = [
  '随手关闭未使用的电器，每天可节省约0.5度电，一年累计减少182.5度碳排放～',
  '使用节水花洒可节省30%的用水量，既环保又省钱！',
  '选择公共交通出行，每10公里可减少约2.3kg碳排放。',
  '打印时选择双面打印，可节省50%的纸张消耗。',
  '空调温度每调高1℃，可节省约7%的能耗。'
]

function Sidebar() {
  const navigate = useNavigate()
  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  return (
    <div className="space-y-5 sticky top-[80px]">
      {/* 今日积分榜 */}
      <div className="bg-white rounded-xl shadow-card-light p-4 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-orange-accent" />
            <h3 className="font-semibold text-green-primary">今日积分榜</h3>
          </div>
          <button 
            onClick={() => navigate('/leaderboard')}
            className="text-blue-link text-sm hover:underline"
          >
            查看更多
          </button>
        </div>

        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div key={user.rank} className="flex items-center gap-3">
              <span className={`w-5 text-center font-bold text-sm
                ${user.rank <= 3 ? 'text-orange-accent' : 'text-gray-400'}`}>
                {user.rank}
              </span>
              <div className="w-8 h-8 rounded-full bg-green-light flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-green-primary" />
                )}
              </div>
              <span className="flex-1 text-sm text-gray-700 truncate">{user.name}</span>
              <span className="text-sm font-medium text-orange-accent">{user.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 热门兑换 */}
      <div className="bg-white rounded-xl shadow-card-light p-4 animate-fadeIn" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-accent" />
            <h3 className="font-semibold text-green-primary">热门兑换</h3>
          </div>
          <button 
            onClick={() => navigate('/exchange')}
            className="text-blue-link text-sm flex items-center gap-1 hover:underline"
          >
            更多 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {rewardsData.slice(0, 3).map((reward) => (
            <div 
              key={reward.id} 
              className="flex-shrink-0 w-24 bg-gray-50 rounded-lg p-3 text-center 
                hover:bg-green-light transition-colors cursor-pointer"
            >
              <div className="text-3xl mb-2">{reward.image}</div>
              <p className="text-xs text-gray-700 line-clamp-2 mb-1">{reward.name}</p>
              <p className="text-sm font-bold text-orange-accent">{reward.points}分</p>
            </div>
          ))}
        </div>
      </div>

      {/* 环保小贴士 */}
      <div className="bg-white rounded-xl shadow-card-light p-4 animate-fadeIn" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="font-semibold text-green-primary">每日更新环保小贴士</h3>
        </div>

        <div className="bg-green-light rounded-lg p-4">
          <p className="text-sm text-green-primary leading-relaxed">
            {randomTip}
          </p>
          <p className="text-xs text-gray-400 mt-2 text-right">—— 今日小贴士</p>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="bg-white rounded-xl shadow-card-light p-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
        <h3 className="font-semibold text-green-primary mb-3">快捷入口</h3>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => navigate('/exchange')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">🎁</span>
            <span className="text-xs text-gray-600">积分商城</span>
          </button>
          <button 
            onClick={() => navigate('/statistics')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">📊</span>
            <span className="text-xs text-gray-600">数据统计</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">🏆</span>
            <span className="text-xs text-gray-600">荣誉墙</span>
          </button>
          <button 
            onClick={() => navigate('/points-history')}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-xl">📝</span>
            <span className="text-xs text-gray-600">积分明细</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-xl">💬</span>
            <span className="text-xs text-gray-600">意见反馈</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-xl">❓</span>
            <span className="text-xs text-gray-600">帮助中心</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
