import { useState } from 'react'

export default function ReturnProduct() {
  const [formData, setFormData] = useState({
    billNo: '',
    drug: '',
    quantity: '',
    reason: '',
    notes: ''
  })

  const bills = [
    { billNo: 'WHL-001-2024', drug: 'Paracetamol 500mg', quantity: 500 },
    { billNo: 'WHL-002-2024', drug: 'Amoxicillin 250mg', quantity: 200 },
    { billNo: 'WHL-003-2024', drug: 'Ibuprofen 400mg', quantity: 1000 }
  ]

  const returnReasons = [
    'Damaged packaging',
    'Expired batch',
    'Quality issue',
    'Storage issue',
    'Wrong item received',
    'Quantity mismatch'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-populate drug info when bill is selected
    if (name === 'billNo') {
      const selectedBill = bills.find(b => b.billNo === value)
      if (selectedBill) {
        setFormData(prev => ({
          ...prev,
          drug: selectedBill.drug,
          quantity: ''
        }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.billNo || !formData.quantity || !formData.reason) {
      alert('Please fill all required fields')
      return
    }
    alert(`Return request submitted successfully!\nBill: ${formData.billNo}\nQuantity: ${formData.quantity}`)
    setFormData({ billNo: '', drug: '', quantity: '', reason: '', notes: '' })
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Return Product</h1>
          <p className="text-slate-400">Submit a return request for drugs from wholesaler</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Bill *</label>
              <select
                name="billNo"
                value={formData.billNo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose a bill</option>
                {bills.map((bill) => (
                  <option key={bill.billNo} value={bill.billNo}>{bill.billNo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Drug Name</label>
              <input
                type="text"
                value={formData.drug}
                disabled
                className="w-full px-4 py-2 rounded-lg bg-slate-600 text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Return Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity to return"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Reason for Return *</label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select reason</option>
                {returnReasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Provide any additional details about the return"
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="reset"
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