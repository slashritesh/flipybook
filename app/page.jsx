import FileUpload from '@/components/FileUpload'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <main>
      <Navbar />
      <section className='px-20 flex justify-center items-center flex-col'>
        <h1 className='text-5xl mt-14 font-medium text-center'>Convert Your Pdf Into <br /> Interactive Flipbook In Mins</h1>
        <div className='py-10'>
          <FileUpload />
        </div>
      </section>
      <link rel='import' src="https://flipybook.vercel.app/share/67a1b807002252cc5061" ></link>
      <embed height={500} width={800} src="https://flipybook.vercel.app/share/67a1b807002252cc5061" type="" />
    </main>
  )
}

export default page