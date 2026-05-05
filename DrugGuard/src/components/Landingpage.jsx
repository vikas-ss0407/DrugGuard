import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  ShieldCheckIcon, 
  BeakerIcon, 
  BuildingStorefrontIcon, 
  MagnifyingGlassIcon,
  ChevronRightIcon,
  CheckBadgeIcon,
  PhoneIcon,
  ArrowRightIcon,
  CircleStackIcon,
  DocumentCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const FeatureCard = ({ icon: Icon, title, desc, size = "normal" }) => (
  <div className={`group relative p-8 rounded-2xl bg-[#1E293B]/40 backdrop-blur-xl border border-white/5 transition-all duration-500 hover:border-amber-500/40 hover:-translate-y-2 ${size === 'large' ? 'md:col-span-2' : ''}`}>
    <div className="w-14 h-14 rounded-xl bg-[#0F172A] shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
      <Icon className="w-8 h-8 text-amber-500" />
    </div>
    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h4>
    <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const roles = [
    { 
      id: 'inspector', 
      title: 'Drug Inspector', 
      tagline: 'REGULATORY BODY', 
      description: 'Complete oversight of pharma licensing, compliance audits, and problematic trend detection.', 
      icon: <MagnifyingGlassIcon className="w-8 h-8" /> 
    },
    { 
      id: 'wholesaler', 
      title: 'Wholesaler Hub', 
      tagline: 'SUPPLY CHAIN', 
      description: 'Bridge the gap between manufacturers and retailers with automated ledger reconciliation.', 
      icon: <BeakerIcon className="w-8 h-8" /> 
    },
    { 
      id: 'retailer', 
      title: 'Licensed Retailer', 
      tagline: 'POINT OF SALE', 
      description: 'Verify stock authenticity instantly with the "Smart Handshake" protocol for every batch.', 
      icon: <BuildingStorefrontIcon className="w-8 h-8" /> 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-white selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-8 ${scrollY > 30 ? 'py-4 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-amber-500 p-1.5 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              <ShieldCheckIcon className="w-6 h-6 text-[#0F172A]" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DrugGuard</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-400">
            {['Portal', 'Infrastructure', 'Workflow'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-amber-500 transition-colors uppercase tracking-widest text-[11px]">{item}</button>
            ))}
            <button 
              onClick={() => navigate('/login?role=inspector')} 
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-[#0F172A] rounded-lg font-bold text-xs transition-all shadow-lg"
            >
              ACCESS TERMINAL
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-48 pb-32 px-8 border-b border-white/5 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-amber-500/20">
            Official Distribution Portal
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
            The Gold Standard of <br />
            <span className="text-amber-500">Pharma Trust.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Eliminating counterfeit drug entry through an immutable, real-time ledger connecting Inspectors, Wholesalers, and Retailers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => scrollToSection('portal')} 
              className="px-10 py-4 bg-amber-500 text-[#0F172A] rounded-xl font-bold text-sm transition-all hover:bg-amber-400 hover:-translate-y-1 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              DEPLOY SYSTEM
            </button>
            <button className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-sm transition-all hover:bg-white/10">
              WHITEPAPER
            </button>
          </div>

          <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-center"><p className="text-2xl font-black italic">FDA</p><p className="text-[10px] tracking-widest uppercase font-bold">Compliant</p></div>
             <div className="text-center"><p className="text-2xl font-black italic">WHO</p><p className="text-[10px] tracking-widest uppercase font-bold">Standards</p></div>
             <div className="text-center"><p className="text-2xl font-black italic">HIPAA</p><p className="text-[10px] tracking-widest uppercase font-bold">Verified</p></div>
          </div>
        </div>
      </header>

      {/* --- ROLE PORTAL --- */}
      <section id="portal" className="px-8 py-24 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div 
              key={role.id} 
              onClick={() => navigate(`/login?role=${role.id}`)} 
              className="group bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl cursor-pointer hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-3"
            >
              <div className="w-16 h-16 rounded-xl bg-[#0F172A] text-amber-500 flex items-center justify-center shadow-inner mb-8 group-hover:scale-110 transition-transform duration-500">
                {role.icon}
              </div>
              <span className="text-amber-500 font-bold text-[10px] uppercase tracking-widest">{role.tagline}</span>
              <h3 className="text-3xl font-bold text-white mt-2 mb-4 group-hover:text-amber-500 transition-colors">{role.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{role.description}</p>
              <div className="flex items-center gap-3 text-amber-500 font-bold text-[11px] tracking-widest uppercase group-hover:gap-5 transition-all">
                Open Portal <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- INFRASTRUCTURE --- */}
      <section id="infrastructure" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">NETWORK CAPABILITIES</h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={DocumentCheckIcon} title="Compliance Vault" desc="Automated license tracking and expiration alerts for every retail node in the network." />
          <FeatureCard icon={ShieldCheckIcon} title="The Handshake" desc="Mutual ledger syncing ensures stock cannot be fabricated or double-sold." />
          <FeatureCard icon={ChartBarIcon} title="Anomaly Radar" desc="AI-driven audit logs flag high-volume purchases or unusual stock movements instantly." />
          <FeatureCard icon={CircleStackIcon} title="Batch Verification" desc="Direct API links to manufacturers for authentic batch-ID cross-referencing and validation." size="large" />
          <FeatureCard icon={MagnifyingGlassIcon} title="Inspector HQ" desc="Global view of all shop histories, staff records, and violation points for regulatory use." />
        </div>
      </section>

      {/* --- WORKFLOW --- */}
      <section id="workflow" className="py-24 px-8">
        <div className="max-w-6xl mx-auto bg-[#0A0F1C] border border-white/5 p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none"></div>
          <h2 className="text-center text-sm font-bold mb-20 uppercase tracking-[0.5em] text-amber-500">The 4-Step Chain</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {[
              { t: "Creation", d: "Factory Batching" }, 
              { t: "Bulk Flow", d: "Wholesale Move" }, 
              { t: "Reception", d: "Retailer Sync" }, 
              { t: "Audit", d: "State Oversight" }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-black text-white/5 mb-[-25px] select-none">0{i + 1}</div>
                <h4 className="text-xl font-bold text-white mb-2">{step.t}</h4>
                <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pt-24 pb-12 px-8 border-t border-white/5 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">Need Technical Assistance?</h2>
              <p className="text-slate-400 font-medium">Our system engineers are available 24/7 for nodal support and system implementation.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Terminal ID or Email" 
                className="px-6 py-4 bg-[#1E293B] rounded-xl border border-white/10 focus:outline-none focus:border-amber-500 transition-colors text-sm min-w-[300px]" 
              />
              <button className="px-8 py-4 bg-amber-500 text-[#0F172A] font-bold rounded-xl text-xs hover:bg-amber-400 transition-all uppercase tracking-widest">
                Contact Admin
              </button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-amber-500" />
              <span>© 2026 DRUGGUARD REGULATORY SYSTEMS</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-amber-500 transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Infrastructure</a>
              <a href="#" className="hover:text-white transition-colors">API Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}