export default function DIDashboard() {
  const addDays = (days) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }

  const msInDay = 1000 * 60 * 60 * 24
  const today = new Date()

  // Shop/Firm licenses
  const shopLicenses = [
    { id: 1, entity: 'City Pharmacy', licenseNo: 'CHE/RT/2024/56789', expiryDate: addDays(12) },
    { id: 2, entity: 'Main Street Clinic', licenseNo: 'CHE/RT/2024/56790', expiryDate: addDays(-8) },
    { id: 3, entity: 'Central Pharmacy', licenseNo: 'CHE/RT/2024/56791', expiryDate: addDays(24) },
    { id: 4, entity: 'Green Valley Hospital', licenseNo: 'CHE/RT/2024/56792', expiryDate: addDays(-26) },
    { id: 5, entity: 'Wellness Medico', licenseNo: 'CHE/RT/2024/56793', expiryDate: addDays(70) },
  ]

  // Pharmacist/Competent person licenses
  const pharmacistLicenses = [
    { id: 1, entity: 'R. Anand (City Pharmacy)', licenseNo: 'PH/TN/2021/10211', expiryDate: addDays(5) },
    { id: 2, entity: 'S. Priya (Main Street Clinic)', licenseNo: 'PH/TN/2020/09145', expiryDate: addDays(-11) },
    { id: 3, entity: 'M. Harish (Central Pharmacy)', licenseNo: 'PH/TN/2022/12291', expiryDate: addDays(27) },
    { id: 4, entity: 'J. Keerthi (Green Valley)', licenseNo: 'PH/TN/2019/07119', expiryDate: addDays(-22) },
    { id: 5, entity: 'V. Naveen (CarePoint)', licenseNo: 'PH/TN/2023/13018', expiryDate: addDays(63) },
  ]

  const getDaysLeft = (dateString) => {
    const expiry = new Date(dateString)
    const diff = expiry.setHours(0, 0, 0, 0) - new Date(today).setHours(0, 0, 0, 0)
    return Math.ceil(diff / msInDay)
  }

  // Keep only near-expiry (0 to 30 days) and recently expired (-30 to -1 days)
  const isInOneMonthWindow = (dateString) => {
    const daysLeft = getDaysLeft(dateString)
    return daysLeft <= 30 && daysLeft >= -30
  }

  const shopExpiryAlerts = shopLicenses
    .filter((item) => isInOneMonthWindow(item.expiryDate))
    .map((item) => ({ ...item, daysLeft: getDaysLeft(item.expiryDate) }))
    .sort((a, b) => a.daysLeft - b.daysLeft)

  const pharmacistExpiryAlerts = pharmacistLicenses
    .filter((item) => isInOneMonthWindow(item.expiryDate))
    .map((item) => ({ ...item, daysLeft: getDaysLeft(item.expiryDate) }))
    .sort((a, b) => a.daysLeft - b.daysLeft)

  const renderExpiryText = (daysLeft) => {
    if (daysLeft < 0) return `Expired ${Math.abs(daysLeft)} days ago`
    if (daysLeft === 0) return 'Expires today'
    return `Expires in ${daysLeft} days`
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Drug Inspector Dashboard</h1>
          <p className="text-slate-400">License expiry monitoring (within 1 month window)</p>
        </div>

        {/* License Expiry Panels */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Shop License Expiry</h2>
            <div className="space-y-4">
              {shopExpiryAlerts.length > 0 ? (
                shopExpiryAlerts.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg p-4 border-l-4 ${item.daysLeft < 0 ? 'bg-slate-700 border-red-500' : 'bg-slate-700 border-yellow-500'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{item.entity}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${item.daysLeft < 0 ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}
                      >
                        {item.daysLeft < 0 ? 'Expired' : 'Near Expiry'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">License No: {item.licenseNo}</p>
                    <p className="text-slate-400 text-xs mb-2">Expiry Date: {item.expiryDate}</p>
                    <p className={`text-xs font-semibold ${item.daysLeft < 0 ? 'text-red-400' : 'text-yellow-300'}`}>
                      {renderExpiryText(item.daysLeft)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No shop licenses in the 1 month expiry/expired window.</p>
              )}
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Pharmacist License Expiry</h2>
            <div className="space-y-4">
              {pharmacistExpiryAlerts.length > 0 ? (
                pharmacistExpiryAlerts.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg p-4 border-l-4 ${item.daysLeft < 0 ? 'bg-slate-700 border-red-500' : 'bg-slate-700 border-yellow-500'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{item.entity}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${item.daysLeft < 0 ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}
                      >
                        {item.daysLeft < 0 ? 'Expired' : 'Near Expiry'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">License No: {item.licenseNo}</p>
                    <p className="text-slate-400 text-xs mb-2">Expiry Date: {item.expiryDate}</p>
                    <p className={`text-xs font-semibold ${item.daysLeft < 0 ? 'text-red-400' : 'text-yellow-300'}`}>
                      {renderExpiryText(item.daysLeft)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm">No pharmacist licenses in the 1 month expiry/expired window.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
