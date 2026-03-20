import { useEffect, useState } from 'react'
import { getInspectorDashboardSummary } from '../api/druginspector/inspectorApi'

export default function DIDashboard() {
  const [shopExpiryAlerts, setShopExpiryAlerts] = useState([])
  const [pharmacistExpiryAlerts, setPharmacistExpiryAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadDashboardData() {
      const session = JSON.parse(localStorage.getItem('dg_user') || '{}')
      const district = session.district || ''

      if (!district) {
        if (isMounted) {
          setLoadError('Inspector district not found in session. Please login again.')
          setShopExpiryAlerts([])
          setPharmacistExpiryAlerts([])
          setIsLoading(false)
        }
        return
      }

      try {
        if (isMounted) {
          setIsLoading(true)
          setLoadError('')
        }

        const response = await getInspectorDashboardSummary(district)

        if (!isMounted) {
          return
        }

        setShopExpiryAlerts(Array.isArray(response.shopExpiryAlerts) ? response.shopExpiryAlerts : [])
        setPharmacistExpiryAlerts(Array.isArray(response.pharmacistExpiryAlerts) ? response.pharmacistExpiryAlerts : [])
      } catch (error) {
        if (!isMounted) {
          return
        }

        setLoadError(error.message || 'Failed to load dashboard details from backend')
        setShopExpiryAlerts([])
        setPharmacistExpiryAlerts([])
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [])

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

        {loadError && <div className="mb-6 rounded-lg border border-red-700 bg-red-900/40 p-4 text-red-200">{loadError}</div>}

        {isLoading && (
          <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-6 text-slate-300">
            Loading dashboard details from backend...
          </div>
        )}

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
