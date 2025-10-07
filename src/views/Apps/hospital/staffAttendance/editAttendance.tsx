'use client'

import React, { useEffect, useState } from 'react'

import { Modal } from '@src/components/custom/modal/modal'
import { Attendance } from '@src/dtos'
import { OptionType } from '@src/dtos/apps/crm'
import { EditAttendanceProps } from '@src/dtos/apps/hospital'
import { categoryItem } from '@src/dtos/apps/school'
import { AppDispatch } from '@src/slices/reducer'
import { addAttendanceData, editAttendanceData } from '@src/slices/thunk'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Select, { SingleValue } from 'react-select'

const EditAttendance = ({
  modalState,
  closeModal,
  attendanceList,
  editMode = false,
  currentAttendance = null,
}: EditAttendanceProps) => {
  const dispatch: AppDispatch = useDispatch()

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [categortList, setCategoryList] =
    useState<SingleValue<OptionType> | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Attendance>()

  const handleStatusChange = (
    selected: SingleValue<OptionType>,
    onChange: (value: string) => void
  ) => {
    setCategoryList(selected)
    onChange(selected ? selected.value : '') // Handle case where selected could be null
  }

  useEffect(() => {
    clearErrors()
    if (editMode && currentAttendance) {
      Object.keys(currentAttendance).forEach((key) => {
        setValue(
          key as keyof Attendance,
          currentAttendance[key as keyof Attendance]
        )
      })
      // Set the date field
      if (currentAttendance.date) {
        setSelectedDate(new Date(currentAttendance.date))
      }

      // Set the status dropdown
      if (currentAttendance.status) {
        const selectedStatus = categoryItem.find(
          (item) => item.value === currentAttendance.status
        )
        setCategoryList(selectedStatus || null)
      }
    } else {
      reset({
        id: 0,
        date: '',
        checkInTime: '',
        checkOutTime: '',
        workedTime: '',
        Difference: '',
        status: '',
        shiftTime: '',
      })
      setSelectedDate(null)
      setCategoryList(null)
      clearErrors()
    }
  }, [editMode, currentAttendance, setValue, reset, clearErrors])

  const submitForm = (data: Attendance, onClose: () => void) => {
    const formData: Attendance = {
      ...data,
      status: categortList?.value || '',
    }

    if (editMode && currentAttendance) {
      dispatch(editAttendanceData(formData))
    } else {
      const newAttendance = {
        ...formData,
        id: attendanceList.length + 1,
      }
      dispatch(addAttendanceData(newAttendance))
    }

    reset()
    onClose()
  }

  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: '2-digit' })
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  const handleCloseModal = (modal: string) => {
    closeModal(modal)
    clearErrors()
    setSelectedDate(null)
    setCategoryList(null)
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={
          editMode
            ? modalState.showEditAttendanceForm
            : modalState.showAddAttendanceForm
        }
        title={editMode ? 'Edit Attendance' : 'Add New Staff'}
        onClose={() =>
          handleCloseModal(
            editMode ? 'showEditAttendanceForm' : 'showAddAttendanceForm'
          )
        }
        position="modal-center"
        id={editMode ? 'showEditAttendanceForm' : 'showAddAttendanceForm'}
        contentClass="modal-content"
        content={(onClose) => (
          <div>
            <form onSubmit={handleSubmit((data) => submitForm(data, onClose))}>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6">
                  <label htmlFor="eventDateInput" className="form-label">
                    Date
                  </label>
                  <Flatpickr
                    id="eventDateInput"
                    className="form-input"
                    placeholder="Select date"
                    value={selectedDate || undefined}
                    options={{ mode: 'single' }}
                    onChange={(date: Date[]) => {
                      const formattedDate = formatDate(date[0])
                      setValue('date', formattedDate)
                      setSelectedDate(date[0])
                    }}
                  />
                  <input
                    type="hidden"
                    {...register('date', { required: 'date is required.' })}
                  />
                  {/* Display error if date is not selected */}
                  {errors.date && (
                    <span className="text-red-500">{errors.date.message}</span>
                  )}
                </div>

                <div className="col-span-6">
                  <label htmlFor="checkInTime" className="form-label">
                    Check In
                  </label>
                  <Flatpickr
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'h:i K',
                      time_24hr: false,
                    }}
                    placeholder="00:00"
                    className="form-input"
                    value={currentAttendance?.checkInTime || ''}
                    onChange={(selectedDates) => {
                      const selectedTime = selectedDates[0]
                        ?.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                        .toLowerCase()
                      setValue('checkInTime', selectedTime)
                    }}
                  />
                  <input
                    type="hidden"
                    {...register('checkInTime', {
                      required: 'checkIn Time is required.',
                    })}
                  />
                  {errors.checkInTime && (
                    <span className="text-red-500">
                      {errors.checkInTime.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6">
                  <label htmlFor="checkOutTime" className="form-label">
                    Check Out
                  </label>
                  <Flatpickr
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'h:i K',
                      time_24hr: false,
                    }}
                    placeholder="00:00"
                    className="form-input"
                    value={currentAttendance?.checkOutTime || ''}
                    onChange={(selectedDates) => {
                      const selectedTime = selectedDates[0]
                        ?.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                        .toLowerCase()
                      setValue('checkOutTime', selectedTime)
                    }}
                  />
                  <input
                    type="hidden"
                    {...register('checkOutTime', {
                      required: 'checkOut Time is required.',
                    })}
                  />
                  {/* Display error if date is not selected */}
                  {errors.checkOutTime && (
                    <span className="text-red-500">
                      {errors.checkOutTime.message}
                    </span>
                  )}
                </div>

                <div className="col-span-6">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                      <Select
                        classNamePrefix="select"
                        options={categoryItem}
                        value={categortList}
                        onChange={(selected) =>
                          handleStatusChange(selected, onChange)
                        }
                        placeholder="Select status"
                        id="categorySelect"
                      />
                    )}
                  />
                  {errors.status && (
                    <span className="text-red-500">Status is required</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <button
                  type="submit"
                  className="btn btn-active-red"
                  onClick={() => onClose()}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  {editMode ? 'Edit Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        )}
      />
    </React.Fragment>
  )
}

export default EditAttendance
