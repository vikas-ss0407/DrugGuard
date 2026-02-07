import { useState, useEffect } from 'react'

const API_BASE_URL = 'http://localhost:5000/api'

export default function UpdateShopDetails() {
  const [view, setView] = useState('list') // 'list', 'update'
  const [selectedShop, setSelectedShop] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all') // 'all', 'wholesale', 'retail'

  // Loaded licenses from backend
  const [licenses, setLicenses] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
    username: '',
    loginPassword: '',
    confirmPassword: '',
  })

  const filteredShops = licenses.filter((lic) => {
    const shop = lic.data || {}
    const name = lic.shop_name || shop.shopFirmName || ''
    const licenseNo = lic.license_number || ''
    const owner = lic.owner_name || shop.fullName || ''
    const type = (shop.licenseType || '').toLowerCase()

    const matchesSearch = searchQuery === '' ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      licenseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === 'all' ||
      (filterType === 'wholesale' && type === 'wholesale') ||
      (filterType === 'retail' && type === 'retail')

    return matchesSearch && matchesType
  })

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/inspector/licenses`)
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        setLicenses(json.licenses || [])
      } catch (err) {
        console.error('Error fetching licenses', err)
        setLicenses([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleShopSelect = (shop) => {
    // shop here is license record from backend
    setSelectedShop(shop)
    const data = shop.data || {}
    setFormData(prev => ({
      ...prev,
      fullName: data.fullName || shop.owner_name || '',
      dateOfBirth: data.dateOfBirth || '',
      licenseType: data.licenseType || '',
      shopFirmName: data.shopFirmName || shop.shop_name || '',
      ownershipType: data.ownershipType || '',
      doorNo: data.doorNo || '',
      area: data.area || '',
      city: data.city || '',
      post: data.post || '',
      district: data.district || '',
      state: data.state || '',
      pinCode: data.pinCode || '',
      mobileNumber: data.mobileNumber || '',
      email: data.email || '',
      ownerPanCard: data.ownerPanCard || '',
      ownerAadharNumber: data.ownerAadharNumber || '',
      ownerAadharCardImage: null,
      pharmacistName: data.pharmacistName || '',
      registrationId: data.registrationId || '',
      qualification: data.qualification || '',
      yearsOfExperience: data.yearsOfExperience || '',
      pharmacistDateOfBirth: data.pharmacistDateOfBirth || '',
      aadhaarNumber: data.aadhaarNumber || '',
      pharmacistMobile: data.pharmacistMobile || '',
      pharmacistEmail: data.pharmacistEmail || '',
      employmentType: data.employmentType || '',
      pharmacistCertificate: null,
      pharmacistSignatureImage: null,
      appointmentDocument: null,
      totalShopArea: data.totalShopArea || '',
      shopLength: data.shopLength || '',
      shopBreadth: data.shopBreadth || '',
      storageAreaAvailable: !!data.storageAreaAvailable,
      separateScheduleDrugStorage: !!data.separateScheduleDrugStorage,
      powerBackupAvailable: !!data.powerBackupAvailable,
      acAvailable: !!data.acAvailable,
      acBrand: data.acBrand || '',
      acModel: data.acModel || '',
      acCapacity: data.acCapacity || '',
      refrigeratorAvailable: !!data.refrigeratorAvailable,
      refrigeratorBrand: data.refrigeratorBrand || '',
      refrigeratorModel: data.refrigeratorModel || '',
      refrigeratorCapacity: data.refrigeratorCapacity || '',
      refrigeratorTempRange: data.refrigeratorTempRange || '',
      username: shop.username || data.username || '',
      loginPassword: '',
      confirmPassword: '',
    }))
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
    // Prepare formdata and send to backend
    const payload = new FormData()
    // append simple fields
    Object.keys(formData).forEach((k) => {
      const v = formData[k]
      if (v === null || v === undefined) return
      if (v instanceof File) return // files appended separately
      payload.append(k, v)
    })
    // append files
    if (formData.ownerAadharCardImage) payload.append('ownerAadharCardImage', formData.ownerAadharCardImage)
    if (formData.pharmacistCertificate) payload.append('pharmacistCertificate', formData.pharmacistCertificate)
    if (formData.pharmacistSignatureImage) payload.append('pharmacistSignatureImage', formData.pharmacistSignatureImage)
    if (formData.appointmentDocument) payload.append('appointmentDocument', formData.appointmentDocument)

    const targetId = selectedShop?.id || selectedShop?.licenseNo || selectedShop?.licenseNo
    fetch(`${API_BASE_URL}/inspector/shops/${encodeURIComponent(targetId)}`, {
      method: 'PUT',
      body: payload
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert('Failed to update shop: ' + (err.message || res.statusText))
        return
      }
      const data = await res.json()
      alert('✅ Shop details saved to server. ID: ' + (data.shop?.id || 'N/A'))
      handleBackToList()
    }).catch((err) => {
      console.error('Update shop error', err)
      alert('Network error while updating shop. Is backend running?')
    })
  }

  return (
    <div className="p-6 md:p-10 bg-[#020617] min-h-screen w-full overflow-x-hidden text-slate-100">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            {view === 'update' && (
              <button 
                onClick={handleBackToList}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all hover:-translate-x-1"
              >
                ← Back to List
              </button>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                {view === 'list' ? 'Update Shop Details' : `Update - ${selectedShop?.shop_name || (selectedShop?.data && selectedShop.data.shopFirmName) || selectedShop?.owner_name}`}
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
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-slate-800 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, license no, or owner..."
                  className="md:col-span-2 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="wholesale">Wholesale Only</option>
                  <option value="retail">Retail Only</option>
                </select>
              </div>
            </div>

            {/* Shops Table */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-950/80 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Shop Name</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">License No</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {isLoading ? (
                      <tr><td colSpan={8} className="px-6 py-12 text-center text-slate-400">Loading licenses...</td></tr>
                    ) : (
                      filteredShops.map((lic) => {
                        const shop = lic.data || {}
                        const name = lic.shop_name || shop.shopFirmName || ''
                        const licenseNo = lic.license_number || ''
                        const type = (shop.licenseType || '')
                        const owner = lic.owner_name || shop.fullName || ''
                        const phone = shop.mobileNumber || ''
                        const email = shop.email || ''
                        return (
                          <tr key={lic.id} className="hover:bg-slate-800/50 transition-colors duration-200">
                            <td className="px-6 py-4 text-white font-semibold">{name}</td>
                            <td className="px-6 py-4 text-slate-300 font-mono text-sm">{licenseNo}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                type.toLowerCase() === 'wholesale' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              }`}>
                                {type || 'N/A'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-300">{owner}</td>
                            <td className="px-6 py-4 text-slate-300">{phone}</td>
                            <td className="px-6 py-4 text-slate-300">{email}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleShopSelect(lic)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/30 text-xs font-bold uppercase tracking-wider"
                              >
                                Update Details
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {filteredShops.length === 0 && (
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
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">A. Basic Establishment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Full Name (License Holder)</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              <p className="text-slate-400 mb-6">Update username and password for this shop account</p>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
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
