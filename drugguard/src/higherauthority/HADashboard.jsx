export default function HADashboard() {
  const stats = [
    { label: 'Total Wholesalers', value: '45', icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Retailers', value: '128', icon: '🏪', color: 'from-green-500 to-green-600' },
    { label: 'Total Transactions', value: '2,450', icon: '💳', color: 'from-purple-500 to-purple-600' },
    { label: 'Compliance Rate', value: '94.5%', icon: '✓', color: 'from-orange-500 to-orange-600' }
  ]

  const recentTransactions = [
    { id: 1, wholesaler: 'MediCorp Wholesale', retailer: 'City Pharmacy', drug: 'Paracetamol 500mg', quantity: 5000, date: '2024-02-03', status: 'Completed' },
    { id: 2, wholesaler: 'HealthCare Distributors', retailer: 'Main Street Clinic', drug: 'Amoxicillin 250mg', quantity: 2000, date: '2024-02-02', status: 'Pending' },
    { id: 3, wholesaler: 'Prime Pharmaceuticals', retailer: 'Green Valley Hospital', drug: 'Ibuprofen 400mg', quantity: 1000, date: '2024-02-01', status: 'Completed' }
  ]

  const complianceSummary = [
    { category: 'Fully Compliant', count: 135, percentage: 75, color: 'bg-green-500' },
    { category: 'Partial Compliance', count: 38, percentage: 21, color: 'bg-yellow-500' },
    { category: 'Non-Compliant', count: 0, percentage: 0, color: 'bg-red-500' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Higher Authority Dashboard</h1>
          <p className="text-slate-400">System-wide analytics and compliance overview (Read-Only)</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">{stat.label}</h3>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">View All →</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Wholesaler</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Retailer</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Drug</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Qty</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="py-3 px-4 text-slate-300">{tx.wholesaler}</td>
                      <td className="py-3 px-4 text-slate-300">{tx.retailer}</td>
                      <td className="py-3 px-4 text-slate-300">{tx.drug}</td>
                      <td className="py-3 px-4 text-slate-300">{tx.quantity}</td>
                      <td className="py-3 px-4 text-slate-300">{tx.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tx.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Summary */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Compliance Summary</h2>
            <div className="space-y-4">
              {complianceSummary.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-semibold">{item.category}</span>
                    <span className="text-white font-bold">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Read-Only Notice */}
        <div className="mt-8 bg-blue-500/20 border border-blue-500 rounded-lg p-6">
          <p className="text-blue-300">
            <span className="font-semibold">ℹ️ Read-Only Access:</span> This dashboard displays aggregated data for oversight. You can view reports and analytics but cannot modify any records. For changes, contact the Drug Inspector.
          </p>
        </div>
      </div>
    </div>
  )
}