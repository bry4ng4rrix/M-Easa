"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [file, setFile] = useState<File | null>(null);

  const applications = [
    {
      id: 1,
      company: "Google",
      position: "Frontend Developer",
      status: "En attente",
      date: "12/03/2026",
    },
    {
      id: 2,
      company: "Startup X",
      position: "React Developer",
      status: "Accepté entretien",
      date: "10/03/2026",
    },
    {
      id: 3,
      company: "Amazon",
      position: "Fullstack Developer",
      status: "Refusé",
      date: "02/03/2026",
    },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="applications">Candidatures</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* PROFIL */}

        <TabsContent value="profile">
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input />
                </div>

                <div className="space-y-2">
                
                  <Label>Prénom</Label>
                  <Input />
                </div>

                <div className="space-y-2">
                
                  <Label>Civilité</Label>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="mr">Mr</SelectItem>
                      <SelectItem value="mlle">Mlle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                
                  <Label>Date de naissance</Label>
                  <Input type="date" />
                </div>

                <div className="space-y-2">
                
                  <Label>Email</Label>
                  <Input type="email" />
                </div>

                <div className="space-y-2">
                
                  <Label>Numéro</Label>
                  <Input />
                </div>

                <div className="space-y-2">
                
                  <Label>Adresse</Label>
                  <Input />
                </div>
                <div>
              <CardHeader>
                <CardTitle>CV</CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed rounded-xl p-10 text-center"
                >
                  <p>Drag & Drop votre CV</p>

                  <input type="file" />

                  {file && <p className="mt-2">{file.name}</p>}
                </div>
              </CardContent>
              
            </div>
<Button>Enregistre</Button>

            
              </CardContent>

            </Card>

            {/* CV */}
            
          </div>
        </TabsContent>

        {/* CANDIDATURES */}

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Mes candidatures envoyées</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{app.position}</p>

                    <p className="text-sm text-muted-foreground">
                      {app.company}
                    </p>
                  </div>

                  <div className="text-sm">
                    <p>{app.date}</p>

                    <p className="font-medium">{app.status}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* MESSAGES */}

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages recruteurs</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p className="font-semibold">Recruteur - Google</p>

                <p className="text-sm text-muted-foreground">
                  Nous avons reçu votre candidature.
                </p>
              </div>

              <Textarea placeholder="Répondre au recruteur..." />

              <Button>Envoyer</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
