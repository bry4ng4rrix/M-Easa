"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import {
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import Link from "next/link"


function DragDrop({ label }: { label: string }) {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
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
        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition"
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Déposez le fichier ici...</p>
        ) : (
          <p>Glisser le fichier ici ou cliquer pour sélectionner</p>
        )}

        {file && (
          <p className="text-xs text-muted-foreground mt-2">
            Fichier : {file.name}
          </p>
        )}
      </div>
    </div>
  )
}


export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">

      <div className="w-full max-w-lg rounded-md space-y-2 border border-slate-200 shadow-lg py-6 bg-white">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Bienvenue
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Créez un compte pour commencer
          </p>
        </CardHeader>


        <CardContent className="space-y-4">

          <Tabs defaultValue="Employer" className="w-full items-center">

            <TabsList className="grid grid-cols-2 bg-violet-100">
              <TabsTrigger value="Employer">
                Employer
              </TabsTrigger>

              <TabsTrigger value="Recruteur">
                Recruteur
              </TabsTrigger>
            </TabsList>


            {/* EMPLOYER */}

            <TabsContent value="Employer">

              <form className="space-y-4">

                <div className="grid grid-cols-2 gap-3">

                  <div className="space-y-2">
                    <Label>Noms</Label>
                    <Input type="text" placeholder="Rakoto" />
                  </div>

                  <div className="space-y-2">
                    <Label>Prénoms</Label>
                    <Input type="text" placeholder="Bryan" />
                  </div>

                  <div className="space-y-2">
                    <Label>Date de naissance</Label>
                    <Input type="date" />
                  </div>

                </div>


                <div className="grid grid-cols-2 gap-3">

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label>Contact</Label>
                    <Input type="tel" placeholder="+261383572066" />
                  </div>

                </div>


                <div className="grid grid-cols-2 gap-3">

                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <Input type="password" placeholder="********" />
                  </div>

                  <div className="space-y-2">
                    <Label>Confirmer le mot de passe</Label>
                    <Input type="password" placeholder="********" />
                  </div>

                </div>


                <DragDrop label="CV (PDF ou DOC)" />


                <Button className="w-full bg-violet-700 hover:bg-violet-900 transition-all">
                  Inscription
                </Button>


                <div className="flex justify-between text-sm">

                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>

                  <Link
                    href="/login"
                    className="hover:underline"
                  >
                    Déjà un compte ?
                  </Link>

                </div>

              </form>

            </TabsContent>



            {/* RECRUTEUR */}

            <TabsContent value="Recruteur">

              <form className="space-y-4">

                <div className="grid grid-cols-2 gap-3">

                  <div className="space-y-2">
                    <Label>Nom de la société</Label>
                    <Input type="text" placeholder="SpaceX" />
                  </div>

                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <Input type="text" placeholder="Analakely" />
                  </div>

                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input type="text" placeholder="Antananarivo" />
                  </div>

                  <div className="space-y-2">
                    <Label>Code postal</Label>
                    <Input type="number" placeholder="101" />
                  </div>

                </div>


                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>


                <div className="space-y-2">
                  <Label>Contact</Label>
                  <Input type="tel" placeholder="+261383572066" />
                </div>


                <div className="grid grid-cols-2 gap-3">

                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <Input type="password" placeholder="********" />
                  </div>

                  <div className="space-y-2">
                    <Label>Confirmer le mot de passe</Label>
                    <Input type="password" placeholder="********" />
                  </div>

                </div>


                <DragDrop label="Logo de l'entreprise" />


                <Button className="w-full bg-violet-700 hover:bg-violet-900 transition-all">
                  Inscription
                </Button>


                <div className="flex justify-between text-sm">

                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>

                  <Link
                    href="/login"
                    className="hover:underline"
                  >
                    Déjà un compte ?
                  </Link>

                </div>

              </form>

            </TabsContent>

          </Tabs>

        </CardContent>


        <CardFooter className="text-center text-xs text-muted-foreground border-t pt-4">
          M-Easa © 2026
        </CardFooter>

      </div>

    </div>
  )
}