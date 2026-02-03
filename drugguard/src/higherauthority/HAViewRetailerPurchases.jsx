export default function HAViewRetailerPurchases() {
  const purchasesData = [
    { id: 1, retailer: 'City Pharmacy', wholesaler: 'MediCorp Wholesale', totalPurchases: '₹15,50,000', transactions: 78, drugs: 35, lastPurchase: '2024-02-03', status: 'Active' },
    { id: 2, retailer: 'Main Street Clinic', wholesaler: 'HealthCare Distributors', totalPurchases: '₹12,00,000', transactions: 62, drugs: 28, lastPurchase: '2024-02-02', status: 'Active' },
    { id: 3, retailer: 'Health Plus Pharmacy', wholesaler: 'Prime Pharmaceuticals', totalPurchases: '₹18,75,000', transactions: 95, drugs: 42, lastPurchase: '2024-02-03', status: 'Active' },
    { id: 4, retailer: 'Community Care Shop', wholesaler: 'Global Medical Supplies', totalPurchases: '₹8,50,000', transactions: 45, drugs: 20, lastPurchase: '2024-02-01', status: 'Active' },
    { id: 5, retailer: 'Downtown Medical Store', wholesaler: 'Premium Drugs Ltd', totalPurchases: '₹6,25,000', transactions: 32, drugs: 15, lastPurchase: '2024-01-30', status: 'Active' }
  ]

  const stats = [
    { label: 'Total Purchases Value', value: '₹61,00,000', icon: '💳' },
    { label: 'Total Transactions', value: '312', icon: '📋' },
    { label: 'Active Retailers', value: '5', icon: '🏪' },
    { label: 'Unique Drugs Purchased', value: '140', icon: '💊' }
  ]

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-400 bg-green-500/20' : 'text-yellow-400 bg-yellow-500/20'
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Retailer Purchases Analytics</h1>
          <p className="text-slate-400">System-wide retailer purchase data (Read-Only)</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">{stat.label}</h3>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search retailer..."
            disabled
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Search wholesaler..."
            disabled
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed"
          />
          <select disabled className="px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed">
            <option>All Status</option>
          </select>
          <p className="text-slate-400 text-sm self-center italic">Read-Only View</p>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Retailer Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Wholesaler</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Purchases</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Transactions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Unique Drugs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Purchase</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">View Details</th>
                </tr>
              </thead>
              <tbody>
                {purchasesData.map((purchase) => (
                  <tr key={purchase.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{purchase.retailer}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.wholesaler}</td>
                    <td className="px-6 py-4 text-slate-300 font-bold text-lg">{purchase.totalPurchases}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.transactions}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.drugs}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.lastPurchase}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(purchase.status)}`}>
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button disabled className="text-slate-400 cursor-not-allowed text-sm font-semibold">
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 text-right">
          <button disabled className="px-6 py-2 bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed font-semibold">
            📥 Export Report (Disabled)
          </button>
        </div>
      </div>
    </div>
  )
}