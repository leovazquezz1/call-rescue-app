'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import folderImage from '@assets/images/file-manager/icons/folder.png'
import DeleteModal from '@src/components/common/DeleteModal'
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from '@src/components/custom/dropdown/dropdown'
import { FolderListRecord } from '@src/dtos/apps/filemanager'
import { AppDispatch, RootState } from '@src/slices/reducer'
import { deleteFolderData, getFolderListData } from '@src/slices/thunk'
import { Ellipsis, Plus, Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import AddEditFolder from './AddEditFolder'
import PinedFiles from './PinedFiles'
import RecentFiles from './RecentFiles'

const FileManagerMainSection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { folderList } = useSelector((state: RootState) => state.FolderList)
  const [folderListData, setFolderListData] = useState<FolderListRecord[]>([])
  const [editMode, setEditMode] = useState(false)
  const [currentFolder, setCurrentFolder] = useState<FolderListRecord | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletedRecord, setDeletedRecord] = useState<number[] | null>(null)
  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({
    showAddFolder: false,
    showEditFolder: false,
  })

  useEffect(() => {
    if (folderList === null) {
      dispatch(getFolderListData())
    } else {
      setFolderListData(folderList)
    }
  }, [folderList, dispatch]) // Added dependencies here

  // search files
  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = folderListData.filter((item: FolderListRecord) =>
    Object.values(item).some((itemValue) =>
      itemValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // open close modal
  const openModal = (key: string) =>
    setModalState((prev) => ({ ...prev, [key]: true }))
  const closeModal = (key: string) =>
    setModalState((prev) => ({ ...prev, [key]: false }))
  // open modal of add or edit
  const handleOpenModal = (
    editMode: boolean = false,
    customer: FolderListRecord | null = null
  ) => {
    setEditMode(editMode)
    setCurrentFolder(customer)
    const modalKey = editMode ? 'showEditFolder' : 'showAddFolder'
    openModal(modalKey)
  }

  const handleCloseModal = () => {
    const modalKey = editMode ? 'showEditFolder' : 'showAddFolder'
    closeModal(modalKey)
    setEditMode(false)
    setCurrentFolder(null)
  }

  // handle customer delete record
  const handleDeleteRecord = (id: number) => {
    setIsModalOpen(true)
    setDeletedRecord([id])
  }

  // set customer delete record
  const setDeleteRecord = () => {
    if (deletedRecord && isModalOpen) {
      dispatch(deleteFolderData(deletedRecord))
      setIsModalOpen(false)
      setDeletedRecord(null)
    }
  }

  return (
    <React.Fragment>
      <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="grow">
            <div className="relative group/form">
              <input
                type="text"
                className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                placeholder="Search ..."
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                value={searchTerm}
              />
              <div className="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-hidden">
                <Search className="size-4" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              className="w-full btn btn-primary"
              data-modal-target="createFolderModal"
              onClick={() => openModal('showAddFolder')}>
              <Plus className="inline-block ltr:ml-1 rtl:mr-1 size-4" /> Create
              New
            </button>
            <button
              type="button"
              title="btn"
              className="btn btn-sub-gray btn-icon shrink-0">
              <Ellipsis className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-space">
          <h6 className="mb-3">
            My Folders (<span>{filteredData.length}</span>)
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-x-space">
            {filteredData &&
              filteredData.length > 0 &&
              filteredData.map((item) => (
                <div className="block card" key={item.id}>
                  <div className="card-body">
                    <Dropdown
                      position="right"
                      trigger="click"
                      dropdownClassName="dropdown float-end">
                      <DropdownButton colorClass="flex items-center text-gray-500 dark:text-dark-500">
                        <i className="ri-more-2-fill"></i>
                      </DropdownButton>
                      <DropdownMenu>
                        <Link href="#!" className="dropdown-item">
                          <i className="align-middle ltr:mr-2 rtl:ml-2 ri-eye-line"></i>
                          <span>Open Folder</span>
                        </Link>
                        <Link
                          href="#!"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault()
                            handleOpenModal(true, item)
                          }}>
                          <i className="align-middle ltr:mr-2 rtl:ml-2 ri-pencil-line"></i>
                          <span>Edit</span>
                        </Link>
                        <Link
                          href="#!"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault()
                            handleDeleteRecord(item.id)
                          }}>
                          <i className="align-middle ltr:mr-2 rtl:ml-2 ri-delete-bin-line"></i>
                          <span>Delete</span>
                        </Link>
                      </DropdownMenu>
                    </Dropdown>
                    <Image src={folderImage} alt="Folders Img" />
                    <div className="mt-4">
                      <h6 className="mb-1">
                        <Link href="#!">{item.name}</Link>
                      </h6>
                      <p className="text-sm text-slate-500 dark:text-dark-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <h6 className="mb-3">Pinned Files</h6>
          <PinedFiles />
          <RecentFiles />
        </div>

        <AddEditFolder
          modalState={modalState}
          closeModal={handleCloseModal}
          folderList={folderList}
          editMode={editMode}
          currentFolder={currentFolder}
        />

        <DeleteModal
          show={isModalOpen}
          handleHide={() => setIsModalOpen(false)}
          deleteModalFunction={setDeleteRecord}
        />
      </div>
    </React.Fragment>
  )
}

export default FileManagerMainSection
