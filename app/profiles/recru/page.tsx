'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, Mail, Phone, MapPin, Building2, Key, Trash2, Edit2, MessageSquare, Clock, DollarSign, Briefcase } from 'lucide-react';
import CompanyProfileTab from '@/components/recruiter/company-profile-tab';
import PublishOfferTab from '@/components/recruiter/publish-offer-tab';
import ManageOffersTab from '@/components/recruiter/manage-offers-tab';
import ApplicantsTab from '@/components/recruiter/applicants-tab';

export default function RecruiterProfilePage() {
  const [currentTab, setCurrentTab] = useState('company');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de Bord Recruteur</h1>
          <p className="text-muted-foreground">Gérez votre profil entreprise et vos offres d'emploi</p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="publish" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Publier</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Gérer</span>
            </TabsTrigger>
            <TabsTrigger value="applicants" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Candidats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="mt-6">
            <CompanyProfileTab />
          </TabsContent>

          <TabsContent value="publish" className="mt-6">
            <PublishOfferTab />
          </TabsContent>

          <TabsContent value="manage" className="mt-6">
            <ManageOffersTab />
          </TabsContent>

          <TabsContent value="applicants" className="mt-6">
            <ApplicantsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
