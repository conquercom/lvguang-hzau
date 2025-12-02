import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Search, Bell, ChevronDown, User, List, Settings, LogOut } from 'lucide-react'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatPoints = (points) => {
    if (points >= 1000) {
      return (points / 1000).toFixed(1) + 'k'
    }
    return points.toString()
  }

  const menuItems = [
    { icon: User, label: '个人中心', action: () => navigate('/profile') },
    { icon: List, label: '积分明细', action: () => navigate('/points-history') },
    { icon: Settings, label: '设置', action: () => navigate('/settings') },
    { icon: LogOut, label: '退出登录', action: onLogout, danger: true }
  ]

  return (
    <nav className="h-[60px] bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto h-full px-4 lg:px-6 flex items-center justify-between">
        {/* 左侧Logo */}
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-primary" strokeWidth={2} />
          <span className="text-xl font-bold text-green-primary hidden sm:inline">绿光华农</span>
        </div>

        {/* 中间搜索框 */}
        <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md mx-4 lg:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索任务/奖励/小贴士"
              className="w-full h-9 pl-9 pr-4 bg-gray-100 rounded-full text-sm 
                placeholder-gray-400 outline-none focus:bg-white focus:ring-2 
                focus:ring-green-primary/20 transition-all"
            />
          </div>
        </div>

        {/* 右侧用户区 */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* 通知图标 */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* 积分显示（PC端） */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            <span className="text-gray-500">积分</span>
            <span className="font-bold text-orange-accent">{formatPoints(user?.points || 0)}</span>
          </div>

          {/* 信誉分显示（PC端） */}
          <div className="hidden lg:flex items-center gap-1 text-sm">
            <span className="text-gray-500">信誉分</span>
            <span className="font-bold text-green-primary">{user?.creditScore || 0}</span>
          </div>

          {/* 用户头像下拉菜单 */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-green-light border-2 border-green-primary 
                flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-green-primary" />
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block
                ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* 下拉菜单 */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg 
                border border-gray-100 py-2 animate-fadeIn">
                {/* 用户信息 */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium text-gray-800">{user?.name || '用户'}</p>
                  <p className="text-xs text-gray-500">Lv.{user?.level} {user?.levelTitle}</p>
                </div>
                
                {/* 菜单项 */}
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action()
                      setShowDropdown(false)
                    }}
                    className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 
                      transition-colors text-left ${item.danger ? 'text-red-500' : 'text-gray-700'}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
