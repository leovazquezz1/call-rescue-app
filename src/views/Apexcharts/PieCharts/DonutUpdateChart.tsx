'use client'

import React, { useState } from 'react'

import dynamic from 'next/dynamic'

import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface PieChartsProps {
  chartColors: string
  chartDarkColors: string
  chartId: React.MutableRefObject<null>
}

const DonutUpdateChart = ({
  chartColors,
  chartDarkColors,
  chartId,
}: PieChartsProps) => {
  // Pass both chartColors and chartDarkColors to the hook
  const chartsColor = useChartColors({ chartColors, chartDarkColors })

  const [series, setSeries] = useState<number[]>([44, 55, 13, 33])
  const options: ApexOptions = {
    chart: {
      height: 300,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    colors: chartsColor,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
  }

  const add = () => {
    setSeries((prevSeries) => [
      ...prevSeries,
      Math.floor(Math.random() * (100 - 1 + 1)) + 1,
    ])
  }

  const remove = () => {
    setSeries((prevSeries) => prevSeries.slice(0, -1))
  }

  const randomize = () => {
    setSeries((prevSeries) =>
      prevSeries.map(() => Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    )
  }

  const reset = () => {
    setSeries([44, 55, 13, 33])
  }

  return (
    <React.Fragment>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button onClick={add} className="btn btn-sub-primary">
          Add
        </button>
        <button onClick={remove} className="btn btn-sub-primary">
          Remove
        </button>
        <button onClick={randomize} className="btn btn-sub-primary">
          Randomize
        </button>
        <button onClick={reset} className="btn btn-sub-primary">
          Reset
        </button>
      </div>
      <ReactApexChart
        className="!min-h-full"
        options={options}
        series={series}
        type="donut"
        data-chart-colors="[bg-primary-500, bg-green-500, bg-yellow-500, bg-red-500, bg-purple-500]"
        chartId={chartId}
        height={300}
        width="100%"
      />
    </React.Fragment>
  )
}

export default DonutUpdateChart
