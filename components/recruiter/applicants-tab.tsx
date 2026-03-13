'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageSquare, Mail, Calendar, FileText } from 'lucide-react';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Applicant {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  offerId: number;
  offerTitle: string;
  dateApplication: string;
  status: 'new' | 'reviewed' | 'rejected' | 'hired';
  message: string;
  cv: string;
}

export default function ApplicantsTab() {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      telephone: '+261 34 12 345 678',
      offerId: 1,
      offerTitle: 'Développeur Frontend Senior',
      dateApplication: '2024-06-15',
      status: 'new',
      message: 'Je suis très intéressé par ce poste et je pense que je suis une bonne correspondance pour votre équipe.',
      cv: '/cv-jean-dupont.pdf',
    },
    {
      id: 2,
      nom: 'Marie Laurent',
      email: 'marie.laurent@email.com',
      telephone: '+261 34 98 765 432',
      offerId: 2,
      offerTitle: 'Chef de Projet IT',
      dateApplication: '2024-06-16',
      status: 'reviewed',
      message: 'Ayant 5 ans d\'expérience en gestion de projet, je suis convaincue de pouvoir apporter une valeur ajoutée.',
      cv: '/cv-marie-laurent.pdf',
    },
    {
      id: 3,
      nom: 'Pierre Martin',
      email: 'pierre.martin@email.com',
      telephone: '+261 34 55 667 788',
      offerId: 1,
      offerTitle: 'Développeur Frontend Senior',
      dateApplication: '2024-06-17',
      status: 'new',
      message: 'Passionné par React et Next.js, je serais ravi de rejoindre votre équipe.',
      cv: '/cv-pierre-martin.pdf',
    },
  ]);

  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const statusColors = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    reviewed: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    hired: 'bg-green-50 text-green-700 border-green-200',
  };

  const statusLabels = {
    new: 'Nouveau',
    reviewed: 'Examiné',
    rejected: 'Rejeté',
    hired: 'Embauché',
  };

  const updateApplicantStatus = (applicantId: number, newStatus: 'new' | 'reviewed' | 'rejected' | 'hired') => {
    setApplicants(prev =>
      prev.map(a => a.id === applicantId ? { ...a, status: newStatus } : a)
    );
    if (selectedApplicant?.id === applicantId) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  const sendReply = () => {
    if (!replyMessage.trim()) return;

    // Simulate sending message
    alert('Message envoyé à ' + selectedApplicant?.nom);
    setReplyMessage('');
    setShowReplyForm(false);
  };

  const groupedApplicants = {
    new: applicants.filter(a => a.status === 'new'),
    reviewed: applicants.filter(a => a.status === 'reviewed'),
    rejected: applicants.filter(a => a.status === 'rejected'),
    hired: applicants.filter(a => a.status === 'hired'),
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Applicants List */}
      <div className="lg:col-span-2">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all">
              Tous<span className="text-xs ml-1">({applicants.length})</span>
            </TabsTrigger>
            <TabsTrigger value="new">
              Nouveau<span className="text-xs ml-1">({groupedApplicants.new.length})</span>
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Examiné<span className="text-xs ml-1">({groupedApplicants.reviewed.length})</span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejeté<span className="text-xs ml-1">({groupedApplicants.rejected.length})</span>
            </TabsTrigger>
            <TabsTrigger value="hired">
              Embauché<span className="text-xs ml-1">({groupedApplicants.hired.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-3">
            {applicants.map(applicant => (
              <Card
                key={applicant.id}
                className={`cursor-pointer transition-all ${
                  selectedApplicant?.id === applicant.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedApplicant(applicant)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{applicant.nom}</h4>
                        <Badge
                          className={`text-xs ${statusColors[applicant.status]}`}
                          variant="outline"
                        >
                          {statusLabels[applicant.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{applicant.offerTitle}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {new Date(applicant.dateApplication).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {Object.entries(groupedApplicants).map(([status, applicantList]) => (
            <TabsContent key={status} value={status} className="mt-4 space-y-3">
              {applicantList.map(applicant => (
                <Card
                  key={applicant.id}
                  className={`cursor-pointer transition-all ${
                    selectedApplicant?.id === applicant.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedApplicant(applicant)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{applicant.nom}</h4>
                          <Badge
                            className={`text-xs ${statusColors[applicant.status]}`}
                            variant="outline"
                          >
                            {statusLabels[applicant.status]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{applicant.offerTitle}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(applicant.dateApplication).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Applicant Details */}
      {selectedApplicant ? (
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">{selectedApplicant.nom}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                Statut
              </Label>
              <Select
                value={selectedApplicant.status}
                onValueChange={(value: any) => updateApplicantStatus(selectedApplicant.id, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nouveau</SelectItem>
                  <SelectItem value="reviewed">Examiné</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                  <SelectItem value="hired">Embauché</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Info */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                Email
              </Label>
              <a
                href={`mailto:${selectedApplicant.email}`}
                className="text-sm text-primary hover:underline"
              >
                {selectedApplicant.email}
              </a>
            </div>

            <div>
              <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                Téléphone
              </Label>
              <a
                href={`tel:${selectedApplicant.telephone}`}
                className="text-sm text-primary hover:underline"
              >
                {selectedApplicant.telephone}
              </a>
            </div>

            {/* CV */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                CV
              </Label>
              <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
                <FileText className="w-4 h-4" />
                Télécharger CV
              </Button>
            </div>

            {/* Application Message */}
            <div>
              <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                Message
              </Label>
              <p className="text-sm bg-secondary p-3 rounded-md text-foreground">
                {selectedApplicant.message}
              </p>
            </div>

            {/* Reply Section */}
            <div className="border-t border-border pt-4">
              {!showReplyForm ? (
                <Button
                  onClick={() => setShowReplyForm(true)}
                  className="w-full gap-2"
                  variant="outline"
                >
                  <MessageSquare className="w-4 h-4" />
                  Répondre
                </Button>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    placeholder="Votre message..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="min-h-24"
                  />
                  <div className="flex gap-2">
                    <Button onClick={sendReply} size="sm" className="flex-1">
                      Envoyer
                    </Button>
                    <Button
                      onClick={() => setShowReplyForm(false)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="lg:col-span-1 h-fit border-dashed">
          <CardContent className="pt-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">
              Sélectionnez un candidat pour voir les détails
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
