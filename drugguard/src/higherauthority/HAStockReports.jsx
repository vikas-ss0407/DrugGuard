export default function HAStockReports() {
  const stockMovements = [
    { id: 1, drug: 'Paracetamol 500mg', source: 'MediCorp Wholesale', destination: 'City Pharmacy', quantity: 5000, date: '2024-02-03', type: 'Inbound', batchNo: 'BAT-2024-001' },
    { id: 2, drug: 'Amoxicillin 250mg', source: 'HealthCare Distributors', destination: 'Health Plus Pharmacy', quantity: 3000, date: '2024-02-02', type: 'Inbound', batchNo: 'BAT-2024-002' },
    { id: 3, drug: 'Ibuprofen 400mg', source: 'Prime Pharmaceuticals', destination: 'Community Care Shop', quantity: 2500, date: '2024-02-03', type: 'Inbound', batchNo: 'BAT-2024-003' },
    { id: 4, drug: 'Metformin 500mg', source: 'City Pharmacy', destination: 'Patient', quantity: 150, date: '2024-02-01', type: 'Outbound', batchNo: 'BAT-2024-001' },
    { id: 5, drug: 'Lisinopril 10mg', source: 'Health Plus Pharmacy', destination: 'Patient', quantity: 200, date: '2024-02-03', type: 'Outbound', batchNo: 'BAT-2024-002' }
  ]

  const complianceMetrics = [
    { entity: 'MediCorp Wholesale', temperatureCompliance: 98, docCompliance: 100, licenseStatus: 'Valid', overallScore: 'A', lastAudit: '2024-02-01' },
    { entity: 'HealthCare Distributors', temperatureCompliance: 96, docCompliance: 98, licenseStatus: 'Valid', overallScore: 'A', lastAudit: '2024-01-28' },
    { entity: 'Prime Pharmaceuticals', temperatureCompliance: 92, docCompliance: 95, licenseStatus: 'Valid', overallScore: 'B+', lastAudit: '2024-01-25' },
    { entity: 'City Pharmacy', temperatureCompliance: 94, docCompliance: 100, licenseStatus: 'Valid', overallScore: 'A', lastAudit: '2024-02-02' },
    { entity: 'Health Plus Pharmacy', temperatureCompliance: 89, docCompliance: 92, licenseStatus: 'Valid', overallScore: 'B+', lastAudit: '2024-01-30' }
  ]

  const stats = [
    { label: 'Total Stock Movements', value: '235,000 units', icon: '📦', color: 'from-blue-600 to-blue-500' },
    { label: 'Inbound vs Outbound', value: '198k / 37k', icon: '↔️', color: 'from-purple-600 to-purple-500' },
    { label: 'Avg Compliance Score', value: '94.2%', icon: '✓', color: 'from-green-600 to-green-500' },
    { label: 'Entities Monitored', value: '5 W + 5 R', icon: '🏢', color: 'from-indigo-600 to-indigo-500' }
  ]

  const getScoreColor = (score) => {
    if (score === 'A') return 'text-green-400 bg-green-500/20'
    if (score === 'B+') return 'text-blue-400 bg-blue-500/20'
    return 'text-yellow-400 bg-yellow-500/20'
  }

  const getMovementColor = (type) => {
    return type === 'Inbound' ? 'text-green-400' : 'text-blue-400'
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Stock & Compliance Reports</h1>
          <p className="text-slate-400">System-wide inventory movements and compliance metrics (Read-Only)</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-90">{stat.label}</h3>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Stock Movements Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Stock Movements</h2>
          
          {/* Filters */}
          <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700 flex gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search drug..."
              disabled
              className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed"
            />
            <select disabled className="px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed">
              <option>All Types</option>
            </select>
            <p className="text-slate-400 text-sm self-center italic">Read-Only View</p>
          </div>

          {/* Movements Table */}
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">From/To</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Batch No</th>
                  </tr>
                </thead>
                <tbody>
                  {stockMovements.map((movement) => (
                    <tr key={movement.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-slate-300 font-semibold">{movement.drug}</td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {movement.source} → {movement.destination}
                      </td>
                      <td className="px-6 py-4 text-slate-300 font-bold">{movement.quantity.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-300">{movement.date}</td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold text-sm ${getMovementColor(movement.type)}`}>
                          {movement.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{movement.batchNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Compliance Metrics Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Compliance Metrics</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complianceMetrics.map((entity) => (
              <div key={entity.entity} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">{entity.entity}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getScoreColor(entity.overallScore)}`}>
                    {entity.overallScore}
                  </span>
                </div>

                {/* Temperature Compliance */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300 text-sm font-semibold">Temperature Compliance</span>
                    <span className="text-slate-300 text-sm">{entity.temperatureCompliance}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${entity.temperatureCompliance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Documentation Compliance */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300 text-sm font-semibold">Documentation Compliance</span>
                    <span className="text-slate-300 text-sm">{entity.docCompliance}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${entity.docCompliance}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status Row */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <div>
                    <p className="text-slate-400 text-xs">License Status</p>
                    <p className="text-green-400 font-semibold">{entity.licenseStatus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Last Audit</p>
                    <p className="text-slate-300 font-semibold">{entity.lastAudit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Read-Only Notice */}
        <div className="mt-8 bg-blue-500/20 border border-blue-500 rounded-lg p-6">
          <p className="text-blue-300">
            <span className="font-semibold">ℹ️ Read-Only Access:</span> This dashboard displays comprehensive stock movements and compliance metrics across all wholesalers and retailers. No modifications are allowed from this interface.
          </p>
        </div>
      </div>
    </div>
  )
}