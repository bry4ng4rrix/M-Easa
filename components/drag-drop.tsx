"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Label } from "@/components/ui/label"

export default function DragDrop({
  label,
  onFileSelect,
}: {
  label: string
  onFileSelect: (file: File) => void
}) {

  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selected = acceptedFiles[0]
      setFile(selected)
      onFileSelect(selected)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <div className="space-y-2">

      <Label>{label}</Label>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-violet-300 hover:border-violet-500 rounded-md p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Déposez le fichier ici...</p>
        ) : (
          <p>Glisser ou cliquer pour sélectionner</p>
        )}

        {file && (
          <p className="text-xs mt-2">
            Fichier : {file.name}
          </p>
        )}

      </div>

    </div>
  )
}