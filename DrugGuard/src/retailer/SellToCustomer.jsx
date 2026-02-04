import { useState, useRef } from 'react'

export default function SellToCustomer() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    doctorName: '',
    drugs: []
  })
  const [currentMedicine, setCurrentMedicine] = useState({
    drugId: '',
    quantity: '',
    packaging: ''
  })
  const [medicineSearch, setMedicineSearch] = useState('')
  const [openDropdown, setOpenDropdown] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchInputRef = useRef(null)
  const quantityInputRef = useRef(null)
  const packagingInputRef = useRef(null)

  const availableDrugs = [
    { id: 1, name: 'Paracetamol 500mg', batch: 'BAT001', company: 'Cipla Ltd', expiryDate: '2026-06-15', stock: 500, sellingPrice: 30, category: 'Strip', categoryUnit: '10\'s', mrp: 35, tabletsPerStrip: 10 },
    { id: 2, name: 'Aspirin 75mg', batch: 'BAT002', company: 'GSK India', expiryDate: '2026-08-20', stock: 300, sellingPrice: 20, category: 'Strip', categoryUnit: '15\'s', mrp: 25, tabletsPerStrip: 15 },
    { id: 3, name: 'Ibuprofen 400mg', batch: 'BAT003', company: 'Abbott', expiryDate: '2026-07-10', stock: 1000, sellingPrice: 35, category: 'Strip', categoryUnit: '10\'s', mrp: 40, tabletsPerStrip: 10 },
    { id: 4, name: 'Amoxicillin 250mg', batch: 'BAT004', company: 'Lupin Ltd', expiryDate: '2026-09-30', stock: 200, sellingPrice: 50, category: 'Bottle', categoryUnit: '100ml', mrp: 60, tabletsPerStrip: 0 }
  ]

  const calculatePricePerUnit = (drug) => {
    if (drug.category === 'Strip' && currentMedicine.drugId === drug.id.toString()) {
      if (currentMedicine.packaging === 'tablet') {
        return (drug.mrp / drug.tabletsPerStrip).toFixed(2)
      } else if (currentMedicine.packaging === 'strip') {
        return drug.mrp
      }
    }
    return drug.mrp
  }

  const calculateAmount = (drugId, quantity, packaging) => {
    const drugInfo = availableDrugs.find(d => d.id === parseInt(drugId))
    if (!drugInfo) return 0
    
    let pricePerUnit = drugInfo.mrp
    if (drugInfo.category === 'Strip') {
      if (packaging === 'tablet') {
        pricePerUnit = drugInfo.mrp / drugInfo.tabletsPerStrip
      } else if (packaging === 'strip') {
        pricePerUnit = drugInfo.mrp
      }
    }
    return (pricePerUnit * quantity).toFixed(2)
  }

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

    const selectedDrug = availableDrugs.find(d => d.id === parseInt(currentMedicine.drugId))
    if (selectedDrug.category === 'Strip' && !currentMedicine.packaging) {
      alert('Please select packaging type (Tablet/Strip)')
      return
    }

    // Add to order summary
    setFormData(prev => ({
      ...prev,
      drugs: [...prev.drugs, { ...currentMedicine }]
    }))

    // Clear current selection
    setCurrentMedicine({ drugId: '', quantity: '', packaging: '' })
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
    setCurrentMedicine(prev => ({ 
      ...prev, 
      drugId: drug.id.toString(),
      packaging: drug.category === 'Strip' ? '' : 'N/A'
    }))
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
      const selectedDrug = availableDrugs.find(d => d.id === parseInt(currentMedicine.drugId))
      
      // If medicine requires packaging selection, focus on it
      if (selectedDrug && selectedDrug.category === 'Strip') {
        setTimeout(() => {
          if (packagingInputRef.current) {
            packagingInputRef.current.focus()
          }
        }, 100)
      } else {
        // Otherwise, add medicine directly
        addMedicineToOrder()
      }
    }
  }

  const handlePackagingKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addMedicineToOrder()
    }
  }

  const calculateTotal = () => {
    return formData.drugs.reduce((total, drug) => {
      return total + parseFloat(calculateAmount(drug.drugId, drug.quantity, drug.packaging))
    }, 0).toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.customerName || formData.drugs.length === 0) {
      alert('Please enter customer details and select drugs')
      return
    }
    alert(`Sale completed successfully!\nCustomer: ${formData.customerName}\nPhone: ${formData.customerPhone}\nDoctor: ${formData.doctorName}\nTotal: ₹${calculateTotal()}`)
    setFormData({ customerName: '', customerPhone: '', doctorName: '', drugs: [] })
  }

  const handlePrintReceipt = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sales Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .receipt {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #000;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .receipt-date {
            text-align: center;
            margin-bottom: 15px;
            font-size: 12px;
          }
          .customer-info {
            margin-bottom: 20px;
            font-size: 14px;
          }
          .customer-info p {
            margin: 5px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 12px;
          }
          th {
            background-color: #f0f0f0;
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            font-weight: bold;
          }
          td {
            border: 1px solid #000;
            padding: 8px;
          }
          .total-section {
            text-align: right;
            margin-bottom: 20px;
            font-size: 14px;
          }
          .total-amount {
            font-weight: bold;
            font-size: 18px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            border-top: 2px solid #000;
            padding-top: 10px;
            font-size: 12px;
            margin-top: 20px;
          }
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h1>SALES RECEIPT</h1>
          </div>
          
          <div class="receipt-date">
            <p>Date: ${new Date().toLocaleDateString()} | Time: ${new Date().toLocaleTimeString()}</p>
          </div>

          <div class="customer-info">
            <p><strong>Customer Name:</strong> ${formData.customerName}</p>
            <p><strong>Phone:</strong> ${formData.customerPhone || 'N/A'}</p>
            <p><strong>Doctor Name:</strong> ${formData.doctorName || 'N/A'}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Medicine Name</th>
                <th>Batch</th>
                <th>Company</th>
                <th>Type</th>
                <th>Qty</th>
                <th>MRP</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${formData.drugs.map((drug, idx) => {
                const drugInfo = availableDrugs.find(d => d.id === parseInt(drug.drugId))
                if (!drugInfo) return ''
                const amount = calculateAmount(drug.drugId, drug.quantity, drug.packaging)
                return `
                  <tr>
                    <td>${idx + 1}</td>
                    <td>${drugInfo.name}</td>
                    <td>${drugInfo.batch}</td>
                    <td>${drugInfo.company}</td>
                    <td>${drug.packaging === 'tablet' ? 'Tablet' : 'Strip'}</td>
                    <td>${drug.quantity}</td>
                    <td>₹${drugInfo.mrp}</td>
                    <td>₹${amount}</td>
                  </tr>
                `
              }).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div>Subtotal: <strong>₹${calculateTotal()}</strong></div>
            <div class="total-amount">Total Amount: ₹${calculateTotal()}</div>
          </div>

          <div class="footer">
            <p>Thank you for your purchase!</p>
            <p>Please keep this receipt for your records</p>
          </div>
        </div>
      </body>
      </html>
    `
    
    const printWindow = window.open('', '', 'width=900,height=700')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sell to Customer</h1>
          <p className="text-slate-400">Create a new customer sale transaction</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                placeholder="Enter doctor name"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Add Medicines</h3>
            <div className="bg-slate-800 rounded-lg p-4 mb-4 border border-slate-600">
              <div className="flex gap-4 items-end">
                <div className="flex-1 relative">
                  <label className="block text-xs font-medium text-slate-300 mb-2">Search Medicine</label>
                  <div className="relative">
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
                      onBlur={() => setTimeout(() => setOpenDropdown(false), 300)}
                      placeholder="Type medicine name..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    />
                    {openDropdown && (
                      <div className="absolute top-full left-0 mt-2 bg-slate-900 border-2 border-purple-500 rounded-lg shadow-2xl z-[9999] w-full max-h-72 overflow-y-auto">
                        {availableDrugs.filter(d => 
                          d.name.toLowerCase().includes(medicineSearch.toLowerCase())
                        ).length > 0 ? (
                          <div className="divide-y divide-slate-700">
                            {availableDrugs.filter(d => 
                              d.name.toLowerCase().includes(medicineSearch.toLowerCase())
                            ).map((d, index) => (
                              <div
                                key={d.id}
                                onMouseDown={(e) => {
                                  e.preventDefault()
                                  selectMedicine(d)
                                }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                className={`px-5 py-4 cursor-pointer transition-colors ${
                                  highlightedIndex === index 
                                    ? 'bg-purple-600/30 border-l-4 border-purple-500' 
                                    : 'hover:bg-slate-800'
                                }`}
                              >
                                <div className="font-bold text-white text-base mb-2">{d.name}</div>
                                <div className="grid grid-cols-5 gap-3 text-xs">
                                  <div>
                                    <div className="text-slate-500 mb-1">Company</div>
                                    <div className="text-slate-300 font-semibold">{d.company}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-500 mb-1">Price</div>
                                    <div className="text-green-400 font-bold">₹{d.sellingPrice}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-500 mb-1">MRP</div>
                                    <div className="text-blue-400 font-bold">₹{d.mrp}</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-500 mb-1">Packing</div>
                                    <div className="text-slate-300">{d.category} ({d.categoryUnit})</div>
                                  </div>
                                  <div>
                                    <div className="text-slate-500 mb-1">Stock</div>
                                    <div className={`font-bold ${d.stock > 100 ? 'text-green-400' : d.stock > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                      {d.stock} units
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
                <div className="w-24">
                  <label className="block text-xs font-medium text-slate-300 mb-2">Quantity</label>
                  <input
                    ref={quantityInputRef}
                    type="number"
                    min="1"
                    value={currentMedicine.quantity}
                    onChange={(e) => setCurrentMedicine(prev => ({ ...prev, quantity: e.target.value }))}
                    onKeyPress={handleQuantityKeyPress}
                    className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white text-center text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    placeholder="Qty"
                  />
                </div>
                {currentMedicine.drugId && availableDrugs.find(d => d.id === parseInt(currentMedicine.drugId))?.category === 'Strip' && (
                  <div className="w-32">
                    <label className="block text-xs font-medium text-slate-300 mb-2">Packaging</label>
                    <select
                      ref={packagingInputRef}
                      value={currentMedicine.packaging}
                      onChange={(e) => setCurrentMedicine(prev => ({ ...prev, packaging: e.target.value }))}
                      onKeyPress={handlePackagingKeyPress}
                      className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    >
                      <option value="">Select</option>
                      <option value="tablet">Tablet</option>
                      <option value="strip">Strip</option>
                    </select>
                  </div>
                )}
                <button
                  type="button"
                  onClick={addMedicineToOrder}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-700 hover:to-purple-600 transition-all font-semibold"
                >
                  ➕ Add
                </button>
              </div>
            </div>
          </div>

          {formData.drugs.length > 0 && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 mb-8 border-2 border-slate-600 shadow-2xl overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">📋 Bill Summary</h3>
                <p className="text-slate-400 text-sm">Complete medicine details for your order</p>
              </div>

              <div className="bg-slate-800 rounded-lg border border-slate-600 overflow-visible shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-slate-600">
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">S.No</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Medicine Name</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Company</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Batch</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Expiry</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Packing</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-slate-300">Type</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Qty</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">MRP (₹)</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Amount (₹)</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-slate-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.drugs.map((drug, idx) => {
                        const drugInfo = availableDrugs.find(d => d.id === parseInt(drug.drugId))
                        if (!drugInfo) return null
                        
                        let pricePerUnit = drugInfo.sellingPrice
                        if (drugInfo.category === 'Strip' && drug.packaging === 'tablet') {
                          pricePerUnit = drugInfo.sellingPrice / drugInfo.tabletsPerStrip
                        } else if (drugInfo.category === 'Strip' && drug.packaging === 'strip') {
                          pricePerUnit = drugInfo.sellingPrice
                        }
                        
                        const amount = calculateAmount(drug.drugId, drug.quantity, drug.packaging)
                        
                        return (
                          <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                            <td className="px-4 py-4 text-center">
                              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
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
                            <td className="px-4 py-4 text-slate-300 text-sm">
                              {drugInfo.category} ({drugInfo.categoryUnit})
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-semibold">
                                {drug.packaging === 'tablet' ? '💊 Tablet' : '📦 Strip'}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center text-slate-300 font-semibold">
                              {drug.quantity}
                            </td>
                            <td className="px-4 py-4 text-center text-blue-400 font-bold text-sm">
                              ₹{drugInfo.mrp}
                            </td>
                            <td className="px-4 py-4 text-center text-white font-bold text-sm">
                              ₹{amount}
                            </td>
                            <td className="px-4 py-4 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    drugs: prev.drugs.filter((_, i) => i !== idx)
                                  }))
                                }}
                                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors font-semibold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  disabled={formData.drugs.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🖨️ Print Receipt
                </button>
                <div className="bg-slate-700 rounded-lg p-6 w-96">
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-300 text-sm">
                      <span>Subtotal:</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="border-t border-slate-600 pt-3 flex justify-between text-xl font-bold text-white">
                      <span>Total Amount:</span>
                      <span className="text-green-400">₹{calculateTotal()}</span>
                    </div>
                  </div>
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
              type="button"
              onClick={handlePrintReceipt}
              disabled={formData.drugs.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🖨️ Print Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}