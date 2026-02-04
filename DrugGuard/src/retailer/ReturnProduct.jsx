import { useState } from 'react'

export default function ReturnProduct() {
  const [selectedBill, setSelectedBill] = useState('')
  const [selectedProducts, setSelectedProducts] = useState([])
  const [returnReason, setReturnReason] = useState('')
  const [returnNotes, setReturnNotes] = useState('')

  // Sample bills data with products
  const bills = [
    {
      billNo: 'SAL-001-2024',
      date: '2024-01-15',
      products: [
        { id: 1, name: 'Paracetamol 500mg', batch: 'BAT001', quantity: 10, packaging: 'Strip', mrp: 35 },
        { id: 2, name: 'Aspirin 75mg', batch: 'BAT002', quantity: 5, packaging: 'Strip', mrp: 25 },
        { id: 3, name: 'Ibuprofen 400mg', batch: 'BAT003', quantity: 8, packaging: 'Strip', mrp: 40 }
      ]
    },
    {
      billNo: 'SAL-002-2024',
      date: '2024-01-20',
      products: [
        { id: 4, name: 'Amoxicillin 250mg', batch: 'BAT004', quantity: 2, packaging: 'Strip', mrp: 60 },
        { id: 5, name: 'Cough Syrup', batch: 'BAT005', quantity: 1, packaging: 'Strip', mrp: 55 }
      ]
    },
    {
      billNo: 'SAL-003-2024',
      date: '2024-01-25',
      products: [
        { id: 6, name: 'Vitamin B12', batch: 'BAT006', quantity: 15, packaging: 'Strip', mrp: 22 },
        { id: 7, name: 'Paracetamol 500mg', batch: 'BAT001', quantity: 20, packaging: 'Strip', mrp: 35 }
      ]
    }
  ]

  const returnReasons = [
    'Damaged packaging',
    'Expired batch',
    'Quality issue',
    'Storage issue',
    'Wrong item received',
    'Quantity mismatch',
    'Customer returned'
  ]

  const currentBillProducts = bills.find(b => b.billNo === selectedBill)?.products || []

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedBill || selectedProducts.length === 0 || !returnReason) {
      alert('Please fill all required fields and select at least one product')
      return
    }
    const selectedProductDetails = currentBillProducts.filter(p => selectedProducts.includes(p.id))
    alert(`Return request submitted successfully!\nBill: ${selectedBill}\nProducts: ${selectedProductDetails.length}\nReason: ${returnReason}`)
    setSelectedBill('')
    setSelectedProducts([])
    setReturnReason('')
    setReturnNotes('')
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Return Product</h1>
          <p className="text-slate-400">Submit a return request for medicines from bills</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          {/* Bill Selection Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Bill *</label>
              <select
                value={selectedBill}
                onChange={(e) => {
                  setSelectedBill(e.target.value)
                  setSelectedProducts([])
                }}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose a bill</option>
                {bills.map((bill) => (
                  <option key={bill.billNo} value={bill.billNo}>
                    {bill.billNo} - {bill.date}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products from Bill */}
          {selectedBill && currentBillProducts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Select Products to Return *</h3>
              <div className="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-600">
                        <th className="px-4 py-3 text-left">
                          <input type="checkbox" className="w-4 h-4" />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Product Name</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Batch</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Qty</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Type</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">MRP (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBillProducts.map((product, idx) => (
                        <tr key={product.id} className="border-b border-slate-600 hover:bg-slate-600/50">
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleProductToggle(product.id)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </td>
                          <td className="px-4 py-4 text-white font-medium">
                            {product.name}
                          </td>
                          <td className="px-4 py-4 text-slate-300 font-mono">
                            {product.batch}
                          </td>
                          <td className="px-4 py-4 text-center text-slate-300 font-semibold">
                            {product.quantity}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-semibold">
                              {product.packaging}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center text-blue-400 font-bold">
                            ₹{product.mrp}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-slate-400 text-sm mt-2">Selected: {selectedProducts.length} product(s)</p>
            </div>
          )}

          {/* Return Details */}
          {selectedBill && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Reason for Return *</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select reason</option>
                  {returnReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Additional Notes</label>
                <textarea
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  placeholder="Provide any additional details"
                  rows="1"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="reset"
              onClick={() => {
                setSelectedBill('')
                setSelectedProducts([])
                setReturnReason('')
                setReturnNotes('')
              }}
              className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Submit Return Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
