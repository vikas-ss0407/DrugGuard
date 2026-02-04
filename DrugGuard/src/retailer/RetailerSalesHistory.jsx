export default function RetailerSalesHistory() {
  const sales = [
    {
      id: 1,
      reference: 'CST-001-2024',
      customerName: 'John Doe',
      doctorName: 'Dr. Priya Sharma',
      medicineName: 'Paracetamol 500mg',
      packaging: 'Strip',
      batch: 'BAT001',
      company: 'Cipla Ltd',
      expiryDate: '2026-06-15',
      quantity: 10,
      amount: '₹350',
      date: '2024-02-03',
      status: 'Completed'
    },
    {
      id: 2,
      reference: 'CST-002-2024',
      customerName: 'Jane Smith',
      doctorName: 'Dr. Arjun Nair',
      medicineName: 'Aspirin 75mg',
      packaging: 'Tablet',
      batch: 'BAT002',
      company: 'GSK India',
      expiryDate: '2026-08-20',
      quantity: 5,
      amount: '₹125',
      date: '2024-02-01',
      status: 'Completed'
    }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sales History</h1>
          <p className="text-slate-400">View all your sales transactions</p>
        </div>

        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Reference</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Customer Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Doctor Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Medicine Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Batch No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Expiry Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((tx) => (
                  <tr key={tx.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{tx.reference}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.customerName}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.doctorName}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.medicineName}</td>
                    <td className="px-6 py-4 text-slate-300 font-mono">{tx.batch}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.company}</td>
                    <td className="px-6 py-4 text-slate-300">{new Date(tx.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-slate-300">
                      {tx.quantity} {tx.packaging === 'Strip' ? 'strip' : tx.packaging === 'Tablet' ? 'tablet' : 'ml'}
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-semibold">{tx.amount}</td>
                    <td className="px-6 py-4 text-slate-300">{tx.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
