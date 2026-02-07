import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Package, Store, BarChart3, 
  ShieldCheck, Activity, ClipboardList, 
  ArrowRight, CheckCircle2, Lock, 
  FileText, Truck, Database, Zap
} from 'lucide-react';

export default function Landingpage() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(null);

  const roles = [
    {
      id: 'inspector',
      title: 'Drug Inspector',
      accessType: 'Regulatory Authentication',
      description: 'Full oversight of controlled substances. Verify compliance and execute digital audits.',
      icon: <Search className="w-8 h-8" />,
      color: 'from-blue-600 to-indigo-600',
      portalStyle: 'border-blue-500/50 bg-blue-500/10',
      features: ['Real-time Surveillance', 'License Verification', 'Seizure Logs']
    },
    {
      id: 'wholesaler',
      title: 'Wholesaler',
      accessType: 'B2B Inventory Terminal',
      description: 'High-volume stock management. Track shipments and verify retailer credentials.',
      icon: <Package className="w-8 h-8" />,
      color: 'from-emerald-600 to-teal-600',
      portalStyle: 'border-emerald-500/50 bg-emerald-500/10',
      features: ['Bulk Batch Tracking', 'Automated Invoicing', 'Supply Chain Analytics']
    },
    {
      id: 'retailer',
      title: 'Pharmacy Retailer',
      accessType: 'Point-of-Sale Secure Link',
      description: 'Manage local inventory and dispense controlled drugs via digital prescription verification.',
      icon: <Store className="w-8 h-8" />,
      color: 'from-purple-600 to-pink-600',
      portalStyle: 'border-purple-500/50 bg-purple-500/10',
      features: ['Dispensing Records', 'Patient Safety Alerts', 'Stock Optimization']
    },
    {
      id: 'authority',
      title: 'Higher Authority',
      accessType: 'Strategic Intelligence Suite',
      description: 'National-level data aggregation. Identify trends, risks, and systemic leaks.',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-orange-600 to-red-600',
      portalStyle: 'border-orange-500/50 bg-orange-500/10',
      features: ['Global Heatmaps', 'Predictive Modeling', 'Executive Summaries']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* --- 1. PREMIUM NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold tracking-tighter">DrugGuard<span className="text-blue-500">.</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#compliance" className="hover:text-white transition-colors">Compliance</a>
            <a href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</a>
          </div>
          <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all">
            Contact Support
          </button>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <header className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest"
          >
            <Zap className="w-3 h-3" /> System Status: Operational
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tighter leading-tight"
          >
            Digital Fort Knox for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Controlled Distribution
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            An end-to-end encrypted ecosystem for tracking, monitoring, and 
            securing pharmaceutical supply chains at a national scale.
          </motion.p>
        </div>
      </header>

      {/* --- 3. DYNAMIC ROLE PORTALS --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {roles.map((role) => (
            <motion.div
              key={role.id}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setActiveRole(role.id)}
              onMouseLeave={() => setActiveRole(null)}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${role.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
              
              <div className="relative bg-slate-900 border border-white/5 p-8 rounded-3xl h-full flex flex-col justify-between overflow-hidden">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-6 shadow-2xl shadow-black`}>
                    {role.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                  <p className="text-blue-500 text-xs font-mono mb-4 uppercase tracking-tighter">{role.accessType}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{role.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {role.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/login?role=${role.id}`)}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
                    ${activeRole === role.id ? 'bg-white text-black' : 'bg-slate-800 text-slate-300'}`}
                >
                  Enter Portal <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- 4. THE CHAIN OF CUSTODY (HOW IT WORKS) --- */}
      <section id="how-it-works" className="py-32 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Chain of Custody</h2>
            <p className="text-slate-400">The lifecycle of a controlled substance within DrugGuard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-y-12"></div>

            {[
              { step: '01', title: 'Import/Mfg', desc: 'Batches are registered with encrypted UID.', icon: <Database /> },
              { step: '02', title: 'Wholesale', desc: 'Verified transfer from depot to storage.', icon: <Truck /> },
              { step: '03', title: 'Retail', desc: 'Secure receipt and inventory logging.', icon: <Store /> },
              { step: '04', title: 'Dispense', desc: 'Final sale linked to prescription ID.', icon: <FileText /> },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-blue-500/50 flex items-center justify-center text-blue-400 mb-6 shadow-lg shadow-blue-500/10">
                  {item.icon}
                </div>
                <span className="text-blue-500 font-mono text-xs mb-2">{item.step}</span>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm px-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. INFRASTRUCTURE & TRUST --- */}
      <section id="infrastructure" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">Built for Government <br /> Scale & Security</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg h-fit"><Lock className="text-blue-500" /></div>
                  <div>
                    <h5 className="font-bold">AES-256 End-to-End Encryption</h5>
                    <p className="text-slate-400 text-sm">Data is encrypted at the source and only decodable by authorized role-keys.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg h-fit"><Activity className="text-emerald-500" /></div>
                  <div>
                    <h5 className="font-bold">Real-time Anomaly Detection</h5>
                    <p className="text-slate-400 text-sm">AI monitors for "leakage" patterns and flagged purchase quantities automatically.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/5 text-center">
                <div className="text-4xl font-bold mb-1">2M+</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">Daily Txns</div>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/5 text-center">
                <div className="text-4xl font-bold mb-1">0.0s</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">Latency</div>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/5 text-center col-span-2">
                <div className="text-xl font-bold mb-1">ISO 27001 Certified</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">International Security Standard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold tracking-tighter">DrugGuard</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6">
              The global standard for controlled substance tracking. Protecting public health through technology and transparency.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li className="hover:text-blue-400 cursor-pointer">State Governments</li>
              <li className="hover:text-blue-400 cursor-pointer">Federal Agencies</li>
              <li className="hover:text-blue-400 cursor-pointer">Pharmacy Chains</li>
              <li className="hover:text-blue-400 cursor-pointer">Hospitals</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li className="hover:text-blue-400 cursor-pointer">About Us</li>
              <li className="hover:text-blue-400 cursor-pointer">Security Certs</li>
              <li className="hover:text-blue-400 cursor-pointer">API Docs</li>
              <li className="hover:text-blue-400 cursor-pointer">Legal</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
          © 2024-2026 DrugGuard Distribution Systems. All Rights Reserved. US-PHARMA-COMPLIANT-V4.
        </div>
      </footer>
    </div>
  );
}