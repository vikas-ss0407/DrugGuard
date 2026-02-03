export default function WholesalerProfile() {
  const profile = {
    companyName: 'MediCorp Wholesale',
    registrationNumber: 'WHL-REG-2020-001',
    email: 'contact@medicorp.in',
    phone: '+91-9876543210',
    address: '45, Industrial Park, Delhi-110001',
    warehouseArea: '10,000 Sq. Ft.',
    temperature: '15-25°C',
    humidity: '40-60%'
  }

  const pharmacist = {
    name: 'Dr. Rajesh Kumar',
    license: 'PH-LIC-2019-0045',
    email: 'rajesh@medicorp.in',
    registeredDate: '2019-03-15'
  }

  const license = {
    status: 'Valid',
    issueDate: '2023-01-10',
    expiryDate: '2025-12-31',
    issuedBy: 'Ministry of Health & Family Welfare'
  }

  const documents = [
    { name: 'GST Certificate', uploadedDate: '2023-01-10', status: 'Verified' },
    { name: 'Business License', uploadedDate: '2023-01-10', status: 'Verified' },
    { name: 'Pharmacist License', uploadedDate: '2023-01-10', status: 'Verified' },
    { name: 'Warehouse Photos', uploadedDate: '2023-01-10', status: 'Verified' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile & License Details</h1>
          <p className="text-slate-400">Your company information and documentation</p>
        </div>

        {/* Company Info Card */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-1">Company Name</p>
              <p className="text-white font-semibold text-lg">{profile.companyName}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Registration Number</p>
              <p className="text-white font-semibold text-lg">{profile.registrationNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Email Address</p>
              <p className="text-white font-semibold">{profile.email}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Phone Number</p>
              <p className="text-white font-semibold">{profile.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-slate-400 text-sm mb-1">Address</p>
              <p className="text-white font-semibold">{profile.address}</p>
            </div>
          </div>
        </div>

        {/* Infrastructure Details */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Infrastructure Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-1">Warehouse Area</p>
              <p className="text-white font-semibold text-lg">{profile.warehouseArea}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Temperature Control</p>
              <p className="text-white font-semibold">{profile.temperature}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Humidity Range</p>
              <p className="text-white font-semibold">{profile.humidity}</p>
            </div>
          </div>
        </div>

        {/* Pharmacist Details */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Responsible Pharmacist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-1">Name</p>
              <p className="text-white font-semibold text-lg">{pharmacist.name}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">License Number</p>
              <p className="text-white font-semibold">{pharmacist.license}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Email</p>
              <p className="text-white font-semibold">{pharmacist.email}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Registered Date</p>
              <p className="text-white font-semibold">{pharmacist.registeredDate}</p>
            </div>
          </div>
        </div>

        {/* License Status */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">License Status</h2>
          <div className="flex items-start gap-8">
            <div>
              <p className="text-slate-400 text-sm mb-1">License Status</p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <p className="text-white font-semibold text-lg">{license.status}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Issue Date</p>
              <p className="text-white font-semibold">{license.issueDate}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Expiry Date</p>
              <p className="text-white font-semibold">{license.expiryDate}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Issued By</p>
              <p className="text-white font-semibold text-sm">{license.issuedBy}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Uploaded Documents</h2>
          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="text-white font-semibold">{doc.name}</p>
                    <p className="text-slate-400 text-sm">Uploaded: {doc.uploadedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                    {doc.status}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 font-semibold">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-500/20 border border-blue-500 rounded-lg p-6">
          <p className="text-blue-300">
            <span className="font-semibold">Note:</span> All information is read-only and verified by the Drug Inspector. For updates, please contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  )
}