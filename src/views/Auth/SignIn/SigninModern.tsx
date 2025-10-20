'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import api, { extractApiError } from '@src/utils/axios_api'

import mainLogo from '@assets/images/logo-white.png'
import backgroundImg from '@assets/images/others/auth.jpg'
import { Eye, EyeOff } from 'lucide-react'

type AlertType = 'bg-red-100 text-red-500' | 'bg-green-100 text-green-500'

const SigninBasic: React.FC = () => {
  const [show, setShow] = useState(false)

  const handleToggle = () => setShow((prev) => !prev)

  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: '',
      password: '',
    }
  )

  const [alert, setAlert] = useState<{
    isVisible: boolean
    message: string
    type: AlertType
  }>({
    isVisible: false,
    message: '',
    type: 'bg-red-100 text-red-500',
  })

  const router = useRouter()

  const validateForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setAlert({ ...alert, isVisible: false, message: '' })
    try {
      const payload = { email: formData.email, password: formData.password }
      await api.post('/auth/signin', payload)
      showAlert('Welcome back!', 'bg-green-100 text-green-500')
      setTimeout(() => {
        router.push('/dashboards/ecommerce')
      }, 600)
    } catch (err) {
      const { message } = extractApiError(err)
      showAlert(message || 'Invalid credentials', 'bg-red-100 text-red-500')
    }
  }

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ isVisible: true, message, type })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // handle admin login
  const handleAdminLogin = () => {
    setFormData({ email: 'admin@example.com', password: 'admin@123' })
  }

  // handle user login
  const handleGuestLogin = () => {
    setFormData({ email: 'user@example.com', password: 'user@123' })
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen py-12 bg-center bg-cover bg-auth"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}>
      <div className="absolute inset-0 bg-gray-950/50"></div>
      <div className="container relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-0 border-none shadow-none md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card bg-white/10 backdrop-blur-md">
            <div className="md:p-10 card-body">
              <div className="mb-5 text-center">
                <Link href="#!">
                  <Image
                    src={mainLogo}
                    alt="mainLogo"
                    className="h-8 mx-auto"
                    style={{ width: '175px', height: '32px' }}
                  />
                </Link>
              </div>
              <h4 className="mb-2 leading-relaxed text-center text-white">
                Welcome Back
              </h4>
              <p className="mb-5 text-center text-white/75">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup-modern"
                  className="font-medium text-white">
                  Sign Up
                </Link>
              </p>
              {alert.isVisible && (
                <div
                  className={`relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 ${alert.type}`}>
                  <span>{alert.message}</span>
                  <button
                    onClick={() => setAlert({ ...alert, isVisible: false })}
                    className="absolute text-lg transition duration-200 ease-linear ltr:right-5 rtl:left-5 top-2">
                    <i className="ri-close-fill"></i>
                  </button>
                </div>
              )}
              <form onSubmit={validateForm}>
                <div className="grid grid-cols-12 gap-5 mb-5 items-center">
                  <div className="col-span-12">
                    <label htmlFor="email" className="form-label text-white/75">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="text-white border-none form-input bg-white/10 placeholder:text-white/75"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="col-span-12">
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm text-white/75">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={show ? 'text' : 'password'}
                          id="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="text-white border-none ltr:pr-8 rtl:pl-8 form-input bg-white/10 placeholder:text-white/75"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={handleToggle}
                          className="absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-hidden dark:text-dark-500">
                          {show ? (
                            <Eye className="size-5" />
                          ) : (
                            <EyeOff className="size-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex items-center">
                      <div className="input-check-group grow">
                        <input
                          id="checkboxBasic1"
                          className="border-0 input-check input-check-primary bg-white/10"
                          type="checkbox"
                        />
                        <label
                          htmlFor="checkboxBasic1"
                          className="input-check-label text-white/75">
                          Remember me
                        </label>
                      </div>
                      <Link
                        href="/auth/forgot-password-modern"
                        className="block text-sm font-medium text-right underline transition duration-300 ease-linear shrink-0 text-white/75 hover:text-white">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <button type="submit" className="w-full btn btn-primary">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>

              {/* Removed social logins and demo admin/user blocks */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninBasic
