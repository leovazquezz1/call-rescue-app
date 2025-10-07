'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import { tasksData } from '@src/data/index'
import { NextPageWithLayout } from '@src/dtos'

interface Task {
  id: string
  label: string
  checked: boolean
}
const TaskLists: NextPageWithLayout = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData)

  // Handle checkbox change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setTasks((prevState) =>
      prevState.map((task) => (task.id === id ? { ...task, checked } : task))
    )
  }

  return (
    <React.Fragment>
      <div className="order-10 col-span-12 xl:col-span-6 2xl:col-span-4 card">
        <div className="flex items-center gap-3 card-header">
          <h6 className="card-title grow">Task Lists</h6>
          <div className="shrink-0">
            <Link href="#!" className="link link-primary">
              <i className="align-baseline ltr:mr-1 rtl:ml-1 ri-add-line"></i>{' '}
              Create Task
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <div key={task.id} className="relative">
                <input
                  id={task.id}
                  className="absolute top-2.5 ltr:left-2 rtl:right-2 input-check peer input-check-primary"
                  type="checkbox"
                  checked={task.checked}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                />
                <label
                  htmlFor={task.id}
                  className="p-2 font-medium rounded-md cursor-pointer ltr:pl-8 rtl:pr-8 bg-gray-50 input-check-group dark:bg-dark-850 peer-checked:bg-primary-500/10">
                  {task.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TaskLists
