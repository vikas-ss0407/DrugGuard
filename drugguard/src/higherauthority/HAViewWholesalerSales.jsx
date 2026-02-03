export default function HAViewWholesalerSales() {
  const salesData = [
    { id: 1, wholesaler: 'MediCorp Wholesale', totalSales: '₹25,00,000', transactions: 125, drugs: 45, avgTransactionValue: '₹20,000', lastTransaction: '2024-02-03' },
    { id: 2, wholesaler: 'HealthCare Distributors', totalSales: '₹18,50,000', transactions: 98, drugs: 38, avgTransactionValue: '₹18,877', lastTransaction: '2024-02-02' },
    { id: 3, wholesaler: 'Prime Pharmaceuticals', totalSales: '₹31,25,000', transactions: 156, drugs: 52, avgTransactionValue: '₹20,032', lastTransaction: '2024-02-03' },
    { id: 4, wholesaler: 'Global Medical Supplies', totalSales: '₹12,75,000', transactions: 64, drugs: 30, avgTransactionValue: '₹19,922', lastTransaction: '2024-02-01' },
    { id: 5, wholesaler: 'Premium Drugs Ltd', totalSales: '₹8,50,000', transactions: 42, drugs: 22, avgTransactionValue: '₹20,238', lastTransaction: '2024-01-30' }
  ]

  const stats = [
    { label: 'Total Sales Value', value: '₹96,00,000', icon: '💰' },
    { label: 'Total Transactions', value: '485', icon: '📊' },
    { label: 'Avg Transaction Value', value: '₹19,794', icon: '📈' },
    { label: 'Active Wholesalers', value: '5', icon: '📦' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wholesaler Sales Analytics</h1>
          <p className="text-slate-400">System-wide wholesaler sales data (Read-Only)</p>
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
            placeholder="Search wholesaler..."
            disabled
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed"
          />
          <select disabled className="px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed">
            <option>All Wholesalers</option>
          </select>
          <p className="text-slate-400 text-sm self-center italic">Read-Only View</p>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Wholesaler Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Sales Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Transactions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Unique Drugs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Avg Trans. Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Transaction</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">View Details</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{sale.wholesaler}</td>
                    <td className="px-6 py-4 text-slate-300 font-bold text-lg">{sale.totalSales}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.transactions}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.drugs}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.avgTransactionValue}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.lastTransaction}</td>
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