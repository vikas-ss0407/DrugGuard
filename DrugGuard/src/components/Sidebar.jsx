import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ userRole }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()

  const menuItems = {
    inspector: [
      { label: 'Dashboard', path: '/inspector/dashboard', icon: '📊' },
      { label: 'Create New License', path: '/inspector/create-license', icon: '➕' },
      { label: 'Update Shop Details', path: '/inspector/update-shop', icon: '✏️' },
      { label: 'Wholesaler Sales', path: '/inspector/view-wholesaler-sales', icon: '📈' },
      { label: 'Retailer Purchases', path: '/inspector/view-retailer-purchases', icon: '📦' }
    ],
    wholesaler: [
      { label: 'Dashboard', path: '/wholesaler/dashboard', icon: '📊' },
      { label: 'Sell to Retailer', path: '/wholesaler/sell-to-retailer', icon: '💰' },
      { label: 'Sales History', path: '/wholesaler/sales-history', icon: '📈' },
      { label: 'Stock Management', path: '/wholesaler/stock-management', icon: '📦' },
      { label: 'Return Requests', path: '/wholesaler/return-requests', icon: '↩️' },
      { label: 'Profile & License', path: '/wholesaler/profile', icon: '👤' }
    ],
    retailer: [
      { label: 'Dashboard', path: '/retailer/dashboard', icon: '📊' },
      { label: 'Purchase from Wholesaler', path: '/retailer/purchase-from-wholesaler', icon: '🛒' },
      { label: 'Approve Stock', path: '/retailer/approve-stock', icon: '✓' },
      { label: 'Sell to Customer', path: '/retailer/sell-to-customer', icon: '💳' },
      { label: 'Return Product', path: '/retailer/return-product', icon: '↩️' },
      { label: 'Purchase History', path: '/retailer/purchase-history', icon: '🧾' },
      { label: 'Sales History', path: '/retailer/sales-history', icon: '📈' },
      { label: 'Profile & License', path: '/retailer/profile', icon: '👤' }
    ],
    authority: [
      { label: 'Dashboard', path: '/authority/dashboard', icon: '📊' },
      { label: 'Wholesaler Sales', path: '/authority/view-wholesaler-sales', icon: '📈' },
      { label: 'Retailer Purchases', path: '/authority/view-retailer-purchases', icon: '📦' },
      { label: 'Stock & Reports', path: '/authority/stock-reports', icon: '📋' }
    ]
  }

  const items = menuItems[userRole] || []
  const isActive = (path) => location.pathname === path

  return (
    <div className={`bg-slate-900 text-white transition-all duration-500 ease-in-out min-h-screen sticky top-20 overflow-y-auto border-r border-slate-800 shadow-2xl ${isExpanded ? 'w-72' : 'w-24'}`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-slate-800 flex justify-end">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {isExpanded ? '◀️' : '▶️'}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 translate-x-1'
                : 'hover:bg-slate-800 text-slate-400 hover:text-white hover:translate-x-1'
            }`}
            title={item.label}
          >
            <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
            {isExpanded && <span className="text-sm font-medium tracking-wide whitespace-nowrap">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}