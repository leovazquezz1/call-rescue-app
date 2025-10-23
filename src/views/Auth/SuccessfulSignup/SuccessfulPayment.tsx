'use client'

import React from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import backgroundImg from '@assets/images/others/auth.jpg'
import { CircleCheckBig, MoveRight } from 'lucide-react'
import api, { extractApiError } from '@src/utils/axios_api'


const SuccessfulPaymentModern = () => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('stripe_checkout_session_id')

  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [twilioPhoneNumber, setTwilioPhoneNumber] = React.useState<string | null>(null)
  const [alreadyProvisioned, setAlreadyProvisioned] = React.useState<boolean>(false)

  const steps = React.useMemo(
    () => [
      'Finalizing account creation...',
      'Retrieving new phone number...',
      'Configuring phone settings...',
      'Final touches...',
    ],
    []
  )
  const [stepIndex, setStepIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [steps.length])

  React.useEffect(() => {
    let isMounted = true
    async function runProvision() {
      if (!sessionId) {
        setError('Missing checkout session id')
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        setError(null)
        const res = await api.post('/dash/users/post-payment/provision-account', {
          stripe_checkout_session_id: sessionId,
        })
        const payload: any = res?.data?.data ?? res?.data
        if (!isMounted) return
        setTwilioPhoneNumber(payload?.twilio_phone_number ?? null)
        setAlreadyProvisioned(Boolean(payload?.already_provisioned))

        setTimeout(() => {
          router.push('/dashboards/ecommerce')
        }, 2000)


      } catch (err) {
        const { message } = extractApiError(err)
        if (!isMounted) return
        setError(message || 'Provisioning failed')
      } finally {
        if (!isMounted) return
        setIsLoading(false)
      }
    }
    runProvision()
    return () => {
      isMounted = false
    }
  }, [sessionId])

  return (
    <React.Fragment>
      <div
        className="relative flex items-center justify-center min-h-screen py-12 bg-center bg-cover bg-auth"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}>
        <div className="absolute inset-0 bg-gray-950/50"></div>
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12 mb-0 border-none shadow-none md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card bg-white/10 backdrop-blur-md">
              <div className="md:p-10 card-body">
                <div className="mb-4 text-center">
                  {isLoading && (
                    <div className="flex items-center justify-center">
                      <span className="spin loader-spin loader-gray"></span>
                    </div>
                  )}
                </div>

                {!error && (
                  <h4 className="mb-2 leading-relaxed text-center text-white">
                    Successful Payment
                  </h4>
                )}

                {isLoading && (
                  <div className="mb-5 text-center">
                    <p className="text-white/75">
                      {steps[stepIndex]}
                    </p>
                  </div>
                )}

                {!isLoading && !error && (
                  <div className="mb-5 text-center text-white/90">
                    {alreadyProvisioned ? (
                      <p>Account already provisioned.</p>
                    ) : (
                      <p>Account provisioned successfully.</p>
                    )}
                    {twilioPhoneNumber && (
                      <p className="mt-1">Your phone number: <span className="font-medium">{twilioPhoneNumber}</span></p>
                    )}
                  </div>
                )}

                {!isLoading && error && (
                  <div className="mb-5 text-center">
                    <p className="text-red-300">{error}</p>
                  </div>
                )}

                {/* TODO: Add button here to contact support */}
                {/* {!error && (
                  <div className="text-center">
                    <Link href="/" className="btn btn-primary" aria-disabled={isLoading}>
                      <span className="align-middle">Continue</span>
                      <MoveRight className="inline-block size-4 ml-0.5" />
                    </Link>
                  </div>
                )} */}




              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default SuccessfulPaymentModern
