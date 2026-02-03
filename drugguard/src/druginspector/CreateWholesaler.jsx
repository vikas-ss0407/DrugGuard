import { useState } from 'react'

export default function CreateWholesaler() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    companyName: '',
    email: '',
    phone: '',
    registrationNumber: '',
    // Pharmacist Details
    pharmacistName: '',
    pharmacistLicense: '',
    pharmacistEmail: '',
    // Infrastructure
    warehouseAddress: '',
    warehouseArea: '',
    temperature: '',
    humidity: '',
    // Documents
    documents: []
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateStep = () => {
    const newErrors = {}
    if (step === 1) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.phone) newErrors.phone = 'Phone is required'
      if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required'
    } else if (step === 2) {
      if (!formData.pharmacistName) newErrors.pharmacistName = 'Pharmacist name is required'
      if (!formData.pharmacistLicense) newErrors.pharmacistLicense = 'License number is required'
      if (!formData.pharmacistEmail) newErrors.pharmacistEmail = 'Email is required'
    } else if (step === 3) {
      if (!formData.warehouseAddress) newErrors.warehouseAddress = 'Address is required'
      if (!formData.warehouseArea) newErrors.warehouseArea = 'Warehouse area is required'
      if (!formData.temperature) newErrors.temperature = 'Temperature range is required'
      if (!formData.humidity) newErrors.humidity = 'Humidity range is required'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateStep()
    if (Object.keys(newErrors).length === 0) {
      alert('Wholesaler account created successfully!')
      // Reset form
      setFormData({
        companyName: '', email: '', phone: '', registrationNumber: '',
        pharmacistName: '', pharmacistLicense: '', pharmacistEmail: '',
        warehouseAddress: '', warehouseArea: '', temperature: '', humidity: '',
        documents: []
      })
      setStep(1)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen w-full overflow-x-hidden">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Wholesaler Account</h1>
          <p className="text-slate-400">Complete all steps to register a new wholesaler</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {['Basic Info', 'Pharmacist', 'Infrastructure', 'Documents'].map((label, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step > idx + 1 ? 'bg-green-500 text-white' : step === idx + 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {step > idx + 1 ? '✓' : idx + 1}
              </div>
              <div className={`flex-1 h-1 mx-2 ${step > idx + 1 ? 'bg-green-500' : 'bg-slate-700'}`}></div>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.companyName ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter company name"
                  />
                  {errors.companyName && <p className="text-red-400 text-sm mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.email ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter email"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.phone ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Registration Number *</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.registrationNumber ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter registration number"
                  />
                  {errors.registrationNumber && <p className="text-red-400 text-sm mt-1">{errors.registrationNumber}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pharmacist Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6">Pharmacist Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Pharmacist Name *</label>
                  <input
                    type="text"
                    name="pharmacistName"
                    value={formData.pharmacistName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.pharmacistName ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter name"
                  />
                  {errors.pharmacistName && <p className="text-red-400 text-sm mt-1">{errors.pharmacistName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">License Number *</label>
                  <input
                    type="text"
                    name="pharmacistLicense"
                    value={formData.pharmacistLicense}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.pharmacistLicense ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter license number"
                  />
                  {errors.pharmacistLicense && <p className="text-red-400 text-sm mt-1">{errors.pharmacistLicense}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="pharmacistEmail"
                    value={formData.pharmacistEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.pharmacistEmail ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter email"
                  />
                  {errors.pharmacistEmail && <p className="text-red-400 text-sm mt-1">{errors.pharmacistEmail}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Infrastructure */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6">Infrastructure Details</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Warehouse Address *</label>
                  <textarea
                    name="warehouseAddress"
                    value={formData.warehouseAddress}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                      errors.warehouseAddress ? 'ring-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter address"
                    rows="3"
                  />
                  {errors.warehouseAddress && <p className="text-red-400 text-sm mt-1">{errors.warehouseAddress}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Warehouse Area (Sq. Ft.) *</label>
                    <input
                      type="number"
                      name="warehouseArea"
                      value={formData.warehouseArea}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                        errors.warehouseArea ? 'ring-red-500' : 'focus:ring-blue-500'
                      }`}
                      placeholder="Enter area"
                    />
                    {errors.warehouseArea && <p className="text-red-400 text-sm mt-1">{errors.warehouseArea}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Temperature Control Range *</label>
                    <input
                      type="text"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                        errors.temperature ? 'ring-red-500' : 'focus:ring-blue-500'
                      }`}
                      placeholder="e.g., 15-25°C"
                    />
                    {errors.temperature && <p className="text-red-400 text-sm mt-1">{errors.temperature}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Humidity Range *</label>
                    <input
                      type="text"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 ${
                        errors.humidity ? 'ring-red-500' : 'focus:ring-blue-500'
                      }`}
                      placeholder="e.g., 40-60%"
                    />
                    {errors.humidity && <p className="text-red-400 text-sm mt-1">{errors.humidity}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-6">Document Upload</h2>
              <div className="space-y-4">
                {['GST Certificate', 'Business License', 'Pharmacist License', 'Warehouse Photos'].map((doc) => (
                  <div key={doc} className="flex items-center justify-between bg-slate-700 rounded-lg p-4 border-2 border-dashed border-slate-600 hover:border-blue-500 transition-colors cursor-pointer">
                    <span className="text-slate-300">{doc}</span>
                    <span className="text-2xl">📎</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm">All documents have been uploaded successfully ✓</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold"
              >
                ← Back
              </button>
            )}
            <div className="flex-1"></div>
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Create Account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}