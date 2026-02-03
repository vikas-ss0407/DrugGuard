export default function SalesHistory() {
  const salesData = [
    { id: 1, billNo: 'WHL-001-2024', retailer: 'City Pharmacy', date: '2024-02-03', amount: '₹12,500', items: 1, status: 'Delivered' },
    { id: 2, billNo: 'WHL-002-2024', retailer: 'Main Street Clinic', date: '2024-02-02', amount: '₹8,500', items: 1, status: 'In Transit' },
    { id: 3, billNo: 'WHL-003-2024', retailer: 'Central Pharmacy', date: '2024-02-01', amount: '₹30,000', items: 1, status: 'Delivered' },
    { id: 4, billNo: 'WHL-004-2024', retailer: 'Green Valley Hospital', date: '2024-01-31', amount: '₹4,500', items: 1, status: 'Delivered' },
    { id: 5, billNo: 'WHL-005-2024', retailer: 'Elite Retailers', date: '2024-01-30', amount: '₹5,250', items: 1, status: 'Pending' },
  ]

  const stats = [
    { label: 'Total Sales', value: '₹60,750', icon: '💰', color: 'from-green-600 to-green-500' },
    { label: 'Avg Order Value', value: '₹12,150', icon: '📊', color: 'from-blue-600 to-blue-500' },
    { label: 'Total Bills', value: '5', icon: '📋', color: 'from-purple-600 to-purple-500' },
    { label: 'Completed Orders', value: '3', icon: '✓', color: 'from-orange-600 to-orange-500' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500 text-white'
      case 'In Transit': return 'bg-blue-500 text-white'
      case 'Pending': return 'bg-yellow-500 text-white'
      default: return 'bg-slate-500 text-white'
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sales History</h1>
          <p className="text-slate-400">View all your sales transactions</p>
        </div>

        {/* Stats */}
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

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search bill number..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search retailer..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bill Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Retailer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id} className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{sale.billNo}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.retailer}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.date}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.items}</td>
                    <td className="px-6 py-4 text-slate-300 font-semibold text-green-400">{sale.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sale.status)}`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">View</button>
                      <button className="text-green-400 hover:text-green-300 text-sm font-semibold">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}