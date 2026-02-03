export default function ReturnRequests() {
  const returnRequests = [
    { id: 1, billNo: 'WHL-001-2024', retailer: 'City Pharmacy', drug: 'Paracetamol 500mg', quantity: 50, reason: 'Damaged packaging', date: '2024-02-02', status: 'Approved', refund: '₹1,250' },
    { id: 2, billNo: 'WHL-002-2024', retailer: 'Main Street Clinic', drug: 'Amoxicillin 250mg', quantity: 20, reason: 'Expired batch', date: '2024-02-01', status: 'Pending', refund: '₹850' },
    { id: 3, billNo: 'WHL-003-2024', retailer: 'Central Pharmacy', drug: 'Ibuprofen 400mg', quantity: 100, reason: 'Quality issue', date: '2024-01-30', status: 'Rejected', refund: '-' },
    { id: 4, billNo: 'WHL-005-2024', retailer: 'Elite Retailers', drug: 'Cough Syrup', quantity: 15, reason: 'Storage issue', date: '2024-01-28', status: 'Approved', refund: '₹525' }
  ]

  const stats = [
    { label: 'Total Returns', value: '185 units', icon: '↩️' },
    { label: 'Total Refunds', value: '₹2,625', icon: '💰' },
    { label: 'Pending Approval', value: '1', icon: '⏳' },
    { label: 'Approval Rate', value: '75%', icon: '✓' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-500'
      case 'Pending': return 'bg-yellow-500'
      case 'Rejected': return 'bg-red-500'
      default: return 'bg-slate-500'
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Return Requests</h1>
          <p className="text-slate-400">Manage product returns and refunds from retailers</p>
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
            placeholder="Search bill number..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Returns Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bill Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Retailer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Reason</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Refund</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {returnRequests.map((req) => (
                  <tr key={req.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{req.billNo}</td>
                    <td className="px-6 py-4 text-slate-300">{req.retailer}</td>
                    <td className="px-6 py-4 text-slate-300">{req.drug}</td>
                    <td className="px-6 py-4 text-slate-300">{req.quantity} units</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{req.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{req.refund}</td>
                    <td className="px-6 py-4">
                      {req.status === 'Pending' ? (
                        <div className="space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                          View Details
                        </button>
                      )}
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