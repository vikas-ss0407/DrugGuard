import { useState } from 'react'

export default function CreateLicense() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // A. Basic Establishment Details
    fullName: '',
    dateOfBirth: '',
    licenseType: '', // Wholesale / Retail
    shopFirmName: '',
    ownershipType: '', // Individual / Partnership / Company
    doorNo: '',
    area: '',
    city: '',
    post: '',
    district: '',
    state: '',
    pinCode: '',
    mobileNumber: '',
    email: '',
    
    // B. Pharmacist / Competent Person Details
    pharmacistName: '',
    registrationId: '',
    qualification: '', // D.Pharm / B.Pharm / M.Pharm
    yearsOfExperience: '',
    aadhaarNumber: '',
    pharmacistMobile: '',
    pharmacistEmail: '',
    employmentType: '', // Full-time / Part-time
    appointmentDocument: null,
    
    // C. Shop Infrastructure Details
    totalShopArea: '',
    shopLength: '',
    shopBreadth: '',
    storageAreaAvailable: false,
    separateScheduleDrugStorage: false,
    powerBackupAvailable: false,
    
    // D. Equipment & Storage Details
    acAvailable: false,
    acBrand: '',
    acModel: '',
    acCapacity: '',
    refrigeratorAvailable: false,
    refrigeratorBrand: '',
    refrigeratorModel: '',
    refrigeratorCapacity: '',
    refrigeratorTempRange: '',
    
    // E. Login Credentials
    loginEmail: '',
    loginPassword: '',
    confirmPassword: '',
    
    // System Generated
    licenseNumber: '',
    generatedPassword: ''
  })

  const [errors, setErrors] = useState({})

  // Generate License Number based on District and Year
  const generateLicenseNumber = () => {
    const year = new Date().getFullYear()
    const districtCode = formData.district.substring(0, 3).toUpperCase()
    const typeCode = formData.licenseType === 'Wholesale' ? 'WS' : 'RT'
    const randomNum = Math.floor(10000 + Math.random() * 90000)
    return `${districtCode}/${typeCode}/${year}/${randomNum}`
  }

  // Generate Random Password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
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

  const validateStep = () => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.licenseType) newErrors.licenseType = 'License type is required'
      if (!formData.shopFirmName) newErrors.shopFirmName = 'Shop/Firm name is required'
      if (!formData.ownershipType) newErrors.ownershipType = 'Ownership type is required'
      if (!formData.doorNo) newErrors.doorNo = 'Door number is required'
      if (!formData.area) newErrors.area = 'Area is required'
      if (!formData.city) newErrors.city = 'City is required'
      if (!formData.post) newErrors.post = 'Post is required'
      if (!formData.district) newErrors.district = 'District is required'
      if (!formData.state) newErrors.state = 'State is required'
      if (!formData.pinCode) newErrors.pinCode = 'PIN code is required'
      if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required'
      if (!formData.email) newErrors.email = 'Email is required'
    } else if (step === 2) {
      if (!formData.pharmacistName) newErrors.pharmacistName = 'Pharmacist name is required'
      if (!formData.registrationId) newErrors.registrationId = 'Registration ID is required'
      if (!formData.qualification) newErrors.qualification = 'Qualification is required'
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Experience is required'
      if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required'
      if (!formData.pharmacistMobile) newErrors.pharmacistMobile = 'Mobile number is required'
      if (!formData.pharmacistEmail) newErrors.pharmacistEmail = 'Email is required'
      if (!formData.employmentType) newErrors.employmentType = 'Employment type is required'
    } else if (step === 3) {
      if (!formData.totalShopArea) newErrors.totalShopArea = 'Total shop area is required'
      if (!formData.shopLength) newErrors.shopLength = 'Shop length is required'
      if (!formData.shopBreadth) newErrors.shopBreadth = 'Shop breadth is required'
    } else if (step === 5) {
      if (!formData.loginEmail) newErrors.loginEmail = 'Login email is required'
      if (!formData.loginPassword) newErrors.loginPassword = 'Password is required'
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required'
      if (formData.loginPassword && formData.confirmPassword && formData.loginPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      if (formData.loginPassword && formData.loginPassword.length < 8) {
        newErrors.loginPassword = 'Password must be at least 8 characters'
      }
    }
    
    return newErrors
  }

  const handleNext = () => {
    const newErrors = validateStep()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateStep()
    
    if (Object.keys(newErrors).length === 0) {
      // Generate license number and password
      const licenseNumber = generateLicenseNumber()
      const generatedPassword = generatePassword()
      
      const finalData = {
        ...formData,
        licenseNumber,
        generatedPassword
      }
      
      // Show success message with credentials
      alert(
        `License Created Successfully!\n\n` +
        `License Number: ${licenseNumber}\n` +
        `Login Email: ${formData.loginEmail}\n` +
        `Password: ${formData.loginPassword}\n\n` +
        `Please save these credentials securely.`
      )
      
      console.log('License Data:', finalData)
      
      // Reset form
      setFormData({
        fullName: '', dateOfBirth: '', licenseType: '', shopFirmName: '', ownershipType: '',
        doorNo: '', area: '', city: '', post: '', district: '', state: '', pinCode: '',
        mobileNumber: '', email: '', pharmacistName: '', registrationId: '', qualification: '',
        yearsOfExperience: '', aadhaarNumber: '', pharmacistMobile: '', pharmacistEmail: '',
        employmentType: '', appointmentDocument: null, totalShopArea: '', shopLength: '',
        shopBreadth: '', storageAreaAvailable: false, separateScheduleDrugStorage: false,
        powerBackupAvailable: false, acAvailable: false, acBrand: '', acModel: '', acCapacity: '',
        refrigeratorAvailable: false, refrigeratorBrand: '', refrigeratorModel: '',
        refrigeratorCapacity: '', refrigeratorTempRange: '', licenseNumber: '', generatedPassword: ''
      })
      setStep(1)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New License</h1>
          <p className="text-slate-400">Complete all steps to register a new wholesale or retail license</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {['Establishment Details', 'Pharmacist Details', 'Infrastructure', 'Equipment & Storage'].map((label, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step > idx + 1 ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {step > idx + 1 ? '✓' : idx + 1}
              </div>
              {idx < 3 && <div className={`flex-1 h-1 mx-2 ${step > idx + 1 ? 'bg-green-500' : 'bg-slate-700'}`}></div>}
              <p className="text-sm text-slate-400 ml-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          
          {/* Step 1: Basic Establishment Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">A. Basic Establishment Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Full Name (License Holder) *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">License Type *</label>
                  <select
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Retail">Retail</option>
                  </select>
                  {errors.licenseType && <p className="text-red-400 text-sm mt-1">{errors.licenseType}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Shop / Firm Name *</label>
                  <input
                    type="text"
                    name="shopFirmName"
                    value={formData.shopFirmName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.shopFirmName && <p className="text-red-400 text-sm mt-1">{errors.shopFirmName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Ownership Type *</label>
                  <select
                    name="ownershipType"
                    value={formData.ownershipType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Company">Company</option>
                  </select>
                  {errors.ownershipType && <p className="text-red-400 text-sm mt-1">{errors.ownershipType}</p>}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Shop Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">Door No *</label>
                    <input
                      type="text"
                      name="doorNo"
                      value={formData.doorNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.doorNo && <p className="text-red-400 text-sm mt-1">{errors.doorNo}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Area *</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.area && <p className="text-red-400 text-sm mt-1">{errors.area}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">City / Town *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Post *</label>
                    <input
                      type="text"
                      name="post"
                      value={formData.post}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.post && <p className="text-red-400 text-sm mt-1">{errors.post}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.district && <p className="text-red-400 text-sm mt-1">{errors.district}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">PIN Code *</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      maxLength="6"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.pinCode && <p className="text-red-400 text-sm mt-1">{errors.pinCode}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6 mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      maxLength="10"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.mobileNumber && <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">Email ID *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pharmacist Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">B. Pharmacist / Competent Person Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Pharmacist / Competent Person Name *</label>
                  <input
                    type="text"
                    name="pharmacistName"
                    value={formData.pharmacistName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.pharmacistName && <p className="text-red-400 text-sm mt-1">{errors.pharmacistName}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Registration ID (State Pharmacy Council) *</label>
                  <input
                    type="text"
                    name="registrationId"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.registrationId && <p className="text-red-400 text-sm mt-1">{errors.registrationId}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Qualification *</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Qualification</option>
                    <option value="D.Pharm">D.Pharm</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="M.Pharm">M.Pharm</option>
                  </select>
                  {errors.qualification && <p className="text-red-400 text-sm mt-1">{errors.qualification}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Years of Experience *</label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.yearsOfExperience && <p className="text-red-400 text-sm mt-1">{errors.yearsOfExperience}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Aadhaar Number *</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    maxLength="12"
                    placeholder="XXXX XXXX XXXX"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.aadhaarNumber && <p className="text-red-400 text-sm mt-1">{errors.aadhaarNumber}</p>}
                  <p className="text-slate-500 text-xs mt-1">Will be stored in masked format</p>
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="pharmacistMobile"
                    value={formData.pharmacistMobile}
                    onChange={handleInputChange}
                    maxLength="10"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.pharmacistMobile && <p className="text-red-400 text-sm mt-1">{errors.pharmacistMobile}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Email ID *</label>
                  <input
                    type="email"
                    name="pharmacistEmail"
                    value={formData.pharmacistEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.pharmacistEmail && <p className="text-red-400 text-sm mt-1">{errors.pharmacistEmail}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Employment Type *</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                  {errors.employmentType && <p className="text-red-400 text-sm mt-1">{errors.employmentType}</p>}
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
          )}

          {/* Step 3: Shop Infrastructure */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">C. Shop Infrastructure Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Total Shop Area (Square Feet) *</label>
                  <input
                    type="number"
                    name="totalShopArea"
                    value={formData.totalShopArea}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.totalShopArea && <p className="text-red-400 text-sm mt-1">{errors.totalShopArea}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Shop Length (ft) *</label>
                  <input
                    type="number"
                    name="shopLength"
                    value={formData.shopLength}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.shopLength && <p className="text-red-400 text-sm mt-1">{errors.shopLength}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Shop Breadth (ft) *</label>
                  <input
                    type="number"
                    name="shopBreadth"
                    value={formData.shopBreadth}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.shopBreadth && <p className="text-red-400 text-sm mt-1">{errors.shopBreadth}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
          )}

          {/* Step 4: Equipment & Storage */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">D. Equipment & Storage Details</h2>
              
              {/* Air Conditioner Section */}
              <div className="border border-slate-700 rounded-lg p-6 bg-slate-750">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
                        min="0"
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Refrigerator Section */}
              <div className="border border-slate-700 rounded-lg p-6 bg-slate-750">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="refrigeratorAvailable"
                    checked={formData.refrigeratorAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-700 border border-slate-600 rounded-lg text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-3 text-lg font-semibold text-white">Refrigerator Available</label>
                </div>

                {formData.refrigeratorAvailable && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
                        min="0"
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
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
              >
                ← Previous
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-semibold"
              >
                Generate License & Create Account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
