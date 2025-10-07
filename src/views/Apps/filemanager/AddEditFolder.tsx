'use client'

import React, { useEffect } from 'react'

import { Modal } from '@src/components/custom/modal/modal'
import { AddNewFolderModal, FolderListRecord } from '@src/dtos/apps/filemanager'
import { AppDispatch } from '@src/slices/reducer'
import { addFolderRecordData, editFolderRecordData } from '@src/slices/thunk'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const AddEditFolder: React.FC<AddNewFolderModal> = ({
  modalState,
  closeModal,
  folderList,
  editMode = false,
  currentFolder = null,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FolderListRecord>()
  useEffect(() => {
    if (editMode && currentFolder) {
      clearErrors()
      Object.keys(currentFolder).forEach((key) => {
        setValue(
          key as keyof FolderListRecord,
          currentFolder[key as keyof FolderListRecord]
        )
      })
    } else {
      reset()
    }
  }, [editMode, currentFolder, setValue, reset, clearErrors])
  console.log('folderList', folderList)
  const submitForm = (data: FolderListRecord, onClose: () => void) => {
    if (editMode && currentFolder) {
      const updatedContact: FolderListRecord = { ...data }
      dispatch(editFolderRecordData(updatedContact))
    } else {
      // Create new customer with generated customerId
      const newCustomer: FolderListRecord = {
        ...data,
        id: folderList ? folderList.length + 1 : 1,
        description: '0',
      }

      dispatch(addFolderRecordData(newCustomer))
      reset()
    }

    onClose()
  }

  const handleCloseModal = (modal: string) => {
    closeModal(modal)
    clearErrors()
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={
          editMode == true
            ? modalState.showEditFolder
            : modalState.showAddFolder
        }
        title={editMode ? 'Edit Folder' : 'Create Folder'}
        onClose={() =>
          handleCloseModal(editMode ? 'showEditFolder' : 'showAddFolder')
        }
        position="modal-center"
        id={editMode ? 'showEditFolder' : 'showAddFolder'}
        contentClass="modal-content"
        content={(onClose) => (
          <>
            <form onSubmit={handleSubmit((data) => submitForm(data, onClose))}>
              <div>
                <label htmlFor="basicInput1" className="form-label">
                  Folder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="basicInput1"
                  className="form-input dark:bg-dark-800 dark:border-dark-500"
                  {...register('name', { required: 'This field is required.' })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 mt-space">
                <button
                  type="button"
                  className="btn btn-active-red"
                  data-modal-close="createFolderModal"
                  onClick={() => onClose()}>
                  Close <X className="inline-block ltr:ml-1 rtl:mr-1 size-4" />
                </button>
                <button type="submit" className="btn btn-primary">
                  {editMode ? 'Update Folder' : 'Create Folder'}
                </button>
              </div>
            </form>
          </>
        )}
      />
    </React.Fragment>
  )
}

export default AddEditFolder
