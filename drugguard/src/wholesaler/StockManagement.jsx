export default function StockManagement() {
  const inventory = [
    { id: 1, drug: 'Paracetamol 500mg', currentStock: 5000, minStock: 2000, maxStock: 10000, lastRestocked: '2024-01-25', status: 'Optimal' },
    { id: 2, drug: 'Aspirin 75mg', currentStock: 3000, minStock: 1500, maxStock: 8000, lastRestocked: '2024-01-20', status: 'Optimal' },
    { id: 3, drug: 'Ibuprofen 400mg', currentStock: 2500, minStock: 2000, maxStock: 7000, lastRestocked: '2024-02-01', status: 'Optimal' },
    { id: 4, drug: 'Amoxicillin 250mg', currentStock: 1500, minStock: 1000, maxStock: 5000, lastRestocked: '2024-02-02', status: 'Low Stock' },
    { id: 5, drug: 'Cough Syrup', currentStock: 800, minStock: 500, maxStock: 3000, lastRestocked: '2024-01-15', status: 'Critical' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimal': return 'bg-green-500'
      case 'Low Stock': return 'bg-yellow-500'
      case 'Critical': return 'bg-red-500'
      default: return 'bg-slate-500'
    }
  }

  const getProgressColor = (current, min, max) => {
    const percentage = ((current - min) / (max - min)) * 100
    if (percentage > 70) return 'bg-green-500'
    if (percentage > 30) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * 100), 0)

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Stock Management</h1>
          <p className="text-slate-400">Manage your drug inventory and stock levels</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Total Inventory Value</h3>
            <p className="text-3xl font-bold">₹{(totalValue / 100000).toFixed(1)}L+</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Total Units</h3>
            <p className="text-3xl font-bold">12,800</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Critical Stock Items</h3>
            <p className="text-3xl font-bold">1</p>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Current Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Min/Max</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Stock Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Last Restocked</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => {
                  const percentage = ((item.currentStock - item.minStock) / (item.maxStock - item.minStock)) * 100
                  return (
                    <tr key={item.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-slate-300 font-semibold">{item.drug}</td>
                      <td className="px-6 py-4 text-slate-300">{item.currentStock} units</td>
                      <td className="px-6 py-4 text-slate-300">{item.minStock} / {item.maxStock}</td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-slate-700 rounded-full h-2 max-w-xs">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(item.currentStock, item.minStock, item.maxStock)}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{item.lastRestocked}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className={`px-3 py-1 rounded-lg text-sm font-semibold text-white transition-colors ${
                          item.status === 'Critical' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                        }`}>
                          {item.status === 'Critical' ? 'Restock Now' : 'Restock'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 text-right">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            📥 Export Inventory
          </button>
        </div>
      </div>
    </div>
  )
}