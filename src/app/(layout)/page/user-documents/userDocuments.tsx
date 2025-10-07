'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import {
  userDocumentsFileData,
  userDocumentsFolderData,
  userDocumentsMediaData,
} from '@src/data'
import {
  UserDocumentFileRecord,
  UserDocumentsFolderRecord,
  UserDocumnentMediaRecord,
} from '@src/dtos'
import { File, FolderClosed, SlidersHorizontal } from 'lucide-react'

const UserDocumentsContent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    author: false,
    customer: false,
  })
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // close dropdown
  const closeDropdown = useCallback(
    (focusAfter: HTMLElement | null = null) => {
      if (!isOpen) return
      setIsOpen(false)
      if (focusAfter) {
        focusAfter.focus()
      }
    },
    [isOpen]
  )

  // handle outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        closeDropdown(buttonRef.current)
      }
    }

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown(buttonRef.current)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapePress)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapePress)
    }
  }, [isOpen, closeDropdown])

  // handle checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target
    setFilters((prevFilters) => ({ ...prevFilters, [id]: checked }))
  }

  return (
    <React.Fragment>
      <div className="flex items-center gap-5">
        <h5 className="text-16 grow">Documents</h5>
        <div className="shrink-0">
          <div className="dropdown">
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              aria-expanded={isOpen}
              aria-controls="dropdown-button"
              type="button"
              className="btn btn-sub-gray">
              <SlidersHorizontal className="inline-block mr-1 size-4" />
              <span className="align-middle whitespace-nowrap">Filter</span>
            </button>

            <div
              ref={panelRef}
              id="dropdown-button"
              style={{ display: isOpen ? 'block' : 'none' }}
              className="p-4 !w-80 dropdown-menu dropdown-right">
              <h6 className="mb-4">Filter Options</h6>
              <form action="#!">
                <p className="mb-2 text-sm font-medium">Member Type:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="input-check-group">
                    <input
                      id="author"
                      className="input-check input-check-primary"
                      type="checkbox"
                      checked={filters.author}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="author" className="input-check-label">
                      Author
                    </label>
                  </div>
                  <div className="input-check-group">
                    <input
                      id="customer"
                      className="input-check input-check-primary"
                      type="checkbox"
                      checked={filters.customer}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="customer" className="input-check-label">
                      Customer
                    </label>
                  </div>
                  <div className="col-span-2">
                    <p className="mb-2 text-sm font-medium">Files Type:</p>
                    <div id="multipleSelect"></div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <button type="reset" className="btn-xs btn btn-sub-gray">
                    Reset
                  </button>
                  <button type="submit" className="btn-xs btn btn-primary">
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-x-5">
        {userDocumentsFolderData.map(
          (folder: UserDocumentsFolderRecord, index: number) => {
            return (
              <div className="relative card" key={index}>
                <div className="card-body">
                  <FolderClosed className="text-indigo-500 stroke-1 size-8 fill-indigo-500/10" />
                  <h6 className="mt-4 mb-1">
                    <Link
                      href="#!"
                      className="before:inset-0 before:absolute before:content-['']">
                      {folder.name}
                    </Link>
                  </h6>
                  <p className="text-gray-500 dark:text-dark-500">
                    {folder.details}
                  </p>
                </div>
              </div>
            )
          }
        )}
      </div>

      <h5 className="text-16">Files</h5>
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-x-5">
        {userDocumentsFileData.map(
          (item: UserDocumentFileRecord, index: number) => (
            <div className="relative card" key={index}>
              <div className="card-body">
                <File
                  className={`stroke-1 text-${item.color} size-8 fill-${item.color}/10`}
                />
                <h6 className="mt-4 mb-1">
                  <Link
                    href="#!"
                    className="before:inset-0 before:absolute before:content-['']">
                    {item.title}
                  </Link>
                </h6>
                <p className="text-gray-500 dark:text-dark-500">{item.size}</p>
              </div>
            </div>
          )
        )}
      </div>

      <h5 className="text-16">Images & Video</h5>

      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-x-5">
        {userDocumentsMediaData.map(
          (item: UserDocumnentMediaRecord, index: number) => (
            <div className="relative card" key={index}>
              <div className="card-body">
                {item.type === 'image' && item.ima ? (
                  <Image
                    src={item.ima}
                    alt={item.title}
                    className="object-cover rounded-md shadow-lg aspect-video shadow-primary-500/10"
                  />
                ) : (
                  <>
                    <iframe
                      className="object-cover w-full rounded-md shadow-lg aspect-video shadow-primary-500/10"
                      src={item.src}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </>
                )}
                <h6 className="mt-4 mb-1 truncate">
                  <Link
                    href="#!"
                    className="before:inset-0 before:absolute before:content-['']">
                    {item.title}
                  </Link>
                </h6>
                <p className="text-gray-500 dark:text-dark-500">{item.size}</p>
              </div>
            </div>
          )
        )}
      </div>
    </React.Fragment>
  )
}

export default UserDocumentsContent
