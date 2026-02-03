export default function StockMovementReports() {
  const movements = [
    { id: 1, drug: 'Paracetamol 500mg', source: 'MediCorp (Wholesaler)', destination: 'City Pharmacy (Retailer)', quantity: 500, date: '2024-02-03', movement: 'Outbound' },
    { id: 2, drug: 'Amoxicillin 250mg', source: 'HealthCare Distributors (Wholesaler)', destination: 'Main Street Clinic (Retailer)', quantity: 200, date: '2024-02-02', movement: 'Outbound' },
    { id: 3, drug: 'Ibuprofen 400mg', source: 'Supplier', destination: 'Prime Pharmaceuticals (Wholesaler)', quantity: 10000, date: '2024-02-01', movement: 'Inbound' },
    { id: 4, drug: 'Aspirin 75mg', source: 'MediCorp (Wholesaler)', destination: 'Central Pharmacy (Retailer)', quantity: 300, date: '2024-01-31', movement: 'Outbound' },
    { id: 5, drug: 'Cough Syrup', source: 'HealthCare Distributors (Wholesaler)', destination: 'Elite Retailers (Retailer)', quantity: 150, date: '2024-01-30', movement: 'Outbound' },
  ]

  const summaryStats = [
    { label: 'Total Inbound', value: '10,000 units', color: 'from-green-600 to-green-500' },
    { label: 'Total Outbound', value: '1,150 units', color: 'from-blue-600 to-blue-500' },
    { label: 'Stock Variance', value: '0.2%', color: 'from-yellow-600 to-yellow-500' },
    { label: 'Movement Velocity', value: 'High', color: 'from-purple-600 to-purple-500' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Stock Movement Reports</h1>
          <p className="text-slate-400">Track all drug movements across the distribution network</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryStats.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}>
              <h3 className="text-sm font-semibold opacity-90 mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search drug name..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Movements</option>
            <option>Inbound</option>
            <option>Outbound</option>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Source</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Destination</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Movement Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((movement) => (
                  <tr key={movement.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{movement.drug}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{movement.source}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{movement.destination}</td>
                    <td className="px-6 py-4 text-slate-300">{movement.quantity} units</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        movement.movement === 'Inbound' ? 'bg-green-600' : 'bg-blue-600'
                      }`}>
                        {movement.movement}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{movement.date}</td>
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