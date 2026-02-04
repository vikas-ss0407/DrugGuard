import { useState } from 'react'

export default function RetailerPurchaseHistory() {
  const [selectedBill, setSelectedBill] = useState('')

  const bills = [
    {
      id: 1,
      billNo: 'WHL-001-2024',
      wholesaler: 'MediCorp Wholesale',
      date: '2024-02-03',
      totalAmount: '₹12,500',
      status: 'Completed',
      products: [
        { id: 1, name: 'Paracetamol 500mg', batch: 'BAT001', quantity: 300, rate: '₹25' },
        { id: 2, name: 'Aspirin 75mg', batch: 'BAT002', quantity: 200, rate: '₹20' }
      ]
    },
    {
      id: 2,
      billNo: 'WHL-002-2024',
      wholesaler: 'HealthCare Distributors',
      date: '2024-02-02',
      totalAmount: '₹8,500',
      status: 'Delivered',
      products: [
        { id: 3, name: 'Amoxicillin 250mg', batch: 'BAT004', quantity: 200, rate: '₹42.50' }
      ]
    },
    {
      id: 3,
      billNo: 'WHL-003-2024',
      wholesaler: 'Prime Pharmaceuticals',
      date: '2024-02-01',
      totalAmount: '₹30,000',
      status: 'Delivered',
      products: [
        { id: 4, name: 'Ibuprofen 400mg', batch: 'BAT003', quantity: 1000, rate: '₹30' }
      ]
    }
  ]

  const selectedBillData = bills.find(bill => bill.billNo === selectedBill)

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Purchase History</h1>
          <p className="text-slate-400">View all your purchase transactions</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
          <label className="block text-sm font-medium text-slate-300 mb-2">Select Bill Number</label>
          <select
            value={selectedBill}
            onChange={(e) => setSelectedBill(e.target.value)}
            className="w-full md:w-96 px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a bill</option>
            {bills.map((bill) => (
              <option key={bill.billNo} value={bill.billNo}>
                {bill.billNo} - {bill.wholesaler}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bill No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Wholesaler</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{bill.billNo}</td>
                    <td className="px-6 py-4 text-slate-300">{bill.wholesaler}</td>
                    <td className="px-6 py-4 text-slate-300">{bill.date}</td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{bill.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedBill(bill.billNo)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                      >
                        View Products
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedBillData && (
          <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
            <div className="px-6 py-4 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Products in {selectedBillData.billNo}</h2>
              <p className="text-slate-400 text-sm">Wholesaler: {selectedBillData.wholesaler}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Batch</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBillData.products.map((product) => (
                    <tr key={product.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-slate-300">{product.name}</td>
                      <td className="px-6 py-4 text-slate-300 font-mono">{product.batch}</td>
                      <td className="px-6 py-4 text-slate-300">{product.quantity} units</td>
                      <td className="px-6 py-4 text-slate-300 font-semibold">{product.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
