import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, User, Star, Shield, Award, TrendingUp, 
  Calendar, Gift, History, ChevronRight, Camera,
  Zap, Droplet, Leaf, Bike, AlertTriangle
} from 'lucide-react'
import Navbar from '../components/Navbar'
import CreditScoreCard from '../components/CreditScoreCard'

// 成就数据
const achievements = [
  { id: 1, name: '环保新手', icon: '🌱', desc: '完成首个环保任务', unlocked: true },
  { id: 2, name: '节能达人', icon: '💡', desc: '累计节能任务50次', unlocked: true },
  { id: 3, name: '绿色骑士', icon: '🚲', desc: '骑行总里程100km', unlocked: true },
  { id: 4, name: '减废先锋', icon: '♻️', desc: '拒绝一次性餐具100次', unlocked: false },
  { id: 5, name: '守护者', icon: '🛡️', desc: '上报能源浪费20次', unlocked: false },
  { id: 6, name: '校园之星', icon: '⭐', desc: '月度积分榜Top10', unlocked: false }
]

// 统计数据
const statsData = [
  { icon: Zap, label: '节省电量', value: '152.3', unit: '度', color: 'text-yellow-500' },
  { icon: Droplet, label: '节约用水', value: '2.8', unit: '吨', color: 'text-blue-500' },
  { icon: Leaf, label: '减少碳排', value: '89.5', unit: 'kg', color: 'text-green-500' },
  { icon: Bike, label: '绿色出行', value: '234', unit: 'km', color: 'text-teal-500' }
]

function Profile({ user, onLogout }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('stats')
  const [userAvatar, setUserAvatar] = useState(user?.avatar || null)

  // 组件初始化时从localStorage加载头像
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar')
    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }
  }, [])

  // 头像上传处理
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // 检查文件大小 (限制5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB')
        return
      }
      
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件')
        return
      }

      // 读取文件并转换为base64
      const reader = new FileReader()
      reader.onload = (e) => {
        const avatarUrl = e.target.result
        setUserAvatar(avatarUrl)
        
        // 保存到localStorage
        localStorage.setItem('userAvatar', avatarUrl)
        
        // 如果有用户更新函数，也可以更新用户信息
        if (typeof onUpdateUser === 'function') {
          onUpdateUser({ ...user, avatar: avatarUrl })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const menuItems = [
    { icon: Gift, label: '我的奖励', desc: '查看已兑换的奖励', path: '/rewards' },
    { icon: History, label: '积分明细', desc: '查看积分收支记录', path: '/points-history' },
    { icon: Award, label: '我的成就', desc: '查看获得的徽章', path: '/achievements' },
    { icon: Calendar, label: '打卡日历', desc: '查看历史打卡记录', path: '/calendar' },
    { icon: TrendingUp, label: '数据统计', desc: '查看环保数据分析', path: '/statistics' },
    { icon: AlertTriangle, label: '我的举报', desc: '查看举报处理进度', path: '/reports' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-[800px] mx-auto px-4 py-6">
        {/* 返回按钮 */}
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-green-primary mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回首页</span>
        </button>

        {/* 用户信息卡片 */}
        <div className="bg-gradient-to-br from-green-primary to-green-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-4">
            {/* 头像 */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-3 border-white/50">
                {userAvatar ? (
                  <img src={userAvatar} alt="用户头像" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <button 
                onClick={() => document.getElementById('avatar-upload').click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow hover:bg-green-50 transition-colors"
                title="更换头像"
              >
                <Camera className="w-4 h-4 text-green-primary" />
              </button>
            </div>

            {/* 信息 */}
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name || '用户'}</h2>
              <p className="text-white/80 text-sm">ID: {user?.id || '2024001'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-orange-400 px-2 py-0.5 rounded text-xs font-medium">
                  Lv.{user?.level || 5}
                </span>
                <span className="text-white/90 text-sm">{user?.levelTitle || '环保先锋'}</span>
              </div>
            </div>

            {/* 积分 */}
            <div className="text-right">
              <p className="text-white/80 text-sm">当前积分</p>
              <p className="text-3xl font-bold">{user?.points?.toLocaleString() || '1,245'}</p>
            </div>
          </div>

          {/* 信誉分 */}
          <div className="mt-4 bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>信誉分</span>
              </div>
              <span className="font-bold">{user?.creditScore || 98}/100</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${user?.creditScore || 98}%` }}
              />
            </div>
            <p className="text-xs text-white/70 mt-2">
              信誉分越高，享受更多平台权益。保持真实打卡，避免违规行为。
            </p>
          </div>
        </div>

        {/* 环保成果统计 */}
        <div className="bg-white rounded-xl shadow-card-light p-5 mb-6">
          <h3 className="font-semibold text-green-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            我的环保成果
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label} ({stat.unit})</p>
              </div>
            ))}
          </div>
        </div>

        {/* 信誉分详情 */}
        <div className="mb-6">
          <CreditScoreCard creditScore={user?.creditScore || 98} />
        </div>

        {/* 成就墙 */}
        <div className="bg-white rounded-xl shadow-card-light p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-green-primary flex items-center gap-2">
              <Award className="w-5 h-5" />
              成就徽章
            </h3>
            <span className="text-sm text-gray-500">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {achievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`text-center p-3 rounded-lg transition-all
                  ${achievement.unlocked 
                    ? 'bg-green-50 cursor-pointer hover:bg-green-100' 
                    : 'bg-gray-100 opacity-50'}`}
                title={achievement.desc}
              >
                <span className={`text-2xl ${!achievement.unlocked && 'grayscale'}`}>
                  {achievement.icon}
                </span>
                <p className="text-xs text-gray-600 mt-1 truncate">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="bg-white rounded-xl shadow-card-light overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="w-10 h-10 bg-green-light rounded-lg flex items-center justify-center">
                <item.icon className="w-5 h-5 text-green-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* 底部留白 */}
        <div className="h-8" />
      </div>
    </div>
  )
}

export default Profile
