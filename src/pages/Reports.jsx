import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, AlertTriangle, MapPin, Clock, CheckCircle, 
  XCircle, Loader, Eye, Plus, Camera, X
} from 'lucide-react'
import Navbar from '../components/Navbar'

// 举报记录数据
const reportsData = [
  {
    id: 1,
    type: '长明灯',
    location: '图书馆3楼东侧走廊',
    description: '走廊尽头的两盏灯白天一直亮着，已持续一周',
    image: '💡',
    time: '2024-12-01 14:30',
    status: 'resolved',
    points: 10,
    feedback: '已安排后勤处理，感谢您的反馈！'
  },
  {
    id: 2,
    type: '漏水',
    location: '教学楼A座2楼男卫生间',
    description: '第二个水龙头关不紧，一直在滴水',
    image: '💧',
    time: '2024-11-28 09:15',
    status: 'processing',
    points: 0,
    feedback: '已派维修人员前往处理'
  },
  {
    id: 3,
    type: '空调异常',
    location: '实验楼B301教室',
    description: '空调设置温度为16度，过低浪费能源',
    image: '❄️',
    time: '2024-11-25 16:45',
    status: 'pending',
    points: 0,
    feedback: ''
  },
  {
    id: 4,
    type: '设备空转',
    location: '计算机中心机房',
    description: '多台电脑长时间无人使用但未关机',
    image: '🖥️',
    time: '2024-11-20 11:00',
    status: 'rejected',
    points: 0,
    feedback: '经核实，该区域电脑需保持开机状态用于远程服务'
  }
]

const reportTypes = ['长明灯', '漏水', '空调异常', '设备空转', '其他浪费']

function Reports({ user, onLogout }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [showNewReport, setShowNewReport] = useState(false)
  const [newReport, setNewReport] = useState({
    type: '',
    location: '',
    description: ''
  })

  const getStatusInfo = (status) => {
    switch (status) {
      case 'resolved':
        return { label: '已解决', color: 'bg-green-100 text-green-600', icon: CheckCircle }
      case 'processing':
        return { label: '处理中', color: 'bg-blue-100 text-blue-600', icon: Loader }
      case 'pending':
        return { label: '待审核', color: 'bg-yellow-100 text-yellow-600', icon: Clock }
      case 'rejected':
        return { label: '已驳回', color: 'bg-red-100 text-red-600', icon: XCircle }
      default:
        return { label: '未知', color: 'bg-gray-100 text-gray-600', icon: Clock }
    }
  }

  const filteredReports = filter === 'all' 
    ? reportsData 
    : reportsData.filter(r => r.status === filter)

  const stats = {
    total: reportsData.length,
    resolved: reportsData.filter(r => r.status === 'resolved').length,
    processing: reportsData.filter(r => r.status === 'processing').length,
    points: reportsData.filter(r => r.status === 'resolved').reduce((sum, r) => sum + r.points, 0)
  }

  const handleSubmit = () => {
    console.log('提交举报:', newReport)
    setShowNewReport(false)
    setNewReport({ type: '', location: '', description: '' })
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
              <AlertTriangle className="w-6 h-6" />
              我的举报
            </h1>
          </div>
          <button
            onClick={() => setShowNewReport(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-accent text-white rounded-lg hover:bg-orange-500"
          >
            <Plus className="w-4 h-4" />
            新举报
          </button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-xs text-gray-500">总举报</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-2xl font-bold text-green-500">{stats.resolved}</p>
            <p className="text-xs text-gray-500">已解决</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-2xl font-bold text-blue-500">{stats.processing}</p>
            <p className="text-xs text-gray-500">处理中</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card-light">
            <p className="text-2xl font-bold text-orange-accent">{stats.points}</p>
            <p className="text-xs text-gray-500">获得积分</p>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { key: 'all', label: '全部' },
            { key: 'pending', label: '待审核' },
            { key: 'processing', label: '处理中' },
            { key: 'resolved', label: '已解决' },
            { key: 'rejected', label: '已驳回' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors
                ${filter === item.key 
                  ? 'bg-green-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 举报列表 */}
        <div className="space-y-4">
          {filteredReports.map(report => {
            const statusInfo = getStatusInfo(report.status)
            const StatusIcon = statusInfo.icon

            return (
              <div key={report.id} className="bg-white rounded-xl shadow-card-light overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {report.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-800">{report.type}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                        <MapPin className="w-3 h-3" />
                        {report.location}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                    </div>
                  </div>

                  {/* 反馈信息 */}
                  {report.feedback && (
                    <div className={`mt-3 p-3 rounded-lg text-sm ${
                      report.status === 'resolved' ? 'bg-green-50 text-green-700' :
                      report.status === 'rejected' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      <span className="font-medium">处理反馈：</span>{report.feedback}
                    </div>
                  )}

                  {/* 底部信息 */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{report.time}</span>
                    {report.status === 'resolved' && (
                      <span className="text-sm text-orange-accent font-medium">+{report.points} 积分</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              暂无相关举报记录
            </div>
          )}
        </div>
      </div>

      {/* 新举报弹窗 */}
      {showNewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNewReport(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-800">上报能源浪费</h3>
              <button onClick={() => setShowNewReport(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* 类型选择 */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">问题类型</label>
                <div className="flex flex-wrap gap-2">
                  {reportTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setNewReport(prev => ({ ...prev, type }))}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors
                        ${newReport.type === type 
                          ? 'bg-green-primary text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 位置 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">问题位置</label>
                <input
                  type="text"
                  value={newReport.location}
                  onChange={e => setNewReport(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="例如：图书馆3楼东侧走廊"
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:border-green-primary outline-none"
                />
              </div>

              {/* 描述 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">问题描述</label>
                <textarea
                  value={newReport.description}
                  onChange={e => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="请详细描述发现的能源浪费问题..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-primary outline-none resize-none"
                />
              </div>

              {/* 上传照片 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">上传照片</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-green-primary transition-colors">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">点击上传或拖拽图片</p>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100">
              <button
                onClick={handleSubmit}
                disabled={!newReport.type || !newReport.location}
                className="w-full h-11 bg-orange-accent text-white rounded-lg hover:bg-orange-500 
                  disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
              >
                提交举报
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
