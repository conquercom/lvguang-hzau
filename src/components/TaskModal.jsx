import { useState, useRef } from 'react'
import { X, Camera, Upload, MapPin, Clock, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react'

function TaskModal({ task, isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState('upload') // upload, preview, submitting, success, error
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  if (!isOpen || !task) return null

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('图片大小不能超过10MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setStep('preview')
        setError('')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!imagePreview) {
      setError('请先上传照片')
      return
    }

    if (task.type === 'report' && !location.trim()) {
      setError('请填写问题位置')
      return
    }

    setStep('submitting')
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟成功
    setStep('success')
    
    setTimeout(() => {
      onSubmit(task.id, {
        image: imagePreview,
        location,
        description,
        timestamp: new Date().toISOString()
      })
      handleClose()
    }, 2000)
  }

  const handleClose = () => {
    setStep('upload')
    setImageFile(null)
    setImagePreview(null)
    setLocation('')
    setDescription('')
    setError('')
    onClose()
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const renderContent = () => {
    switch (step) {
      case 'success':
        return (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-primary mb-2">提交成功！</h3>
            <p className="text-gray-500">恭喜获得 <span className="text-orange-accent font-bold">+{task.points}</span> 积分</p>
            <p className="text-sm text-gray-400 mt-2">审核通过后积分将自动到账</p>
          </div>
        )

      case 'submitting':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-green-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">正在提交...</h3>
            <p className="text-sm text-gray-400 mt-2">请稍候，正在验证您的打卡信息</p>
          </div>
        )

      case 'preview':
        return (
          <div className="space-y-4">
            {/* 图片预览 */}
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="预览" 
                className="w-full h-48 object-cover rounded-lg"
              />
              {/* 水印 */}
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getCurrentTime()}
                </div>
              </div>
              <button
                onClick={() => {
                  setStep('upload')
                  setImagePreview(null)
                  setImageFile(null)
                }}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 位置信息（仅上报问题需要） */}
            {task.type === 'report' && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  问题位置 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="例如：图书馆3楼东侧走廊"
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:border-green-primary outline-none"
                />
              </div>
            )}

            {/* 描述（可选） */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">补充说明（可选）</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="可以补充描述您的环保行为..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-primary outline-none resize-none"
              />
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* 提交按钮 */}
            <button
              onClick={handleSubmit}
              className="w-full h-11 bg-orange-accent hover:bg-orange-500 text-white font-medium rounded-lg transition-colors"
            >
              确认提交
            </button>
          </div>
        )

      default: // upload
        return (
          <div className="space-y-4">
            {/* 任务说明 */}
            <div className="bg-green-light rounded-lg p-4">
              <h4 className="font-medium text-green-primary mb-2">完成条件</h4>
              <p className="text-sm text-gray-600">{task.condition}</p>
            </div>

            {/* 上传区域 */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer
                hover:border-green-primary hover:bg-green-50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">点击拍照或上传图片</p>
              <p className="text-sm text-gray-400 mt-1">支持 JPG、PNG 格式，最大 10MB</p>
            </div>

            {/* 防作弊提示 */}
            <div className="bg-orange-50 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-700">
                <p className="font-medium">防作弊提示</p>
                <p className="text-orange-600 mt-1">
                  照片将自动添加时间水印，系统会进行AI识别验证。
                  提交虚假信息将扣除信誉分。
                </p>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={step === 'submitting' ? undefined : handleClose}
      />
      
      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{task.icon}</span>
            <h3 className="font-semibold text-green-primary">{task.name}</h3>
          </div>
          {step !== 'submitting' && (
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* 内容 */}
        <div className="p-5">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default TaskModal
