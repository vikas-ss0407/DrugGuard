import { useNavigate } from 'react-router-dom'

export default function Navbar({ userRole, onLogout }) {
  const navigate = useNavigate()

  let inspectorDistrict = ''
  let shopName = ''
  try {
    const session = JSON.parse(localStorage.getItem('dg_user') || '{}')
    inspectorDistrict = session.district || ''
    shopName =
      session.shopFirmName ||
      session.companyName ||
      session.username ||
      session.email ||
      ''
  } catch {
    inspectorDistrict = ''
    shopName = ''
  }

  const roleInfo = {
    inspector: { title: 'Drug Inspector', color: 'from-blue-600 to-blue-400' },
    wholesaler: { title: 'Wholesaler', color: 'from-green-600 to-green-400' },
    retailer: { title: 'Retailer', color: 'from-purple-600 to-purple-400' }
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
      retailer: '/retailer/dashboard'
    }
    navigate(dashboardPath[userRole] || '/')
  }

  return (
    <nav className={`bg-gradient-to-r ${current.color} text-white shadow-lg sticky top-0 z-50`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleHome}>
            <div className="text-3xl">💊</div>
            <div>
              <h1 className="text-2xl font-bold">DrugGuard</h1>
              <p className="text-xs opacity-90">{current.title}</p>
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-semibold">User Account</p>
              <p className="text-xs opacity-90">Logged in as {current.title}</p>
              {(userRole === 'wholesaler' || userRole === 'retailer') && shopName && (
                <p className="text-xs opacity-90">Shop: {shopName}</p>
              )}
              {userRole === 'inspector' && inspectorDistrict && (
                <p className="text-xs opacity-90">District: {inspectorDistrict}</p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}