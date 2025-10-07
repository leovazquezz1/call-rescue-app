'use client'

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { Modal } from '@src/components/custom/modal/modal'
import { TeacherListList } from '@src/dtos'
import { OptionType, categoryItem } from '@src/dtos/apps/school'
import { AppDispatch } from '@src/slices/reducer'
import { addTeacherListData, editTeacherListData } from '@src/slices/thunk'
import { Plus, Upload, X } from 'lucide-react'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Select, { SingleValue } from 'react-select'

const AddEditTeacherList = ({
  modalState,
  closeModal,
  teacherList,
  editMode,
  currentTeacher,
}: {
  modalState: { showEditTeacherForm: boolean; showAddTeacherForm: boolean }
  closeModal: (modal: string) => void
  teacherList: TeacherListList[]
  editMode: boolean
  currentTeacher?: TeacherListList | null
}) => {
  const dispatch: AppDispatch = useDispatch()
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [categorylist, setCategorylist] =
    useState<SingleValue<OptionType> | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }
  const {
    register,
    handleSubmit,
    setValue,
    control,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<TeacherListList>({
    mode: 'onChange',
  })

  useEffect(() => {
    clearErrors()
    if (editMode && currentTeacher) {
      Object.keys(currentTeacher).forEach((key) => {
        if (key in currentTeacher) {
          setValue(
            key as keyof TeacherListList,
            currentTeacher[key as keyof TeacherListList]
          )
        }
      })
      setPreview(
        typeof currentTeacher.image === 'string' ? currentTeacher.image : null
      )

      if (currentTeacher.date) {
        setSelectedDate(new Date(currentTeacher.date))
      } else {
        setSelectedDate(null)
      }

      if (currentTeacher.title) {
        const selectedDepartment = categoryItem.find(
          (item) => item.value === currentTeacher.title
        )
        setCategorylist(selectedDepartment || null)
      }
    } else {
      reset({
        id: 0,
        teacherId: '',
        teacherName: '',
        image: '',
        email: '',
        phone: '',
        salary: '',
        experience: '',
        title: '',
        date: '',
        lastSchool: '',
      })
      setSelectedDate(null)
      setCategorylist(null)
    }
  }, [editMode, currentTeacher, setValue, reset, clearErrors])

  const submitForm = (data: TeacherListList, onClose: () => void) => {
    clearErrors()
    if (editMode && currentTeacher) {
      const updatedTeacherList: TeacherListList = {
        ...data,
        image: preview || '',
      }
      dispatch(editTeacherListData(updatedTeacherList))
      setPreview(null)
    } else {
      // Find the teacher with the maximum ID
      const maxTeacherId =
        teacherList.length > 0
          ? Math.max(
              ...teacherList.map((teacher: TeacherListList) => teacher.id)
            )
          : 0

      // Find the teacher with the highest ID
      const findLastTeacherRecord = teacherList.find(
        (item: TeacherListList) => item.id === maxTeacherId
      )

      let mewTeacherId = 1 // Default teacher ID if no teachers exist

      if (findLastTeacherRecord) {
        // Extract the numeric part of the last teacherId and increment it
        const newTeacherRecordId = Number(
          findLastTeacherRecord.teacherId.split('-')[1]
        )
        mewTeacherId = newTeacherRecordId + 1
      }
      const newTeacher = {
        ...data,
        teacherId: `PET-${mewTeacherId}`,
        image: preview || '',
      }
      dispatch(addTeacherListData(newTeacher))
      setPreview(null)
    }
    reset()
    onClose()
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Get month (0-indexed, so add 1) and pad with leading zero
    const day = String(date.getDate()).padStart(2, '0') // Pad day with leading zero
    return `${year}-${month}-${day}`
  }

  const validatePhoneNumber = (value: string) => {
    const phoneNumberPattern = /^\d{10}$/ // Only 10 digits
    return (
      phoneNumberPattern.test(value) ||
      'Phone number must be exactly 10 digits.'
    )
  }

  const handleCloseModal = (modal: string) => {
    closeModal(modal)
    clearErrors()
    setPreview(null)
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={
          modalState &&
          (editMode
            ? modalState.showEditTeacherForm
            : modalState.showAddTeacherForm)
        }
        onClose={() =>
          handleCloseModal(
            editMode ? 'showEditTeacherForm' : 'showAddTeacherForm'
          )
        }
        position="modal-center"
        title={editMode ? 'Update Teacher' : 'Add Teacher'}
        id={editMode ? 'showEditTeacherForm' : 'showAddTeacherForm'}
        contentClass="modal-content"
        content={(onClose) => (
          <form onSubmit={handleSubmit((data) => submitForm(data, onClose))}>
            <div className="grid grid-cols-12 gap-4">
              <div className="-mt-16">
                <label htmlFor="logo">
                  <div
                    className="inline-flex items-center justify-center overflow-hidden bg-gray-100 border-2 border-white border-solid rounded-full cursor-pointer dark:border-dark-900 dark:bg-dark-850 size-24"
                    style={{ marginTop: '50px' }}>
                    {preview ? (
                      <Image
                        src={preview}
                        alt="previewImg"
                        width={92}
                        height={92}
                        className="object-cover w-full h-full rounded-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 dark:text-dark-500">
                        <Upload />
                      </div>
                    )}
                  </div>
                </label>
                <div className="hidden mt-4">
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      className="block w-full text-sm file:rounded-md focus:outline-0 text-slate-500 dark:text-dark-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-12">
                <label htmlFor="titleSelect" className="form-label">
                  Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Select
                      classNamePrefix="select"
                      options={categoryItem}
                      value={categorylist}
                      onChange={(selected) => {
                        setCategorylist(selected)
                        onChange(selected?.value)
                        clearErrors('title')
                      }}
                      placeholder="Select Department"
                      id="departmentSelect"
                    />
                  )}
                />
                <input
                  type="hidden"
                  {...register('date', {
                    required: 'Joining Date is required.',
                  })}
                />
                {errors.date && (
                  <span className="text-red-500">{errors.date.message}</span>
                )}
              </div>
              <div className="col-span-12">
                <label htmlFor="teacherNameInput" className="form-label">
                  Teacher Name
                </label>
                <input
                  type="text"
                  id="teacherNameInput"
                  className="form-input"
                  placeholder="Teacher name"
                  {...register('teacherName', {
                    required: 'Teacher Name is required.',
                  })}
                />
                {errors.teacherName && (
                  <span className="text-red-500">
                    {errors.teacherName.message}
                  </span>
                )}
              </div>
              <div className="col-span-6">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="emailInput"
                  className="form-input"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Email Name is required.',
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="col-span-6">
                <label htmlFor="phoneInput" className="form-label">
                  Phone
                </label>
                <input
                  type="phone"
                  id="phoneInput"
                  className="form-input"
                  placeholder="+1 0123 456 789"
                  {...register('phone', {
                    required: 'Phone is required.',
                    validate: (value) => {
                      const isValid = validatePhoneNumber(value)
                      if (typeof isValid === 'string') {
                        setError('phone', { type: 'manual', message: isValid })
                      } else {
                        clearErrors('phone')
                      }
                      return isValid
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>
              <div className="col-span-6">
                <label htmlFor="salaryInput" className="form-label">
                  Salary ($)
                </label>
                <input
                  type="text"
                  id="salaryInput"
                  className="form-input"
                  placeholder="$0"
                  {...register('salary', { required: 'salary is required.' })}
                />
                {errors.salary && (
                  <span className="text-red-500">{errors.salary.message}</span>
                )}
              </div>
              <div className="col-span-6">
                <label htmlFor="experienceInput" className="form-label">
                  Experience (Years)
                </label>
                <input
                  type="text"
                  id="experienceInput"
                  className="form-input"
                  placeholder="0 Years"
                  {...register('experience', {
                    required: 'experience is required.',
                  })}
                />
                {errors.experience && (
                  <span className="text-red-500">
                    {errors.experience.message}
                  </span>
                )}
              </div>
              <div className="col-span-12">
                <label htmlFor="lastSchoolNameInput" className="form-label">
                  Last School Name
                </label>
                <input
                  type="text"
                  id="lastSchoolNameInput"
                  className="form-input"
                  placeholder="School name"
                  {...register('lastSchool', {
                    required: 'Last School Name is required.',
                  })}
                />
                {errors.lastSchool && (
                  <span className="text-red-500">
                    {errors.lastSchool.message}
                  </span>
                )}
              </div>

              <div className="col-span-12">
                <label htmlFor="joiningDateSelect" className="form-label">
                  Joining Date
                </label>
                <Flatpickr
                  id="joiningDateSelect"
                  className="form-input"
                  placeholder="Select Joining Date"
                  value={selectedDate || undefined}
                  options={{
                    mode: 'single',
                  }}
                  onChange={(date) => {
                    const formattedDate = formatDate(date[0])
                    setValue('date', formattedDate)
                    clearErrors('date')
                  }}
                />
                <input
                  type="hidden"
                  {...register('date', {
                    required: 'Joining Date is required.',
                  })}
                />
                {errors.date && (
                  <span className="text-red-500">{errors.date.message}</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                type="button"
                className="btn btn-active-red"
                data-modal-close="addTeacherModal"
                onClick={() => onClose()}>
                <X className="inline-block size-4" />
                <span className="align-baseline">Close</span>
              </button>
              <button type="submit" className="btn btn-primary">
                <Plus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                {editMode ? 'Update Teacher' : 'Add Teacher'}
              </button>
            </div>
          </form>
        )}
      />
    </React.Fragment>
  )
}

export default AddEditTeacherList
