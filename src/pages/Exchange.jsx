import { useState } from 'react'
import { ArrowLeft, Gift, Star, Clock, CheckCircle, AlertCircle, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

// 奖励数据 - 华中农业大学特色
const rewardsData = [
  {
    id: 1,
    name: '图书馆研讨室1小时',
    category: '学习',
    points: 200,
    image: '📚',
    stock: 50,
    limit: '每人每周限兑2次',
    description: '可在图书馆预约研讨室使用1小时'
  },
  {
    id: 2,
    name: '西体育馆黄金时段预约',
    category: '运动',
    points: 300,
    image: '🏀',
    stock: 20,
    limit: '每人每月限兑1次',
    description: '可预约西体育馆18:00-20:00黄金时段场地'
  },
  {
    id: 3,
    name: '校园巴士免费乘坐券',
    category: '出行',
    points: 150,
    image: '🚌',
    stock: 100,
    limit: '每人每月限兑4次',
    description: '华农校园巴士单次免费乘坐券'
  },
  {
    id: 4,
    name: '免费打印额度50页',
    category: '学习',
    points: 100,
    image: '🖨️',
    stock: 200,
    limit: '每人每月限兑2次',
    description: '可在荟园、博园打印店免费打印50页'
  },
  {
    id: 5,
    name: '狮山书店9折优惠券',
    category: '学习',
    points: 80,
    image: '📖',
    stock: 150,
    limit: '每人每学期限兑1次',
    description: '狮山书店购书享受9折优惠'
  },
  {
    id: 6,
    name: '德育分+0.5',
    category: '荣誉',
    points: 500,
    image: '🏆',
    stock: 30,
    limit: '每人每学期限兑1次',
    description: '可获得0.5德育加分，计入综测成绩'
  },
  {
    id: 7,
    name: '华农文创帆布包',
    category: '文创',
    points: 180,
    image: '🎨',
    stock: 80,
    limit: '每人限兑1次',
    description: '限量版华农校园文创周边帆布包'
  },
  {
    id: 8,
    name: '集贤咖啡代金券20元',
    category: '生活',
    points: 80,
    image: '☕',
    stock: 120,
    limit: '每人每月限兑2次',
    description: '集贤楼咖啡厅20元代金券'
  },
  {
    id: 9,
    name: '狮子山明信片套装',
    category: '文创',
    points: 60,
    image: '🏛️',
    stock: 200,
    limit: '每人限兑2次',
    description: '精美狮子山校园风景明信片10张套装'
  },
  {
    id: 10,
    name: '游泳馆周卡',
    category: '运动',
    points: 250,
    image: '🏊',
    stock: 40,
    limit: '每人每月限兑1次',
    description: '华农游泳馆一周使用权'
  },
  {
    id: 11,
    name: '食堂特色窗口优惠券',
    category: '生活',
    points: 50,
    image: '🍜',
    stock: 300,
    limit: '每人每周限兑3次',
    description: '桃园、荟园、博园食堂特色窗口5元优惠券'
  },
  {
    id: 12,
    name: '农场体验半日游',
    category: '特色',
    points: 400,
    image: '🌾',
    stock: 15,
    limit: '每人每学期限兑1次',
    description: '参观华农教学农场，体验农耕文化'
  }
]

const categories = ['全部', '学习', '运动', '出行', '荣誉', '文创', '生活', '特色']

function Exchange({ user, onLogout }) {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('全部')
  const [showModal, setShowModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [exchangeStatus, setExchangeStatus] = useState('confirm') // confirm, processing, success, error

  const userPoints = user?.points || 1245

  const filteredRewards = activeCategory === '全部'
    ? rewardsData
    : rewardsData.filter(r => r.category === activeCategory)

  const handleExchange = (reward) => {
    setSelectedReward(reward)
    setExchangeStatus('confirm')
    setShowModal(true)
  }

  const confirmExchange = async () => {
    if (userPoints < selectedReward.points) {
      setExchangeStatus('error')
      return
    }

    setExchangeStatus('processing')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setExchangeStatus('success')
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedReward(null)
    setExchangeStatus('confirm')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-6">
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
              <Gift className="w-6 h-6" />
              积分兑换
            </h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="text-gray-500">可用积分：</span>
            <span className="text-xl font-bold text-orange-accent">{userPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${activeCategory === cat 
                  ? 'bg-green-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 奖励列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRewards.map(reward => (
            <div 
              key={reward.id}
              className="bg-white rounded-xl shadow-card-light overflow-hidden card-hover"
            >
              {/* 标签 */}
              {reward.popular && (
                <div className="bg-orange-accent text-white text-xs px-3 py-1 inline-block">
                  🔥 热门
                </div>
              )}
              
              {/* 图标 */}
              <div className="flex justify-center py-6 bg-gradient-to-b from-green-50 to-white">
                <span className="text-5xl">{reward.image}</span>
              </div>

              {/* 信息 */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{reward.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">{reward.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-orange-accent">{reward.points}</span>
                    <span className="text-sm text-gray-400 ml-1">积分</span>
                  </div>
                  <button
                    onClick={() => handleExchange(reward)}
                    disabled={userPoints < reward.points}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
                      ${userPoints >= reward.points 
                        ? 'bg-orange-accent hover:bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    {userPoints >= reward.points ? '立即兑换' : '积分不足'}
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <span>库存 {reward.stock}</span>
                  <span>每人限 {reward.limit} 次</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 兑换弹窗 */}
      {showModal && selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm animate-fadeIn">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="p-6 text-center">
              {exchangeStatus === 'confirm' && (
                <>
                  <div className="text-5xl mb-4">{selectedReward.image}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedReward.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{selectedReward.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-500">需要消耗</p>
                    <p className="text-2xl font-bold text-orange-accent">{selectedReward.points} 积分</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={closeModal}
                      className="flex-1 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      取消
                    </button>
                    <button 
                      onClick={confirmExchange}
                      className="flex-1 py-2.5 bg-orange-accent text-white rounded-lg hover:bg-orange-500"
                    >
                      确认兑换
                    </button>
                  </div>
                </>
              )}

              {exchangeStatus === 'processing' && (
                <div className="py-8">
                  <div className="w-12 h-12 border-4 border-green-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">正在处理中...</p>
                </div>
              )}

              {exchangeStatus === 'success' && (
                <div className="py-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-primary mb-2">兑换成功！</h3>
                  <p className="text-gray-500 mb-4">奖励已发放至您的账户，请在"我的奖励"中查看</p>
                  <button 
                    onClick={closeModal}
                    className="w-full py-2.5 bg-green-primary text-white rounded-lg hover:bg-green-hover"
                  >
                    完成
                  </button>
                </div>
              )}

              {exchangeStatus === 'error' && (
                <div className="py-4">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-red-500 mb-2">兑换失败</h3>
                  <p className="text-gray-500 mb-4">积分不足，请继续完成任务获取更多积分</p>
                  <button 
                    onClick={closeModal}
                    className="w-full py-2.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                  >
                    关闭
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Exchange
