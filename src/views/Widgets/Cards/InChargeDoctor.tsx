'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import user from '@assets/images/avatar/user-39.png'
import { MessageCircleMore } from 'lucide-react'

const InChargeDoctor = () => {
  return (
    <React.Fragment>
      <div className="col-span-12 md:col-span-6 xl:col-span-4 card">
        <div className="card-body">
          <p className="mb-2 text-gray-500 dark:text-dark-500">
            Doctor In Charge
          </p>
          <div className="flex items-center gap-2">
            <Image src={user} alt="userImg" className="rounded-full size-9" />
            <div className="grow">
              <h6>Dr. Jose Miller</h6>
              <p className="text-xs text-gray-500 dark:text-dark-500">
                Neurologist
              </p>
            </div>
            <Link href="#!" className="inline-block text-red-500">
              <MessageCircleMore className="fill-red-500/10" />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default InChargeDoctor
