import React from 'react'
import { Cards } from '../components/Cards'

export const Dashboard = () => {
  return (
    <div className='row'>
      <div className='col-md-3'>
        <Cards title="Robot Count" text="15" />
      </div>
      <div className='col-md-3'>
        <Cards title="Robot Count" text="15" />
      </div>
      <div className='col-md-3'>
        <Cards title="Robot Count" text="15" />
      </div>
      <div className='col-md-3'>
        <Cards title="Robot Count" text="15" />
      </div>
    </div>
  )
}
