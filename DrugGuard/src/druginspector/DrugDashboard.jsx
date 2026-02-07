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
    <div className="p-6 md:p-10 bg-[#020617] min-h-screen w-full overflow-x-hidden text-slate-100">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">Inspector Dashboard</h1>
          <p className="text-slate-400 text-lg">Real-time monitoring of controlled drug distribution</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className={`relative overflow-hidden bg-gradient-to-br ${stat.color} rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group`}>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-start justify-between mb-6 relative z-10">
                <h3 className="text-sm font-bold uppercase tracking-wider opacity-90">{stat.label}</h3>
                <span className="text-4xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
              </div>
              <p className="text-5xl font-extrabold tracking-tight relative z-10">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Pending Alerts */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-red-500 rounded-full"></span>
            Pending Alerts
          </h2>
          <div className="grid gap-4">
            {pendingAlerts.map((alert) => (
              <div key={alert.id} className="bg-slate-800/50 hover:bg-slate-800 rounded-xl p-6 border-l-4 border-red-500 transition-colors duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">{alert.type}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      alert.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                  <p className="text-slate-400 text-sm font-medium">{alert.entity}</p>
                </div>
                <div className="text-red-400 text-sm font-bold bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                  {alert.daysLeft ? `⚠️ ${alert.daysLeft} days remaining` : `⚠️ ${alert.discrepancy || alert.daysOverdue + ' days overdue'}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}