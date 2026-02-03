export default function AuditLogs() {
  const auditLogs = [
    { id: 1, timestamp: '2024-02-03 14:30:22', user: 'Inspector_001', action: 'Wholesaler Account Created', entity: 'MediCorp Wholesale', details: 'New wholesaler account registration completed', status: 'Success' },
    { id: 2, timestamp: '2024-02-03 13:45:15', user: 'Inspector_002', action: 'License Verification', entity: 'City Pharmacy', details: 'License documents approved and verified', status: 'Success' },
    { id: 3, timestamp: '2024-02-03 12:20:45', user: 'System', action: 'Stock Discrepancy Alert', entity: 'HealthCare Distributors', details: 'Stock variance detected: 50 units', status: 'Alert' },
    { id: 4, timestamp: '2024-02-03 11:15:30', user: 'Inspector_001', action: 'Retailer Account Created', entity: 'Central Pharmacy', details: 'New retailer account registration completed', status: 'Success' },
    { id: 5, timestamp: '2024-02-02 16:50:12', user: 'Inspector_003', action: 'Report Generated', entity: 'All Entities', details: 'Compliance report generated for review', status: 'Success' },
    { id: 6, timestamp: '2024-02-02 15:30:45', user: 'System', action: 'License Expiry Warning', entity: 'Main Street Clinic', details: 'License expiring in 5 days', status: 'Warning' },
    { id: 7, timestamp: '2024-02-02 14:20:00', user: 'Inspector_002', action: 'Transaction Approved', entity: 'MediCorp to City Pharmacy', details: 'Drug transaction approved and logged', status: 'Success' },
    { id: 8, timestamp: '2024-02-01 13:45:30', user: 'Inspector_001', action: 'Data Modification', entity: 'Elite Retailers', details: 'Profile information updated', status: 'Success' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-green-500/20 text-green-400'
      case 'Warning': return 'bg-yellow-500/20 text-yellow-400'
      case 'Alert': return 'bg-red-500/20 text-red-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Audit Logs</h1>
          <p className="text-slate-400">Complete system audit trail and activity log</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Total Actions</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Successful</h3>
            <p className="text-3xl font-bold">6</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Warnings</h3>
            <p className="text-3xl font-bold">1</p>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Alerts</h3>
            <p className="text-3xl font-bold">1</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search action..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search user..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Success</option>
            <option>Warning</option>
            <option>Alert</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Audit Logs Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User/System</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Entity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 text-sm font-mono">{log.timestamp}</td>
                    <td className="px-6 py-4 text-slate-300">{log.user}</td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{log.action}</td>
                    <td className="px-6 py-4 text-slate-300">{log.entity}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{log.details}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-slate-400">Showing 1-8 of 8 entries</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50">← Previous</button>
            <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50">Next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}