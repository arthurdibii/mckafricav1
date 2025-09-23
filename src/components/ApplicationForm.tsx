
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface ApplicationFormProps {
  jobData: {
    title: string;
    company: string;
    location: string;
  };
  onBack: () => void;
}

const ApplicationForm = ({ jobData, onBack }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
    currentSalary: '',
    expectedSalary: '',
    availability: '',
    cv: null as File | null,
    coverLetter: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous intégreriez avec votre backend
    console.log('Candidature soumise:', formData);
    alert('Votre candidature a été envoyée avec succès !');
  };

  const handleFileChange = (field: 'cv' | 'coverLetter') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4 text-mck-blue-600 hover:text-mck-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'offre
            </Button>
            
            <h1 className="text-3xl font-bold text-black mb-2">
              Postuler pour : {jobData.title}
            </h1>
            <p className="text-lg text-black">
              {jobData.company} • {jobData.location}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulaire principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informations personnelles */}
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email professionnel *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+225 XX XX XX XX"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expérience professionnelle */}
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle>Expérience professionnelle</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="experience">Années d'expérience *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner votre expérience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 ans</SelectItem>
                          <SelectItem value="3-5">3-5 ans</SelectItem>
                          <SelectItem value="6-10">6-10 ans</SelectItem>
                          <SelectItem value="10+">Plus de 10 ans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentSalary">Salaire actuel (FCFA)</Label>
                        <Input
                          id="currentSalary"
                          value={formData.currentSalary}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentSalary: e.target.value }))}
                          placeholder="Ex: 2,000,000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expectedSalary">Prétentions salariales (FCFA)</Label>
                        <Input
                          id="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={(e) => setFormData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                          placeholder="Ex: 2,500,000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="availability">Disponibilité *</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Quand pouvez-vous commencer ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immédiatement</SelectItem>
                          <SelectItem value="1month">Dans 1 mois</SelectItem>
                          <SelectItem value="2months">Dans 2 mois</SelectItem>
                          <SelectItem value="3months">Dans 3 mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Lettre de motivation */}
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle>Lettre de motivation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="motivation">Pourquoi ce poste vous intéresse-t-il ? *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                      placeholder="Décrivez vos motivations et ce que vous pourriez apporter à l'entreprise..."
                      className="min-h-32"
                      required
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Documents */}
              <div className="space-y-6">
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle>Documents requis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cv">CV (PDF, DOC) *</Label>
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-800" />
                            <p className="text-sm text-black text-center">
                              {formData.cv ? formData.cv.name : "Cliquez pour télécharger votre CV"}
                            </p>
                          </div>
                          <input
                            id="cv"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange('cv')}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="coverLetter">Lettre de motivation (PDF, DOC)</Label>
                      <div className="mt-2">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-800" />
                            <p className="text-sm text-black text-center">
                              {formData.coverLetter ? formData.coverLetter.name : "Optionnel"}
                            </p>
                          </div>
                          <input
                            id="coverLetter"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange('coverLetter')}
                          />
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bouton de soumission */}
                <Card className="shadow-md border-0 bg-mck-blue-50">
                  <CardContent className="p-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-mck-blue-600 hover:bg-mck-blue-700 text-lg py-3"
                    >
                      Envoyer ma candidature
                    </Button>
                    <p className="text-xs text-black mt-3 text-center">
                      En soumettant votre candidature, vous acceptez que vos données soient traitées 
                      dans le cadre du processus de recrutement.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationForm;
