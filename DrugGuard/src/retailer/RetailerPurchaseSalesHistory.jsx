export default function RetailerPurchaseSalesHistory() {
  const transactions = [
    { id: 1, type: 'Purchase', reference: 'WHL-001-2024', entity: 'MediCorp Wholesale', drug: 'Paracetamol 500mg', quantity: 500, amount: '₹12,500', date: '2024-02-03', status: 'Completed' },
    { id: 2, type: 'Sale', reference: 'CST-001-2024', entity: 'Customer - John Doe', drug: 'Paracetamol 500mg', quantity: 100, amount: '₹3,000', date: '2024-02-03', status: 'Completed' },
    { id: 3, type: 'Purchase', reference: 'WHL-002-2024', entity: 'HealthCare Distributors', drug: 'Amoxicillin 250mg', quantity: 200, amount: '₹8,500', date: '2024-02-02', status: 'Delivered' },
    { id: 4, type: 'Sale', reference: 'CST-002-2024', entity: 'Customer - Jane Smith', drug: 'Aspirin 75mg', quantity: 50, amount: '₹1,000', date: '2024-02-01', status: 'Completed' },
    { id: 5, type: 'Purchase', reference: 'WHL-003-2024', entity: 'Prime Pharmaceuticals', drug: 'Ibuprofen 400mg', quantity: 1000, amount: '₹30,000', date: '2024-02-01', status: 'Delivered' }
  ]

  const stats = [
    { label: 'Total Purchases', value: '₹51,000', icon: '🛒' },
    { label: 'Total Sales', value: '₹4,000', icon: '💳' },
    { label: 'Profit Margin', value: '21%', icon: '📈' },
    { label: 'Transactions', value: '5', icon: '📊' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Purchase & Sales History</h1>
          <p className="text-slate-400">View all your purchase and sales transactions</p>
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
            placeholder="Search reference..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Transactions</option>
            <option>Purchases Only</option>
            <option>Sales Only</option>
          </select>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Reference</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Entity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        tx.type === 'Purchase' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{tx.reference}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.entity}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.drug}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.quantity} units</td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{tx.amount}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                        {tx.status}
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
            📥 Export History
          </button>
        </div>
      </div>
    </div>
  )
}