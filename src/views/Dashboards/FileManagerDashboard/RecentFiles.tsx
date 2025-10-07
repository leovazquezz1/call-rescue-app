'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Files } from '@src/data'
import { MoveLeft, MoveRight } from 'lucide-react'

const RecentFiles = () => {
  return (
    <React.Fragment>
      <div className="col-span-12 md:col-span-6 2xl:col-span-3 card">
        <div className="flex items-center gap-3 card-header">
          <h6 className="card-title grow">Recent Files</h6>
          <Link href="#!" className="link link-primary shrink-0">
            View All
            <MoveRight className="ml-1 ltr:inline-block rtl:hidden size-4" />
            <MoveLeft className="mr-1 rtl:inline-block ltr:hidden size-4" />
          </Link>
        </div>
        <div className="card-body">
          <div className="flex flex-col gap-3">
            {Files.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 rounded-md shrink-0 size-10 bg-slate-100 dark:bg-dark-850">
                    <Image src={item.image} alt="fileImg" />
                  </div>
                  <div className="grow">
                    <h6 className="mb-0.5">
                      <Link
                        href="#!"
                        className="text-current link link-primary">
                        {item.filename}
                      </Link>
                    </h6>
                    <p className="text-sm text-gray-500 dark:text-dark-500">
                      {item.date}
                    </p>
                  </div>
                  <p>{item.size}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default RecentFiles
