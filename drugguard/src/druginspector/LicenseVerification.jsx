export default function LicenseVerification() {
  const licenses = [
    { id: 1, entity: 'MediCorp Wholesale', type: 'Wholesaler', status: 'Verified', expiryDate: '2025-12-15', verifiedDate: '2024-01-10' },
    { id: 2, entity: 'City Pharmacy', type: 'Retailer', status: 'Verified', expiryDate: '2024-08-20', verifiedDate: '2023-08-20' },
    { id: 3, entity: 'HealthCare Distributors', type: 'Wholesaler', status: 'Pending Review', expiryDate: '2024-06-30', verifiedDate: '-' },
    { id: 4, entity: 'Main Street Clinic', type: 'Retailer', status: 'Expired', expiryDate: '2024-01-15', verifiedDate: '2022-01-15' },
    { id: 5, entity: 'Prime Pharmaceuticals', type: 'Wholesaler', status: 'Verified', expiryDate: '2025-09-10', verifiedDate: '2024-02-01' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-green-500'
      case 'Pending Review': return 'bg-yellow-500'
      case 'Expired': return 'bg-red-500'
      default: return 'bg-slate-500'
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">License & Document Verification</h1>
          <p className="text-slate-400">Review and verify licenses for all wholesalers and retailers</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700 flex gap-4">
          <input
            type="text"
            placeholder="Search entity name..."
            className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Types</option>
            <option>Wholesaler</option>
            <option>Retailer</option>
          </select>
          <select className="px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Verified</option>
            <option>Pending Review</option>
            <option>Expired</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Entity Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Expiry Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Verified Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((license) => (
                  <tr key={license.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300">{license.entity}</td>
                    <td className="px-6 py-4 text-slate-300">{license.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(license.status)}`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{license.expiryDate}</td>
                    <td className="px-6 py-4 text-slate-300">{license.verifiedDate}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        View Documents
                      </button>
                      {license.status === 'Pending Review' && (
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                          Approve
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