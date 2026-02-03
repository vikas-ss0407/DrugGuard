import { useState } from 'react'

export default function SellToRetailer() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    retailer: '',
    drugs: [],
    deliveryDate: '',
    paymentTerms: '',
    specialNotes: ''
  })

  const retailers = ['City Pharmacy', 'Main Street Clinic', 'Central Pharmacy', 'Green Valley Hospital', 'Elite Retailers']
  const availableDrugs = [
    { id: 1, name: 'Paracetamol 500mg', stock: 5000, price: 25 },
    { id: 2, name: 'Aspirin 75mg', stock: 3000, price: 15 },
    { id: 3, name: 'Ibuprofen 400mg', stock: 2500, price: 30 },
    { id: 4, name: 'Amoxicillin 250mg', stock: 1500, price: 42.5 }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addDrug = () => {
    setFormData(prev => ({
      ...prev,
      drugs: [...prev.drugs, { drugId: '', quantity: '', notes: '' }]
    }))
  }

  const updateDrug = (index, field, value) => {
    setFormData(prev => {
      const newDrugs = [...prev.drugs]
      newDrugs[index][field] = value
      return { ...prev, drugs: newDrugs }
    })
  }

  const removeDrug = (index) => {
    setFormData(prev => ({
      ...prev,
      drugs: prev.drugs.filter((_, i) => i !== index)
    }))
  }

  const calculateTotal = () => {
    return formData.drugs.reduce((total, drug) => {
      const drugInfo = availableDrugs.find(d => d.id === parseInt(drug.drugId))
      return total + (drugInfo ? drugInfo.price * (drug.quantity || 0) : 0)
    }, 0).toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.retailer || formData.drugs.length === 0) {
      alert('Please select retailer and add drugs')
      return
    }
    alert(`Bill generated successfully!\nTotal: ₹${calculateTotal()}`)
    setFormData({ retailer: '', drugs: [], deliveryDate: '', paymentTerms: '', specialNotes: '' })
    setStep(1)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sell to Retailer</h1>
          <p className="text-slate-400">Create a new bill and manage sales to retailers</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Retailer Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Retailer *</label>
              <select
                name="retailer"
                value={formData.retailer}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose a retailer</option>
                {retailers.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Delivery Date *</label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Payment Terms */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Payment Terms</label>
              <select
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select terms</option>
                <option value="immediate">Immediate Payment</option>
                <option value="net30">Net 30</option>
                <option value="net60">Net 60</option>
              </select>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Special Notes</label>
              <input
                type="text"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleInputChange}
                placeholder="Any special instructions"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Drugs Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Add Drugs</h3>
            <div className="space-y-4">
              {formData.drugs.map((drug, idx) => (
                <div key={idx} className="bg-slate-700 rounded-lg p-4 flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-300 mb-1">Drug</label>
                    <select
                      value={drug.drugId}
                      onChange={(e) => updateDrug(idx, 'drugId', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select drug</option>
                      {availableDrugs.map((d) => (
                        <option key={d.id} value={d.id}>{d.name} (Stock: {d.stock})</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-medium text-slate-300 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={drug.quantity}
                      onChange={(e) => updateDrug(idx, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Qty"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDrug(idx)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addDrug}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              + Add Drug
            </button>
          </div>

          {/* Bill Preview */}
          {formData.drugs.length > 0 && (
            <div className="bg-slate-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Bill Summary</h3>
              <div className="space-y-2 mb-4">
                {formData.drugs.map((drug, idx) => {
                  const drugInfo = availableDrugs.find(d => d.id === parseInt(drug.drugId))
                  if (!drugInfo) return null
                  const amount = drugInfo.price * (drug.quantity || 0)
                  return (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>{drugInfo.name} x {drug.quantity}</span>
                      <span>₹{amount.toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-slate-600 pt-4 flex justify-between text-xl font-bold text-white">
                <span>Total Amount:</span>
                <span className="text-green-400">₹{calculateTotal()}</span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Generate Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}