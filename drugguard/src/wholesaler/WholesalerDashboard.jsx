export default function WholesalerDashboard() {
  const stats = [
    { label: 'Available Stock', value: '15,400 units', icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Retailers Served', value: '38', icon: '🏪', color: 'from-green-500 to-green-600' },
    { label: 'Monthly Sales', value: '₹8,50,000', icon: '💰', color: 'from-purple-500 to-purple-600' },
    { label: 'Pending Orders', value: '7', icon: '📋', color: 'from-orange-500 to-orange-600' }
  ]

  const recentSales = [
    { id: 1, retailer: 'City Pharmacy', drug: 'Paracetamol 500mg', quantity: 500, amount: '₹12,500', date: '2024-02-03', status: 'Delivered' },
    { id: 2, retailer: 'Main Street Clinic', drug: 'Amoxicillin 250mg', quantity: 200, amount: '₹8,500', date: '2024-02-02', status: 'In Transit' },
    { id: 3, retailer: 'Central Pharmacy', drug: 'Ibuprofen 400mg', quantity: 1000, amount: '₹30,000', date: '2024-02-01', status: 'Delivered' },
  ]

  const topSellingDrugs = [
    { rank: 1, drug: 'Paracetamol 500mg', sold: 5000, revenue: '₹1,25,000' },
    { rank: 2, drug: 'Aspirin 75mg', sold: 3000, revenue: '₹45,000' },
    { rank: 3, drug: 'Ibuprofen 400mg', sold: 2500, revenue: '₹75,000' },
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Wholesaler Dashboard</h1>
          <p className="text-slate-400">Overview of your sales and inventory</p>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Sales */}
          <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Sales</h2>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">View All →</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Retailer</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Drug</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Qty</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="py-3 px-4 text-slate-300">{sale.retailer}</td>
                      <td className="py-3 px-4 text-slate-300">{sale.drug}</td>
                      <td className="py-3 px-4 text-slate-300">{sale.quantity}</td>
                      <td className="py-3 px-4 text-slate-300">{sale.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sale.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Selling Drugs */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Top Selling Drugs</h2>
            <div className="space-y-4">
              {topSellingDrugs.map((drug) => (
                <div key={drug.rank} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-white">{drug.drug}</p>
                      <p className="text-xs text-slate-400">#{drug.rank} Best Seller</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-400">{drug.rank}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{drug.sold} units</span>
                    <span className="text-green-400 font-semibold">{drug.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}