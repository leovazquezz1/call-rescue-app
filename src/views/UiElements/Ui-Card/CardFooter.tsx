'use client'

import React from 'react'

const CardFooter = () => {
  return (
    <React.Fragment>
      <div className="col-span-12 sm:col-span-6 xl:col-span-4">
        <div className="card">
          <div className="card-body">
            <p className="text-gray-500 dark:text-dark-500">
              Business Content means any sound recordings, musical works, album
              cover artwork, photographs, images, audiovisual works, third party
              metadata (including editorial content) and other copyrighted
              materials made available by Seller through the Business Products,
              but excluding the Business Product Software and Incorporated
            </p>
          </div>
          <div className="card-footer">
            <h6 className="card-title">Card Footer</h6>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default CardFooter
