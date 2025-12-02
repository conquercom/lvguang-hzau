import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Award, Lock, Star, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'

// 成就数据
const achievementsData = [
  {
    id: 1,
    category: '入门成就',
    items: [
      { name: '环保新手', icon: '🌱', desc: '完成首个环保任务', condition: '完成1次任务', unlocked: true, date: '2024-10-15' },
      { name: '初露锋芒', icon: '✨', desc: '累计获得100积分', condition: '积分达到100', unlocked: true, date: '2024-10-18' },
      { name: '坚持不懈', icon: '📅', desc: '连续打卡7天', condition: '连续7天完成任务', unlocked: true, date: '2024-10-25' }
    ]
  },
  {
    id: 2,
    category: '节能达人',
    items: [
      { name: '随手关灯', icon: '💡', desc: '完成10次关灯任务', condition: '关灯任务10次', unlocked: true, date: '2024-11-02' },
      { name: '节能先锋', icon: '⚡', desc: '累计节省50度电', condition: '节电50度', unlocked: true, date: '2024-11-15' },
      { name: '能源守护者', icon: '🔋', desc: '累计节省200度电', condition: '节电200度', unlocked: false, progress: 152, target: 200 }
    ]
  },
  {
    id: 3,
    category: '节水卫士',
    items: [
      { name: '点滴珍惜', icon: '💧', desc: '完成10次节水任务', condition: '节水任务10次', unlocked: true, date: '2024-11-08' },
      { name: '节水达人', icon: '🌊', desc: '累计节约1吨水', condition: '节水1吨', unlocked: false, progress: 0.7, target: 1 },
      { name: '水源守护者', icon: '🏞️', desc: '累计节约5吨水', condition: '节水5吨', unlocked: false, progress: 0.7, target: 5 }
    ]
  },
  {
    id: 4,
    category: '绿色出行',
    items: [
      { name: '绿色骑士', icon: '🚲', desc: '骑行总里程100km', condition: '骑行100公里', unlocked: true, date: '2024-11-20' },
      { name: '步行达人', icon: '🚶', desc: '步行总里程50km', condition: '步行50公里', unlocked: false, progress: 35, target: 50 },
      { name: '低碳先锋', icon: '🌍', desc: '减少碳排放100kg', condition: '减碳100kg', unlocked: false, progress: 89.5, target: 100 }
    ]
  },
  {
    id: 5,
    category: '环保卫士',
    items: [
      { name: '减废先锋', icon: '♻️', desc: '拒绝一次性餐具100次', condition: '减废100次', unlocked: false, progress: 67, target: 100 },
      { name: '守护者', icon: '🛡️', desc: '上报能源浪费20次', condition: '举报20次', unlocked: false, progress: 8, target: 20 },
      { name: '环保大使', icon: '🎖️', desc: '参与5次环保活动', condition: '活动5次', unlocked: false, progress: 3, target: 5 }
    ]
  },
  {
    id: 6,
    category: '荣誉成就',
    items: [
      { name: '校园之星', icon: '⭐', desc: '月度积分榜Top10', condition: '月榜前10', unlocked: false, progress: 0, target: 1 },
      { name: '环保领袖', icon: '👑', desc: '累计积分达到5000', condition: '积分5000', unlocked: false, progress: 1245, target: 5000 },
      { name: '绿色传奇', icon: '🏆', desc: '解锁所有其他成就', condition: '全成就', unlocked: false, progress: 8, target: 17 }
    ]
  }
]

function Achievements({ user, onLogout }) {
  const navigate = useNavigate()
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const totalAchievements = achievementsData.reduce((sum, cat) => sum + cat.items.length, 0)
  const unlockedCount = achievementsData.reduce(
    (sum, cat) => sum + cat.items.filter(a => a.unlocked).length, 0
  )

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
          <h1 className="text-xl font-bold text-green-primary flex items-center gap-2">
            <Award className="w-6 h-6" />
            成就徽章
          </h1>
        </div>

        {/* 统计卡片 */}
        <div className="bg-gradient-to-r from-green-primary to-green-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">已解锁成就</p>
              <p className="text-4xl font-bold mt-1">{unlockedCount}/{totalAchievements}</p>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Star className="w-10 h-10" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
            />
          </div>
          <p className="text-sm text-white/70 mt-2">
            再解锁 {totalAchievements - unlockedCount} 个成就即可成为环保达人！
          </p>
        </div>

        {/* 成就列表 */}
        <div className="space-y-6">
          {achievementsData.map(category => (
            <div key={category.id}>
              <h2 className="text-sm font-medium text-gray-500 mb-3 px-1">{category.category}</h2>
              <div className="grid grid-cols-3 gap-3">
                {category.items.map((achievement, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAchievement(achievement)}
                    className={`bg-white rounded-xl p-4 shadow-card-light text-center transition-all
                      ${achievement.unlocked 
                        ? 'hover:shadow-md' 
                        : 'opacity-60 hover:opacity-80'}`}
                  >
                    <div className={`text-3xl mb-2 ${!achievement.unlocked && 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <p className={`text-sm font-medium truncate
                      ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                      {achievement.name}
                    </p>
                    {achievement.unlocked ? (
                      <p className="text-xs text-green-500 mt-1">已解锁</p>
                    ) : achievement.progress !== undefined ? (
                      <div className="mt-2">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-orange-accent rounded-full"
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {achievement.progress}/{achievement.target}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Lock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">未解锁</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 成就详情弹窗 */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedAchievement(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm animate-fadeIn overflow-hidden">
            {/* 顶部装饰 */}
            <div className={`h-24 flex items-center justify-center
              ${selectedAchievement.unlocked 
                ? 'bg-gradient-to-r from-green-400 to-green-500' 
                : 'bg-gradient-to-r from-gray-300 to-gray-400'}`}>
              <span className={`text-6xl ${!selectedAchievement.unlocked && 'grayscale'}`}>
                {selectedAchievement.icon}
              </span>
            </div>

            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedAchievement.name}</h3>
              <p className="text-gray-500 mb-4">{selectedAchievement.desc}</p>

              {/* 解锁条件 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">解锁条件</p>
                <p className="font-medium text-gray-800">{selectedAchievement.condition}</p>
              </div>

              {selectedAchievement.unlocked ? (
                <div className="flex items-center justify-center gap-2 text-green-500">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">已于 {selectedAchievement.date} 解锁</span>
                </div>
              ) : selectedAchievement.progress !== undefined ? (
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-500">当前进度</span>
                    <span className="font-medium text-orange-accent">
                      {selectedAchievement.progress}/{selectedAchievement.target}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-accent rounded-full transition-all"
                      style={{ width: `${(selectedAchievement.progress / selectedAchievement.target) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    还差 {(selectedAchievement.target - selectedAchievement.progress).toFixed(1)} 即可解锁
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Lock className="w-5 h-5" />
                  <span>尚未解锁</span>
                </div>
              )}

              <button
                onClick={() => setSelectedAchievement(null)}
                className="mt-6 w-full py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Achievements
