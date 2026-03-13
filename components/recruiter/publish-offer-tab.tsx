'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { FieldGroup, FieldLabel } from '@/components/ui/field';

export default function PublishOfferTab() {
  const [formData, setFormData] = useState({
    titre: '',
    localisation: '',
    typeContrat: 'CDI',
    salaire: '',
    description: '',
    datePublication: new Date().toISOString().split('T')[0],
    datefin: '',
    urgent: false,
    competences: [] as string[],
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.competences.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        competences: [...prev.competences, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      competences: prev.competences.filter(s => s !== skill)
    }));
  };

  const handlePublish = () => {
    if (!formData.titre || !formData.localisation || !formData.salaire || !formData.datefin) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    setSuccessMessage('Offre d\'emploi publiée avec succès!');
    setTimeout(() => {
      setSuccessMessage('');
      setFormData({
        titre: '',
        localisation: '',
        typeContrat: 'CDI',
        salaire: '',
        description: '',
        datePublication: new Date().toISOString().split('T')[0],
        datefin: '',
        urgent: false,
        competences: [],
      });
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publier une Nouvelle Offre d'Emploi</CardTitle>
      </CardHeader>
      <CardContent>
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Row 1: Titre et Type de Contrat */}
          <div className="grid gap-6 md:grid-cols-2">
            <FieldGroup>
              <FieldLabel htmlFor="titre">Titre du Poste *</FieldLabel>
              <Input
                id="titre"
                placeholder="Ex: Développeur Frontend Senior"
                value={formData.titre}
                onChange={(e) => handleInputChange('titre', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="type">Type de Contrat *</FieldLabel>
              <Select value={formData.typeContrat} onValueChange={(value) => handleInputChange('typeContrat', value)}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CDI">CDI (Contrat Indéterminé)</SelectItem>
                  <SelectItem value="CDD">CDD (Contrat Déterminé)</SelectItem>
                  <SelectItem value="Stage">Stage</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Alternance">Alternance</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>
          </div>

          {/* Row 2: Localisation et Salaire */}
          <div className="grid gap-6 md:grid-cols-2">
            <FieldGroup>
              <FieldLabel htmlFor="localisation">Localisation *</FieldLabel>
              <Input
                id="localisation"
                placeholder="Ex: Antananarivo, Madagascar"
                value={formData.localisation}
                onChange={(e) => handleInputChange('localisation', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="salaire">Salaire *</FieldLabel>
              <Input
                id="salaire"
                placeholder="Ex: 2 500 000 MGA"
                value={formData.salaire}
                onChange={(e) => handleInputChange('salaire', e.target.value)}
              />
            </FieldGroup>
          </div>

          {/* Row 3: Dates */}
          <div className="grid gap-6 md:grid-cols-2">
            <FieldGroup>
              <FieldLabel htmlFor="datePublication">Date de Publication</FieldLabel>
              <Input
                id="datePublication"
                type="date"
                value={formData.datePublication}
                disabled
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="datefin">Date de Fin de Publication *</FieldLabel>
              <Input
                id="datefin"
                type="date"
                value={formData.datefin}
                onChange={(e) => handleInputChange('datefin', e.target.value)}
              />
            </FieldGroup>
          </div>

          {/* Description */}
          <FieldGroup>
            <FieldLabel htmlFor="description">Description du Poste</FieldLabel>
            <Textarea
              id="description"
              placeholder="Décrivez le poste, les responsabilités et les attentes..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-32"
            />
          </FieldGroup>

          {/* Competences */}
          <FieldGroup>
            <FieldLabel htmlFor="skills">Compétences Requises</FieldLabel>
            <div className="flex gap-2 mb-3">
              <Input
                id="skills"
                placeholder="Ajoutez une compétence"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addSkill();
                  }
                }}
              />
              <Button onClick={addSkill} variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Ajouter
              </Button>
            </div>
            {formData.competences.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.competences.map(skill => (
                  <Badge key={skill} variant="secondary" className="gap-2">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </FieldGroup>

          {/* Urgent Checkbox */}
          <div className="flex items-center gap-3">
            <input
              id="urgent"
              type="checkbox"
              checked={formData.urgent}
              onChange={(e) => handleInputChange('urgent', e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <Label htmlFor="urgent" className="font-normal cursor-pointer">
              Marquer comme urgent
            </Label>
          </div>

          {/* Publish Button */}
          <div className="pt-4 border-t border-border">
            <Button onClick={handlePublish} className="w-full md:w-auto">
              Publier l'Offre
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
