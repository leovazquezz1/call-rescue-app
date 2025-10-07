'use client'

import React from 'react'

import Link from 'next/link'

import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from '@src/components/custom/dropdown/dropdown'
import { widgetsData } from '@src/data/crmDashboards/widgets-data'
import { NextPageWithLayout } from '@src/dtos'
import { Ellipsis } from 'lucide-react'

import AnimatedCounter from '../AnalyticsDashboards/Counter'

const Widgets: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <div className="col-span-12 card bg-[url('../images/dashboards/dashboard-patterm.png')] dark:bg-none">
        <div className="grid grid-cols-12 gap-0">
          {widgetsData.map((item, index) => {
            return (
              <div
                key={index}
                className="col-span-12 border-b border-gray-200 dark:border-dark-800 md:col-span-6 xl:col-span-3 md:ltr:border-r md:rtl:border-l">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-8">
                    <p className="text-gray-500 dark:text-dark-500 grow">
                      <item.icon className="inline-block size-4" /> {item.name}
                    </p>
                    <Dropdown
                      position="right"
                      trigger="click"
                      dropdownClassName="dropdown">
                      <DropdownButton colorClass="flex items-center text-gray-500 dark:text-dark-500">
                        <Ellipsis className="size-5" />
                      </DropdownButton>
                      <DropdownMenu>
                        <Link href="#!" className="dropdown-item ">
                          <span>Weekly</span>
                        </Link>

                        <Link href="#!" className="dropdown-item ">
                          <span>Monthly</span>
                        </Link>
                        <Link href="#!" className="dropdown-item">
                          <span>Yearly</span>
                        </Link>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="flex items-center gap-3">
                    <h5 className="grow">
                      {item.Currency}
                      <AnimatedCounter
                        start={item.start}
                        end={item.end}
                        duration={3000}
                      />
                      {item.numbers}
                    </h5>
                    <p className="text-gray-500 dark:text-dark-500 shrink-0">
                      <span className={`${item.iconcolor}`}>
                        <item.icon2 className="inline-block size-4" /> 17.9%
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}
export default Widgets
