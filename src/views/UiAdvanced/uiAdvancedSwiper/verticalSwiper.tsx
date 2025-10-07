'use client'

import React from 'react'

import Image from 'next/image'

import gallery2 from '@assets/images/gallery/img-02.jpg'
import gallery3 from '@assets/images/gallery/img-03.jpg'
import gallery5 from '@assets/images/gallery/img-05.jpg'
import gallery6 from '@assets/images/gallery/img-06.jpg'
import 'swiper/css'
// Import Swiper core styles
import 'swiper/css/pagination'
// Import Pagination module styles
import 'swiper/css/scrollbar'
// Import Scrollbar module styles

// Import Swiper modules
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const VerticalSlider = () => {
  return (
    <div className="col-span-12 md:col-span-6 card">
      <div className="card-header">
        <h6 className="card-title">Vertical</h6>
      </div>
      <div className="card-body">
        {/* Swiper */}
        <Swiper
          className="verticalSlider h-[445px]"
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          direction="vertical" // Set direction to vertical
          spaceBetween={10}
          slidesPerView={1}
          modules={[Pagination]} // Include Pagination and Scrollbar modules
        >
          <SwiperSlide>
            <Image
              src={gallery5}
              alt="Slide 1"
              className="object-cover w-full h-full rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={gallery6}
              alt="Slide 2"
              className="object-cover w-full h-full rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={gallery3}
              alt="Slide 3"
              className="object-cover w-full h-full rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={gallery2}
              alt="Slide 4"
              className="object-cover w-full h-full rounded-md"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default VerticalSlider
