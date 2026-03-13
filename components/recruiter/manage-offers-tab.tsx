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
import { Edit2, Trash2, Clock, Users } from 'lucide-react';
import { FieldGroup, FieldLabel } from '@/components/ui/field';

interface JobOffer {
  id: number;
  titre: string;
  localisation: string;
  typeContrat: string;
  salaire: string;
  description: string;
  competences: string[];
  datePublication: string;
  datefin: string;
  urgent: boolean;
  candidats: number;
}

export default function ManageOffersTab() {
  const [offers, setOffers] = useState<JobOffer[]>([
    {
      id: 1,
      titre: 'Développeur Frontend Senior',
      localisation: 'Antananarivo, Madagascar',
      typeContrat: 'CDI',
      salaire: '2 500 000 MGA',
      description: 'Nous recherchons un développeur frontend expérimenté...',
      competences: ['React', 'Next.js', 'TypeScript'],
      datePublication: '2024-06-01',
      datefin: '2024-07-15',
      urgent: true,
      candidats: 12,
    },
    {
      id: 2,
      titre: 'Chef de Projet IT',
      localisation: 'Antananarivo, Madagascar',
      typeContrat: 'CDD',
      salaire: '3 500 000 MGA',
      description: 'InnovaTech recherche un chef de projet IT expérimenté...',
      competences: ['Gestion de projet', 'Agile', 'Scrum'],
      datePublication: '2024-06-05',
      datefin: '2024-07-01',
      urgent: true,
      candidats: 8,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<JobOffer | null>(null);

  const isExpired = (datefin: string) => {
    return new Date(datefin) < new Date();
  };

  const daysLeft = (datefin: string) => {
    const today = new Date();
    const endDate = new Date(datefin);
    const diff = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const startEdit = (offer: JobOffer) => {
    setEditingId(offer.id);
    setEditData({ ...offer });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const saveEdit = () => {
    if (editData) {
      setOffers(prev => prev.map(o => o.id === editData.id ? editData : o));
      setEditingId(null);
      setEditData(null);
    }
  };

  const deleteOffer = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre?')) {
      setOffers(prev => prev.filter(o => o.id !== id));
    }
  };

  const activeOffers = offers.filter(o => !isExpired(o.datefin));

  return (
    <div className="space-y-6">
      {activeOffers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-muted-foreground mb-4">Aucune offre d'emploi active</p>
            <Button variant="outline">Publier une offre</Button>
          </CardContent>
        </Card>
      ) : (
        activeOffers.map(offer => (
          <Card key={offer.id} className={editingId === offer.id ? 'border-primary' : ''}>
            {editingId === offer.id && editData ? (
              // Edit Mode
              <CardContent className="pt-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FieldGroup>
                    <FieldLabel>Titre</FieldLabel>
                    <Input
                      value={editData.titre}
                      onChange={(e) => setEditData({ ...editData, titre: e.target.value })}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <FieldLabel>Type de Contrat</FieldLabel>
                    <Select value={editData.typeContrat} onValueChange={(value) => setEditData({ ...editData, typeContrat: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CDI">CDI</SelectItem>
                        <SelectItem value="CDD">CDD</SelectItem>
                        <SelectItem value="Stage">Stage</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldGroup>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FieldGroup>
                    <FieldLabel>Localisation</FieldLabel>
                    <Input
                      value={editData.localisation}
                      onChange={(e) => setEditData({ ...editData, localisation: e.target.value })}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <FieldLabel>Salaire</FieldLabel>
                    <Input
                      value={editData.salaire}
                      onChange={(e) => setEditData({ ...editData, salaire: e.target.value })}
                    />
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="min-h-24"
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel>Date de Fin</FieldLabel>
                  <Input
                    type="date"
                    value={editData.datefin}
                    onChange={(e) => setEditData({ ...editData, datefin: e.target.value })}
                  />
                </FieldGroup>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button onClick={saveEdit} className="gap-2">
                    Enregistrer
                  </Button>
                  <Button onClick={cancelEdit} variant="outline">
                    Annuler
                  </Button>
                </div>
              </CardContent>
            ) : (
              // View Mode
              <>
                <CardHeader>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {offer.urgent && <Badge variant="destructive">Urgent</Badge>}
                        <Badge variant="outline">{offer.typeContrat}</Badge>
                      </div>
                      <h3 className="text-2xl font-bold">{offer.titre}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{offer.localisation}</p>
                    </div>
                    <div className="flex gap-2">
                      {!isExpired(offer.datefin) && (
                        <Button
                          onClick={() => startEdit(offer)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Modifier
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteOffer(offer.id)}
                        variant="outline"
                        size="sm"
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Jours restants</p>
                        <p className="font-semibold text-lg">{daysLeft(offer.datefin)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Candidatures</p>
                        <p className="font-semibold text-lg">{offer.candidats}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Salaire</p>
                      <p className="font-semibold">{offer.salaire}</p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Date fin</p>
                      <p className="font-semibold">{new Date(offer.datefin).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-foreground mb-2">{offer.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {offer.competences.map(comp => (
                      <Badge key={comp} variant="secondary">{comp}</Badge>
                    ))}
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
