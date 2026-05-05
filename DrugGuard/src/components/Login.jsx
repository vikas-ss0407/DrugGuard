import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginInspector } from '../api/druginspector/inspectorApi';
import { loginWholesaler } from '../api/wholesaler/wholesalerApi';
import { loginRetailer } from '../api/retailer/retailerApi';
import { 
  ShieldCheckIcon, 
  ChevronLeftIcon,
  ExclamationCircleIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  
  const resolvedRole = roleParam === 'inspector' || roleParam === 'wholesaler' || roleParam === 'retailer'
    ? roleParam
    : null;

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const roleDetails = {
    inspector: { title: 'Drug Inspector', path: '/inspector/dashboard', icon: <MagnifyingGlassIcon className="w-8 h-8" /> },
    wholesaler: { title: 'Wholesaler', path: '/wholesaler/dashboard', icon: <BeakerIcon className="w-8 h-8" /> },
    retailer: { title: 'Retailer', path: '/retailer/dashboard', icon: <BuildingStorefrontIcon className="w-8 h-8" /> }
  };

  const currentRole = roleDetails[resolvedRole] || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resolvedRole) {
      setErrors({ message: 'Select a role from the home page before signing in.' });
      return;
    }

    if (resolvedRole === 'inspector' && !formData.username.includes('@')) {
      setErrors({ message: 'Inspector login requires your email address.' });
      return;
    }

    setLoading(true);
    try {
      if (resolvedRole === 'inspector') {
        await loginInspector(formData.username.trim(), formData.password);
      } else if (resolvedRole === 'wholesaler') {
        await loginWholesaler(formData.username.trim(), formData.password);
      } else if (resolvedRole === 'retailer') {
        await loginRetailer(formData.username.trim(), formData.password);
      }
      onLogin(resolvedRole);
      navigate(currentRole.path);
    } catch (error) {
      setErrors({ message: error.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-6 font-sans text-white relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors font-bold uppercase tracking-[0.2em] text-[10px]"
        >
          <ChevronLeftIcon className="w-4 h-4" /> Return to Portal
        </button>

        {/* Login Card */}
        <div className="bg-[#1E293B]/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-1">
          <div className="bg-[#1E293B]/60 p-8 md:p-10 rounded-[2.3rem]">
            
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                 <div className="bg-amber-500 p-4 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)] text-[#0F172A]">
                    {currentRole?.icon || <ShieldCheckIcon className="w-8 h-8" />}
                 </div>
              </div>
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Access Terminal</h1>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                System Role: <span className="text-amber-500">{currentRole?.title || 'Undefined'}</span>
              </p>
            </div>

            {/* Error Message */}
            {errors.message && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-red-400 text-xs font-bold uppercase tracking-tight leading-tight">
                  {errors.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identity Field */}
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">
                  {resolvedRole === 'inspector' ? 'Official Email' : 'Authorized Username'}
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={resolvedRole === 'inspector' ? 'name@druginspector.gov' : 'Enter username'}
                  className="w-full px-6 py-4 rounded-xl bg-[#0F172A] border border-white/5 text-white placeholder-slate-600 outline-none transition-all focus:border-amber-500/50 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] font-semibold"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 ml-1">Secret Key</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 rounded-xl bg-[#0F172A] border border-white/5 text-white placeholder-slate-600 outline-none transition-all focus:border-amber-500/50 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] font-semibold"
                  required
                />
              </div>

              {/* Utilities */}
              <div className="flex items-center justify-between px-1 text-[10px] font-black uppercase tracking-widest">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded-sm bg-[#0F172A] border-white/10 accent-amber-500" />
                  Keep Session
                </label>
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">Credential Recovery</a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 rounded-xl bg-amber-500 text-[#0F172A] font-black text-xs hover:bg-amber-400 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] uppercase tracking-[0.2em] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-[#0F172A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : "Execute Sign In"}
              </button>

              {!resolvedRole && (
                <p className="text-center text-[10px] text-amber-500/80 font-bold uppercase tracking-wider">
                  Select a valid node from the dashboard to continue.
                </p>
              )}
            </form>

            {/* Support Info */}
            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Node Information</p>
              <div className="bg-[#0F172A]/80 border border-white/5 rounded-xl p-4">
                <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">
                  {resolvedRole === 'inspector' 
                    ? 'Official Demo: coimbatore@gmail.com / Cbe@641001' 
                    : 'System credentials for Wholesalers/Retailers are issued by the District Inspector.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Footer */}
        <p className="text-center mt-12 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
          DrugGuard Regulatory Network — 2026
        </p>
      </div>
    </div>
  );
}