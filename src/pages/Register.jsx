import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Eye, EyeOff, RefreshCw, ArrowLeft, CheckCircle, User, Mail, Lock, Phone } from 'lucide-react'

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: 填写信息, 2: 验证, 3: 完成
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    verifyCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.studentId.trim()) {
      newErrors.studentId = '请输入学号/工号'
    }
    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名'
    }
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入手机号'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入有效的手机号'
    }
    if (!formData.password) {
      newErrors.password = '请输入密码'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次密码输入不一致'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendCode = async () => {
    if (countdown > 0) return
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleNextStep = async () => {
    if (step === 1) {
      if (!validateStep1()) return
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsLoading(false)
      setStep(2)
      handleSendCode()
    } else if (step === 2) {
      if (!formData.verifyCode) {
        setErrors({ verifyCode: '请输入验证码' })
        return
      }
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
      setStep(3)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      {/* 学号 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1.5">学号/工号</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="请输入学号或工号"
            className={`w-full h-12 pl-10 pr-4 border rounded-lg outline-none transition-colors
              ${errors.studentId ? 'border-red-400' : 'border-gray-200 focus:border-green-primary'}`}
          />
        </div>
        {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
      </div>

      {/* 姓名 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1.5">姓名</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="请输入真实姓名"
          className={`w-full h-12 px-4 border rounded-lg outline-none transition-colors
            ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-green-primary'}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* 邮箱 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1.5">校园邮箱</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="请输入校园邮箱"
            className={`w-full h-12 pl-10 pr-4 border rounded-lg outline-none transition-colors
              ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-green-primary'}`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* 手机号 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1.5">手机号</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="请输入手机号"
            className={`w-full h-12 pl-10 pr-4 border rounded-lg outline-none transition-colors
              ${errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-green-primary'}`}
          />
        </div>
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* 密码 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1.5">设置密码</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="请设置6位以上密码"
            className={`w-full h-12 pl-10 pr-12 border rounded-lg outline-none transition-colors
              ${errors.password ? 'border-red-400' : 'border-gray-200 focus:border-green-primary'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {/* 确认密码 */}
      <div>
        <label className="block text-sm text-gray-600 mb-1.5">确认密码</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="请再次输入密码"
          className={`w-full h-12 px-4 border rounded-lg outline-none transition-colors
            ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200 focus:border-green-primary'}`}
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-green-primary" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">验证您的邮箱</h3>
      <p className="text-sm text-gray-500 mb-6">
        验证码已发送至 <span className="text-green-primary">{formData.email}</span>
      </p>

      <div className="max-w-xs mx-auto">
        <input
          type="text"
          name="verifyCode"
          value={formData.verifyCode}
          onChange={handleChange}
          placeholder="请输入6位验证码"
          maxLength={6}
          className={`w-full h-12 px-4 border rounded-lg outline-none text-center text-xl tracking-widest
            ${errors.verifyCode ? 'border-red-400' : 'border-gray-200 focus:border-green-primary'}`}
        />
        {errors.verifyCode && <p className="text-red-500 text-xs mt-2">{errors.verifyCode}</p>}

        <button
          onClick={handleSendCode}
          disabled={countdown > 0}
          className="mt-3 text-sm text-green-primary hover:underline disabled:text-gray-400 disabled:no-underline"
        >
          {countdown > 0 ? `${countdown}秒后重新发送` : '重新发送验证码'}
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold text-green-primary mb-2">注册成功！</h3>
      <p className="text-gray-500 mb-6">欢迎加入绿光华农，开启您的环保之旅</p>
      
      <div className="bg-green-50 rounded-lg p-4 mb-6 text-left max-w-sm mx-auto">
        <p className="text-sm text-gray-600">
          <span className="font-medium">新手福利：</span>首次登录将获得 <span className="text-orange-500 font-bold">50积分</span> 奖励！
        </p>
      </div>

      <button
        onClick={() => navigate('/login')}
        className="w-full max-w-xs mx-auto h-12 bg-green-primary text-white rounded-lg hover:bg-green-hover transition-colors"
      >
        立即登录
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-card p-6 lg:p-8 animate-fadeIn">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-6">
          {step < 3 && (
            <button
              onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div className="flex items-center gap-2 mx-auto">
            <Leaf className="w-6 h-6 text-green-primary" />
            <span className="text-xl font-bold text-green-primary">绿光华农</span>
          </div>
          {step < 3 && <div className="w-9" />}
        </div>

        {/* 步骤指示器 */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step >= s ? 'bg-green-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s}
                </div>
                {s < 2 && (
                  <div className={`w-12 h-1 mx-1 rounded ${step > s ? 'bg-green-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* 标题 */}
        {step === 1 && <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">创建新账号</h2>}

        {/* 内容 */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* 下一步按钮 */}
        {step < 3 && (
          <button
            onClick={handleNextStep}
            disabled={isLoading}
            className="w-full h-12 bg-green-primary text-white rounded-lg hover:bg-green-hover 
              transition-colors mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                处理中...
              </>
            ) : step === 1 ? '下一步' : '验证'}
          </button>
        )}

        {/* 底部链接 */}
        {step === 1 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            已有账号？
            <button onClick={() => navigate('/login')} className="text-green-primary hover:underline ml-1">
              立即登录
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Register
