import { useEffect, useMemo, useState } from 'react'
import { getInspectorWholesalerSales } from '../api/druginspector/wholesalerSalesApi'

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(Number(value) || 0)
}

function buildShops(transactions) {
  const byWholesaler = new Map()

  transactions.forEach((tx) => {
    const key = tx.wholesalerId || 'unknown'
    if (!byWholesaler.has(key)) {
      byWholesaler.set(key, {
        id: key,
        name: tx.wholesalerName || 'Unknown Wholesaler',
        licenseNo: tx.wholesalerLicenseNo || '',
        totalBills: 0,
        totalQuantity: 0
      })
    }

    const shop = byWholesaler.get(key)
    shop.totalBills += 1
    shop.totalQuantity += Number(tx.quantity) || 0
  })

  return Array.from(byWholesaler.values())
}

export default function ViewWholesalerSales() {
  const [view, setView] = useState('shops')
  const [selectedShop, setSelectedShop] = useState(null)
  const [selectedBill, setSelectedBill] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const session = JSON.parse(localStorage.getItem('dg_user') || '{}')
      const district = session.district || ''

      if (!district) {
        if (isMounted) {
          setLoadError('Inspector district not found in session. Please login again.')
          setTransactions([])
          setIsLoading(false)
        }
        return
      }

      try {
        if (isMounted) {
          setIsLoading(true)
          setLoadError('')
        }

        const response = await getInspectorWholesalerSales(district)

        if (!isMounted) {
          return
        }

        setTransactions(Array.isArray(response.transactions) ? response.transactions : [])
      } catch (error) {
        if (!isMounted) {
          return
        }

        setLoadError(error.message || 'Failed to load wholesaler sales from backend')
        setTransactions([])
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const shops = useMemo(() => buildShops(transactions), [transactions])

  const selectedShopTransactions = useMemo(() => {
    if (!selectedShop) {
      return []
    }

    return transactions.filter((tx) => tx.wholesalerId === selectedShop.id)
  }, [selectedShop, transactions])

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return transactions
    }

    return transactions.filter((tx) => {
      return (
        String(tx.productName || '').toLowerCase().includes(query) ||
        String(tx.billId || '').toLowerCase().includes(query)
      )
    })
  }, [searchQuery, transactions])

  const handleShopClick = (shop) => {
    setSelectedShop(shop)
    setSelectedBill(null)
    setView('bills')
  }

  const handleBillClick = (bill) => {
    setSelectedBill(bill)
    setView('products')
  }

  const handleBackToShops = () => {
    setSelectedShop(null)
    setSelectedBill(null)
    setView('shops')
  }

  const handleBackToBills = () => {
    setSelectedBill(null)
    setView('bills')
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {view !== 'shops' && (
              <button
                onClick={view === 'bills' ? handleBackToShops : handleBackToBills}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                ← Back
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {view === 'shops' && 'Wholesaler Sales'}
                {view === 'bills' && `Bills - ${selectedShop?.name}`}
                {view === 'products' && `Bill Details - ${selectedBill?.billId}`}
              </h1>
              <p className="text-slate-400">
                {view === 'shops' && 'Data is loaded directly from database transactions'}
                {view === 'bills' && 'Sales entries by selected wholesaler'}
                {view === 'products' && 'Transaction product details'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Search by Product Name or Bill ID</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product or bill id..."
            className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {searchQuery && (
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-4">Search Results ({filteredTransactions.length})</h4>
              {filteredTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-slate-300">Bill ID</th>
                        <th className="px-4 py-3 text-left text-slate-300">Date</th>
                        <th className="px-4 py-3 text-left text-slate-300">Product</th>
                        <th className="px-4 py-3 text-left text-slate-300">Quantity</th>
                        <th className="px-4 py-3 text-left text-slate-300">Retailer</th>
                        <th className="px-4 py-3 text-left text-slate-300">Wholesaler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                          <td className="px-4 py-3 text-blue-400 font-semibold">{tx.billId}</td>
                          <td className="px-4 py-3 text-slate-300">{tx.date || '-'}</td>
                          <td className="px-4 py-3 text-slate-300 font-semibold">{tx.productName || '-'}</td>
                          <td className="px-4 py-3 text-slate-300">{formatNumber(tx.quantity)}</td>
                          <td className="px-4 py-3 text-slate-300">{tx.retailerName || '-'}</td>
                          <td className="px-4 py-3 text-blue-400">{tx.wholesalerName || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">No transactions found matching "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>

        {loadError && <div className="mb-6 rounded-lg border border-red-700 bg-red-900/40 p-4 text-red-200">{loadError}</div>}

        {isLoading && (
          <div className="bg-slate-800 rounded-lg p-10 border border-slate-700 text-center text-slate-300">
            Loading wholesaler sales from database...
          </div>
        )}

        {!isLoading && view === 'shops' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{shop.name}</h3>
                    <p className="text-slate-400 text-sm">License: {shop.licenseNo || '-'}</p>
                  </div>
                  <span className="text-3xl">🏭</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-700">
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Total Bills</p>
                    <p className="text-white font-bold text-lg">{shop.totalBills}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Total Qty Sold</p>
                    <p className="text-green-400 font-bold text-lg">{formatNumber(shop.totalQuantity)}</p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <span className="text-blue-400 text-sm">View Bills →</span>
                </div>
              </div>
            ))}

            {shops.length === 0 && (
              <div className="col-span-full bg-slate-800 rounded-lg p-10 border border-slate-700 text-center text-slate-400">
                No wholesaler sales found for your district.
              </div>
            )}
          </div>
        )}

        {!isLoading && view === 'bills' && selectedShop && (
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bill ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Retailer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedShopTransactions.map((tx) => (
                    <tr key={tx.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-blue-400 font-semibold">{tx.billId}</td>
                      <td className="px-6 py-4 text-slate-300">{tx.date || '-'}</td>
                      <td className="px-6 py-4 text-slate-300">{tx.retailerName || '-'}</td>
                      <td className="px-6 py-4 text-slate-300">{tx.productName || '-'}</td>
                      <td className="px-6 py-4 text-slate-300">{formatNumber(tx.quantity)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBillClick(tx)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!isLoading && view === 'products' && selectedBill && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Bill ID</p>
                  <p className="text-white font-bold text-lg">{selectedBill.billId}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Date</p>
                  <p className="text-white font-semibold">{selectedBill.date || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Retailer</p>
                  <p className="text-white font-semibold">{selectedBill.retailerName || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Quantity</p>
                  <p className="text-green-400 font-bold text-xl">{formatNumber(selectedBill.quantity)}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-300">Product Name</th>
                      <th className="px-4 py-3 text-left text-slate-300">Quantity</th>
                      <th className="px-4 py-3 text-left text-slate-300">Wholesaler</th>
                      <th className="px-4 py-3 text-left text-slate-300">Retailer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-4 py-3 text-white font-semibold">{selectedBill.productName || '-'}</td>
                      <td className="px-4 py-3 text-slate-300">{formatNumber(selectedBill.quantity)}</td>
                      <td className="px-4 py-3 text-slate-300">{selectedBill.wholesalerName || '-'}</td>
                      <td className="px-4 py-3 text-slate-300">{selectedBill.retailerName || '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
