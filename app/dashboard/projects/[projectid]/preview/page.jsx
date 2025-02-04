
import MyBook from '@/components/PdfView'
// import MyBook from '@/components/Sample'
import { appwrite } from '@/config'
import { createAdminClient } from '@/config/appwrite'
import { getFileUrl } from '@/lib/utils'
import React from 'react'

const page = async ({ params}) => {
  const {projectid} = await params
  const {buckets} = appwrite

  const url = getFileUrl(buckets.pdfs,projectid)

  
  return (
    <div>
        <MyBook fileUrl={url} />
    </div>
  )
}

export default page