import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaUserShield, FaBuilding, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

const AdminDashboard = () => {
  const [tab, setTab] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      let payload =
        tab === 'user'
          ? { email, password }
          : { name: companyName, email, password, location }

      await axios.post(
        `https://project-1-backend-lc17.onrender.com/admin/create${tab}`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )

      setMessage({
        type: 'success',
        text: `${tab === 'user' ? 'User' : 'Company'} account created successfully!`,
      })

      // Reset fields
      setEmail('')
      setPassword('')
      setCompanyName('')
      setLocation('')

      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Something went wrong!',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <FaUserShield className="text-indigo-600 text-4xl mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Create and manage user or company accounts
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setTab('user')}
            className={`w-1/2 py-2 font-medium rounded-l-lg transition-all ${
              tab === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            User Account
          </button>
          <button
            onClick={() => setTab('company')}
            className={`w-1/2 py-2 font-medium rounded-r-lg transition-all ${
              tab === 'company'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Company Account
          </button>
        </div>

        {/* Alerts */}
        {message.text && (
          <div
            className={`flex items-center gap-2 mb-4 p-3 rounded-md text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaExclamationCircle className="text-red-600" />
            )}
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === 'company' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter company location"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Creating Account...
              </>
            ) : (
              `Create ${tab === 'user' ? 'User' : 'Company'}`
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminDashboard
