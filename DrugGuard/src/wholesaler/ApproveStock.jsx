import { useState } from 'react'

export default function ApproveStock() {
  const [selectedBill, setSelectedBill] = useState(null)
  const [selectedMedicines, setSelectedMedicines] = useState({})

  const pendingBills = [
    { 
      id: 1, 
      billNo: 'MFR-001-2024', 
      manufacturer: 'Cipla Ltd', 
      totalAmount: 125500, 
      deliveredDate: '2024-03-05', 
      paymentType: 'Net 30',
      paymentStatus: 'Pending',
      medicines: [
        { id: 1, name: 'Paracetamol 500mg', quantity: 5000, batch: 'MFG001', price: 15, mrp: 25, expiry: '2027-06-15' },
        { id: 2, name: 'Metformin 500mg', quantity: 4000, batch: 'MFG008', price: 6, mrp: 12, expiry: '2027-04-10' },
        { id: 3, name: 'Aspirin 75mg', quantity: 3000, batch: 'MFG002', price: 8, mrp: 15, expiry: '2027-08-20' }
      ]
    },
    { 
      id: 2, 
      billNo: 'MFR-002-2024', 
      manufacturer: 'Sun Pharma', 
      totalAmount: 95750, 
      deliveredDate: '2024-03-04', 
      paymentType: 'Immediate',
      paymentStatus: 'Paid',
      medicines: [
        { id: 4, name: 'Vitamin B12', quantity: 6000, batch: 'MFG006', price: 12, mrp: 22, expiry: '2027-10-20' },
        { id: 5, name: 'Ibuprofen 400mg', quantity: 2000, batch: 'MFG003', price: 18, mrp: 30, expiry: '2027-07-10' }
      ]
    },
    { 
      id: 3, 
      billNo: 'MFR-003-2024', 
      manufacturer: 'Lupin Ltd', 
      totalAmount: 168000, 
      deliveredDate: '2024-03-03', 
      paymentType: 'Net 60',
      paymentStatus: 'Pending',
      medicines: [
        { id: 6, name: 'Amoxicillin 250mg', quantity: 6000, batch: 'MFG004', price: 28, mrp: 42.5, expiry: '2027-09-30' }
      ]
    },
    { 
      id: 4, 
      billNo: 'MFR-004-2024', 
      manufacturer: 'Dr. Reddy\'s Labs', 
      totalAmount: 140000, 
      deliveredDate: '2024-03-02', 
      paymentType: 'Net 30',
      paymentStatus: 'Pending',
      medicines: [
        { id: 7, name: 'Cough Syrup 100ml', quantity: 4000, batch: 'MFG005', price: 35, mrp: 55, expiry: '2027-05-15' }
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Approve Stock from Manufacturer</h1>
          <p className="text-slate-400">Review and approve received stock deliveries</p>
        </div>

        {!selectedBill ? (
          // Bills List View
          <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Pending Deliveries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bill No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Manufacturer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Delivered Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Total Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Payment Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Payment Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingBills.map((bill) => (
                    <tr key={bill.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-blue-400 font-semibold">{bill.billNo}</td>
                      <td className="px-6 py-4 text-white">{bill.manufacturer}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.deliveredDate}</td>
                      <td className="px-6 py-4 text-green-400 font-bold text-lg">₹{bill.totalAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-300">{bill.paymentType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bill.paymentStatus === 'Paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                        }`}>
                          {bill.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBillClick(bill)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                        >
                          Review Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Bill Detail View
          <div>
            <button
              onClick={handleBackToBills}
              className="mb-6 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              ← Back to Bills
            </button>

            {/* Bill Info */}
            <div className="bg-slate-800 rounded-lg p-6 mb-6 shadow-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Bill Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Bill Number</p>
                  <p className="text-white font-semibold">{selectedBill.billNo}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Manufacturer</p>
                  <p className="text-white font-semibold">{selectedBill.manufacturer}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Delivered Date</p>
                  <p className="text-white font-semibold">{selectedBill.deliveredDate}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Total Amount</p>
                  <p className="text-green-400 font-bold text-xl">₹{selectedBill.totalAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Payment Type</p>
                  <p className="text-white font-semibold">{selectedBill.paymentType}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedBill.paymentStatus === 'Paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                  }`}>
                    {selectedBill.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Medicines Table */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Select Medicines to Accept</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleSelectAll}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleDeselectAll}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors text-sm font-semibold"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-300">
                        <input type="checkbox" className="w-4 h-4" disabled />
                      </th>
                      <th className="px-4 py-3 text-left text-slate-300">Medicine Name</th>
                      <th className="px-4 py-3 text-left text-slate-300">Batch No</th>
                      <th className="px-4 py-3 text-left text-slate-300">Quantity</th>
                      <th className="px-4 py-3 text-left text-slate-300">Price</th>
                      <th className="px-4 py-3 text-left text-slate-300">MRP</th>
                      <th className="px-4 py-3 text-left text-slate-300">Expiry Date</th>
                      <th className="px-4 py-3 text-left text-slate-300">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.medicines.map((medicine) => (
                      <tr 
                        key={medicine.id} 
                        className={`border-t border-slate-700 transition-colors ${
                          selectedMedicines[medicine.id] ? 'bg-green-900 bg-opacity-20' : 'hover:bg-slate-700'
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedMedicines[medicine.id] || false}
                            onChange={() => handleMedicineToggle(medicine.id)}
                            className="w-5 h-5 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3 text-white font-semibold">{medicine.name}</td>
                        <td className="px-4 py-3 text-slate-300 font-mono text-sm">{medicine.batch}</td>
                        <td className="px-4 py-3 text-slate-300">{medicine.quantity}</td>
                        <td className="px-4 py-3 text-slate-300">₹{medicine.price}</td>
                        <td className="px-4 py-3 text-slate-300">₹{medicine.mrp}</td>
                        <td className="px-4 py-3 text-slate-300">{medicine.expiry}</td>
                        <td className="px-4 py-3 text-green-400 font-bold">₹{(medicine.price * medicine.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={handleBackToBills}
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Accept Selected Stock
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
