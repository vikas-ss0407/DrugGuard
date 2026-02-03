import { useState } from 'react'

export default function PurchaseFromWholesaler() {
  const [formData, setFormData] = useState({
    wholesaler: '',
    drugs: []
  })
  const [medicineSearch, setMedicineSearch] = useState({})
  const [openDropdown, setOpenDropdown] = useState(null)

  const wholesalers = ['MediCorp Wholesale', 'HealthCare Distributors', 'Prime Pharmaceuticals']
  const availableDrugs = [
    { id: 1, name: 'Paracetamol 500mg', batch: 'BAT001', company: 'Cipla Ltd', expiryDate: '2026-06-15', price: 20, mrp: 25, offer: '10+2', stock: 5000 },
    { id: 2, name: 'Aspirin 75mg', batch: 'BAT002', company: 'GSK India', expiryDate: '2026-08-20', price: 12, mrp: 15, stock: 3000 },
    { id: 3, name: 'Ibuprofen 400mg', batch: 'BAT003', company: 'Abbott', expiryDate: '2026-07-10', price: 25, mrp: 30, offer: '8+1', stock: 2500 },
    { id: 4, name: 'Amoxicillin 250mg', batch: 'BAT004', company: 'Lupin Ltd', expiryDate: '2026-09-30', price: 35, mrp: 42.5, offer: '5+1', stock: 1500 }
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
    setFormData({ wholesaler: '', drugs: [] })
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Purchase from Wholesaler</h1>
          <p className="text-slate-400">Create a new purchase order</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
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
          </div>

          {/* Drugs Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">📋 Add Medicines</h3>
                <p className="text-slate-400 text-sm mt-1">Search and select medicines for the order</p>
              </div>
              <button
                type="button"
                onClick={addDrug}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-semibold shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">+</span> Add Medicine
              </button>
            </div>

            {formData.drugs.length === 0 && (
              <div className="bg-slate-700/50 border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                <p className="text-slate-400 mb-2">📦 No medicines added yet</p>
                <p className="text-slate-500 text-sm">Click "Add Medicine" to start searching medicines for this order</p>
              </div>
            )}

            {formData.drugs.map((drug, idx) => {
              const selectedDrug = availableDrugs.find(d => d.id === parseInt(drug.drugId))
              const displayValue = selectedDrug ? selectedDrug.name : (medicineSearch[idx] || '')
              
              return (
                <div key={idx} className="bg-slate-800 rounded-lg p-4 mb-4 border border-slate-600">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 relative overflow-visible z-50">
                      {selectedDrug ? (
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Medicine Selected ✓</label>
                          <div className="px-3 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium border-2 border-green-500">
                            {selectedDrug.name}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Search Medicine</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={displayValue}
                              onChange={(e) => {
                                setMedicineSearch(prev => ({...prev, [idx]: e.target.value}))
                                setOpenDropdown(idx)
                              }}
                              onFocus={() => setOpenDropdown(idx)}
                              onBlur={() => setTimeout(() => setOpenDropdown(null), 300)}
                              placeholder="Type medicine name..."
                              className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            />
                            {openDropdown === idx && (
                              <div className="absolute top-full left-0 mt-2 bg-slate-900 border-2 border-blue-500 rounded-lg shadow-2xl z-50 w-[900px] max-h-72 overflow-y-auto">
                                {availableDrugs.filter(d => 
                                  d.name.toLowerCase().includes((medicineSearch[idx] || '').toLowerCase())
                                ).length > 0 ? (
                                  <div className="divide-y divide-slate-700">
                                    {availableDrugs.filter(d => 
                                      d.name.toLowerCase().includes((medicineSearch[idx] || '').toLowerCase())
                                    ).map((d) => (
                                      <div
                                        key={d.id}
                                        onMouseDown={(e) => {
                                          e.preventDefault()
                                          updateDrug(idx, 'drugId', d.id.toString())
                                          setMedicineSearch(prev => ({...prev, [idx]: d.name}))
                                          setOpenDropdown(null)
                                        }}
                                        className="px-5 py-4 hover:bg-slate-800 cursor-pointer transition-colors"
                                      >
                                        <div className="font-bold text-white text-base mb-2">{d.name}</div>
                                        <div className="grid grid-cols-6 gap-3 text-xs">
                                          <div>
                                            <div className="text-slate-500 mb-1">Company</div>
                                            <div className="text-slate-300 font-semibold">{d.company}</div>
                                          </div>
                                          <div>
                                            <div className="text-slate-500 mb-1">Batch</div>
                                            <div className="text-slate-300 font-mono">{d.batch}</div>
                                          </div>
                                          <div>
                                            <div className="text-slate-500 mb-1">Expiry</div>
                                            <div className="text-slate-300">{new Date(d.expiryDate).toLocaleDateString()}</div>
                                          </div>
                                          <div>
                                            <div className="text-slate-500 mb-1">Price</div>
                                            <div className="text-green-400 font-bold">₹{d.price}</div>
                                          </div>
                                          <div>
                                            <div className="text-slate-500 mb-1">MRP</div>
                                            <div className="text-blue-400 font-bold">₹{d.mrp}</div>
                                          </div>
                                          <div>
                                            <div className="text-slate-500 mb-1">Offer</div>
                                            <div className={`font-bold ${d.offer ? 'text-yellow-400' : 'text-slate-500'}`}>
                                              {d.offer ? d.offer : '-'}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="px-5 py-8 text-center">
                                    <div className="text-4xl mb-2">🔍</div>
                                    <div className="text-slate-400">No medicines found</div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-20">
                      <label className="block text-xs font-medium text-slate-300 mb-2">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={drug.quantity}
                        onChange={(e) => updateDrug(idx, 'quantity', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        placeholder="Qty"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDrug(idx)}
                      className="px-3 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors text-xs font-medium mt-6"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {formData.drugs.length > 0 && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 mb-8 border-2 border-slate-600 shadow-2xl overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">📋 Order Summary</h3>
                <p className="text-slate-400 text-sm">Complete medicine details for your order</p>
              </div>

              {/* Order Summary Table */}
              <div className="bg-slate-800 rounded-lg border border-slate-600 overflow-visible shadow-lg">
                <div className="overflow-visible">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-slate-600">
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">S.No</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Medicine Name</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Company</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Batch</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Expiry</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Qty</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Price (₹)</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">MRP (₹)</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.drugs.map((drug, idx) => {
                        const drugInfo = availableDrugs.find(d => d.id === parseInt(drug.drugId))
                        if (!drugInfo) return null
                        const amount = drugInfo.price * (drug.quantity || 0)
                        
                        return (
                          <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                            <td className="px-4 py-4 text-center">
                              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
                                {idx + 1}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-white text-sm font-medium">
                              {drugInfo.name}
                            </td>
                            <td className="px-4 py-4 text-white text-sm font-medium">
                              {drugInfo.company}
                            </td>
                            <td className="px-4 py-4 text-slate-300 text-sm font-mono">
                              {drugInfo.batch}
                            </td>
                            <td className="px-4 py-4 text-slate-300 text-sm">
                              {new Date(drugInfo.expiryDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4 text-center text-slate-300 font-semibold">
                              {drug.quantity}
                            </td>
                            <td className="px-4 py-4 text-center text-green-400 font-bold text-sm">
                              ₹{drugInfo.price}
                            </td>
                            <td className="px-4 py-4 text-center text-blue-400 font-bold text-sm">
                              ₹{drugInfo.mrp}
                            </td>
                            <td className="px-4 py-4 text-center text-white font-bold text-sm">
                              ₹{amount.toFixed(2)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total Section */}
              <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-2 border-green-600/40 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center mt-8">
                <div>
                  <p className="text-slate-300 mb-2">Total Items: <span className="text-white font-bold">{formData.drugs.length}</span></p>
                  <p className="text-slate-300">Total Quantity: <span className="text-white font-bold">{formData.drugs.reduce((sum, d) => sum + parseInt(d.quantity || 0), 0)}</span></p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-slate-400 text-sm mb-1">Grand Total Amount</p>
                  <p className="text-4xl font-bold text-green-400">₹{calculateTotal()}</p>
                </div>
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
              className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}