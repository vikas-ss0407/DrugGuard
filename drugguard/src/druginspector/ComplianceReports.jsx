export default function ComplianceReports() {
  const complianceData = [
    { id: 1, entity: 'MediCorp Wholesale', type: 'Wholesaler', temperatureCompliance: '98%', docCompliance: '100%', licenseStatus: 'Valid', overallScore: 'A' },
    { id: 2, entity: 'City Pharmacy', type: 'Retailer', temperatureCompliance: '95%', docCompliance: '98%', licenseStatus: 'Valid', overallScore: 'A' },
    { id: 3, entity: 'HealthCare Distributors', type: 'Wholesaler', temperatureCompliance: '92%', docCompliance: '95%', licenseStatus: 'Valid', overallScore: 'B+' },
    { id: 4, entity: 'Main Street Clinic', type: 'Retailer', temperatureCompliance: '88%', docCompliance: '90%', licenseStatus: 'Expiring Soon', overallScore: 'B' },
    { id: 5, entity: 'Prime Pharmaceuticals', type: 'Wholesaler', temperatureCompliance: '96%', docCompliance: '100%', licenseStatus: 'Valid', overallScore: 'A' },
  ]

  const getScoreColor = (score) => {
    if (score.includes('A')) return 'text-green-500 bg-green-500/20'
    if (score.includes('B')) return 'text-yellow-500 bg-yellow-500/20'
    return 'text-red-500 bg-red-500/20'
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Compliance Reports</h1>
          <p className="text-slate-400">Monitor compliance metrics for all entities</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Fully Compliant</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Partial Compliance</h3>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Avg Temperature</h3>
            <p className="text-3xl font-bold">94%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold opacity-90 mb-2">Doc Compliance</h3>
            <p className="text-3xl font-bold">97%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search entity..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option>
            <option>Wholesaler</option>
            <option>Retailer</option>
          </select>
        </div>

        {/* Compliance Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Entity Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Temperature</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Documentation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">License Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Details</th>
                </tr>
              </thead>
              <tbody>
                {complianceData.map((data) => (
                  <tr key={data.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{data.entity}</td>
                    <td className="px-6 py-4 text-slate-300">{data.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-700 rounded-full h-2 max-w-xs">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${data.temperatureCompliance}` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-300">{data.temperatureCompliance}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-700 rounded-full h-2 max-w-xs">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${data.docCompliance}` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-300">{data.docCompliance}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">{data.licenseStatus}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getScoreColor(data.overallScore)}`}>
                        {data.overallScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
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
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            📥 Export Report
          </button>
        </div>
      </div>
    </div>
  )
}