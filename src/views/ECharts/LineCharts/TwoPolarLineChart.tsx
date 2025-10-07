'use client'

import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

// Dynamically import the ReactApexChart component
const ReactEcharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
})

const TwoPolarLineChart = () => {
  const [data, setData] = useState<number[][]>([])

  useEffect(() => {
    const newData: number[][] = []
    for (let i = 0; i <= 100; i++) {
      const theta = (i / 100) * 360
      const r = 5 * (1 + Math.sin((theta / 180) * Math.PI))
      newData.push([r, theta])
    }
    setData(newData)
  }, [])

  const option = {
    title: {
      text: 'Two Value-Axes in Polar',
    },
    legend: {
      data: ['line'],
    },
    polar: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    angleAxis: {
      type: 'value',
      startAngle: 0,
    },
    radiusAxis: {},
    series: [
      {
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        data: data,
      },
    ],
  }

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: '350px' }} option={option} />
    </React.Fragment>
  )
}

export default TwoPolarLineChart
