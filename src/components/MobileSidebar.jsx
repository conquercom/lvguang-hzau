import { X } from 'lucide-react'
import Sidebar from './Sidebar'

function MobileSidebar({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <>
      {/* 遮罩层 */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* 侧边栏 */}
      <div className="fixed right-0 top-0 h-full w-[300px] bg-gray-50 z-50 lg:hidden 
        overflow-y-auto animate-slideInRight p-4">
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="mt-12">
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default MobileSidebar
