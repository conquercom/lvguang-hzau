import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Gift, Clock, CheckCircle, QrCode, Copy, X } from 'lucide-react'
import Navbar from '../components/Navbar'

// 奖励记录数据
const rewardsData = [
  {
    id: 1,
    name: '免费打印额度50页',
    image: '🖨️',
    points: 100,
    exchangeTime: '2024-12-01 16:45',
    expireTime: '2024-12-31 23:59',
    status: 'unused',
    code: 'PRINT2024120101'
  },
  {
    id: 2,
    name: '校车免费乘坐权',
    image: '🚌',
    points: 150,
    exchangeTime: '2024-11-29 11:00',
    expireTime: '2024-12-29 23:59',
    status: 'unused',
    code: 'BUS2024112901'
  },
  {
    id: 3,
    name: '单人研讨室1小时',
    image: '📚',
    points: 200,
    exchangeTime: '2024-11-25 14:30',
    expireTime: '2024-12-25 23:59',
    status: 'used',
    code: 'ROOM2024112501',
    usedTime: '2024-11-26 15:00'
  },
  {
    id: 4,
    name: '咖啡厅代金券20元',
    image: '☕',
    points: 80,
    exchangeTime: '2024-11-20 09:00',
    expireTime: '2024-11-30 23:59',
    status: 'expired',
    code: 'CAFE2024112001'
  },
  {
    id: 5,
    name: '校园文创帆布包',
    image: '🎨',
    points: 180,
    exchangeTime: '2024-11-15 10:30',
    expireTime: '2024-12-15 23:59',
    status: 'received',
    code: 'BAG2024111501',
    receivedTime: '2024-11-18 14:00'
  }
]

function Rewards({ user, onLogout }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [showDetail, setShowDetail] = useState(null)
  const [copied, setCopied] = useState(false)

  const getStatusInfo = (status) => {
    switch (status) {
      case 'unused':
        return { label: '待使用', color: 'bg-green-100 text-green-600' }
      case 'used':
        return { label: '已使用', color: 'bg-gray-100 text-gray-500' }
      case 'expired':
        return { label: '已过期', color: 'bg-red-100 text-red-500' }
      case 'received':
        return { label: '已领取', color: 'bg-blue-100 text-blue-600' }
      default:
        return { label: '未知', color: 'bg-gray-100 text-gray-500' }
    }
  }

  const filteredRewards = filter === 'all'
    ? rewardsData
    : rewardsData.filter(r => r.status === filter)

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = {
    total: rewardsData.length,
    unused: rewardsData.filter(r => r.status === 'unused').length,
    used: rewardsData.filter(r => r.status === 'used' || r.status === 'received').length
  }

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
            <Gift className="w-6 h-6" />
            我的奖励
          </h1>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-xs text-gray-500">总奖励</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-2xl font-bold text-green-500">{stats.unused}</p>
            <p className="text-xs text-gray-500">待使用</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-2xl font-bold text-gray-400">{stats.used}</p>
            <p className="text-xs text-gray-500">已使用</p>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'all', label: '全部' },
            { key: 'unused', label: '待使用' },
            { key: 'used', label: '已使用' },
            { key: 'expired', label: '已过期' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors
                ${filter === item.key 
                  ? 'bg-green-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 奖励列表 */}
        <div className="space-y-4">
          {filteredRewards.map(reward => {
            const statusInfo = getStatusInfo(reward.status)
            const isExpired = reward.status === 'expired'
            const isUsable = reward.status === 'unused'

            return (
              <div 
                key={reward.id} 
                className={`bg-white rounded-xl shadow-card-light overflow-hidden
                  ${isExpired ? 'opacity-60' : ''}`}
              >
                <div className="p-4 flex items-center gap-4">
                  {/* 图标 */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl
                    ${isUsable ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {reward.image}
                  </div>

                  {/* 信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-800 truncate">{reward.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">消耗 {reward.points} 积分</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Clock className="w-3 h-3" />
                      有效期至 {reward.expireTime.split(' ')[0]}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  {isUsable && (
                    <button
                      onClick={() => setShowDetail(reward)}
                      className="px-4 py-2 bg-orange-accent text-white rounded-lg hover:bg-orange-500 text-sm"
                    >
                      使用
                    </button>
                  )}
                </div>
              </div>
            )
          })}

          {filteredRewards.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>暂无奖励记录</p>
              <button 
                onClick={() => navigate('/exchange')}
                className="mt-4 text-green-primary hover:underline"
              >
                去兑换奖励
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 奖励详情弹窗 */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDetail(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm animate-fadeIn">
            <button 
              onClick={() => setShowDetail(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-6 text-center">
              {/* 奖励图标 */}
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4">
                {showDetail.image}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{showDetail.name}</h3>
              
              {/* 二维码区域 */}
              <div className="bg-gray-50 rounded-xl p-6 mb-4">
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-3 flex items-center justify-center border-2 border-dashed border-gray-200">
                  <QrCode className="w-20 h-20 text-gray-300" />
                </div>
                <p className="text-xs text-gray-500">向工作人员出示此二维码</p>
              </div>

              {/* 兑换码 */}
              <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between mb-4">
                <span className="font-mono text-sm text-gray-700">{showDetail.code}</span>
                <button 
                  onClick={() => handleCopyCode(showDetail.code)}
                  className="flex items-center gap-1 text-green-primary text-sm hover:underline"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? '已复制' : '复制'}
                </button>
              </div>

              {/* 有效期 */}
              <p className="text-sm text-gray-500">
                有效期至：{showDetail.expireTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rewards
