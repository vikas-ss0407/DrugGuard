import { useState } from 'react'

export default function ViewRetailerPurchases() {
  const [view, setView] = useState('shops') // 'shops', 'bills', 'products'
  const [selectedShop, setSelectedShop] = useState(null)
  const [selectedBill, setSelectedBill] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for retailer shops
  const shops = [
    { id: 1, name: 'City Pharmacy', licenseNo: 'CHE/RT/2024/56789', totalBills: 18, totalPurchases: '₹3,25,000' },
    { id: 2, name: 'Main Street Clinic', licenseNo: 'CHE/RT/2024/56790', totalBills: 12, totalPurchases: '₹2,15,000' },
    { id: 3, name: 'Central Pharmacy', licenseNo: 'CHE/RT/2024/56791', totalBills: 22, totalPurchases: '₹4,75,000' },
    { id: 4, name: 'Green Valley Hospital', licenseNo: 'CHE/RT/2024/56792', totalBills: 15, totalPurchases: '₹2,95,000' },
  ]

  // Mock data for bills (by retailer shop)
  const billsByShop = {
    1: [
      { billId: 'P001', date: '2024-02-03', wholesaler: 'MediCorp Wholesale', totalAmount: '₹85,000', items: 4 },
      { billId: 'P002', date: '2024-02-01', wholesaler: 'Prime Pharmaceuticals', totalAmount: '₹65,000', items: 3 },
      { billId: 'P003', date: '2024-01-29', wholesaler: 'HealthCare Distributors', totalAmount: '₹55,000', items: 5 },
    ],
    2: [
      { billId: 'P101', date: '2024-02-02', wholesaler: 'MediCorp Wholesale', totalAmount: '₹45,000', items: 3 },
      { billId: 'P102', date: '2024-01-30', wholesaler: 'Prime Pharmaceuticals', totalAmount: '₹38,000', items: 2 },
    ],
    3: [
      { billId: 'P201', date: '2024-02-03', wholesaler: 'HealthCare Distributors', totalAmount: '₹95,000', items: 6 },
      { billId: 'P202', date: '2024-01-31', wholesaler: 'MediCorp Wholesale', totalAmount: '₹78,000', items: 4 },
    ],
    4: [
      { billId: 'P301', date: '2024-02-02', wholesaler: 'Prime Pharmaceuticals', totalAmount: '₹68,000', items: 5 },
      { billId: 'P302', date: '2024-01-28', wholesaler: 'HealthCare Distributors', totalAmount: '₹52,000', items: 3 },
    ]
  }

  // Mock data for products (by bill)
  const productsByBill = {
    'P001': [
      { id: 1, medicineName: 'Paracetamol 500mg', manufacturer: 'Cipla Ltd.', batchNo: 'PCT2024A123', mrp: '₹25', rate: '₹22', quantity: 500, total: '₹11,000' },
      { id: 2, medicineName: 'Vitamin C Tablets', manufacturer: 'Sun Pharma', batchNo: 'VTC2024B456', mrp: '₹150', rate: '₹135', quantity: 50, total: '₹6,750' },
      { id: 3, medicineName: 'Cough Syrup', manufacturer: 'Himalaya', batchNo: 'CSY2024E345', mrp: '₹85', rate: '₹78', quantity: 100, total: '₹7,800' },
    ],
    'P002': [
      { id: 4, medicineName: 'Amoxicillin 250mg', manufacturer: 'Lupin Ltd.', batchNo: 'AMX2024C789', mrp: '₹45', rate: '₹42', quantity: 200, total: '₹8,400' },
      { id: 5, medicineName: 'Ibuprofen 400mg', manufacturer: 'Dr. Reddy\'s', batchNo: 'IBU2024D012', mrp: '₹32', rate: '₹30', quantity: 300, total: '₹9,000' },
    ],
    'P003': [
      { id: 6, medicineName: 'Aspirin 75mg', manufacturer: 'Bayer', batchNo: 'ASP2024F678', mrp: '₹18', rate: '₹15', quantity: 500, total: '₹7,500' },
      { id: 7, medicineName: 'Metformin 500mg', manufacturer: 'USV Ltd.', batchNo: 'MET2024G901', mrp: '₹12', rate: '₹10', quantity: 800, total: '₹8,000' },
    ],
    'P101': [
      { id: 8, medicineName: 'Atorvastatin 10mg', manufacturer: 'Ranbaxy', batchNo: 'ATV2024H234', mrp: '₹55', rate: '₹50', quantity: 100, total: '₹5,000' },
      { id: 9, medicineName: 'Omeprazole 20mg', manufacturer: 'Cadila', batchNo: 'OME2024I567', mrp: '₹28', rate: '₹25', quantity: 400, total: '₹10,000' },
    ],
    'P102': [
      { id: 10, medicineName: 'Azithromycin 500mg', manufacturer: 'Abbott', batchNo: 'AZI2024J890', mrp: '₹65', rate: '₹60', quantity: 150, total: '₹9,000' },
    ],
    'P201': [
      { id: 11, medicineName: 'Cetirizine 10mg', manufacturer: 'GlaxoSmithKline', batchNo: 'CET2024K123', mrp: '₹8', rate: '₹7', quantity: 1000, total: '₹7,000' },
      { id: 12, medicineName: 'Insulin Glargine', manufacturer: 'Novo Nordisk', batchNo: 'INS2024L456', mrp: '₹850', rate: '₹800', quantity: 25, total: '₹20,000' },
    ],
    'P202': [
      { id: 13, medicineName: 'Losartan 50mg', manufacturer: 'Merck', batchNo: 'LOS2024M789', mrp: '₹22', rate: '₹20', quantity: 600, total: '₹12,000' },
    ],
    'P301': [
      { id: 14, medicineName: 'Pantoprazole 40mg', manufacturer: 'Cipla Ltd.', batchNo: 'PAN2024N012', mrp: '₹18', rate: '₹16', quantity: 700, total: '₹11,200' },
    ],
    'P302': [
      { id: 15, medicineName: 'Dolo 650mg', manufacturer: 'Micro Labs', batchNo: 'DOL2024O345', mrp: '₹35', rate: '₹32', quantity: 300, total: '₹9,600' },
    ]
  }

  // All medicines for search functionality
  const allMedicines = [
    { medicineName: 'Paracetamol 500mg', manufacturer: 'Cipla Ltd.', batchNo: 'PCT2024A123', mrp: '₹25', rate: '₹22', retailer: 'City Pharmacy', wholesaler: 'MediCorp Wholesale', billId: 'P001', date: '2024-02-03' },
    { medicineName: 'Vitamin C Tablets', manufacturer: 'Sun Pharma', batchNo: 'VTC2024B456', mrp: '₹150', rate: '₹135', retailer: 'City Pharmacy', wholesaler: 'MediCorp Wholesale', billId: 'P001', date: '2024-02-03' },
    { medicineName: 'Cough Syrup', manufacturer: 'Himalaya', batchNo: 'CSY2024E345', mrp: '₹85', rate: '₹78', retailer: 'City Pharmacy', wholesaler: 'MediCorp Wholesale', billId: 'P001', date: '2024-02-03' },
    { medicineName: 'Amoxicillin 250mg', manufacturer: 'Lupin Ltd.', batchNo: 'AMX2024C789', mrp: '₹45', rate: '₹42', retailer: 'City Pharmacy', wholesaler: 'Prime Pharmaceuticals', billId: 'P002', date: '2024-02-01' },
    { medicineName: 'Ibuprofen 400mg', manufacturer: 'Dr. Reddy\'s', batchNo: 'IBU2024D012', mrp: '₹32', rate: '₹30', retailer: 'City Pharmacy', wholesaler: 'Prime Pharmaceuticals', billId: 'P002', date: '2024-02-01' },
    { medicineName: 'Aspirin 75mg', manufacturer: 'Bayer', batchNo: 'ASP2024F678', mrp: '₹18', rate: '₹15', retailer: 'City Pharmacy', wholesaler: 'HealthCare Distributors', billId: 'P003', date: '2024-01-29' },
    { medicineName: 'Metformin 500mg', manufacturer: 'USV Ltd.', batchNo: 'MET2024G901', mrp: '₹12', rate: '₹10', retailer: 'City Pharmacy', wholesaler: 'HealthCare Distributors', billId: 'P003', date: '2024-01-29' },
    { medicineName: 'Atorvastatin 10mg', manufacturer: 'Ranbaxy', batchNo: 'ATV2024H234', mrp: '₹55', rate: '₹50', retailer: 'Main Street Clinic', wholesaler: 'MediCorp Wholesale', billId: 'P101', date: '2024-02-02' },
    { medicineName: 'Omeprazole 20mg', manufacturer: 'Cadila', batchNo: 'OME2024I567', mrp: '₹28', rate: '₹25', retailer: 'Main Street Clinic', wholesaler: 'MediCorp Wholesale', billId: 'P101', date: '2024-02-02' },
    { medicineName: 'Azithromycin 500mg', manufacturer: 'Abbott', batchNo: 'AZI2024J890', mrp: '₹65', rate: '₹60', retailer: 'Main Street Clinic', wholesaler: 'Prime Pharmaceuticals', billId: 'P102', date: '2024-01-30' },
    { medicineName: 'Cetirizine 10mg', manufacturer: 'GlaxoSmithKline', batchNo: 'CET2024K123', mrp: '₹8', rate: '₹7', retailer: 'Central Pharmacy', wholesaler: 'HealthCare Distributors', billId: 'P201', date: '2024-02-03' },
    { medicineName: 'Insulin Glargine', manufacturer: 'Novo Nordisk', batchNo: 'INS2024L456', mrp: '₹850', rate: '₹800', retailer: 'Central Pharmacy', wholesaler: 'HealthCare Distributors', billId: 'P201', date: '2024-02-03' },
    { medicineName: 'Losartan 50mg', manufacturer: 'Merck', batchNo: 'LOS2024M789', mrp: '₹22', rate: '₹20', retailer: 'Central Pharmacy', wholesaler: 'MediCorp Wholesale', billId: 'P202', date: '2024-01-31' },
    { medicineName: 'Pantoprazole 40mg', manufacturer: 'Cipla Ltd.', batchNo: 'PAN2024N012', mrp: '₹18', rate: '₹16', retailer: 'Green Valley Hospital', wholesaler: 'Prime Pharmaceuticals', billId: 'P301', date: '2024-02-02' },
    { medicineName: 'Dolo 650mg', manufacturer: 'Micro Labs', batchNo: 'DOL2024O345', mrp: '₹35', rate: '₹32', retailer: 'Green Valley Hospital', wholesaler: 'HealthCare Distributors', billId: 'P302', date: '2024-01-28' },
  ]

  const handleShopClick = (shop) => {
    setSelectedShop(shop)
    setView('bills')
  }

  const handleBillClick = (bill) => {
    setSelectedBill(bill)
    setView('products')
  }

  const handleBackToShops = () => {
    setView('shops')
    setSelectedShop(null)
    setSelectedBill(null)
  }

  const handleBackToBills = () => {
    setView('bills')
    setSelectedBill(null)
  }

  const filteredMedicines = allMedicines.filter(med => 
    searchQuery === '' || 
    med.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.batchNo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 md:p-10 bg-[#020617] min-h-screen w-full overflow-x-hidden text-slate-100">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            {view !== 'shops' && (
              <button 
                onClick={view === 'bills' ? handleBackToShops : handleBackToBills}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all hover:-translate-x-1"
              >
                ← Back
              </button>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                {view === 'shops' && 'Retailer Shops'}
                {view === 'bills' && `Purchase Bills - ${selectedShop?.name}`}
                {view === 'products' && `Bill Details - ${selectedBill?.billId}`}
              </h1>
              <p className="text-slate-400">
                {view === 'shops' && 'View all registered retailer shops'}
                {view === 'bills' && 'View all purchase bills for this retailer'}
                {view === 'products' && 'View product details for this purchase'}
              </p>
            </div>
          </div>
        </div>

        {/* Search Section - Always visible */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-slate-800 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-4">🔍 Search Medicine by Name or Batch Number</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by medicine name or batch number..."
            className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
          />
          
          {/* Search Results */}
          {searchQuery && (
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-4">Search Results ({filteredMedicines.length})</h4>
              {filteredMedicines.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-950/80">
                      <tr>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Medicine Name</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Manufacturer</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Batch No</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">MRP</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Rate</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Retailer</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Wholesaler</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Bill ID</th>
                        <th className="px-4 py-3 text-left text-slate-400 font-bold uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredMedicines.map((med, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                          <td className="px-4 py-3 text-slate-300 font-semibold">{med.medicineName}</td>
                          <td className="px-4 py-3 text-slate-300">{med.manufacturer}</td>
                          <td className="px-4 py-3 text-slate-300 font-mono text-xs">{med.batchNo}</td>
                          <td className="px-4 py-3 text-slate-300">{med.mrp}</td>
                          <td className="px-4 py-3 text-green-400 font-semibold">{med.rate}</td>
                          <td className="px-4 py-3 text-purple-400">{med.retailer}</td>
                          <td className="px-4 py-3 text-blue-400">{med.wholesaler}</td>
                          <td className="px-4 py-3 text-slate-300">{med.billId}</td>
                          <td className="px-4 py-3 text-slate-400 text-xs">{med.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">No medicines found matching "{searchQuery}"</p>
              )}
            </div>
          )}
        </div>

        {/* View: Retailer Shops */}
        {view === 'shops' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div 
                key={shop.id}
                onClick={() => handleShopClick(shop)}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 hover:border-purple-500 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{shop.name}</h3>
                    <p className="text-slate-400 text-sm">License: {shop.licenseNo}</p>
                  </div>
                  <span className="text-4xl group-hover:scale-110 transition-transform">🏪</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Total Bills</p>
                    <p className="text-white font-bold text-lg">{shop.totalBills}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Total Purchases</p>
                    <p className="text-purple-400 font-bold text-lg">{shop.totalPurchases}</p>
                  </div>
                </div>
                <div className="mt-6 text-right">
                  <span className="text-purple-400 text-sm font-semibold group-hover:underline">View Bills →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View: Bills for Selected Shop */}
        {view === 'bills' && selectedShop && (
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-950/80 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Bill ID</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Wholesaler</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount</th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {billsByShop[selectedShop.id]?.map((bill) => (
                    <tr key={bill.billId} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 text-purple-400 font-semibold">{bill.billId}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.date}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.wholesaler}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.items} items</td>
                      <td className="px-6 py-4 text-green-400 font-semibold text-lg">{bill.totalAmount}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleBillClick(bill)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all shadow-lg hover:shadow-purple-500/30 text-xs font-bold uppercase tracking-wider"
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

        {/* View: Products for Selected Bill */}
        {view === 'products' && selectedBill && (
          <div className="space-y-6">
            {/* Bill Info Card */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Bill ID</p>
                  <p className="text-white font-bold text-lg">{selectedBill.billId}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Date</p>
                  <p className="text-white font-semibold">{selectedBill.date}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Wholesaler</p>
                  <p className="text-white font-semibold">{selectedBill.wholesaler}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Total Amount</p>
                  <p className="text-purple-400 font-bold text-xl">{selectedBill.totalAmount}</p>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-300">Medicine Name</th>
                      <th className="px-4 py-3 text-left text-slate-300">Manufacturer</th>
                      <th className="px-4 py-3 text-left text-slate-300">Batch No</th>
                      <th className="px-4 py-3 text-left text-slate-300">MRP</th>
                      <th className="px-4 py-3 text-left text-slate-300">Rate</th>
                      <th className="px-4 py-3 text-left text-slate-300">Quantity</th>
                      <th className="px-4 py-3 text-left text-slate-300">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsByBill[selectedBill.billId]?.map((product) => (
                      <tr key={product.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                        <td className="px-4 py-3 text-white font-semibold">{product.medicineName}</td>
                        <td className="px-4 py-3 text-slate-300">{product.manufacturer}</td>
                        <td className="px-4 py-3 text-slate-300 font-mono text-xs">{product.batchNo}</td>
                        <td className="px-4 py-3 text-slate-300">{product.mrp}</td>
                        <td className="px-4 py-3 text-green-400 font-semibold">{product.rate}</td>
                        <td className="px-4 py-3 text-slate-300">{product.quantity}</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">{product.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="mt-6 text-right">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
            📥 Export Report
          </button>
        </div>
      </div>
    </div>
  )
}