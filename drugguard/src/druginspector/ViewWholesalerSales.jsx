export default function ViewWholesalerSales() {
  const sales = [
    { id: 1, wholesaler: 'MediCorp Wholesale', drug: 'Paracetamol 500mg', quantity: 5000, amount: '₹125,000', retailersSold: 12, date: '2024-02-03' },
    { id: 2, wholesaler: 'HealthCare Distributors', drug: 'Amoxicillin 250mg', quantity: 2000, amount: '₹85,000', retailersSold: 8, date: '2024-02-02' },
    { id: 3, wholesaler: 'Prime Pharmaceuticals', drug: 'Ibuprofen 400mg', quantity: 8000, amount: '₹240,000', retailersSold: 20, date: '2024-02-01' },
    { id: 4, wholesaler: 'MediCorp Wholesale', drug: 'Aspirin 75mg', quantity: 3000, amount: '₹45,000', retailersSold: 6, date: '2024-01-31' },
    { id: 5, wholesaler: 'HealthCare Distributors', drug: 'Cough Syrup', quantity: 1500, amount: '₹52,500', retailersSold: 10, date: '2024-01-30' },
  ]

  const stats = [
    { label: 'Total Sales', value: '₹5,47,500', icon: '💰' },
    { label: 'Drugs Sold', value: '19,500 units', icon: '📦' },
    { label: 'Wholesalers', value: '3', icon: '🏭' },
    { label: 'Retailers Served', value: '56', icon: '🏪' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wholesaler Sales</h1>
          <p className="text-slate-400">Monitor all sales transactions from wholesalers</p>
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
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search drug name..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Wholesaler</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Retailers</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{sale.wholesaler}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.drug}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.quantity} units</td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{sale.amount}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.retailersSold}</td>
                    <td className="px-6 py-4 text-slate-300">{sale.date}</td>
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