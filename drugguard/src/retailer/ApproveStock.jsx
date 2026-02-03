export default function ApproveStock() {
  const pendingDeliveries = [
    { id: 1, billNo: 'WHL-001-2024', wholesaler: 'MediCorp Wholesale', drug: 'Paracetamol 500mg', quantity: 500, amount: '₹12,500', deliveredDate: '2024-02-03', status: 'Awaiting Approval', batchNo: 'BATCH-2024-001' },
    { id: 2, billNo: 'WHL-002-2024', wholesaler: 'HealthCare Distributors', drug: 'Amoxicillin 250mg', quantity: 200, amount: '₹8,500', deliveredDate: '2024-02-02', status: 'Awaiting Approval', batchNo: 'BATCH-2024-002' }
  ]

  const handleApprove = (id) => {
    alert(`Stock approved for delivery #${id}`)
  }

  const handleReject = (id) => {
    alert(`Stock rejected for delivery #${id}`)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Approve Received Stock</h1>
          <p className="text-slate-400">Review and approve delivered stock items</p>
        </div>

        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bill Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Wholesaler</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Drug</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Batch No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Delivered Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-semibold">{delivery.billNo}</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.wholesaler}</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.drug}</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.quantity} units</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.batchNo}</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.deliveredDate}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleApprove(delivery.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(delivery.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
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