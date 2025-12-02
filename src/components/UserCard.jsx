import { User, Sprout, TrendingUp } from 'lucide-react'

function UserCard({ user }) {
  const creditPercentage = (user?.creditScore || 0)

  return (
    <div className="bg-gradient-to-r from-green-light to-white rounded-xl shadow-card-light p-5 lg:p-6 animate-fadeIn">
      <div className="flex items-center gap-4 lg:gap-6">
        {/* 头像 */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white border-2 border-green-primary 
            flex items-center justify-center overflow-hidden shadow-sm">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 lg:w-10 lg:h-10 text-green-primary" />
            )}
          </div>
          {/* 等级徽章 */}
          <div className="absolute -bottom-1 -right-1 bg-orange-accent text-white text-xs 
            font-bold px-2 py-0.5 rounded-full shadow">
            Lv.{user?.level || 1}
          </div>
        </div>

        {/* 用户信息 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-green-primary truncate">
              {user?.name || '用户'}
            </h2>
            <span className="text-sm text-orange-accent font-medium bg-orange-50 px-2 py-0.5 rounded">
              {user?.levelTitle || '环保新手'}
            </span>
          </div>

          {/* 积分显示 */}
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl lg:text-4xl font-bold text-orange-accent">
              {user?.points?.toLocaleString() || 0}
            </span>
            <span className="text-sm text-gray-500">积分</span>
          </div>

          {/* 信誉分进度条 */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              信誉分 <span className="font-semibold text-green-primary">{user?.creditScore || 0}/100</span>
            </span>
            <div className="flex-1 max-w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-primary to-green-500 rounded-full animate-progress"
                style={{ width: `${creditPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 右侧装饰 - 等级图标 */}
        <div className="hidden md:flex flex-col items-center gap-1 px-4 lg:px-6 border-l border-green-200">
          <div className="text-4xl lg:text-5xl">🌱</div>
          <span className="text-xs text-gray-500">环保达人</span>
        </div>
      </div>

      {/* 底部统计 */}
      <div className="mt-4 pt-4 border-t border-green-100 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-green-primary">23</p>
          <p className="text-xs text-gray-500">今日任务</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-orange-accent">156</p>
          <p className="text-xs text-gray-500">累计完成</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-blue-500">12</p>
          <p className="text-xs text-gray-500">连续打卡</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard
