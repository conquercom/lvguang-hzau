import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Eye, EyeOff, RefreshCw } from 'lucide-react'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    captcha: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha())
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha())
    setFormData(prev => ({ ...prev, captcha: '' }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.studentId.trim()) {
      newErrors.studentId = '请输入学号/工号'
    }
    if (!formData.password) {
      newErrors.password = '请输入密码'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位'
    }
    if (!formData.captcha) {
      newErrors.captcha = '请输入验证码'
    } else if (formData.captcha.toUpperCase() !== captchaCode) {
      newErrors.captcha = '验证码错误'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟登录成功
    onLogin({
      id: formData.studentId,
      name: '张三',
      avatar: null,
      points: 1245,
      level: 5,
      levelTitle: '环保先锋',
      creditScore: 98
    })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* 左侧背景区域 */}
      <div 
        className="lg:w-[60%] h-[30vh] lg:h-screen relative flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, rgba(46, 125, 50, 0.85) 0%, rgba(46, 125, 50, 0.7) 100%), 
                       url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200') center/cover`
        }}
      >
        <div className="text-white px-8 lg:px-12 text-center lg:text-left max-w-xl">
          <h1 className="text-2xl lg:text-4xl font-bold leading-relaxed mb-4">
            让每一次环保，
            <br />
            都值得被看见。
          </h1>
          <p className="text-sm lg:text-base opacity-90 hidden lg:block">
            记录你的每一次绿色行动，积累积分，兑换奖励，共建美好校园。
          </p>
        </div>
        
        {/* 装饰元素 */}
        <div className="absolute bottom-0 left-0 w-full h-20 lg:h-32 bg-gradient-to-t from-green-primary/30 to-transparent" />
      </div>

      {/* 右侧登录卡片 */}
      <div className="lg:w-[40%] flex-1 flex items-center justify-center bg-gray-50 p-6 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-card p-8 lg:p-10 animate-fadeIn">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 text-green-primary">
              <Leaf className="w-full h-full" strokeWidth={2} />
            </div>
            <span className="text-2xl font-bold text-green-primary">绿光华农</span>
          </div>

          {/* 标题 */}
          <h2 className="text-xl font-semibold text-green-primary mb-6">欢迎登录</h2>

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 学号输入框 */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1.5">学号/工号</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="请输入学号或工号"
                className={`w-full h-12 px-4 border rounded-lg transition-colors outline-none
                  ${errors.studentId ? 'border-red-400 focus:border-red-500' : 'border-gray-border focus:border-green-primary'}`}
              />
              {errors.studentId && (
                <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
              )}
            </div>

            {/* 密码输入框 */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1.5">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="请输入密码"
                  className={`w-full h-12 px-4 pr-12 border rounded-lg transition-colors outline-none
                    ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-border focus:border-green-primary'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* 验证码 */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1.5">验证码</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  placeholder="请输入验证码"
                  maxLength={4}
                  className={`flex-1 h-12 px-4 border rounded-lg transition-colors outline-none uppercase
                    ${errors.captcha ? 'border-red-400 focus:border-red-500' : 'border-gray-border focus:border-green-primary'}`}
                />
                <div 
                  className="w-28 h-12 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer select-none group relative overflow-hidden"
                  onClick={refreshCaptcha}
                >
                  <span 
                    className="text-xl font-bold tracking-widest text-green-primary"
                    style={{ 
                      fontFamily: 'monospace',
                      letterSpacing: '4px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {captchaCode}
                  </span>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <RefreshCw size={16} className="text-gray-600" />
                  </div>
                </div>
              </div>
              {errors.captcha && (
                <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>
              )}
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-13 bg-green-primary text-white text-lg font-medium rounded-lg 
                hover:bg-green-hover transition-colors btn-press disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 py-3"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  登录中...
                </>
              ) : '登录'}
            </button>

            {/* 注册按钮 */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full h-12 border border-green-primary text-green-primary rounded-lg 
                hover:bg-green-light transition-colors btn-press"
            >
              注册新账号
            </button>
          </form>

          {/* 底部链接 */}
          <div className="flex justify-between items-center mt-6 text-sm">
            <a href="#" className="text-blue-link hover:underline">
              使用统一身份认证登录
            </a>
            <a href="#" className="text-gray-text hover:text-gray-600">
              隐私协议
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
