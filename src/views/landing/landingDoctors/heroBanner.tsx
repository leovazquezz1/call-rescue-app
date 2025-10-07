'use client'

import React, { useEffect } from 'react'

import Image from 'next/image'

import mainHome from '@assets/images/hospital/landing/main-home.png'
import UseNumberCounter from '@src/components/common/NumberCounter'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { MoveLeft, MoveRight, Phone, Video } from 'lucide-react'

const HeroBanner: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Default duration for all animations
      once: true, // Whether animations should happen only once
    })
  }, [])
  return (
    <React.Fragment>
      <section
        className="relative pb-0 overflow-hidden pt-44 bg-gradient-to-b from-sky-500/15 to-sky-500/10"
        id="home">
        <div className="absolute inset-0 opacity-75">
          <svg
            className="object-cover w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 560">
            <g mask='url("#SvgjsMask1012")' fill="none">
              <path
                className="stroke-sky-200/30 dark:stroke-sky-500/5"
                d="M111.42 308.12L176.38 345.62L176.38 420.62L111.42 458.12L46.47 420.62L46.47 345.62zM176.38 195.62L241.33 233.12L241.33 308.12L176.38 345.62L111.42 308.12L111.42 233.12zM241.33 308.12L306.28 345.62L306.28 420.62L241.33 458.12L176.38 420.62L176.38 345.62zM241.33 533.12L306.28 570.62L306.28 645.62L241.33 683.12L176.38 645.62L176.38 570.62zM306.28 195.62L371.24 233.12L371.24 308.12L306.28 345.62L241.33 308.12L241.33 233.12zM371.24 533.12L436.19 570.62L436.19 645.62L371.24 683.12L306.28 645.62L306.28 570.62zM501.15 308.12L566.1 345.62L566.1 420.62L501.15 458.12L436.19 420.62L436.19 345.62zM566.1 195.62L631.05 233.12L631.05 308.12L566.1 345.62L501.15 308.12L501.15 233.12zM631.05 533.12L696.01 570.62L696.01 645.62L631.05 683.12L566.1 645.62L566.1 570.62zM696.01 -29.38L760.96 8.12L760.96 83.12L696.01 120.62L631.05 83.12L631.05 8.12zM696.01 195.62L760.96 233.12L760.96 308.12L696.01 345.62L631.05 308.12L631.05 233.12zM696.01 420.62L760.96 458.12L760.96 533.12L696.01 570.62L631.05 533.12L631.05 458.12zM825.91 -29.38L890.87 8.12L890.87 83.12L825.91 120.62L760.96 83.12L760.96 8.12zM825.91 195.62L890.87 233.12L890.87 308.12L825.91 345.62L760.96 308.12L760.96 233.12zM955.82 195.62L1020.78 233.12L1020.78 308.12L955.82 345.62L890.87 308.12L890.87 233.12zM1085.73 -29.38L1150.68 8.12L1150.68 83.12L1085.73 120.62L1020.78 83.12L1020.78 8.12zM1150.68 533.12L1215.64 570.62L1215.64 645.62L1150.68 683.12L1085.73 645.62L1085.73 570.62zM1280.59 308.12L1345.54 345.62L1345.54 420.62L1280.59 458.12L1215.64 420.62L1215.64 345.62zM1345.55 -29.38L1410.5 8.12L1410.5 83.12L1345.55 120.62L1280.59 83.12L1280.59 8.12zM1410.5 83.12L1475.45 120.62L1475.45 195.62L1410.5 233.12L1345.55 195.62L1345.55 120.62zM1475.45 195.62L1540.41 233.12L1540.41 308.12L1475.45 345.62L1410.5 308.12L1410.5 233.12zM1475.45 420.62L1540.41 458.12L1540.41 533.12L1475.45 570.62L1410.5 533.12L1410.5 458.12z"
                stroke="rgba(224, 240, 252, 1)"
                strokeWidth="2"></path>
              <path
                className="fill-sky-200/0"
                d="M103.92 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM103.92 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM38.97 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM38.97 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM103.92 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM233.83 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM168.88 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM298.78 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM363.74 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM428.69 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM493.65 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM558.6 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM688.51 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM753.46 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM623.55 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM883.37 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM818.41 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.32 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM948.32 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1013.28 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1143.18 683.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 645.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1078.23 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.04 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.04 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1208.14 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 -29.38 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 83.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1273.09 8.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 120.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1338.05 195.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 233.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 345.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 308.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 420.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1532.91 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1467.95 570.62 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 533.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0zM1403 458.12 a7.5 7.5 0 1 0 15 0 a7.5 7.5 0 1 0 -15 0z"></path>
              <path
                className="stroke-sky-200/20 dark:stroke-sky-500/5"
                d="M19.38 -45.28L62.68 -20.28L62.68 29.72L19.38 54.72L-23.92 29.72L-23.92 -20.28zM62.68 179.72L105.98 204.72L105.98 254.72L62.68 279.72L19.38 254.72L19.38 204.72zM19.38 254.72L62.68 279.72L62.68 329.72L19.38 354.72L-23.92 329.72L-23.92 279.72zM62.68 329.72L105.98 354.72L105.98 404.72L62.68 429.72L19.38 404.72L19.38 354.72zM19.38 404.72L62.68 429.72L62.68 479.72L19.38 504.72L-23.92 479.72L-23.92 429.72zM62.68 479.72L105.98 504.72L105.98 554.72L62.68 579.72L19.38 554.72L19.38 504.72zM149.29 479.72L192.59 504.72L192.59 554.72L149.29 579.72L105.98 554.72L105.98 504.72zM192.59 104.72L235.89 129.72L235.89 179.72L192.59 204.72L149.29 179.72L149.29 129.72zM235.89 179.72L279.19 204.72L279.19 254.72L235.89 279.72L192.59 254.72L192.59 204.72zM192.59 254.72L235.89 279.72L235.89 329.72L192.59 354.72L149.29 329.72L149.29 279.72zM409.1 179.72L452.41 204.72L452.41 254.72L409.1 279.72L365.8 254.72L365.8 204.72zM409.1 329.72L452.41 354.72L452.41 404.72L409.1 429.72L365.8 404.72L365.8 354.72zM539.01 -45.28L582.31 -20.28L582.31 29.72L539.01 54.72L495.71 29.72L495.71 -20.28zM582.31 179.72L625.62 204.72L625.62 254.72L582.31 279.72L539.01 254.72L539.01 204.72zM539.01 254.72L582.31 279.72L582.31 329.72L539.01 354.72L495.71 329.72L495.71 279.72zM539.01 404.72L582.31 429.72L582.31 479.72L539.01 504.72L495.71 479.72L495.71 429.72zM668.92 329.72L712.22 354.72L712.22 404.72L668.92 429.72L625.62 404.72L625.62 354.72zM755.52 179.72L798.83 204.72L798.83 254.72L755.52 279.72L712.22 254.72L712.22 204.72zM842.13 29.72L885.43 54.72L885.43 104.72L842.13 129.72L798.83 104.72L798.83 54.72zM798.83 104.72L842.13 129.72L842.13 179.72L798.83 204.72L755.52 179.72L755.52 129.72zM885.43 104.72L928.73 129.72L928.73 179.72L885.43 204.72L842.13 179.72L842.13 129.72zM885.43 404.72L928.73 429.72L928.73 479.72L885.43 504.72L842.13 479.72L842.13 429.72zM972.04 254.72L1015.34 279.72L1015.34 329.72L972.04 354.72L928.73 329.72L928.73 279.72zM972.04 404.72L1015.34 429.72L1015.34 479.72L972.04 504.72L928.73 479.72L928.73 429.72zM1101.94 29.72L1145.25 54.72L1145.25 104.72L1101.94 129.72L1058.64 104.72L1058.64 54.72zM1058.64 104.72L1101.94 129.72L1101.94 179.72L1058.64 204.72L1015.34 179.72L1015.34 129.72zM1145.25 -45.28L1188.55 -20.28L1188.55 29.72L1145.25 54.72L1101.94 29.72L1101.94 -20.28zM1145.25 104.72L1188.55 129.72L1188.55 179.72L1145.25 204.72L1101.94 179.72L1101.94 129.72zM1275.15 479.72L1318.46 504.72L1318.46 554.72L1275.15 579.72L1231.85 554.72L1231.85 504.72zM1318.46 404.72L1361.76 429.72L1361.76 479.72L1318.46 504.72L1275.15 479.72L1275.15 429.72zM1361.76 479.72L1405.06 504.72L1405.06 554.72L1361.76 579.72L1318.46 554.72L1318.46 504.72z"
                stroke="rgba(232, 244, 252, 1)"
                strokeWidth="2"></path>
            </g>
            <defs>
              <mask id="SvgjsMask1012">
                <rect
                  className="object-cover w-full h-full"
                  fill="#ffffff"></rect>
              </mask>
            </defs>
          </svg>
        </div>
        <div className="absolute hidden size-28 bg-sky-500/10 clip-path-plus ltr:right-64 rtl:left-64 top-64 animate-pulse lg:inline-block"></div>
        <div className="absolute hidden rotate-45 size-28 bg-white/50 dark:bg-white/10 clip-path-plus ltr:left-1/2 rtl:right-1/2 lg:inline-block bottom-1/3"></div>
        <div className="container mx-auto px-4 relative xl:px-20">
          <div className="grid items-center grid-cols-12 gap-4 lg:gap-x-16">
            <div
              className="col-span-12 xl:col-span-6"
              data-aos="fade-up"
              data-aos-duration="2000">
              <div className="mb-8">
                <p className="relative ltr:pl-10 rtl:pr-10 mb-2 text-lg font-medium text-sky-500 before:w-8 before:bg-sky-300 before:absolute before:h-[2px] before:top-1/2 before:-translate-y-1/2 ltr:before:left-0 rtl:before:right-0">
                  Simplifying health care of you
                </p>
                <h1 className="mb-4 text-4xl capitalize md:leading-normal xl:leading-normal md:text-5xl xl:text-6xl">
                  <span className="inline-block">Free Health</span>
                  <span className="inline-block mx-4 underline decoration-dashed decoration-2 underline-offset-4 decoration-sky-300 font-roboto-slab text-sky-500">
                    Checkup
                  </span>
                  <span className="inline-block">Ensure A Better Life</span>
                </h1>
                <p className="mb-8 text-lg text-gray-500 dark:text-dark-500">
                  Doing a regular body check-up can help doctors diagnose a
                  disease before it poses high risk. Reduces the risk of
                  complication during treatment – once you are diagnosed with a
                  health condition at an early stage.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className="py-3 btn btn-sky">
                    Make An Appointment
                    <MoveRight className="inline-block ml-1 rtl:hidden size-4" />
                    <MoveLeft className="hidden mr-1 rtl:inline-block size-4" />
                  </button>
                  <button type="button" className="py-3 btn btn-outline-sky">
                    <Video className="inline-block ltr:mr-1 rtl:ml-1 size-4" />{' '}
                    Watch Intro
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-12 xl:col-span-5 xl:col-start-8">
              <div className="relative">
                <div className="absolute z-10 items-center hidden gap-3 p-3 bg-white rounded-md lg:flex dark:bg-dark-850 bottom-72 ltr:right-0 xl:ltr:-right-32 rtl:left-0 xl:rtl:-left-32 ">
                  <div className="flex items-center justify-center rounded-full size-12 text-sky-100 bg-sky-500">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-gray-500 dark:text-dark-500">
                      24/7 Hours Service
                    </p>
                    <h6>+251 (01234 5678 98)</h6>
                  </div>
                </div>
                <Image
                  src={mainHome}
                  alt="bannerImg"
                  className="relative xl:scale-[1.3] -bottom-12"
                  width={536}
                  height={637}
                />
              </div>
            </div>
          </div>
          <div className="relative border-none card bg-sky-500 dark:bg-sky-500 text-primary-50 bottom-2 2xl:bottom-10 shadow-sky-200/50">
            <div className="p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                <div className="text-center">
                  <h4 className="mb-2">
                    <span>
                      <UseNumberCounter start={0} end={263} duration={3000} />
                    </span>
                    k+
                  </h4>
                  <p className="text-primary-200 text-16">Recovered Patients</p>
                </div>
                <div className="text-center">
                  <h4 className="mb-2">
                    <span>
                      <UseNumberCounter start={0} end={92} duration={3000} />
                    </span>
                    %
                  </h4>
                  <p className="text-primary-200 text-16">Satisfaction Rate</p>
                </div>
                <div className="text-center">
                  <h4 className="mb-2">
                    <span>
                      <UseNumberCounter start={0} end={102} duration={3000} />
                    </span>
                    +
                  </h4>
                  <p className="text-primary-200 text-16">Experts Doctors</p>
                </div>
                <div className="text-center">
                  <h4 className="mb-2">
                    <span>
                      <UseNumberCounter start={0} end={100} duration={3000} />
                    </span>
                    +
                  </h4>
                  <p className="text-primary-200 text-16">Award Winner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default HeroBanner
