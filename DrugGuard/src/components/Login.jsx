import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Package, Store, BarChart3, 
  ArrowLeft, Lock, User, ShieldCheck, 
  ChevronRight, AlertCircle, Fingerprint 
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '', role: 'inspector' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleDetails = {
    inspector: { 
      title: 'Drug Inspector', 
      path: '/inspector/dashboard', 
      icon: <Search />, 
      color: 'blue', 
      accent: 'text-blue-400',
      bg: 'from-blue-600/20' 
    },
    wholesaler: { 
      title: 'Wholesaler', 
      path: '/wholesaler/dashboard', 
      icon: <Package />, 
      color: 'emerald', 
      accent: 'text-emerald-400',
      bg: 'from-emerald-600/20' 
    },
    retailer: { 
      title: 'Retailer', 
      path: '/retailer/dashboard', 
      icon: <Store />, 
      color: 'purple', 
      accent: 'text-purple-400',
      bg: 'from-purple-600/20' 
    },
    authority: { 
      title: 'Higher Authority', 
      path: '/authority/dashboard', 
      icon: <BarChart3 />, 
      color: 'orange', 
      accent: 'text-orange-400',
      bg: 'from-orange-600/20' 
    }
  };

  const currentRole = roleDetails[formData.role];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || 'Login failed' });
        setIsLoading(false);
        return;
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Call onLogin with the role
      onLogin(data.user.role);

      // Navigate to the appropriate dashboard
      navigate(currentRole.path);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Failed to connect to server. Make sure backend is running.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Dynamic Glow */}
      <div className={`absolute inset-0 bg-gradient-to-t ${currentRole.bg} to-transparent opacity-30 transition-colors duration-700`} />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:text-blue-400" />
          <span className="text-sm font-medium tracking-wide uppercase">Switch Role</span>
        </motion.button>

        {/* Login Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Top Security Banner */}
          <div className={`h-2 w-full bg-gradient-to-r from-transparent via-${currentRole.color}-500 to-transparent opacity-50`} />
          
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`w-20 h-20 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-xl ${currentRole.accent}`}
              >
                {React.cloneElement(currentRole.icon, { size: 40 })}
              </motion.div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Secure Access</h1>
              <p className="text-slate-400 font-medium uppercase text-xs tracking-[0.2em]">
                {currentRole.title} Portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.submit && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-red-400">{errors.submit}</span>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Select Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-2xl bg-slate-950 border transition-all outline-none text-white
                    ${errors.role ? 'border-red-500/50' : 'border-white/5 focus:border-blue-500/50'}`}
                >
                  <option value="">-- Select your role --</option>
                  <option value="inspector">Drug Inspector</option>
                  <option value="wholesaler">Wholesaler</option>
                  <option value="retailer">Retailer</option>
                  <option value="authority">Higher Authority</option>
                </select>
                {errors.role && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs flex items-center gap-1 ml-1">
                    <AlertCircle className="w-3 h-3" /> {errors.role}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950 border transition-all outline-none text-white
                      ${errors.username ? 'border-red-500/50' : 'border-white/5 focus:border-blue-500/50'}`}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs flex items-center gap-1 ml-1">
                    <AlertCircle className="w-3 h-3" /> {errors.username}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950 border transition-all outline-none text-white
                      ${errors.password ? 'border-red-500/50' : 'border-white/5 focus:border-blue-500/50'}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs flex items-center gap-1 ml-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </motion.p>
                )}
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-slate-950 checked:bg-blue-500 transition-all" />
                  <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">Remember me</span>
                </label>
                <button type="button" className="text-xs text-blue-400 hover:text-blue-300 font-medium">Forgot password?</button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`relative w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all shadow-lg overflow-hidden
                  ${isLoading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-white text-black hover:bg-blue-500 hover:text-white'}`}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="flex items-center justify-center gap-2"
                    >
                      <Fingerprint className="w-5 h-5 animate-pulse" />
                      Verifying...
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="normal"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Login <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Security Badge */}
            <div className="mt-10 flex flex-col items-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> End-to-End Encrypted
              </div>
              <p className="mt-6 text-slate-600 text-[10px] uppercase tracking-tighter">
                Hardware ID: <span className="text-slate-500">DG-8829-441-X</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-slate-600 text-xs font-medium uppercase tracking-widest">
          DrugGuard Central Intelligence — 2026
        </p>
      </motion.div>
    </div>
  );
}