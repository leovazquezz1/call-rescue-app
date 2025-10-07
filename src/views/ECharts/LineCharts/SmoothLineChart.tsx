'use client'

import React from 'react'

import dynamic from 'next/dynamic'

// Dynamically import the ReactApexChart component
const ReactEcharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
})

const SmoothLineChart = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    grid: {
      top: '5%',
      left: '6%',
      right: '0%',
      bottom: '8%',
    },
  }

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: '350px' }} option={option} />
    </React.Fragment>
  )
}

export default SmoothLineChart
