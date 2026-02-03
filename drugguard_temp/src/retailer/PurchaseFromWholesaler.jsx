import { useState } from 'react'

export default function PurchaseFromWholesaler() {
  const [formData, setFormData] = useState({
    wholesaler: '',
    drugs: [],
    deliveryAddress: '',
    notes: ''
  })

  const wholesalers = ['MediCorp Wholesale', 'HealthCare Distributors', 'Prime Pharmaceuticals']
  const availableDrugs = [
    { id: 1, name: 'Paracetamol 500mg', price: 25 },
    { id: 2, name: 'Aspirin 75mg', price: 15 },
    { id: 3, name: 'Ibuprofen 400mg', price: 30 },
    { id: 4, name: 'Amoxicillin 250mg', price: 42.5 }
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
      drugs: [...prev.drugs, { drugId: '', quantity: '' }]
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
    if (!formData.wholesaler || formData.drugs.length === 0) {
      alert('Please select wholesaler and add drugs')
      return
    }
    alert(`Purchase order placed successfully!\nTotal: ₹${calculateTotal()}`)
    setFormData({ wholesaler: '', drugs: [], deliveryAddress: '', notes: '' })
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Purchase from Wholesaler</h1>
          <p className="text-slate-400">Create a new purchase order</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Wholesaler *</label>
              <select
                name="wholesaler"
                value={formData.wholesaler}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose a wholesaler</option>
                {wholesalers.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Delivery Address</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                placeholder="Enter address"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Special Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions"
                rows="2"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

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
                      className="w-full px-3 py-2 rounded-lg bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select drug</option>
                      {availableDrugs.map((d) => (
                        <option key={d.id} value={d.id}>{d.name} - ₹{d.price}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-medium text-slate-300 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={drug.quantity}
                      onChange={(e) => updateDrug(idx, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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

          {formData.drugs.length > 0 && (
            <div className="bg-slate-700 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
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
                <span>Total Order Value:</span>
                <span className="text-purple-400">₹{calculateTotal()}</span>
              </div>
            </div>
          )}

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
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}