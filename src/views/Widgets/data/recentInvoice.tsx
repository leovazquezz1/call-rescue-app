'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { InvoiceWidgets } from '@src/data'

// Define a TypeScript interface for the invoice data
interface Invoice {
  id: number
  invoiceID: string
  client: string
  dateDue: string
  totalAmount: string
  status: 'Pending' | 'Successful' | 'New'
}

const RecentInvoice: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<keyof Invoice | ''>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    setInvoices(InvoiceWidgets as Invoice[])
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState)
  }

  const closeDropdown = (event: MouseEvent) => {
    if (event && !(event.target as HTMLElement).closest('.dropdown')) {
      setIsDropdownOpen(false)
    }
  }

  const sortInvoices = (field: keyof Invoice) => {
    const direction =
      sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc'
    const sortedInvoices = [...invoices].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setSortBy(field)
    setSortDirection(direction)
    setInvoices(sortedInvoices)
  }

  useEffect(() => {
    window.addEventListener('click', closeDropdown)
    return () => window.removeEventListener('click', closeDropdown)
  }, [])

  return (
    <div className="col-span-12 xl:col-span-6 card">
      <div className="flex items-center card-header">
        <h6 className="card-title grow">Recent Invoice</h6>
        <div className="dropdown shrink-0">
          <button
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-controls="dropdown-menu"
            type="button"
            className="flex px-3 py-1.5 text-xs border-gray-200 dark:border-dark-800 link link-primary btn">
            Filters
            <svg
              className={`ml-1 transition-transform duration-300 size-4 ${isDropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              id="dropdown-menu"
              className="absolute p-2 dropdown-menu dropdown-right bg-white shadow-lg rounded-md z-50">
              <Link href="#" className="dropdown-item">
                Amount
              </Link>
              <Link href="#" className="dropdown-item">
                Revenue
              </Link>
              <Link href="#" className="dropdown-item">
                Rating
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table flush">
            <thead>
              <tr className="bg-gray-100 dark:bg-dark-850">
                <th
                  onClick={() => sortInvoices('invoiceID')}
                  className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500 cursor-pointer">
                  Invoice ID
                  <span>
                    {sortBy === 'invoiceID' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </th>
                <th
                  onClick={() => sortInvoices('client')}
                  className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500 cursor-pointer">
                  Client{' '}
                  <span>
                    {sortBy === 'client' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </th>
                <th
                  onClick={() => sortInvoices('dateDue')}
                  className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500 cursor-pointer">
                  Due Date
                  <span>
                    {sortBy === 'dateDue' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </th>
                <th
                  onClick={() => sortInvoices('totalAmount')}
                  className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500 cursor-pointer">
                  Total
                  <span>
                    {sortBy === 'totalAmount' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </th>
                <th
                  onClick={() => sortInvoices('status')}
                  className="whitespace-nowrap !font-medium text-gray-500 dark:text-dark-500 cursor-pointer">
                  Status{' '}
                  <span>
                    {sortBy === 'status' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className="*:px-3 *:py-2.5">
                  <td className="whitespace-nowrap">
                    <Link href="#!">{invoice.invoiceID}</Link>
                  </td>
                  <td className="whitespace-nowrap">{invoice.client}</td>
                  <td className="whitespace-nowrap">{invoice.dateDue}</td>
                  <td className="whitespace-nowrap">{invoice.totalAmount}</td>
                  <td className="whitespace-nowrap">
                    <span
                      className={`badge ${
                        invoice.status === 'Pending'
                          ? 'badge-yellow'
                          : invoice.status === 'Successful'
                            ? 'badge-green'
                            : 'badge-blue'
                      }`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecentInvoice
