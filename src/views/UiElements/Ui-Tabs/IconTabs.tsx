'use client'

import React from 'react'

import { Tab, Tabs } from '@src/components/custom/tabs/tab'
import { Airplay, House, UserSquare } from 'lucide-react'

const IconTabs = () => {
  return (
    <React.Fragment>
      <Tabs
        ulProps="tabs-pills tabs-icon"
        activeTabClass="active"
        inactiveTabClass="text-gray-500 hover:text-primary-500 dark:text-dark-500 dark:hover:text-primary-500"
        contentProps="mt-4"
        otherClass="nav-item [&.active]:bg-primary-500 [&.active]:text-primary-50 group/item">
        <Tab
          icon={
            <House className="transition duration-200 ease-linear size-4 group-hover/item:animate-pulse" />
          } // Pass a React component as an icon
          label="" // Provide a string for the label
        >
          <div>
            <p className="text-gray-500 dark:text-dark-500">
              The Admin Dashboard displays tabs for multiple pages that provide
              a personalized view of BI performance, data correctness, required
              cube maintenance, and required administrative actions. These pages
              contain the results of detailed analyses, represented by links,
              images, graphs, pie charts, and BI reports.
            </p>
          </div>
        </Tab>
        <Tab
          icon={
            <Airplay className="transition duration-200 ease-linear size-4 group-hover/item:animate-pulse" />
          }
          label="" // Provide a string for the label
        >
          <div>
            <p className="text-gray-500 dark:text-dark-500">
              A service administrator is responsible for overseeing all aspects
              of the work order for a service department. Your job duties
              include coordinating with the service manager on the completion of
              customer work orders, putting together billing for work completed,
              and reviewing time cards for service employees.
            </p>
          </div>
        </Tab>
        <Tab
          icon={
            <UserSquare className="transition duration-200 ease-linear size-4 group-hover/item:animate-pulse" />
          }
          label="" // Provide a string for the label
        >
          <div>
            <p className="text-gray-500 dark:text-dark-500">
              The official business definition of a Contact Administrator is an
              individual responsible for managing the contact database of an
              organization. This includes the maintenance of contact
              information, the creation of contact groups, and the organization
              of contact information into categories.
            </p>
          </div>
        </Tab>
      </Tabs>
    </React.Fragment>
  )
}

export default IconTabs
