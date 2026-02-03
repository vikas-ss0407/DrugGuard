import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Utility Components
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

// Auth Components
import Landingpage from './components/Landingpage'
import Login from './components/Login'

// Drug Inspector Components
import DIDashboard from './druginspector/DrugDashboard'
import CreateWholesaler from './druginspector/CreateWholesaler'
import CreateRetailer from './druginspector/CreateRetailer'
import LicenseVerification from './druginspector/LicenseVerification'
import ViewWholesalerSales from './druginspector/ViewWholesalerSales'
import ViewRetailerPurchases from './druginspector/ViewRetailerPurchases'
import StockMovementReports from './druginspector/StockMovementReports'
import ComplianceReports from './druginspector/ComplianceReports'
import AuditLogs from './druginspector/AuditLogs'

// Wholesaler Components
import WholesalerDashboard from './wholesaler/WholesalerDashboard'
import SellToRetailer from './wholesaler/SellToRetailer'
import SalesHistory from './wholesaler/SalesHistory'
import StockManagement from './wholesaler/StockManagement'
import ReturnRequests from './wholesaler/ReturnRequests'
import WholesalerProfile from './wholesaler/WholesalerProfile'

// Retailer Components
import RetailerDashboard from './retailer/RetailerDashboard'
import PurchaseFromWholesaler from './retailer/PurchaseFromWholesaler'
import ApproveStock from './retailer/ApproveStock'
import SellToCustomer from './retailer/SellToCustomer'
import ReturnProduct from './retailer/ReturnProduct'
import RetailerPurchaseSalesHistory from './retailer/RetailerPurchaseSalesHistory'
import RetailerProfile from './retailer/RetailerProfile'

// Higher Authority Components
import HADashboard from './higherauthority/HADashboard'
import HAViewWholesalerSales from './higherauthority/HAViewWholesalerSales'
import HAViewRetailerPurchases from './higherauthority/HAViewRetailerPurchases'
import HAStockReports from './higherauthority/HAStockReports'

function App() {
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (role) => {
    setUserRole(role)
  }

  const handleLogout = () => {
    setUserRole(null)
  }

  return (
    <Router>
      {userRole && <Navbar userRole={userRole} onLogout={handleLogout} />}
      <div className="flex">
        {userRole && <Sidebar userRole={userRole} />}
        <div className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Drug Inspector Routes */}
            {userRole === 'inspector' && (
              <>
                <Route path="/inspector/dashboard" element={<DIDashboard />} />
                <Route path="/inspector/create-wholesaler" element={<CreateWholesaler />} />
                <Route path="/inspector/create-retailer" element={<CreateRetailer />} />
                <Route path="/inspector/license-verification" element={<LicenseVerification />} />
                <Route path="/inspector/view-wholesaler-sales" element={<ViewWholesalerSales />} />
                <Route path="/inspector/view-retailer-purchases" element={<ViewRetailerPurchases />} />
                <Route path="/inspector/stock-movement" element={<StockMovementReports />} />
                <Route path="/inspector/compliance-reports" element={<ComplianceReports />} />
                <Route path="/inspector/audit-logs" element={<AuditLogs />} />
              </>
            )}

            {/* Wholesaler Routes */}
            {userRole === 'wholesaler' && (
              <>
                <Route path="/wholesaler/dashboard" element={<WholesalerDashboard />} />
                <Route path="/wholesaler/sell-to-retailer" element={<SellToRetailer />} />
                <Route path="/wholesaler/sales-history" element={<SalesHistory />} />
                <Route path="/wholesaler/stock-management" element={<StockManagement />} />
                <Route path="/wholesaler/return-requests" element={<ReturnRequests />} />
                <Route path="/wholesaler/profile" element={<WholesalerProfile />} />
              </>
            )}

            {/* Retailer Routes */}
            {userRole === 'retailer' && (
              <>
                <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
                <Route path="/retailer/purchase-from-wholesaler" element={<PurchaseFromWholesaler />} />
                <Route path="/retailer/approve-stock" element={<ApproveStock />} />
                <Route path="/retailer/sell-to-customer" element={<SellToCustomer />} />
                <Route path="/retailer/return-product" element={<ReturnProduct />} />
                <Route path="/retailer/purchase-sales-history" element={<RetailerPurchaseSalesHistory />} />
                <Route path="/retailer/profile" element={<RetailerProfile />} />
              </>
            )}

            {/* Higher Authority Routes */}
            {userRole === 'authority' && (
              <>
                <Route path="/authority/dashboard" element={<HADashboard />} />
                <Route path="/authority/view-wholesaler-sales" element={<HAViewWholesalerSales />} />
                <Route path="/authority/view-retailer-purchases" element={<HAViewRetailerPurchases />} />
                <Route path="/authority/stock-reports" element={<HAStockReports />} />
              </>
            )}

            {/* Default Routes */}
            <Route path="/inspector/dashboard" element={userRole === 'inspector' ? <DIDashboard /> : <Navigate to="/" />} />
            <Route path="/wholesaler/dashboard" element={userRole === 'wholesaler' ? <WholesalerDashboard /> : <Navigate to="/" />} />
            <Route path="/retailer/dashboard" element={userRole === 'retailer' ? <RetailerDashboard /> : <Navigate to="/" />} />
            <Route path="/authority/dashboard" element={userRole === 'authority' ? <HADashboard /> : <Navigate to="/" />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
