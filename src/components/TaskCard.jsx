import { Camera, Upload, Activity, MapPin, Calendar, Users } from 'lucide-react'

function TaskCard({ task, onComplete, delay = 0 }) {
  const getActionButton = () => {
    switch (task.type) {
      case 'photo':
        return { icon: Camera, text: '拍照打卡' }
      case 'upload':
        return { icon: Upload, text: '上传数据' }
      case 'sync':
        return { icon: Activity, text: '同步数据' }
      case 'report':
        return { icon: MapPin, text: '上报问题' }
      case 'checkin':
        return { icon: Calendar, text: '立即打卡' }
      case 'activity':
        return { icon: Users, text: '参与活动' }
      default:
        return { icon: Camera, text: '去完成' }
    }
  }

  const getCategoryColor = () => {
    switch (task.category) {
      case '节能':
        return 'text-yellow-500'
      case '节水':
        return 'text-blue-500'
      case '减废':
        return 'text-green-600'
      case '绿色生活':
        return 'text-teal-500'
      case '特别挑战':
        return 'text-purple-500'
      default:
        return 'text-green-primary'
    }
  }

  const action = getActionButton()
  const ActionIcon = action.icon

  return (
    <div 
      className="bg-white rounded-xl shadow-card-light card-hover p-4 lg:p-5 animate-fadeIn"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 头部 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-2xl ${getCategoryColor()}`}>{task.icon}</span>
          <h3 className="font-semibold text-green-primary text-base">{task.name}</h3>
        </div>
        <span className="text-orange-accent font-bold text-lg">+{task.points}</span>
      </div>

      {/* 描述 */}
      <p className="text-gray-600 text-sm line-clamp-2 mb-2 min-h-[40px]">
        {task.description}
      </p>

      {/* 完成条件 */}
      <p className="text-gray-400 text-xs mb-4">
        📋 {task.condition}
      </p>

      {/* 底部 */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onComplete(task.id)}
          className="flex items-center justify-center gap-1.5 bg-orange-accent hover:bg-orange-500 
            text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors btn-press"
        >
          <ActionIcon className="w-4 h-4" />
          {action.text}
        </button>

        <div className="text-xs text-gray-400 text-right">
          <p>今日剩余 <span className="text-orange-accent font-medium">{task.remaining}</span> 次</p>
          <p className="mt-0.5">{task.completed} 人已完成</p>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
