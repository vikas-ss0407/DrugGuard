export default function ViewRetailerPurchases() {
  const purchases = [
    { id: 1, retailer: 'City Pharmacy', wholesaler: 'MediCorp Wholesale', drug: 'Paracetamol 500mg', quantity: 500, amount: '₹12,500', date: '2024-02-03', status: 'Delivered' },
    { id: 2, retailer: 'Main Street Clinic', wholesaler: 'HealthCare Distributors', drug: 'Amoxicillin 250mg', quantity: 200, amount: '₹8,500', date: '2024-02-02', status: 'In Transit' },
    { id: 3, retailer: 'Central Pharmacy', wholesaler: 'Prime Pharmaceuticals', drug: 'Ibuprofen 400mg', quantity: 1000, amount: '₹30,000', date: '2024-02-01', status: 'Delivered' },
    { id: 4, retailer: 'Green Valley Hospital', wholesaler: 'MediCorp Wholesale', drug: 'Aspirin 75mg', quantity: 300, amount: '₹4,500', date: '2024-01-31', status: 'Delivered' },
    { id: 5, retailer: 'Elite Retailers', wholesaler: 'HealthCare Distributors', drug: 'Cough Syrup', quantity: 150, amount: '₹5,250', date: '2024-01-30', status: 'Pending Approval' },
  ]

  const stats = [
    { label: 'Total Purchases', value: '₹60,750', icon: '💳' },
    { label: 'Drugs Purchased', value: '2,150 units', icon: '📦' },
    { label: 'Active Retailers', value: '5', icon: '🏪' },
    { label: 'Wholesalers Used', value: '3', icon: '🏭' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500'
      case 'In Transit': return 'bg-blue-500'
      case 'Pending Approval': return 'bg-yellow-500'
      default: return 'bg-slate-500'
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Retailer Purchases</h1>
          <p className="text-slate-400">Monitor all purchase transactions from retailers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg p-6 text-white shadow-lg">
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
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search wholesaler..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Delivered</option>
            <option>In Transit</option>
            <option>Pending Approval</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Retailer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Wholesaler</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{purchase.retailer}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.wholesaler}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.drug}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.quantity} units</td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{purchase.amount}</td>
                    <td className="px-6 py-4 text-slate-300">{purchase.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(purchase.status)}`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 text-right">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            📥 Export Report
          </button>
        </div>
      </div>
    </div>
  )
}