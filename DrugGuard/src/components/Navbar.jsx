import { useNavigate } from 'react-router-dom'

export default function Navbar({ userRole, onLogout }) {
  const navigate = useNavigate()

  const roleInfo = {
    inspector: { title: 'Drug Inspector', color: 'from-blue-600 to-blue-400' },
    wholesaler: { title: 'Wholesaler', color: 'from-green-600 to-green-400' },
    retailer: { title: 'Retailer', color: 'from-purple-600 to-purple-400' },
    authority: { title: 'Higher Authority', color: 'from-orange-600 to-orange-400' }
  }

  const current = roleInfo[userRole] || roleInfo.inspector

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const handleHome = () => {
    const dashboardPath = {
      inspector: '/inspector/dashboard',
      wholesaler: '/wholesaler/dashboard',
      retailer: '/retailer/dashboard',
      authority: '/authority/dashboard'
    }
    navigate(dashboardPath[userRole] || '/')
  }

  return (
    <nav className={`bg-gradient-to-r ${current.color} text-white shadow-xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95 border-b border-white/10 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleHome}>
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">💊</div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm group-hover:text-white/90 transition-colors">DrugGuard</h1>
              <p className="text-xs font-medium opacity-90 tracking-wider uppercase">{current.title}</p>
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold tracking-wide">User Account</p>
              <p className="text-xs opacity-80 font-medium">Logged in as {current.title}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

  )
}