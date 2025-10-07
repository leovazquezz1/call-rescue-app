'use client'

import React from 'react'

import { Tab, Tabs } from '@src/components/custom/tabs/tab'

const BasicTab: React.FC = () => {
  return (
    <div>
      <Tabs
        ulProps="tabs"
        otherClass="nav-item [&.active]:after:opacity-100 [&.active]:after:w-full [&.active]:text-primary-500"
        activeTabClass="active" // Custom class for active tab
        inactiveTabClass="text-gray-500 hover:text-primary-500 dark:text-dark-500 dark:hover:text-primary-500"
        contentProps="mt-4" // Custom class for the content area
      >
        <Tab label="Home">
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
        <Tab label="Service">
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
        <Tab label="Contact Us">
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
    </div>
  )
}

export default BasicTab
