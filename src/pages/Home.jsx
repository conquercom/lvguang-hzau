import { useState } from 'react'
import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
import TaskCategories from '../components/TaskCategories'
import TaskCard from '../components/TaskCard'
import Sidebar from '../components/Sidebar'
import MobileSidebar from '../components/MobileSidebar'
import TaskModal from '../components/TaskModal'

// 任务数据 - 华中农业大学特色
const tasksData = [
  {
    id: 1,
    icon: '🥢',
    name: '拒绝一次性餐具',
    points: 5,
    category: '减废',
    description: '在桃园、荟园、博园食堂就餐时使用自带餐具，拒绝一次性筷子。',
    condition: '拍摄餐盘照片（需显示时间水印）',
    remaining: 3,
    completed: 235,
    type: 'photo'
  },
  {
    id: 2,
    icon: '💡',
    name: '随手关灯',
    points: 3,
    category: '节能',
    description: '离开第一、二、三教学楼教室时主动关闭照明设备，节约用电。',
    condition: '上传关灯前后对比照片',
    remaining: 5,
    completed: 412,
    type: 'photo'
  },
  {
    id: 3,
    icon: '💧',
    name: '节约用水',
    points: 4,
    category: '节水',
    description: '记录荟园/博园宿舍月度用水量，对比节水效果。',
    condition: '上传水表读数照片',
    remaining: 1,
    completed: 156,
    type: 'upload'
  },
  {
    id: 4,
    icon: '🚲',
    name: '狮子山骑行',
    points: 8,
    category: '绿色生活',
    description: '骑行环绕狮子山校园，记录骑行距离，感受华农美景。',
    condition: '同步运动数据（骑行≥3km）',
    remaining: 1,
    completed: 523,
    type: 'sync'
  },
  {
    id: 5,
    icon: '❄️',
    name: '空调合理使用',
    points: 5,
    category: '节能',
    description: '宿舍空调夏季设置不低于26℃，冬季不高于20℃。',
    condition: '上传空调温度设置照片',
    remaining: 2,
    completed: 189,
    type: 'photo'
  },
  {
    id: 6,
    icon: '🌙',
    name: '熄灯就寝',
    points: 3,
    category: '节能',
    description: '按时熄灯就寝，保持良好作息的同时节约宿舍用电。',
    condition: '在22:30-23:00间打卡',
    remaining: 1,
    completed: 678,
    type: 'checkin'
  },
  {
    id: 7,
    icon: '♻️',
    name: '垃圾分类投放',
    points: 4,
    category: '减废',
    description: '在宿舍楼下分类垃圾桶正确投放垃圾，培养环保好习惯。',
    condition: '拍摄垃圾分类投放照片',
    remaining: 3,
    completed: 342,
    type: 'photo'
  },
  {
    id: 8,
    icon: '🎯',
    name: '发现能源浪费点',
    points: 10,
    category: '特别挑战',
    description: '发现校园内能源浪费现象，如教学楼长明灯、实验室漏水等。',
    condition: '上传问题照片并填写具体位置',
    remaining: 5,
    completed: 87,
    type: 'report'
  },
  {
    id: 9,
    icon: '🌳',
    name: '参与环保活动',
    points: 15,
    category: '特别挑战',
    description: '参加狮子山植树、南湖清洁等校园环保志愿活动。',
    condition: '上传活动现场照片及证明',
    remaining: 2,
    completed: 56,
    type: 'activity'
  },
  {
    id: 10,
    icon: '🌾',
    name: '农耕体验打卡',
    points: 12,
    category: '特别挑战',
    description: '参与学校教学农场的农耕体验活动，感受农业文化。',
    condition: '上传农场体验照片',
    remaining: 1,
    completed: 45,
    type: 'photo'
  }
]

const categories = ['全部', '节能', '节水', '减废', '绿色生活', '特别挑战']

function Home({ user, onLogout }) {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)

  const filteredTasks = activeCategory === '全部' 
    ? tasksData 
    : tasksData.filter(task => task.category === activeCategory)

  const handleTaskComplete = (taskId) => {
    const task = tasksData.find(t => t.id === taskId)
    if (task) {
      setSelectedTask(task)
      setShowTaskModal(true)
    }
  }

  const handleTaskSubmit = (taskId, data) => {
    console.log('任务提交:', taskId, data)
    // 这里可以添加任务提交后的逻辑，如更新积分等
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <Navbar user={user} onLogout={onLogout} />

      {/* 主内容区 */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex gap-6">
          {/* 左侧主内容 */}
          <main className="flex-1 min-w-0">
            {/* 个人信息卡片 */}
            <UserCard user={user} />

            {/* 任务分类 */}
            <TaskCategories 
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />

            {/* 任务卡片列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
              {filteredTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onComplete={handleTaskComplete}
                  delay={index * 50}
                />
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg">暂无相关任务</p>
              </div>
            )}
          </main>

          {/* 右侧边栏 - PC端 */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <Sidebar />
          </aside>
        </div>
      </div>

      {/* 移动端侧边栏按钮 */}
      <button
        onClick={() => setShowMobileSidebar(true)}
        className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 bg-green-primary text-white 
          px-2 py-4 rounded-l-lg shadow-lg z-40 hover:bg-green-hover transition-colors"
      >
        <span className="writing-mode-vertical text-sm">更多</span>
      </button>

      {/* 移动端侧边栏 */}
      <MobileSidebar 
        isOpen={showMobileSidebar} 
        onClose={() => setShowMobileSidebar(false)} 
      />

      {/* 任务完成弹窗 */}
      <TaskModal
        task={selectedTask}
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleTaskSubmit}
      />
    </div>
  )
}

export default Home
