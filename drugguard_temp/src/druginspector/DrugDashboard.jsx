export default function DIDashboard() {
  // Mock data
  const stats = [
    { label: 'Total Wholesalers', value: '45', icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Retailers', value: '128', icon: '🏪', color: 'from-green-500 to-green-600' },
    { label: 'Pending Alerts', value: '12', icon: '🚨', color: 'from-red-500 to-red-600' }
  ]

  const pendingAlerts = [
    { id: 1, type: 'License Expiry', entity: 'Quality Pharmacy', daysLeft: 5, severity: 'High' },
    { id: 2, type: 'Stock Discrepancy', entity: 'Metro Wholesale', discrepancy: '50 units', severity: 'Medium' },
    { id: 3, type: 'Overdue Documentation', entity: 'Elite Retailers', daysOverdue: 3, severity: 'Medium' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Drug Inspector Dashboard</h1>
          <p className="text-slate-400">Real-time monitoring of controlled drug distribution</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">{stat.label}</h3>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Pending Alerts */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">Pending Alerts</h2>
          <div className="space-y-4">
            {pendingAlerts.map((alert) => (
              <div key={alert.id} className="bg-slate-700 rounded-lg p-4 border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{alert.type}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    alert.severity === 'High' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{alert.entity}</p>
                <p className="text-red-400 text-xs font-semibold">
                  {alert.daysLeft ? `⚠️ ${alert.daysLeft} days remaining` : `⚠️ ${alert.discrepancy || alert.daysOverdue + ' days overdue'}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}