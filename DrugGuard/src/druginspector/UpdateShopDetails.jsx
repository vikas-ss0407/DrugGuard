import { useEffect, useState } from 'react'
import { getInspectorShops } from '../api/druginspector/inspectorApi'

function mapLicenseToFormData(licenseData = {}, fallbackShop = {}) {
  const establishment = licenseData.establishment || {}
  const address = establishment.address || {}
  const contact = establishment.contact || {}
  const owner = licenseData.owner || {}
  const pharmacist = licenseData.pharmacist || {}
  const infrastructure = licenseData.infrastructure || {}
  const equipment = licenseData.equipment || {}
  const ac = equipment.ac || {}
  const refrigerator = equipment.refrigerator || {}
  const credentials = licenseData.credentials || {}

  return {
    fullName: establishment.fullName || fallbackShop.owner || '',
    dateOfBirth: establishment.dateOfBirth || '',
    licenseType: licenseData.licenseType || fallbackShop.type || '',
    shopFirmName: establishment.shopFirmName || fallbackShop.name || '',
    ownershipType: establishment.ownershipType || '',
    doorNo: address.doorNo || '',
    area: address.area || '',
    city: address.city || '',
    post: address.post || '',
    district: address.district || '',
    state: address.state || '',
    pinCode: address.pinCode || '',
    mobileNumber: contact.mobileNumber || fallbackShop.phone || '',
    email: contact.email || fallbackShop.email || '',
    ownerPanCard: owner.panCardNumber || '',
    ownerAadharNumber: owner.aadhaarNumber || '',
    ownerAadharCardImage: null,
    pharmacistName: pharmacist.name || '',
    registrationId: pharmacist.registrationId || '',
    qualification: pharmacist.qualification || '',
    yearsOfExperience:
      pharmacist.yearsOfExperience === null || pharmacist.yearsOfExperience === undefined
        ? ''
        : String(pharmacist.yearsOfExperience),
    pharmacistDateOfBirth: pharmacist.dateOfBirth || '',
    aadhaarNumber: pharmacist.aadhaarNumber || '',
    pharmacistMobile: pharmacist.mobileNumber || '',
    pharmacistEmail: pharmacist.email || '',
    employmentType: pharmacist.employmentType || '',
    pharmacistCertificate: null,
    pharmacistSignatureImage: null,
    appointmentDocument: null,
    totalShopArea:
      infrastructure.totalShopArea === null || infrastructure.totalShopArea === undefined
        ? ''
        : String(infrastructure.totalShopArea),
    shopLength:
      infrastructure.shopLength === null || infrastructure.shopLength === undefined
        ? ''
        : String(infrastructure.shopLength),
    shopBreadth:
      infrastructure.shopBreadth === null || infrastructure.shopBreadth === undefined
        ? ''
        : String(infrastructure.shopBreadth),
    storageAreaAvailable: Boolean(infrastructure.storageAreaAvailable),
    separateScheduleDrugStorage: Boolean(infrastructure.separateScheduleDrugStorage),
    powerBackupAvailable: Boolean(infrastructure.powerBackupAvailable),
    acAvailable: Boolean(ac.available),
    acBrand: ac.brand || '',
    acModel: ac.model || '',
    acCapacity: ac.capacity === null || ac.capacity === undefined ? '' : String(ac.capacity),
    refrigeratorAvailable: Boolean(refrigerator.available),
    refrigeratorBrand: refrigerator.brand || '',
    refrigeratorModel: refrigerator.model || '',
    refrigeratorCapacity:
      refrigerator.capacity === null || refrigerator.capacity === undefined
        ? ''
        : String(refrigerator.capacity),
    refrigeratorTempRange: refrigerator.temperatureRange || '',
    loginEmail: credentials.email || fallbackShop.email || '',
    loginPassword: '',
    confirmPassword: ''
  }
}

export default function UpdateShopDetails() {
  const [view, setView] = useState('list') // 'list', 'update'
  const [selectedShop, setSelectedShop] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all') // 'all', 'wholesale', 'retail'
  const [shops, setShops] = useState([])
  const [isLoadingShops, setIsLoadingShops] = useState(true)
  const [shopLoadError, setShopLoadError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    licenseType: '',
    shopFirmName: '',
    ownershipType: '',
    doorNo: '',
    area: '',
    city: '',
    post: '',
    district: '',
    state: '',
    pinCode: '',
    mobileNumber: '',
    email: '',
    ownerPanCard: '',
    ownerAadharNumber: '',
    ownerAadharCardImage: null,
    pharmacistName: '',
    registrationId: '',
    qualification: '',
    yearsOfExperience: '',
    pharmacistDateOfBirth: '',
    aadhaarNumber: '',
    pharmacistMobile: '',
    pharmacistEmail: '',
    employmentType: '',
    pharmacistCertificate: null,
    pharmacistSignatureImage: null,
    appointmentDocument: null,
    totalShopArea: '',
    shopLength: '',
    shopBreadth: '',
    storageAreaAvailable: false,
    separateScheduleDrugStorage: false,
    powerBackupAvailable: false,
    acAvailable: false,
    acBrand: '',
    acModel: '',
    acCapacity: '',
    refrigeratorAvailable: false,
    refrigeratorBrand: '',
    refrigeratorModel: '',
    refrigeratorCapacity: '',
    refrigeratorTempRange: '',
    loginEmail: '',
    loginPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    let isMounted = true

    async function loadInspectorShops() {
      const session = JSON.parse(localStorage.getItem('dg_user') || '{}')
      const district = session.district || ''

      if (!district) {
        if (isMounted) {
          setShopLoadError('Inspector district not found in session. Please login again.')
          setShops([])
          setIsLoadingShops(false)
        }
        return
      }

      try {
        if (isMounted) {
          setIsLoadingShops(true)
          setShopLoadError('')
        }

        const response = await getInspectorShops(district)
        if (!isMounted) {
          return
        }

        setShops(Array.isArray(response.shops) ? response.shops : [])
      } catch (error) {
        if (!isMounted) {
          return
        }

        setShopLoadError(error.message || 'Failed to load shops from backend')
        setShops([])
      } finally {
        if (isMounted) {
          setIsLoadingShops(false)
        }
      }
    }

    loadInspectorShops()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredShops = shops.filter(shop => {
    const matchesSearch = searchQuery === '' || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.licenseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.owner.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === 'all' || 
      (filterType === 'wholesale' && shop.type === 'Wholesale') ||
      (filterType === 'retail' && shop.type === 'Retail')
    
    return matchesSearch && matchesType
  })

  const handleShopSelect = (shop) => {
    setSelectedShop(shop)
    setFormData(mapLicenseToFormData(shop.licenseData, shop))
    setView('update')
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }))
  }

  const handleBackToList = () => {
    setView('list')
    setSelectedShop(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Shop details updated successfully for ${formData.shopFirmName}!`)
    handleBackToList()
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {view === 'update' && (
              <button 
                onClick={handleBackToList}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                ← Back to List
              </button>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {view === 'list' ? 'Update Shop Details' : `Update - ${selectedShop?.name}`}
              </h1>
              <p className="text-slate-400">
                {view === 'list' ? 'Search and select a shop to update details' : 'Modify shop information'}
              </p>
            </div>
          </div>
        </div>

        {/* List View */}
        {view === 'list' && (
          <>
            {/* Search and Filter */}
            <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, license no, or owner..."
                  className="md:col-span-2 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="wholesale">Wholesale Only</option>
                  <option value="retail">Retail Only</option>
                </select>
              </div>
            </div>

            {/* Shops Table */}
            {shopLoadError && (
              <div className="mb-4 rounded-lg border border-red-700 bg-red-900/40 p-4 text-red-200">
                {shopLoadError}
              </div>
            )}

            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Shop Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">License No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Owner</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingShops && (
                      <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-slate-400">
                          Loading shops from backend...
                        </td>
                      </tr>
                    )}

                    {!isLoadingShops && filteredShops.map((shop) => (
                      <tr key={shop.id} className="border-t border-slate-700 hover:bg-slate-700 transition-colors">
                        <td className="px-6 py-4 text-white font-semibold">{shop.name}</td>
                        <td className="px-6 py-4 text-slate-300 font-mono text-sm">{shop.licenseNo}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            shop.type === 'Wholesale' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                          }`}>
                            {shop.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{shop.owner}</td>
                        <td className="px-6 py-4 text-slate-300">{shop.phone}</td>
                        <td className="px-6 py-4 text-slate-300">{shop.email}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                            {String(shop.status || '').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleShopSelect(shop)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm"
                          >
                            Update Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!isLoadingShops && filteredShops.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">No shops found matching your search criteria</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Update Form View */}
        {view === 'update' && selectedShop && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* A. Basic Establishment Details */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">A. Basic Establishment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Full Name (License Holder)</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">License Type</label>
                  <input
                    type="text"
                    name="licenseType"
                    value={formData.licenseType}
                    disabled
                    className="w-full px-4 py-2 bg-slate-600 border border-slate-600 rounded-lg text-slate-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Shop / Firm Name</label>
                  <input
                    type="text"
                    name="shopFirmName"
                    value={formData.shopFirmName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Ownership Type</label>
                  <select
                    name="ownershipType"
                    value={formData.ownershipType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Company">Company</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Shop Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">Door No</label>
                    <input
                      type="text"
                      name="doorNo"
                      value={formData.doorNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Area</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">City / Town</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Post</label>
                    <input
                      type="text"
                      name="post"
                      value={formData.post}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">PIN Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      maxLength="6"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Owner Documents & Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">PAN Card Number</label>
                    <input
                      type="text"
                      name="ownerPanCard"
                      value={formData.ownerPanCard}
                      onChange={handleInputChange}
                      placeholder="e.g., AAAPA1234A"
                      maxLength="10"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Aadhaar Card Number</label>
                    <input
                      type="text"
                      name="ownerAadharNumber"
                      value={formData.ownerAadharNumber}
                      onChange={handleInputChange}
                      maxLength="12"
                      placeholder="XXXX XXXX XXXX"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-300 mb-2">Aadhaar Card Image/Copy</label>
                    <input
                      type="file"
                      name="ownerAadharCardImage"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-slate-500 text-xs mt-1">Upload clear image/scan (PDF, JPG, PNG - Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      maxLength="10"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* B. Pharmacist Details */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">B. Pharmacist / Competent Person Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Pharmacist Name</label>
                  <input
                    type="text"
                    name="pharmacistName"
                    value={formData.pharmacistName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Registration ID</label>
                  <input
                    type="text"
                    name="registrationId"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Qualification</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="D.Pharm">D.Pharm</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="M.Pharm">M.Pharm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="pharmacistDateOfBirth"
                    value={formData.pharmacistDateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="pharmacistMobile"
                    value={formData.pharmacistMobile}
                    onChange={handleInputChange}
                    maxLength="10"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Email ID</label>
                  <input
                    type="email"
                    name="pharmacistEmail"
                    value={formData.pharmacistEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Employment Type</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 mb-2">Pharmacist Degree Certificate ({formData.qualification})</label>
                  <input
                    type="file"
                    name="pharmacistCertificate"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-slate-500 text-xs mt-1">Upload certificate/degree document (PDF, JPG, PNG - Max 5MB)</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 mb-2">Pharmacist Signature Image</label>
                  <input
                    type="file"
                    name="pharmacistSignatureImage"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-slate-500 text-xs mt-1">Upload high-quality signature image (JPG, PNG - Max 5MB)</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-300 mb-2">Appointment Letter / Consent Document</label>
                  <input
                    type="file"
                    name="appointmentDocument"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-slate-500 text-xs mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>

            {/* C. Shop Infrastructure */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">C. Shop Infrastructure Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-slate-300 mb-2">Total Shop Area (sq ft)</label>
                  <input
                    type="number"
                    name="totalShopArea"
                    value={formData.totalShopArea}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Shop Length (ft)</label>
                  <input
                    type="number"
                    name="shopLength"
                    value={formData.shopLength}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Shop Breadth (ft)</label>
                  <input
                    type="number"
                    name="shopBreadth"
                    value={formData.shopBreadth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="storageAreaAvailable"
                    checked={formData.storageAreaAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-700 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-slate-300">Storage Area Available</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="separateScheduleDrugStorage"
                    checked={formData.separateScheduleDrugStorage}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-700 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-slate-300">Separate Schedule Drug Storage</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="powerBackupAvailable"
                    checked={formData.powerBackupAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-700 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-slate-300">Power Backup Available</label>
                </div>
              </div>
            </div>

            {/* D. Equipment & Storage */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">D. Equipment & Storage Details</h2>
              
              {/* AC Section */}
              <div className="border border-slate-700 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="acAvailable"
                    checked={formData.acAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-700 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-lg font-semibold text-white">Air Conditioner Available</label>
                </div>
                {formData.acAvailable && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2">AC Brand</label>
                      <input
                        type="text"
                        name="acBrand"
                        value={formData.acBrand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">AC Model</label>
                      <input
                        type="text"
                        name="acModel"
                        value={formData.acModel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">AC Capacity (Ton)</label>
                      <input
                        type="number"
                        name="acCapacity"
                        value={formData.acCapacity}
                        onChange={handleInputChange}
                        step="0.5"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Refrigerator Section */}
              <div className="border border-slate-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="refrigeratorAvailable"
                    checked={formData.refrigeratorAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-700 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-lg font-semibold text-white">Refrigerator Available</label>
                </div>
                {formData.refrigeratorAvailable && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 mb-2">Brand</label>
                      <input
                        type="text"
                        name="refrigeratorBrand"
                        value={formData.refrigeratorBrand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">Model</label>
                      <input
                        type="text"
                        name="refrigeratorModel"
                        value={formData.refrigeratorModel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">Capacity (Liters)</label>
                      <input
                        type="number"
                        name="refrigeratorCapacity"
                        value={formData.refrigeratorCapacity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">Temperature Range</label>
                      <input
                        type="text"
                        name="refrigeratorTempRange"
                        value={formData.refrigeratorTempRange}
                        onChange={handleInputChange}
                        placeholder="e.g., 2°C to 8°C"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* E. Login Credentials */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">E. Login Credentials</h2>
              <p className="text-slate-400 mb-6">Update login email and password for this shop account</p>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Login Email</label>
                  <input
                    type="email"
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">New Password (Leave blank to keep current password)</label>
                  <input
                    type="password"
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password (min 8 characters)"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-slate-500 text-xs mt-1">Password must be at least 8 characters long with uppercase, lowercase, numbers and special characters</p>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-blue-300 text-sm">
                    <span className="font-semibold">Note:</span> Passwords are encrypted and securely stored. Users must change password on first login.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={handleBackToList}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
