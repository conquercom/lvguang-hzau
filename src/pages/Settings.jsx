import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Settings as SettingsIcon, Bell, Shield, Moon, 
  Globe, HelpCircle, Info, ChevronRight, LogOut, User,
  Lock, Mail, Phone, Camera
} from 'lucide-react'
import Navbar from '../components/Navbar'

function Settings({ user, onLogout }) {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState({
    taskReminder: true,
    pointsChange: true,
    rankUpdate: false,
    systemNotice: true
  })
  const [darkMode, setDarkMode] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const settingSections = [
    {
      title: '账号设置',
      items: [
        { icon: User, label: '个人资料', desc: '修改头像、昵称等', action: () => setShowEditProfile(true) },
        { icon: Lock, label: '修改密码', desc: '定期更换密码更安全', action: () => {} },
        { icon: Mail, label: '绑定邮箱', desc: user?.email || '未绑定', action: () => {} },
        { icon: Phone, label: '绑定手机', desc: '138****8888', action: () => {} }
      ]
    },
    {
      title: '通知设置',
      items: [
        { 
          icon: Bell, 
          label: '任务提醒', 
          desc: '接收任务完成提醒',
          toggle: true,
          value: notifications.taskReminder,
          onChange: (v) => setNotifications(prev => ({ ...prev, taskReminder: v }))
        },
        { 
          icon: Bell, 
          label: '积分变动', 
          desc: '积分增减时通知',
          toggle: true,
          value: notifications.pointsChange,
          onChange: (v) => setNotifications(prev => ({ ...prev, pointsChange: v }))
        },
        { 
          icon: Bell, 
          label: '排名更新', 
          desc: '排名变化时通知',
          toggle: true,
          value: notifications.rankUpdate,
          onChange: (v) => setNotifications(prev => ({ ...prev, rankUpdate: v }))
        }
      ]
    },
    {
      title: '其他设置',
      items: [
        { 
          icon: Moon, 
          label: '深色模式', 
          desc: '护眼暗色主题',
          toggle: true,
          value: darkMode,
          onChange: setDarkMode
        },
        { icon: Globe, label: '语言', desc: '简体中文', action: () => {} },
        { icon: Shield, label: '隐私设置', desc: '管理数据权限', action: () => {} }
      ]
    },
    {
      title: '关于',
      items: [
        { icon: HelpCircle, label: '帮助中心', desc: '常见问题解答', action: () => {} },
        { icon: Info, label: '关于我们', desc: 'v1.0.0', action: () => {} }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-[600px] mx-auto px-4 py-6">
        {/* 头部 */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-green-primary flex items-center gap-2">
            <SettingsIcon className="w-6 h-6" />
            设置
          </h1>
        </div>

        {/* 设置列表 */}
        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-sm text-gray-500 font-medium mb-2 px-1">{section.title}</h2>
              <div className="bg-white rounded-xl shadow-card-light overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    onClick={item.toggle ? undefined : item.action}
                    className={`flex items-center gap-4 p-4 border-b last:border-0 border-gray-100
                      ${!item.toggle ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                  >
                    <div className="w-10 h-10 bg-green-light rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-green-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                    </div>
                    {item.toggle ? (
                      <button
                        onClick={() => item.onChange(!item.value)}
                        className={`w-12 h-7 rounded-full transition-colors relative
                          ${item.value ? 'bg-green-primary' : 'bg-gray-300'}`}
                      >
                        <span 
                          className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform
                            ${item.value ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 退出登录按钮 */}
        <button
          onClick={onLogout}
          className="w-full mt-8 py-3 bg-white text-red-500 rounded-xl shadow-card-light 
            font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>

        {/* 版本信息 */}
        <p className="text-center text-xs text-gray-400 mt-6">
          绿光华农 v1.0.0
        </p>
      </div>

      {/* 编辑资料弹窗 */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowEditProfile(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-800">编辑个人资料</h3>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                取消
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* 头像 */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-green-light flex items-center justify-center overflow-hidden border-2 border-green-primary">
                    <User className="w-10 h-10 text-green-primary" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-orange-accent rounded-full flex items-center justify-center shadow">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">点击更换头像</p>
              </div>

              {/* 昵称 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">昵称</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:border-green-primary outline-none"
                />
              </div>

              {/* 学院 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">学院</label>
                <select className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:border-green-primary outline-none bg-white">
                  <option>植物科学技术学院</option>
                  <option>动物科学技术学院</option>
                  <option>动物医学院</option>
                  <option>资源与环境学院</option>
                  <option>生命科学技术学院</option>
                  <option>园艺林学学院</option>
                  <option>水产学院</option>
                  <option>食品科学技术学院</option>
                  <option>理学院</option>
                  <option>工学院</option>
                  <option>经济管理学院</option>
                  <option>公共管理学院</option>
                  <option>文法学院</option>
                  <option>外国语学院</option>
                  <option>信息学院</option>
                  <option>马克思主义学院</option>
                </select>
              </div>

              {/* 个性签名 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">个性签名</label>
                <textarea
                  rows={2}
                  placeholder="写点什么介绍自己..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-primary outline-none resize-none"
                />
              </div>
            </div>

            <div className="p-5 border-t border-gray-100">
              <button
                onClick={() => setShowEditProfile(false)}
                className="w-full h-11 bg-green-primary text-white rounded-lg hover:bg-green-hover transition-colors"
              >
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
