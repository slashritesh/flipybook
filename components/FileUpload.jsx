"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState("idle")

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setUploadStatus("idle")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const handleUpload = async () => {
    if (!file) return

    setUploadStatus("uploading")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setUploadStatus("success")
      } else {
        setUploadStatus("error")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus("error")
    }
  }

  return (
    <div className="w-full max-w-md">
      <div
        {...getRootProps()}
        className={`p-8 text-center border-2 border-dashed rounded-lg cursor-pointer ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        {file ? (
          <p className="mt-2 text-sm text-gray-500">File selected: {file.name}</p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">Drag & drop your PDF here, or click to select a file</p>
        )}
      </div>
      {file && (
        <Button onClick={handleUpload} disabled={uploadStatus === "uploading"} className="mt-4 w-full">
          {uploadStatus === "uploading" ? "Uploading..." : "Upload File"}
        </Button>
      )}
      {uploadStatus === "success" && (
        <p className="mt-2 text-sm text-green-500 flex items-center justify-center">
          <CheckCircle className="mr-2" size={16} /> Upload successful!
        </p>
      )}
      {uploadStatus === "error" && (
        <p className="mt-2 text-sm text-red-500 flex items-center justify-center">
          <XCircle className="mr-2" size={16} /> Upload failed. Please try again.
        </p>
      )}
    </div>
  )
}

