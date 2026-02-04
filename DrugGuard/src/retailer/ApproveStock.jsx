import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ApproveStock() {
  const [selectedBill, setSelectedBill] = useState(null)
  const [selectedMedicines, setSelectedMedicines] = useState({})

  const pendingBills = [
    { 
      id: 1, 
      billNo: 'WHL-001-2024', 
      wholesaler: 'MediCorp Wholesale', 
      totalAmount: 20500, 
      deliveredDate: '2024-02-03', 
      paymentType: 'Net 30',
      paymentStatus: 'Pending',
      medicines: [
        { id: 1, name: 'Paracetamol 500mg', quantity: 100, batch: 'BAT001', price: 20, mrp: 25, expiry: '2026-06-15' },
        { id: 2, name: 'Aspirin 75mg', quantity: 50, batch: 'BAT002', price: 12, mrp: 15, expiry: '2026-08-20' },
        { id: 3, name: 'Ibuprofen 400mg', quantity: 80, batch: 'BAT003', price: 25, mrp: 30, expiry: '2026-07-10' }
      ]
    },
    { 
      id: 2, 
      billNo: 'WHL-002-2024', 
      wholesaler: 'HealthCare Distributors', 
      totalAmount: 15750, 
      deliveredDate: '2024-02-02', 
      paymentType: 'Immediate',
      paymentStatus: 'Paid',
      medicines: [
        { id: 4, name: 'Amoxicillin 250mg', quantity: 60, batch: 'BAT004', price: 35, mrp: 42.5, expiry: '2026-09-30' },
        { id: 5, name: 'Cough Syrup', quantity: 40, batch: 'BAT005', price: 45, mrp: 55, expiry: '2026-05-15' }
      ]
    },
    { 
      id: 3, 
      billNo: 'WHL-003-2024', 
      wholesaler: 'Prime Pharmaceuticals', 
      totalAmount: 18900, 
      deliveredDate: '2024-02-01', 
      paymentType: 'Net 60',
      paymentStatus: 'Pending',
      medicines: [
        { id: 6, name: 'Vitamin B12', quantity: 120, batch: 'BAT006', price: 18, mrp: 22, expiry: '2026-10-20' },
        { id: 7, name: 'Paracetamol 500mg', quantity: 90, batch: 'BAT007', price: 20, mrp: 25, expiry: '2026-06-15' }
      ]
    }
  ]

  const handleBillClick = (bill) => {
    setSelectedBill(bill)
    // Initialize all medicines as selected by default
    const allSelected = {}
    bill.medicines.forEach(med => {
      allSelected[med.id] = true
    })
    setSelectedMedicines(allSelected)
  }

  const handleSelectAll = () => {
    if (!selectedBill) return
    const allSelected = {}
    selectedBill.medicines.forEach(med => {
      allSelected[med.id] = true
    })
    setSelectedMedicines(allSelected)
  }

  const handleDeselectAll = () => {
    setSelectedMedicines({})
  }

  const handleMedicineToggle = (medicineId) => {
    setSelectedMedicines(prev => ({
      ...prev,
      [medicineId]: !prev[medicineId]
    }))
  }

  const handleAccept = () => {
    const acceptedMeds = selectedBill.medicines.filter(med => selectedMedicines[med.id])
    const pendingMeds = selectedBill.medicines.filter(med => !selectedMedicines[med.id])
    
    if (acceptedMeds.length === 0) {
      alert('Please select at least one medicine to accept')
      return
    }

    alert(`Accepted ${acceptedMeds.length} medicine(s)\n${pendingMeds.length > 0 ? `${pendingMeds.length} medicine(s) marked as pending` : 'All medicines accepted'}`)
    
    // Reset
    setSelectedBill(null)
    setSelectedMedicines({})
  }

  const handleBackToBills = () => {
    setSelectedBill(null)
    setSelectedMedicines({})
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Approve Received Stock</h1>
            <p className="text-slate-400">Review and approve delivered stock items</p>
          </div>
          <Link 
            to="/retailer/pending-stock"
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold flex items-center gap-2"
          >
            ⏳ View Pending Items
          </Link>
        </div>

        {!selectedBill ? (
          /* Bills List */
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bill Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Wholesaler</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Payment Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Payment Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Delivered Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingBills.map((bill) => (
                    <tr key={bill.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-blue-400 font-semibold">{bill.billNo}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.wholesaler}</td>
                      <td className="px-6 py-4 text-green-400 font-bold">₹{bill.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.paymentType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bill.paymentStatus === 'Paid' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                        }`}>
                          {bill.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{bill.deliveredDate}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.medicines.length} items</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBillClick(bill)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors font-semibold"
                        >
                          View Items
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Medicine Details View */
          <div className="space-y-6">
            {/* Bill Header */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Bill: {selectedBill.billNo}</h2>
                  <p className="text-slate-400">Wholesaler: <span className="text-white font-semibold">{selectedBill.wholesaler}</span></p>
                </div>
                <button
                  onClick={handleBackToBills}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  ← Back to Bills
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-400">₹{selectedBill.totalAmount.toFixed(2)}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Payment Type</p>
                  <p className="text-lg font-semibold text-white">{selectedBill.paymentType}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedBill.paymentStatus === 'Paid' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {selectedBill.paymentStatus}
                  </span>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Delivered Date</p>
                  <p className="text-lg font-semibold text-white">{selectedBill.deliveredDate}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleSelectAll}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                ✓ Select All
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold"
              >
                ✗ Deselect All
              </button>
              <button
                onClick={handleAccept}
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Accept Selected
              </button>
            </div>

            {/* Medicines Table */}
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                        <input 
                          type="checkbox"
                          checked={selectedBill.medicines.every(med => selectedMedicines[med.id])}
                          onChange={(e) => e.target.checked ? handleSelectAll() : handleDeselectAll()}
                          className="w-5 h-5 rounded"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Medicine Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Batch</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">MRP</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Expiry</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.medicines.map((medicine) => (
                      <tr 
                        key={medicine.id} 
                        className={`border-t border-slate-700 transition-colors ${
                          selectedMedicines[medicine.id] ? 'bg-green-900/20 hover:bg-green-900/30' : 'hover:bg-slate-700'
                        }`}
                      >
                        <td className="px-6 py-4 text-center">
                          <input 
                            type="checkbox"
                            checked={selectedMedicines[medicine.id] || false}
                            onChange={() => handleMedicineToggle(medicine.id)}
                            className="w-5 h-5 rounded"
                          />
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">{medicine.name}</td>
                        <td className="px-6 py-4 text-slate-300 font-mono">{medicine.batch}</td>
                        <td className="px-6 py-4 text-slate-300">{medicine.quantity} units</td>
                        <td className="px-6 py-4 text-green-400 font-bold">₹{medicine.price}</td>
                        <td className="px-6 py-4 text-blue-400 font-bold">₹{medicine.mrp}</td>
                        <td className="px-6 py-4 text-slate-300">{medicine.expiry}</td>
                        <td className="px-6 py-4 text-white font-bold">₹{(medicine.price * medicine.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-2 border-green-600/40 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-300 mb-2">
                    Selected: <span className="text-white font-bold">
                      {Object.values(selectedMedicines).filter(Boolean).length} / {selectedBill.medicines.length} items
                    </span>
                  </p>
                  <p className="text-slate-300">
                    Pending: <span className="text-yellow-400 font-bold">
                      {selectedBill.medicines.length - Object.values(selectedMedicines).filter(Boolean).length} items
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm mb-1">Selected Amount</p>
                  <p className="text-4xl font-bold text-green-400">
                    ₹{selectedBill.medicines.filter(med => selectedMedicines[med.id]).reduce((sum, med) => sum + (med.price * med.quantity), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}