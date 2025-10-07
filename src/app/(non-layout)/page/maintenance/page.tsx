'use client'

import React, { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import maintain from '@assets/images/others/maintenance.png'
import settingImg from '@assets/images/others/setting.png'
import { NextPageWithLayout } from '@src/dtos'
import { Linkedin } from 'lucide-react'
import VanillaTilt from 'vanilla-tilt'

const Maintenance: NextPageWithLayout = () => {
  const tiltRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        'full-page-listening': true,
      })
    }
  }, [])

  return (
    <div className="relative flex items-center justify-center min-h-screen py-20 from-sky-500/10 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-500/5 to-pink-500/5">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 text-center lg:col-span-8 lg:col-start-3">
            <div className="relative inline-block">
              <Image
                src={settingImg}
                alt="settingImg"
                className="absolute right-16 top-12 animate-bounce h-44"
                width={176}
              />
              <div ref={tiltRef} className="relative mx-auto h-96">
                <Image
                  src={maintain}
                  alt="maintainImg"
                  width={384}
                  height={384}
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-transparent md:text-6xl lg:leading-relaxed drop-shadow-lg bg-gradient-to-r from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
              Opp! We&apos;re Under Maintenance
            </h1>
            <p className="max-w-2xl mx-auto mt-3 mb-5 text-gray-500 dark:text-dark-500 text-16">
              This website is currently undergoing scheduled maintenance.
              We&apos;ll be back shortly.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => location.reload()}>
              Refresh
            </button>
            <div className="flex items-center justify-center gap-2 mt-5">
              <Link
                href="#!"
                className="inline-flex items-center justify-center text-white rounded-full shadow-lg bg-sky-500 shadow-gray-200 dark:shadow-dark-800 size-10">
                <Linkedin className="size-5" />
              </Link>
              <Link
                href="#!"
                className="inline-flex items-center justify-center text-white bg-pink-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10">
                <i className="ri-dribbble-fill text-[20px]"></i>
              </Link>
              <Link
                href="#!"
                className="inline-flex items-center justify-center text-white rounded-full shadow-lg bg-primary-500 shadow-gray-200 dark:shadow-dark-800 size-10">
                <i className="ri-facebook-fill text-[20px]"></i>
              </Link>
              <Link
                href="#!"
                className="inline-flex items-center justify-center text-white bg-purple-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10">
                <i className="ri-twitch-line text-[20px]"></i>
              </Link>
              <Link
                href="#!"
                className="inline-flex items-center justify-center text-white bg-pink-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10">
                <i className="ri-instagram-line text-[20px]"></i>
              </Link>
              <Link
                href="#!"
                className="inline-flex items-center justify-center text-white bg-orange-500 rounded-full shadow-lg shadow-gray-200 dark:shadow-dark-800 size-10">
                <i className="ri-gitlab-line text-[20px]"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maintenance
