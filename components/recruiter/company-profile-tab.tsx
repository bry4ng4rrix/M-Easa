'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Save } from 'lucide-react';
import { FieldGroup, FieldLabel } from '@/components/ui/field';

export default function CompanyProfileTab() {
  const [companyData, setCompanyData] = useState({
    name: 'InnovaTech Sarl',
    address: '123 Rue de la Technologie',
    city: 'Antananarivo',
    postalCode: '101',
    email: 'contact@innovatech.com',
    phone: '+261 34 12 345 678',
    password: '',
    confirmPassword: '',
    logo: '/placeholder-logo.png',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompanyData(prev => ({
          ...prev,
          logo: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaveMessage('Profil mis à jour avec succès!');
    setIsEditing(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Logo Section */}
      <Card>
        <CardHeader>
          <CardTitle>Logo de l'Entreprise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-secondary rounded-lg flex items-center justify-center border-2 border-border">
                <img
                  src={companyData.logo}
                  alt="Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Button variant="outline" className="gap-2" asChild>
                  <span>
                    <Upload className="w-4 h-4" />
                    Télécharger un nouveau logo
                  </span>
                </Button>
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Taille recommandée: 400x400px. Formats acceptés: PNG, JPG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Informations de l'Entreprise</CardTitle>
          <Button
            variant={isEditing ? 'default' : 'outline'}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Enregistrer' : 'Modifier'}
          </Button>
        </CardHeader>
        <CardContent>
          {saveMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
              {saveMessage}
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Nom */}
            <FieldGroup>
              <FieldLabel htmlFor="name">Nom de l'Entreprise</FieldLabel>
              <Input
                id="name"
                value={companyData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
              />
            </FieldGroup>

            {/* Email */}
            <FieldGroup>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={companyData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
            </FieldGroup>

            {/* Adresse */}
            <FieldGroup>
              <FieldLabel htmlFor="address">Adresse</FieldLabel>
              <Input
                id="address"
                value={companyData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
              />
            </FieldGroup>

            {/* Téléphone */}
            <FieldGroup>
              <FieldLabel htmlFor="phone">Téléphone</FieldLabel>
              <Input
                id="phone"
                value={companyData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
            </FieldGroup>

            {/* Ville */}
            <FieldGroup>
              <FieldLabel htmlFor="city">Ville</FieldLabel>
              <Input
                id="city"
                value={companyData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                disabled={!isEditing}
              />
            </FieldGroup>

            {/* Code Postal */}
            <FieldGroup>
              <FieldLabel htmlFor="postal">Code Postal</FieldLabel>
              <Input
                id="postal"
                value={companyData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                disabled={!isEditing}
              />
            </FieldGroup>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup>
                <FieldLabel htmlFor="password">Nouveau Mot de Passe</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Laissez vide si inchangé"
                  value={companyData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel htmlFor="confirm-password">Confirmer le Mot de Passe</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  value={companyData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </FieldGroup>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
