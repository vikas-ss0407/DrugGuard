import { useState, useRef } from 'react'

export default function PurchaseFromManufacturer() {
  const [formData, setFormData] = useState({
    manufacturer: '',
    drugs: []
  })
  const [currentMedicine, setCurrentMedicine] = useState({
    drugId: '',
    quantity: ''
  })
  const [medicineSearch, setMedicineSearch] = useState('')
  const [openDropdown, setOpenDropdown] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchInputRef = useRef(null)
  const quantityInputRef = useRef(null)

  const manufacturers = ['Cipla Ltd', 'Sun Pharma', 'Dr. Reddy\'s Labs', 'Lupin Ltd', 'Abbott India', 'GSK India']
  const availableDrugs = [
    { id: 1, name: 'Paracetamol 500mg', batch: 'MFG001', company: 'Cipla Ltd', expiryDate: '2027-06-15', price: 15, mrp: 25, offer: '10+2', stock: 50000 },
    { id: 2, name: 'Aspirin 75mg', batch: 'MFG002', company: 'GSK India', expiryDate: '2027-08-20', price: 8, mrp: 15, stock: 30000 },
    { id: 3, name: 'Ibuprofen 400mg', batch: 'MFG003', company: 'Abbott', expiryDate: '2027-07-10', price: 18, mrp: 30, offer: '8+1', stock: 25000 },
    { id: 4, name: 'Amoxicillin 250mg', batch: 'MFG004', company: 'Lupin Ltd', expiryDate: '2027-09-30', price: 28, mrp: 42.5, offer: '5+1', stock: 15000 },
    { id: 5, name: 'Cough Syrup 100ml', batch: 'MFG005', company: 'Dr. Reddy\'s', expiryDate: '2027-05-15', price: 35, mrp: 55, stock: 8000 },
    { id: 6, name: 'Vitamin B12', batch: 'MFG006', company: 'Sun Pharma', expiryDate: '2027-10-20', price: 12, mrp: 22, stock: 20000 },
    { id: 7, name: 'Insulin Injection', batch: 'MFG007', company: 'Novo Nordisk', expiryDate: '2026-12-15', price: 450, mrp: 800, stock: 5000 },
    { id: 8, name: 'Metformin 500mg', batch: 'MFG008', company: 'Cipla Ltd', expiryDate: '2027-04-10', price: 6, mrp: 12, offer: '10+2', stock: 40000 }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addMedicineToOrder = () => {
    if (!currentMedicine.drugId || !currentMedicine.quantity) {
      alert('Please select a medicine and enter quantity')
      return
    }

    // Add to order summary
    setFormData(prev => ({
      ...prev,
      drugs: [...prev.drugs, { ...currentMedicine }]
    }))

    // Clear current selection for next medicine
    setCurrentMedicine({ drugId: '', quantity: '' })
    setMedicineSearch('')
    setOpenDropdown(false)
    setHighlightedIndex(-1)
    
    // Focus back on search input
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 100)
  }

  const selectMedicine = (drug) => {
    setCurrentMedicine(prev => ({ ...prev, drugId: drug.id.toString() }))
    setMedicineSearch(drug.name)
    setOpenDropdown(false)
    setHighlightedIndex(-1)
    // Focus on quantity input after selection
    setTimeout(() => {
      if (quantityInputRef.current) {
        quantityInputRef.current.focus()
      }
    }, 100)
  }

  const handleSearchKeyDown = (e) => {
    const filteredDrugs = availableDrugs.filter(d => 
      d.name.toLowerCase().includes(medicineSearch.toLowerCase())
    )

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => 
        prev < filteredDrugs.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0)
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault()
      selectMedicine(filteredDrugs[highlightedIndex])
    } else if (e.key === 'Tab' && highlightedIndex >= 0) {
      e.preventDefault()
      selectMedicine(filteredDrugs[highlightedIndex])
    }
  }

  const handleQuantityKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addMedicineToOrder()
    }
  }

  const removeMedicine = (index) => {
    setFormData(prev => ({
      ...prev,
      drugs: prev.drugs.filter((_, i) => i !== index)
    }))
  }

  const calculateTotal = () => {
    return formData.drugs.reduce((total, item) => {
      const drug = availableDrugs.find(d => d.id === parseInt(item.drugId))
      return total + (drug ? drug.price * parseInt(item.quantity) : 0)
    }, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.manufacturer || formData.drugs.length === 0) {
      alert('Please select a manufacturer and add at least one medicine')
      return
    }
    alert(`Order placed successfully!\nManufacturer: ${formData.manufacturer}\nTotal Items: ${formData.drugs.length}\nTotal Amount: ₹${calculateTotal()}`)
    // Reset form
    setFormData({ manufacturer: '', drugs: [] })
    setCurrentMedicine({ drugId: '', quantity: '' })
    setMedicineSearch('')
  }

  const filteredDrugs = availableDrugs.filter(d => 
    medicineSearch && d.name.toLowerCase().includes(medicineSearch.toLowerCase())
  )

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Purchase from Manufacturer</h1>
          <p className="text-slate-400">Create a new purchase order to manufacturers</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Manufacturer Selection */}
          <div className="bg-slate-800 rounded-lg p-6 mb-6 shadow-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Select Manufacturer</h3>
            <select
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a manufacturer...</option>
              {manufacturers.map((mfr, idx) => (
                <option key={idx} value={mfr}>{mfr}</option>
              ))}
            </select>
          </div>

          {/* Medicine Selection */}
          <div className="bg-slate-800 rounded-lg p-6 mb-6 shadow-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Add Medicines</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Medicine Search */}
              <div className="relative">
                <label className="block text-slate-400 text-sm mb-2">Search Medicine</label>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={medicineSearch}
                  onChange={(e) => {
                    setMedicineSearch(e.target.value)
                    setOpenDropdown(true)
                    setHighlightedIndex(-1)
                  }}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => setOpenDropdown(true)}
                  placeholder="Type medicine name..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Dropdown */}
                {openDropdown && filteredDrugs.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-slate-700 rounded-lg shadow-lg max-h-96 overflow-y-auto border border-slate-600">
                    {filteredDrugs.map((drug, index) => (
                      <div
                        key={drug.id}
                        onClick={() => selectMedicine(drug)}
                        className={`p-4 cursor-pointer transition-colors ${
                          index === highlightedIndex ? 'bg-blue-600' : 'hover:bg-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-white mb-1">{drug.name}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-slate-400">Company: </span>
                                <span className="text-slate-300">{drug.company}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Batch: </span>
                                <span className="text-slate-300">{drug.batch}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Price: </span>
                                <span className="text-green-400 font-semibold">₹{drug.price}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Expiry: </span>
                                <span className="text-slate-300">{new Date(drug.expiryDate).toLocaleDateString()}</span>
                              </div>
                              {drug.offer && (
                                <div className="col-span-2">
                                  <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">Offer: {drug.offer}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-slate-400 text-sm mb-2">Quantity</label>
                <input
                  ref={quantityInputRef}
                  type="number"
                  value={currentMedicine.quantity}
                  onChange={(e) => setCurrentMedicine(prev => ({ ...prev, quantity: e.target.value }))}
                  onKeyPress={handleQuantityKeyPress}
                  placeholder="Enter quantity"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addMedicineToOrder}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              + Add Medicine
            </button>
          </div>

          {/* Order Summary */}
          {formData.drugs.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-6 mb-6 shadow-lg border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-300">Medicine</th>
                      <th className="px-4 py-3 text-left text-slate-300">Price</th>
                      <th className="px-4 py-3 text-left text-slate-300">Quantity</th>
                      <th className="px-4 py-3 text-left text-slate-300">Total</th>
                      <th className="px-4 py-3 text-left text-slate-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.drugs.map((item, index) => {
                      const drug = availableDrugs.find(d => d.id === parseInt(item.drugId))
                      return (
                        <tr key={index} className="border-t border-slate-700">
                          <td className="px-4 py-3 text-white">{drug?.name}</td>
                          <td className="px-4 py-3 text-slate-300">₹{drug?.price}</td>
                          <td className="px-4 py-3 text-slate-300">{item.quantity}</td>
                          <td className="px-4 py-3 text-green-400 font-semibold">₹{drug ? drug.price * parseInt(item.quantity) : 0}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => removeMedicine(index)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                    <tr className="border-t-2 border-slate-600">
                      <td colSpan="3" className="px-4 py-4 text-right text-white font-bold text-lg">Grand Total:</td>
                      <td className="px-4 py-4 text-green-400 font-bold text-xl">₹{calculateTotal()}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-lg"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
