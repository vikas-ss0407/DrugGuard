import { useState } from 'react'

const API_BASE_URL = 'http://localhost:5000/api'

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
    
    // Owner Documents
    ownerPanCard: '',
    ownerAadharNumber: '',
    ownerAadharCardImage: null,
    
    // B. Pharmacist / Competent Person Details
    pharmacistName: '',
    registrationId: '',
    qualification: '', // D.Pharm / B.Pharm / M.Pharm
    yearsOfExperience: '',
    pharmacistDateOfBirth: '',
    aadhaarNumber: '',
    pharmacistMobile: '',
    pharmacistEmail: '',
    employmentType: '', // Full-time / Part-time
    appointmentDocument: null,
    
    // Pharmacist Documents
    pharmacistCertificate: null,
    pharmacistSignatureImage: null,
    
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
    username: '',
    loginPassword: '',
    confirmPassword: '',
    
    // System Generated
    licenseNumber: '',
    generatedPassword: '',
    licenseCreationDate: new Date().toLocaleDateString()
  })

  const [errors, setErrors] = useState({})

  // Generate License Number based on District and Year
  const generateLicenseNumber = () => {
    const year = new Date().getFullYear()
    const districtCode = formData.district.substring(0, 3).toUpperCase()
    const typeCode = formData.licenseType === 'Wholesale' ? 'WS' : 'RT'
    const randomNum = Math.floor(10000 + Math.random() * 90000)
    return `DG-${districtCode}/${typeCode}/${year}/${randomNum}`
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

  // Generate License Document
  const generateLicenseDocument = (licenseNumber) => {
    const licenseContent = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                          DRUG GUARD SYSTEM                                     ║
║                    PHARMACY LICENSE CERTIFICATE                                ║
╚════════════════════════════════════════════════════════════════════════════════╝

LICENSE NUMBER: ${licenseNumber}
ISSUE DATE: ${new Date().toLocaleDateString()}
EXPIRY DATE: ${new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toLocaleDateString()}

───────────────────────────────────────────────────────────────────────────────────

🏪 ESTABLISHMENT DETAILS
───────────────────────────────────────────────────────────────────────────────────
Shop/Firm Name         : ${formData.shopFirmName}
License Type           : ${formData.licenseType}
Ownership Type         : ${formData.ownershipType}
Total Shop Area        : ${formData.totalShopArea} Sq.ft

ADDRESS:
  Door No.             : ${formData.doorNo}
  Area                 : ${formData.area}
  City/Town            : ${formData.city}
  Post                 : ${formData.post}
  District             : ${formData.district}
  State                : ${formData.state}
  PIN Code             : ${formData.pinCode}

───────────────────────────────────────────────────────────────────────────────────

👤 OWNER DETAILS
───────────────────────────────────────────────────────────────────────────────────
Owner Name             : ${formData.fullName}
Date of Birth          : ${formData.dateOfBirth}
PAN Card No.           : ${formData.ownerPanCard}
Aadhaar Card No.       : ${formData.ownerAadharNumber}
Mobile Number          : ${formData.mobileNumber}
Email                  : ${formData.email}

Documents Attached:
  ✓ PAN Card Copy
  ✓ Aadhaar Card Image
  ✓ Identity Proof

───────────────────────────────────────────────────────────────────────────────────

💊 PHARMACIST / COMPETENT PERSON DETAILS
───────────────────────────────────────────────────────────────────────────────────
Pharmacist Name        : ${formData.pharmacistName}
Registration ID        : ${formData.registrationId}
Qualification          : ${formData.qualification}
Date of Birth          : ${formData.pharmacistDateOfBirth}
Aadhaar Number         : ${maskAadhaar(formData.aadhaarNumber)}
Years of Experience    : ${formData.yearsOfExperience} years
Employment Type        : ${formData.employmentType}
Mobile Number          : ${formData.pharmacistMobile}
Email                  : ${formData.pharmacistEmail}

Documents Attached:
  ✓ Pharmacist Certificate (${formData.qualification})
  ✓ Signature Image
  ✓ Appointment Letter
  ✓ Registration Certificate from State Pharmacy Council

───────────────────────────────────────────────────────────────────────────────────

🏭 SHOP INFRASTRUCTURE
───────────────────────────────────────────────────────────────────────────────────
Total Shop Area        : ${formData.totalShopArea} Sq.ft
Shop Dimensions        : ${formData.shopLength}ft × ${formData.shopBreadth}ft
Storage Area Available : ${formData.storageAreaAvailable ? 'YES' : 'NO'}
Separate Drug Storage  : ${formData.separateScheduleDrugStorage ? 'YES' : 'NO'}
Power Backup Available : ${formData.powerBackupAvailable ? 'YES' : 'NO'}

───────────────────────────────────────────────────────────────────────────────────

⚙️ EQUIPMENT & STORAGE
───────────────────────────────────────────────────────────────────────────────────
${formData.acAvailable ? `
Air Conditioning Unit:
  Brand                : ${formData.acBrand}
  Model                : ${formData.acModel}
  Capacity             : ${formData.acCapacity} Ton
` : `Air Conditioning Unit  : NOT AVAILABLE\n`}
${formData.refrigeratorAvailable ? `
Refrigerator/Cold Storage:
  Brand                : ${formData.refrigeratorBrand}
  Model                : ${formData.refrigeratorModel}
  Capacity             : ${formData.refrigeratorCapacity} Liters
  Temperature Range    : ${formData.refrigeratorTempRange}
` : `Refrigerator/Storage   : NOT AVAILABLE\n`}

───────────────────────────────────────────────────────────────────────────────────

📋 COMPLIANCE CHECKLIST
───────────────────────────────────────────────────────────────────────────────────
✓ Owner Identification Documents Verified
✓ Pharmacist Credentials Verified
✓ Registration Certificate Verified
✓ Shop Infrastructure Inspected
✓ Storage Facilities Approved
✓ Equipment Details Recorded
✓ All Required Documents Attached
✓ Compliance Standards Met

───────────────────────────────────────────────────────────────────────────────────

🔐 LOGIN CREDENTIALS
───────────────────────────────────────────────────────────────────────────────────
Username               : ${formData.username}
Temporary Password     : [Provided Separately]
Account Status         : ACTIVE
Renewal Date           : ${new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toLocaleDateString()}

───────────────────────────────────────────────────────────────────────────────────

⚖️ IMPORTANT NOTICES
───────────────────────────────────────────────────────────────────────────────────
1. This license is valid for 5 years from the date of issue.
2. The pharmacy must comply with all rules and regulations of the pharmaceutical board.
3. Any changes in ownership, pharmacist, or premises must be reported immediately.
4. The pharmacy must maintain proper records of all drugs purchased and sold.
5. Storage conditions must be maintained as per regulatory standards.
6. License must be displayed prominently in the pharmacy premises.
7. Renewal application must be submitted 3 months before expiry.

───────────────────────────────────────────────────────────────────────────────────

📄 DOCUMENTS ATTACHED WITH LICENSE
───────────────────────────────────────────────────────────────────────────────────
✓ PAN Card of Owner
✓ Aadhaar Card Image of Owner
✓ Pharmacist Degree Certificate
✓ Pharmacist Signature Image
✓ Pharmacist Appointment Letter
✓ Registration Certificate from State Pharmacy Council
✓ Shop Infrastructure Photos
✓ Equipment Details & Photos
✓ Permission from Local Authorities
✓ Premises Inspection Report

═══════════════════════════════════════════════════════════════════════════════════

This License has been generated by Drug Guard System.
For any queries, contact: support@drugguard.com | Ph: 1800-DRUGGUARD

Authorized by: Drug Inspector Division
Generated on: ${new Date().toLocaleString()}
System Version: 1.0

═══════════════════════════════════════════════════════════════════════════════════
    `
    return licenseContent
  }

  const maskAadhaar = (aadhar) => {
    if (!aadhar) return ''
    return aadhar.slice(0, 4) + ' ' + '*'.repeat(4) + ' ' + aadhar.slice(-4)
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
      if (!formData.ownerPanCard) newErrors.ownerPanCard = 'PAN Card number is required'
      if (!formData.ownerAadharNumber) newErrors.ownerAadharNumber = 'Aadhaar number is required'
      if (!formData.ownerAadharCardImage) newErrors.ownerAadharCardImage = 'Aadhaar card image is required'
    } else if (step === 2) {
      if (!formData.pharmacistName) newErrors.pharmacistName = 'Pharmacist name is required'
      if (!formData.registrationId) newErrors.registrationId = 'Registration ID is required'
      if (!formData.qualification) newErrors.qualification = 'Qualification is required'
      if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Experience is required'
      if (!formData.pharmacistDateOfBirth) newErrors.pharmacistDateOfBirth = 'Pharmacist date of birth is required'
      if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required'
      if (!formData.pharmacistMobile) newErrors.pharmacistMobile = 'Mobile number is required'
      if (!formData.pharmacistEmail) newErrors.pharmacistEmail = 'Email is required'
      if (!formData.employmentType) newErrors.employmentType = 'Employment type is required'
      if (!formData.pharmacistCertificate) newErrors.pharmacistCertificate = 'Pharmacist certificate is required'
      if (!formData.pharmacistSignatureImage) newErrors.pharmacistSignatureImage = 'Pharmacist signature image is required'
    } else if (step === 3) {
      if (!formData.totalShopArea) newErrors.totalShopArea = 'Total shop area is required'
      if (!formData.shopLength) newErrors.shopLength = 'Shop length is required'
      if (!formData.shopBreadth) newErrors.shopBreadth = 'Shop breadth is required'
    } else if (step === 5) {
      if (!formData.username) newErrors.username = 'Username is required'
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
      const licenseDocument = generateLicenseDocument(licenseNumber)
      
      const finalData = {
        ...formData,
        licenseNumber,
        generatedPassword,
        licenseDocument
      }

      // Send data to backend via multipart/form-data
      const payload = new FormData()
      Object.keys(finalData).forEach((key) => {
        if (finalData[key] !== null && finalData[key] !== undefined) {
          // Don't append file objects here; files are attached below
          if (typeof finalData[key] === 'object' && finalData[key] instanceof File) return
          payload.append(key, finalData[key])
        }
      })

      // Attach files
      if (formData.ownerAadharCardImage) payload.append('ownerAadharCardImage', formData.ownerAadharCardImage)
      if (formData.pharmacistCertificate) payload.append('pharmacistCertificate', formData.pharmacistCertificate)
      if (formData.pharmacistSignatureImage) payload.append('pharmacistSignatureImage', formData.pharmacistSignatureImage)
      if (formData.appointmentDocument) payload.append('appointmentDocument', formData.appointmentDocument)

      fetch(`${API_BASE_URL}/inspector/licenses`, {
        method: 'POST',
        body: payload
      }).then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          alert('Failed to save license: ' + (err.message || res.statusText))
          return
        }
        const data = await res.json()
        alert('✅ License saved on server. ID: ' + (data.license?.id || 'N/A'))
      }).catch((err) => {
        console.error('Upload error', err)
        alert('Network error while saving license. Is backend running?')
      })
      
      // Download license as text file
      const element = document.createElement('a')
      const file = new Blob([licenseDocument], {type: 'text/plain'})
      element.href = URL.createObjectURL(file)
      element.download = `LICENSE_${licenseNumber.replace(/\//g, '_')}_${new Date().getTime()}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      
      // Show success message with credentials
      alert(
        `✅ LICENSE GENERATED SUCCESSFULLY!\n\n` +
        `License Number: ${licenseNumber}\n` +
        `Pharmacy: ${formData.shopFirmName}\n` +
        `Owner: ${formData.fullName}\n` +
        `Pharmacist: ${formData.pharmacistName}\n\n` +
        `LOGIN CREDENTIALS:\n` +
        `Username: ${formData.username}\n` +
        `Temporary Password: ${formData.loginPassword}\n\n` +
        `License Document has been downloaded!\n` +
        `Please save all documents securely.\n` +
        `License is valid for 5 years.`
      )
      
      console.log('License Data:', finalData)
      
      // Reset form
      setFormData({
        fullName: '', dateOfBirth: '', licenseType: '', shopFirmName: '', ownershipType: '',
        doorNo: '', area: '', city: '', post: '', district: '', state: '', pinCode: '',
        mobileNumber: '', email: '', ownerPanCard: '', ownerAadharNumber: '', 
        ownerAadharCardImage: null, pharmacistName: '', registrationId: '', qualification: '',
        yearsOfExperience: '', pharmacistDateOfBirth: '', aadhaarNumber: '', 
        pharmacistMobile: '', pharmacistEmail: '', employmentType: '', appointmentDocument: null,
        pharmacistCertificate: null, pharmacistSignatureImage: null,
        totalShopArea: '', shopLength: '', shopBreadth: '', storageAreaAvailable: false, 
        separateScheduleDrugStorage: false, powerBackupAvailable: false, acAvailable: false, 
        acBrand: '', acModel: '', acCapacity: '', refrigeratorAvailable: false, 
        refrigeratorBrand: '', refrigeratorModel: '', refrigeratorCapacity: '', 
        refrigeratorTempRange: '', username: '', loginPassword: '', confirmPassword: '', 
        licenseNumber: '', generatedPassword: '', licenseCreationDate: new Date().toLocaleDateString()
      })
      setStep(1)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="p-6 md:p-10 bg-[#020617] min-h-screen w-full overflow-x-hidden text-slate-100">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Create New License</h1>
          <p className="text-slate-400 text-lg">Complete all steps to register a new wholesale or retail license</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 rounded-full"></div>
          {['Establishment Details', 'Pharmacist Details', 'Infrastructure', 'Equipment & Storage', 'Login Credentials'].map((label, idx) => (
            <div key={idx} className="flex flex-col items-center relative z-10">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-500 border-4 ${
                step > idx + 1 ? 'bg-green-500 border-green-900 text-white scale-110' : step === idx + 1 ? 'bg-blue-600 border-blue-900 text-white scale-110 shadow-lg shadow-blue-500/50' : 'bg-slate-800 border-slate-900 text-slate-500'
              }`}>
                {step > idx + 1 ? '✓' : idx + 1}
              </div>
              <p className={`text-xs font-semibold mt-3 uppercase tracking-wider ${step === idx + 1 ? 'text-blue-400' : 'text-slate-500'}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl">
          
          {/* Step 1: Basic Establishment Details */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">A. Basic Establishment Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Full Name (License Holder) *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-600"
                    placeholder="Enter full name"
                  />
                  {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">License Type *</label>
                  <select
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Retail">Retail</option>
                  </select>
                  {errors.licenseType && <p className="text-red-400 text-sm mt-1">{errors.licenseType}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Shop / Firm Name *</label>
                  <input
                    type="text"
                    name="shopFirmName"
                    value={formData.shopFirmName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-600"
                    placeholder="Enter shop name"
                  />
                  {errors.shopFirmName && <p className="text-red-400 text-sm mt-1">{errors.shopFirmName}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Ownership Type *</label>
                  <select
                    name="ownershipType"
                    value={formData.ownershipType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Company">Company</option>
                  </select>
                  {errors.ownershipType && <p className="text-red-400 text-sm mt-1">{errors.ownershipType}</p>}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-8 mt-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-blue-500">📍</span> Shop Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Door No *</label>
                    <input
                      type="text"
                      name="doorNo"
                      value={formData.doorNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.doorNo && <p className="text-red-400 text-sm mt-1">{errors.doorNo}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Area *</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.area && <p className="text-red-400 text-sm mt-1">{errors.area}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">City / Town *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Post *</label>
                    <input
                      type="text"
                      name="post"
                      value={formData.post}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.post && <p className="text-red-400 text-sm mt-1">{errors.post}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.district && <p className="text-red-400 text-sm mt-1">{errors.district}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">PIN Code *</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      maxLength="6"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.pinCode && <p className="text-red-400 text-sm mt-1">{errors.pinCode}</p>}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-8 mt-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-blue-500">📋</span> Owner Documents & Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">PAN Card Number *</label>
                    <input
                      type="text"
                      name="ownerPanCard"
                      value={formData.ownerPanCard}
                      onChange={handleInputChange}
                      placeholder="e.g., AAAPA1234A"
                      maxLength="10"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.ownerPanCard && <p className="text-red-400 text-sm mt-1">{errors.ownerPanCard}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Aadhaar Card Number *</label>
                    <input
                      type="text"
                      name="ownerAadharNumber"
                      value={formData.ownerAadharNumber}
                      onChange={handleInputChange}
                      maxLength="12"
                      placeholder="XXXX XXXX XXXX"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.ownerAadharNumber && <p className="text-red-400 text-sm mt-1">{errors.ownerAadharNumber}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Aadhaar Card Image/Copy *</label>
                    <input
                      type="file"
                      name="ownerAadharCardImage"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                    />
                    {errors.ownerAadharCardImage && <p className="text-red-400 text-sm mt-1">{errors.ownerAadharCardImage}</p>}
                    <p className="text-slate-500 text-xs mt-1">Upload clear image/scan (PDF, JPG, PNG - Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-8 mt-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="text-blue-500">📞</span> Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      maxLength="10"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.mobileNumber && <p className="text-red-400 text-sm mt-1">{errors.mobileNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Email ID *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pharmacist Details */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">B. Pharmacist / Competent Person Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Pharmacist / Competent Person Name *</label>
                  <input
                    type="text"
                    name="pharmacistName"
                    value={formData.pharmacistName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.pharmacistName && <p className="text-red-400 text-sm mt-1">{errors.pharmacistName}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Registration ID (State Pharmacy Council) *</label>
                  <input
                    type="text"
                    name="registrationId"
                    value={formData.registrationId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.registrationId && <p className="text-red-400 text-sm mt-1">{errors.registrationId}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Qualification *</label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Qualification</option>
                    <option value="D.Pharm">D.Pharm</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="M.Pharm">M.Pharm</option>
                  </select>
                  {errors.qualification && <p className="text-red-400 text-sm mt-1">{errors.qualification}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Years of Experience *</label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.yearsOfExperience && <p className="text-red-400 text-sm mt-1">{errors.yearsOfExperience}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Aadhaar Number *</label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    maxLength="12"
                    placeholder="XXXX XXXX XXXX"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.aadhaarNumber && <p className="text-red-400 text-sm mt-1">{errors.aadhaarNumber}</p>}
                  <p className="text-slate-500 text-xs mt-1">Will be stored in masked format</p>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Mobile Number *</label>
                  <input
                    type="tel"
                    name="pharmacistMobile"
                    value={formData.pharmacistMobile}
                    onChange={handleInputChange}
                    maxLength="10"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.pharmacistMobile && <p className="text-red-400 text-sm mt-1">{errors.pharmacistMobile}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Email ID *</label>
                  <input
                    type="email"
                    name="pharmacistEmail"
                    value={formData.pharmacistEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.pharmacistEmail && <p className="text-red-400 text-sm mt-1">{errors.pharmacistEmail}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Date of Birth *</label>
                  <input
                    type="date"
                    name="pharmacistDateOfBirth"
                    value={formData.pharmacistDateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.pharmacistDateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.pharmacistDateOfBirth}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Employment Type *</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                  {errors.employmentType && <p className="text-red-400 text-sm mt-1">{errors.employmentType}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Pharmacist Degree Certificate ({formData.qualification}) *</label>
                  <input
                    type="file"
                    name="pharmacistCertificate"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                  />
                  {errors.pharmacistCertificate && <p className="text-red-400 text-sm mt-1">{errors.pharmacistCertificate}</p>}
                  <p className="text-slate-500 text-xs mt-1">Upload certificate/degree document (PDF, JPG, PNG - Max 5MB)</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Pharmacist Signature Image *</label>
                  <input
                    type="file"
                    name="pharmacistSignatureImage"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                  />
                  {errors.pharmacistSignatureImage && <p className="text-red-400 text-sm mt-1">{errors.pharmacistSignatureImage}</p>}
                  <p className="text-slate-500 text-xs mt-1">Upload high-quality signature image (JPG, PNG - Max 5MB)</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Appointment Letter / Consent Document</label>
                  <input
                    type="file"
                    name="appointmentDocument"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all cursor-pointer"
                  />
                  <p className="text-slate-500 text-xs mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Shop Infrastructure */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">C. Shop Infrastructure Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Total Shop Area (Square Feet) *</label>
                  <input
                    type="number"
                    name="totalShopArea"
                    value={formData.totalShopArea}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.totalShopArea && <p className="text-red-400 text-sm mt-1">{errors.totalShopArea}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Shop Length (ft) *</label>
                  <input
                    type="number"
                    name="shopLength"
                    value={formData.shopLength}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.shopLength && <p className="text-red-400 text-sm mt-1">{errors.shopLength}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Shop Breadth (ft) *</label>
                  <input
                    type="number"
                    name="shopBreadth"
                    value={formData.shopBreadth}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.shopBreadth && <p className="text-red-400 text-sm mt-1">{errors.shopBreadth}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-center p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="storageAreaAvailable"
                    checked={formData.storageAreaAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-800 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="ml-3 text-slate-300 font-medium cursor-pointer">Storage Area Available</label>
                </div>

                <div className="flex items-center p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="separateScheduleDrugStorage"
                    checked={formData.separateScheduleDrugStorage}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-800 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="ml-3 text-slate-300 font-medium cursor-pointer">Separate Drug Storage</label>
                </div>

                <div className="flex items-center p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    name="powerBackupAvailable"
                    checked={formData.powerBackupAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-800 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="ml-3 text-slate-300 font-medium cursor-pointer">Power Backup Available</label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Equipment & Storage */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">D. Equipment & Storage Details</h2>
              
              {/* Air Conditioner Section */}
              <div className="border border-slate-800 rounded-2xl p-6 bg-slate-950/50">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="acAvailable"
                    checked={formData.acAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-800 border border-slate-600 rounded text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="ml-3 text-lg font-semibold text-white">Air Conditioner Available</label>
                </div>

                {formData.acAvailable && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">AC Brand</label>
                      <input
                        type="text"
                        name="acBrand"
                        value={formData.acBrand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">AC Model</label>
                      <input
                        type="text"
                        name="acModel"
                        value={formData.acModel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">AC Capacity (Ton)</label>
                      <input
                        type="number"
                        name="acCapacity"
                        value={formData.acCapacity}
                        onChange={handleInputChange}
                        step="0.5"
                        min="0"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Refrigerator Section */}
              <div className="border border-slate-800 rounded-2xl p-6 bg-slate-950/50">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="refrigeratorAvailable"
                    checked={formData.refrigeratorAvailable}
                    onChange={handleInputChange}
                    className="w-5 h-5 bg-slate-800 border border-slate-600 rounded-lg text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="ml-3 text-lg font-semibold text-white">Refrigerator Available</label>
                </div>

                {formData.refrigeratorAvailable && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Brand</label>
                      <input
                        type="text"
                        name="refrigeratorBrand"
                        value={formData.refrigeratorBrand}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Model</label>
                      <input
                        type="text"
                        name="refrigeratorModel"
                        value={formData.refrigeratorModel}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Capacity (Liters)</label>
                      <input
                        type="number"
                        name="refrigeratorCapacity"
                        value={formData.refrigeratorCapacity}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Temperature Range</label>
                      <input
                        type="text"
                        name="refrigeratorTempRange"
                        value={formData.refrigeratorTempRange}
                        onChange={handleInputChange}
                        placeholder="e.g., 2°C to 8°C"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Login Credentials */}
          {step === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">E. Login Credentials</h2>
              <p className="text-slate-400 mb-6">Create login credentials for this shop. This will be used to access the system.</p>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username for login"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Password *</label>
                  <input
                    type="password"
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    placeholder="Enter password (min 8 characters)"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.loginPassword && <p className="text-red-400 text-sm mt-1">{errors.loginPassword}</p>}
                  <p className="text-slate-500 text-xs mt-1">Password must be at least 8 characters long</p>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-8 border-t border-slate-800">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl active:scale-95"
              >
                ← Previous
              </button>
            )}
            
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-95"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 active:scale-95"
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
