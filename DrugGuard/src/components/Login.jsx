import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginInspector } from '../api/druginspector/inspectorApi'
import { loginWholesaler } from '../api/wholesaler/wholesalerApi'
import { loginRetailer } from '../api/retailer/retailerApi'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const roleParam = searchParams.get('role')

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const roleDetails = {
    inspector: { title: 'Drug Inspector', path: '/inspector/dashboard', icon: '🔍' },
    wholesaler: { title: 'Wholesaler', path: '/wholesaler/dashboard', icon: '📦' },
    retailer: { title: 'Retailer', path: '/retailer/dashboard', icon: '🏪' }
  }

  const currentRole = roleDetails[roleParam] || roleDetails.inspector

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      if (roleParam === 'inspector' || !roleParam) {
        await loginInspector(formData.username.trim(), formData.password)
      } else if (roleParam === 'wholesaler') {
        await loginWholesaler(formData.username.trim(), formData.password)
      } else if (roleParam === 'retailer') {
        await loginRetailer(formData.username.trim(), formData.password)
      }

      onLogin(roleParam || 'inspector')
      navigate(currentRole.path)
    } catch (error) {
      setErrors({
        general: error.message || 'Unable to sign in'
      })
    }
  }

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-md px-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          ← Back to Roles
        </button>

        {/* Login Card */}
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentRole.icon}</div>
            <h1 className="text-3xl font-bold text-white mb-2">DrugGuard Login</h1>
            <p className="text-slate-400">
              {currentRole.title}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.username ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-red-400 text-sm">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.password ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 hover:text-slate-300 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Sign In
            </button>
            {errors.general && <p className="text-red-400 text-sm text-center">{errors.general}</p>}
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm mb-4">Demo Credentials</p>
            <div className="bg-slate-700 rounded p-4 space-y-2 text-sm text-slate-300">
              <div><span className="font-semibold">Inspector:</span> coimbatore@gmail.com / Cbe@641001</div>
              <div><span className="font-semibold">Wholesaler/Retailer:</span> Use license credentials created by inspector</div>
              <p className="text-slate-500 mt-2 italic">This screen now uses Firebase + backend APIs</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>&copy; 2024-2026 DrugGuard System</p>
        </div>
      </div>
    </div>
  )
}