'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, CheckCheck, Upload } from 'lucide-react';

export default function ProfilePage() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Recruteur - Google',
      content: 'Nous avons reçu votre candidature. Intéressé pour un entretien?',
      timestamp: '14:30',
      read: true,
    },
    {
      id: 2,
      sender: 'Vous',
      content: 'Oui, je suis très intéressé!',
      timestamp: '14:45',
      read: true,
    },
    {
      id: 3,
      sender: 'Recruteur - Google',
      content: 'Parfait! Nous vous contacterons demain.',
      timestamp: '15:00',
      read: false,
    },
  ]);
  const [messageInput, setMessageInput] = useState('');

  const applications = [
    {
      id: 1,
      company: 'Google',
      position: 'Frontend Developer',
      status: 'En attente',
      statusColor: 'bg-yellow-100 text-yellow-800',
      date: '12/03/2026',
    },
    {
      id: 2,
      company: 'Startup X',
      position: 'React Developer',
      status: 'Accepté entretien',
      statusColor: 'bg-green-100 text-green-800',
      date: '10/03/2026',
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Fullstack Developer',
      status: 'Refusé',
      statusColor: 'bg-red-100 text-red-800',
      date: '02/03/2026',
    },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'Vous',
          content: messageInput,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          read: true,
        },
      ]);
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Mon Profil</h1>
          <p className="text-slate-600">Gérez vos informations et vos candidatures</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 bg-white border border-slate-200 p-1">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* PROFIL TAB */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Informations Personnelles */}
              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="border-b border-slate-200 bg-slate-50">
                  <CardTitle className="text-slate-900">Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Nom</Label>
                      <Input
                        className="border-slate-300 focus:border-blue-500"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Prénom</Label>
                      <Input
                        className="border-slate-300 focus:border-blue-500"
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Civilité</Label>
                      <Select>
                        <SelectTrigger className="border-slate-300">
                          <SelectValue placeholder="Choisir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mr">Mr</SelectItem>
                          <SelectItem value="mlle">Mlle</SelectItem>
                          <SelectItem value="mrs">Mme</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Date de naissance</Label>
                      <Input type="date" className="border-slate-300 focus:border-blue-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Email</Label>
                    <Input
                      type="email"
                      className="border-slate-300 focus:border-blue-500"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Téléphone</Label>
                      <Input
                        className="border-slate-300 focus:border-blue-500"
                        placeholder="+33 6 XX XX XX XX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Localisation</Label>
                      <Input
                        className="border-slate-300 focus:border-blue-500"
                        placeholder="Ville, Pays"
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6">
                    Enregistrer les modifications
                  </Button>
                </CardContent>
              </Card>

              {/* CV Section */}
              <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="border-b border-slate-200 bg-slate-50">
                  <CardTitle className="text-slate-900">Curriculum Vitae</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center transition-colors bg-slate-50 hover:bg-blue-50 cursor-pointer"
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-700 font-medium mb-2">Déposer votre CV ici</p>
                    <p className="text-sm text-slate-500 mb-4">ou</p>
                    <label className="inline-block">
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-medium">
                        Sélectionner un fichier
                      </span>
                      <input type="file" className="hidden" />
                    </label>

                    {file && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-medium">✓ Fichier chargé</p>
                        <p className="text-sm text-green-700">{file.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Conseil:</strong> Utilisez un format PDF pour une meilleure
                      compatibilité.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CANDIDATURES TAB */}
          <TabsContent value="applications">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50">
                <CardTitle className="text-slate-900">Mes Candidatures Envoyées</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border border-slate-200 rounded-lg p-5 flex justify-between items-center hover:shadow-md transition-shadow"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{app.position}</p>
                        <p className="text-sm text-slate-600">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${app.statusColor}`}>
                          {app.status}
                        </span>
                        <p className="text-sm text-slate-500">{app.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MESSAGES TAB */}
          <TabsContent value="messages">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50">
                <CardTitle className="text-slate-900">Messages des Recruteurs</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col h-96 bg-slate-50 rounded-lg p-4 mb-4">
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'Vous' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-3 rounded-lg ${
                            msg.sender === 'Vous'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white border border-slate-200 text-slate-900 rounded-bl-none'
                          }`}
                        >
                          {msg.sender !== 'Vous' && (
                            <p className="text-xs font-semibold mb-1 text-slate-600">
                              {msg.sender}
                            </p>
                          )}
                          <p className="text-sm">{msg.content}</p>
                          <div className="flex items-center justify-between mt-2 gap-2">
                            <p className="text-xs opacity-75">{msg.timestamp}</p>
                            {msg.sender === 'Vous' && (
                              <span title={msg.read ? 'Lu' : 'Non lu'}>
                                {msg.read ? (
                                  <CheckCheck className="w-4 h-4" />
                                ) : (
                                  <Check className="w-4 h-4" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Écrire votre réponse..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        handleSendMessage();
                      }
                    }}
                    className="border-slate-300 focus:border-blue-500 resize-none"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSendMessage}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Envoyer le message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
