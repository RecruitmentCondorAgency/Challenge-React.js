import React, {useState} from 'react'
import { ToastContainer } from 'react-toastify'
import Table from '../components/Table'

export default function Search() {
  return (
    <>
      <div className='m-5'>
        <Table />
      </div>
      <ToastContainer/>
    </>
  )
}
