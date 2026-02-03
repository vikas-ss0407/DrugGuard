import { useNavigate } from 'react-router-dom'

export default function Landingpage() {
  const navigate = useNavigate()

  const roles = [
    {
      id: 'inspector',
      title: 'Drug Inspector',
      description: 'Monitor and manage controlled drug distribution across all wholesalers and retailers',
      icon: '🔍',
      color: 'from-blue-600 to-blue-400'
    },
    {
      id: 'wholesaler',
      title: 'Wholesaler',
      description: 'Manage drug inventory, sales to retailers, and stock distribution',
      icon: '📦',
      color: 'from-green-600 to-green-400'
    },
    {
      id: 'retailer',
      title: 'Retailer',
      description: 'Purchase drugs from wholesalers, manage inventory, and track sales',
      icon: '🏪',
      color: 'from-purple-600 to-purple-400'
    },
    {
      id: 'authority',
      title: 'Higher Authority',
      description: 'View reports, analytics, and compliance data in read-only mode',
      icon: '📊',
      color: 'from-orange-600 to-orange-400'
    }
  ]

  const handleRoleSelect = (roleId) => {
    navigate(`/login?role=${roleId}`)
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-8 shadow-lg">
        <div className="w-full px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">💊</div>
            <h1 className="text-4xl font-bold">DrugGuard</h1>
          </div>
          <p className="text-lg text-blue-100">
            Centralized Controlled Drug Distribution Monitoring System
          </p>
          <p className="text-blue-200 mt-2">
            Ensuring transparency, compliance, and safety in pharmaceutical distribution
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Select Your Role</h2>
          <p className="text-xl text-slate-300">
            Choose your role to access the system and manage controlled drug distribution
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className={`bg-gradient-to-br ${role.color} rounded-lg p-8 text-white shadow-lg hover:shadow-2xl transition-shadow h-full`}>
                <div className="text-5xl mb-4">{role.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-sm opacity-90 mb-6">{role.description}</p>
                <button className="w-full bg-white text-slate-900 font-semibold py-2 rounded-lg hover:bg-slate-100 transition-colors">
                  Continue →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="bg-slate-800 rounded-lg p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-6">System Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Real-time Monitoring</h4>
                <p className="text-slate-400">Track drug movement from wholesalers to retailers in real-time</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Compliance Tracking</h4>
                <p className="text-slate-400">Monitor license verification and regulatory compliance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Stock Management</h4>
                <p className="text-slate-400">Manage inventory and stock levels across the network</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Comprehensive Reporting</h4>
                <p className="text-slate-400">Generate detailed reports and compliance analytics</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Audit Trails</h4>
                <p className="text-slate-400">Complete audit logs for transparency and accountability</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Role-Based Access</h4>
                <p className="text-slate-400">Secure, role-specific access control for all users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="w-full text-center">
          <p>&copy; 2024-2026 DrugGuard System. All rights reserved.</p>
          <p className="mt-2 text-sm">Government-Grade Controlled Drug Distribution Monitoring</p>
        </div>
      </div>
    </div>
  )
}