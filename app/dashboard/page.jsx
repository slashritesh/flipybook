import { getAllProjects } from '@/actions/projects'
import FileUpload from '@/components/FileUpload'
import React from 'react'

const DashboardPage = async () => {
  const data = await getAllProjects()
  return (
    <main className='mx-20'>
        <div className='p-10 flex gap-10 rounded-lg h-[70vh] justify-center items-center flex-col bg-slate-50'>
          <h1 className='text-2xl text-center font-semibold'>
            Create new Flipbook From PDF <br />
            Upload Your Pdf First
          </h1>
          <FileUpload />
        </div>

      
    </main>
  )
}

export default DashboardPage