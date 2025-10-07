'use client'

import React from 'react'

import Link from 'next/link'

import BreadCrumb from '@src/components/common/BreadCrumb'
import { NextPageWithLayout } from '@src/dtos'
import BasicLineChart from '@src/views/ECharts/LineCharts/BasicLineChart'
import CategoryLineChart from '@src/views/ECharts/LineCharts/CategoryLineChart'
import PolarLineChart from '@src/views/ECharts/LineCharts/PolarLineChart'
import SmoothLineChart from '@src/views/ECharts/LineCharts/SmoothLineChart'
import StackedLineChart from '@src/views/ECharts/LineCharts/StackedLineChart'
import StepLineChart from '@src/views/ECharts/LineCharts/StepLineChart'
import StyleLineChart from '@src/views/ECharts/LineCharts/StyleLineChart'
import TwoPolarLineChart from '@src/views/ECharts/LineCharts/TwoPolarLineChart'

const LineECharts: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <BreadCrumb title="Line Charts" subTitle="ECharts" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Basic</h6>
          </div>
          <div className="card-body">
            <BasicLineChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Smooth Line</h6>
          </div>
          <div className="card-body">
            <SmoothLineChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Stacked Line Chart</h6>
          </div>
          <div className="card-body">
            <StackedLineChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Line Y Category</h6>
          </div>
          <div className="card-body">
            <CategoryLineChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Step Line</h6>
          </div>
          <div className="card-body">
            <StepLineChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Style Line</h6>
          </div>
          <div className="card-body">
            <StyleLineChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Two Value-Axes in Polar</h6>
          </div>
          <div className="card-body">
            <PolarLineChart />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 card">
          <div className="card-header">
            <h6 className="card-title">Two Value-Axes in Polar</h6>
          </div>
          <div className="card-body">
            <TwoPolarLineChart />
          </div>
        </div>
      </div>

      <div className="mb-5 text-center">
        <Link
          href="https://echarts.apache.org/examples/en/index.html#chart-type-line"
          target="_blank"
          className="btn btn-primary">
          More Example{' '}
          <i data-lucide="move-right" className="inline-block ml-1 size-4"></i>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default LineECharts
