'use client'

import React from 'react'

import dynamic from 'next/dynamic'

import useChartColors from '@src/hooks/useChartColors'
import { ApexOptions } from 'apexcharts'

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

interface ColumnChartsProps {
  chartColors: string
  chartDarkColors: string
  chartId: React.MutableRefObject<null>
}

const DistributedColumnChart = ({
  chartColors,
  chartDarkColors,
  chartId,
}: ColumnChartsProps) => {
  // Pass both chartColors and chartDarkColors to the hook
  const chartsColor = useChartColors({ chartColors, chartDarkColors })

  const series = [
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30],
    },
  ]
  const labels = [
    ['John', 'Doe'],
    ['Joe', 'Smith'],
    ['Jake', 'Williams'],
    'Amber',
    ['Peter', 'Brown'],
    ['Mary', 'Evans'],
    ['David', 'Wilson'],
    ['Lily', 'Roberts'],
  ]

  const options: ApexOptions = {
    chart: {
      height: 300,
      type: 'bar',
      events: {
        click: function () {},
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
          fontSize: '12px',
        },
      },
    },
    colors: chartsColor,
  }

  return (
    <React.Fragment>
      <ReactApexChart
        className="!min-h-full"
        options={options}
        series={series}
        type="bar"
        data-chart-colors="[bg-primary-500, bg-pink-500, bg-sky-500, bg-green-300, bg-yellow-500, bg-purple-500, bg-red-500, bg-sky-500]"
        chartId={chartId}
        height={300}
        width="100%"
      />
    </React.Fragment>
  )
}

export default DistributedColumnChart
