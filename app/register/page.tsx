"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export async function registerEmployer(data:any, file:File){

  const {data:user,error} = await supabase.auth.signUp({
    email:data.email,
    password:data.password
  })

  if(error) return {error}

  const userId = user.user?.id

  // upload CV
  const {data:fileData} = await supabase.storage
  .from("cv")
  .upload(`${userId}/${file.name}`, file)

  const cvUrl = fileData?.path

  await supabase.from("employers").insert({
    id:userId,
    nom:data.nom,
    prenoms:data.prenoms,
    date_naissance:data.date_naissance,
    adresse:data.adresse,
    email:data.email,
    contact:data.contact,
    cv_url:cvUrl
  })

}

export async function registerRecruteur(data:any,file:File){

  const {data:user,error} = await supabase.auth.signUp({
    email:data.email,
    password:data.password
  })

  if(error) return {error}

  const userId = user.user?.id

  const {data:fileData} = await supabase.storage
  .from("logos")
  .upload(`${userId}/${file.name}`,file)

  const logoUrl = fileData?.path

  await supabase.from("recruteurs").insert({
    id:userId,
    nom_societe:data.nom_societe,
    adresse:data.adresse,
    ville:data.ville,
    code_postal:data.code_postal,
    email:data.email,
    contact:data.contact,
    logo_url:logoUrl
  })

}

function DragDrop({ label }: { label: string }) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-violet-300 hover:border-violet-500 rounded-md p-6 text-center cursor-pointer hover:bg-muted transition-all duration-300"
      >
        <input className="rounded-sm" {...getInputProps()} />

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
  );
}

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-lg rounded-md space-y-2 border border-slate-200 shadow-lg py-6 bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Bienvenue</CardTitle>

          <p className="text-sm text-muted-foreground">
            Créez un compte pour commencer
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Tabs defaultValue="Employer" className="w-full items-center">
            <TabsList className="grid grid-cols-2 bg-violet-100">
              <TabsTrigger value="Employer">Employer</TabsTrigger>

              <TabsTrigger value="Recruteur">Recruteur</TabsTrigger>
            </TabsList>

            {/* EMPLOYER */}

            <TabsContent value="Employer">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-2 space-y-2">
                  <div className="space-y-2">
                    <Label>Noms</Label>
                    <Input
                      className="rounded-sm"
                      type="text"
                      placeholder="Rakoto"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Prénoms</Label>
                    <Input
                      className="rounded-sm"
                      type="text"
                      placeholder="Bryan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date de naissance</Label>
                    <Input className="rounded-sm" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <Input className="rounded-sm" type="text" placeholder="123 Rue de la Paix" />
                  </div>
                   <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      className="rounded-sm"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Contact</Label>
                    <Input
                      className="rounded-sm"
                      type="tel"
                      placeholder="+261383572066"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <Input
                      className="rounded-sm"
                      type="password"
                      placeholder="********"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Confirmer le mot de passe</Label>
                    <Input
                      className="rounded-sm"
                      type="password"
                      placeholder="********"
                    />
                  </div>
                </div>

               

                <DragDrop label="CV (PDF ou DOC)" />

                <Button className="rounded-sm w-full bg-violet-700 hover:bg-violet-900 transition-all duration-300">
                  Inscription
                </Button>

                <div className="flex justify-between text-sm">
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>

                  <Link href="/login" className="hover:underline">
                    Déjà un compte ?
                  </Link>
                </div>
              </form>
            </TabsContent>

            {/* RECRUTEUR */}

            <TabsContent value="Recruteur">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-2 space-y-2">
                  <div className="space-y-2">
                    <Label>Nom de la société</Label>
                    <Input
                      className="rounded-sm"
                      type="text"
                      placeholder="SpaceX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <Input
                      className="rounded-sm"
                      type="text"
                      placeholder="Analakely"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input
                      className="rounded-sm"
                      type="text"
                      placeholder="Antananarivo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Code postal</Label>
                    <Input
                      className="rounded-sm"
                      type="number"
                      placeholder="101"
                    />
                  </div>
                   <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    className="rounded-sm"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contact</Label>
                  <Input
                    className="rounded-sm"
                    type="tel"
                    placeholder="+261383572066"
                  />
                </div>
                 <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <Input
                      className="rounded-sm"
                      type="password"
                      placeholder="********"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Confirmer le mot de passe</Label>
                    <Input
                      className="rounded-sm"
                      type="password"
                      placeholder="********"
                    />
                  </div>
                </div>


                <DragDrop label="Logo de l'entreprise" />

                <Button className="w-full bg-violet-700 hover:bg-violet-900 transition-all duration-300">
                  Inscription
                </Button>

                <div className="flex justify-between text-sm">
                  <Link
                    href="#"
                    className="text-muted-foreground hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>

                  <Link href="/login" className="hover:underline">
                    Déjà un compte ?
                  </Link>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="text-center text-xs text-muted-foreground border-t pt-4 border-slate-200">
          M-Easa © 2026
        </CardFooter>
      </div>
    </div>
  );
}
