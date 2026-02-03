import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ userRole }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()

  const menuItems = {
    inspector: [
      { label: 'Dashboard', path: '/inspector/dashboard', icon: '📊' },
      { label: 'Create Wholesaler', path: '/inspector/create-wholesaler', icon: '➕' },
      { label: 'Create Retailer', path: '/inspector/create-retailer', icon: '➕' },
      { label: 'License Verification', path: '/inspector/license-verification', icon: '✓' },
      { label: 'Wholesaler Sales', path: '/inspector/view-wholesaler-sales', icon: '📈' },
      { label: 'Retailer Purchases', path: '/inspector/view-retailer-purchases', icon: '📦' },
      { label: 'Stock Movement', path: '/inspector/stock-movement', icon: '🚚' },
      { label: 'Compliance Reports', path: '/inspector/compliance-reports', icon: '📋' },
      { label: 'Audit Logs', path: '/inspector/audit-logs', icon: '📝' }
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
      { label: 'Purchase & Sales History', path: '/retailer/purchase-sales-history', icon: '📋' },
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
    <div className={`bg-slate-800 text-white transition-all duration-300 h-full sticky top-20 overflow-y-auto ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-slate-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors"
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
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-blue-600 text-white font-semibold shadow-lg'
                : 'hover:bg-slate-700 text-slate-300'
            }`}
            title={item.label}
          >
            <span className="text-lg">{item.icon}</span>
            {isExpanded && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}