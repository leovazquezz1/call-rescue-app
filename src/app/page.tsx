'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { changeSettingModalOpen } from '@src/slices/layout/reducer'
import { AppDispatch } from '@src/slices/reducer'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import DashboardsPage from './(layout)/dashboards/ecommerce/page'
import Layout from './(layout)/layout'

export default function Home(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { status } = useSession()

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin-basic') // Redirects to login page if not authenticated
    } else {
      router.push('/dashboards/ecommerce')
      setTimeout(() => {
        dispatch(changeSettingModalOpen(true))
      }, 1000)
    }
  }, [status, router, dispatch])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <main>
      <Layout>
        <DashboardsPage />
      </Layout>
    </main>
  )
}
