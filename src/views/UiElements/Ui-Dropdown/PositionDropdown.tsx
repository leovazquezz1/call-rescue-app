'use client'

import React from 'react'

import Link from 'next/link'

import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from '@src/components/custom/dropdown/dropdown'
import { PositionDropdownProps } from '@src/dtos/pages/ui'

const PositionDropdown: React.FC<PositionDropdownProps> = ({ data }) => {
  return (
    <React.Fragment>
      <Dropdown trigger="click" dropdownClassName="dropdown">
        <DropdownButton
          colorClass="flex items-center gap-2 btn-sub-gray btn"
          arrow={true}>
          Dropdown Options
        </DropdownButton>
        <DropdownMenu>
          {data.map((item) => (
            <Link href="#" className="dropdown-item" key={item.id}>
              <span className={item.spantextColor}>{item.text}</span>
            </Link>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Dropdown position="right" trigger="click" dropdownClassName="dropdown">
        <DropdownButton
          colorClass="flex items-center gap-2 btn-sub-gray btn"
          arrow={true}>
          Right Dropdown
        </DropdownButton>
        <DropdownMenu>
          {data.map((item) => (
            <Link href="#" className="dropdown-item" key={item.id}>
              <span className={item.spantextColor}>{item.text}</span>
            </Link>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Dropdown
        position="top-right"
        trigger="click"
        dropdownClassName="dropdown">
        <DropdownButton
          colorClass="flex items-center gap-2 btn-sub-gray btn"
          arrow={true}>
          Right Top Dropdown
        </DropdownButton>
        <DropdownMenu>
          {data.map((item) => (
            <Link href="#" className="dropdown-item" key={item.id}>
              <span className={item.spantextColor}>{item.text}</span>
            </Link>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Dropdown
        position="top-right"
        trigger="click"
        dropdownClassName="dropdown">
        <DropdownButton
          colorClass="flex items-center gap-2 btn-sub-gray btn"
          arrow={true}>
          Left Top Dropdown Options
        </DropdownButton>
        <DropdownMenu>
          {data.map((item) => (
            <Link href="#" className="dropdown-item" key={item.id}>
              <span className={item.spantextColor}>{item.text}</span>
            </Link>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}
export default PositionDropdown
