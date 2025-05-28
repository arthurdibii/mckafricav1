import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    // Ici on intégrerait l'envoi du formulaire
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contactez <span className="text-mck-blue-600">McK Africa</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prêt à transformer votre stratégie RH ? Nos experts sont là pour vous accompagner. 
            Parlons de vos défis et trouvons ensemble les solutions adaptées.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-mck-blue-600">Nos Bureaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🇳🇬 Siège Social - Lagos</h4>
                  <p className="text-gray-600 text-sm">
                    Victoria Island Business District<br />
                    1004 Lagos, Nigeria<br />
                    +234 1 234 5678
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🇿🇦 Bureau du Cap</h4>
                  <p className="text-gray-600 text-sm">
                    Waterfront District<br />
                    8001 Le Cap, Afrique du Sud<br />
                    +27 21 123 4567
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🇲🇦 Bureau de Casablanca</h4>
                  <p className="text-gray-600 text-sm">
                    Quartier des Affaires<br />
                    20000 Casablanca, Maroc<br />
                    +212 5 22 12 34 56
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-mck-blue-600">Suivez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="border-mck-blue-600 text-mck-blue-600">
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="border-mck-blue-600 text-mck-blue-600">
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Envoyez-nous un message</CardTitle>
                <p className="text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24h.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <Input
                        required
                        value={formData.nom}
                        onChange={(e) => handleChange('nom', e.target.value)}
                        placeholder="Votre nom et prénom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise *
                      </label>
                      <Input
                        required
                        value={formData.entreprise}
                        onChange={(e) => handleChange('entreprise', e.target.value)}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email professionnel *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="votre.email@entreprise.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input
                        value={formData.telephone}
                        onChange={(e) => handleChange('telephone', e.target.value)}
                        placeholder="+XXX XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet de votre demande *
                    </label>
                    <Select value={formData.sujet} onValueChange={(value) => handleChange('sujet', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le sujet de votre demande" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recrutement">Besoin en recrutement</SelectItem>
                        <SelectItem value="conseil">Conseil en stratégie RH</SelectItem>
                        <SelectItem value="assessment">Évaluation de talents</SelectItem>
                        <SelectItem value="partenariat">Opportunité de partenariat</SelectItem>
                        <SelectItem value="autre">Autre demande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Décrivez-nous votre besoin, vos défis RH ou toute question que vous souhaitez nous poser..."
                      className="resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg"
                      className="bg-mck-blue-600 hover:bg-mck-blue-700 px-8"
                    >
                      Envoyer le message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to action urgent */}
        <div className="mt-16 bg-mck-blue-600 text-white p-12 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Besoin urgent d'un recrutement ?</h3>
          <p className="text-mck-blue-100 mb-8 max-w-2xl mx-auto">
            Pour les demandes urgentes, contactez directement notre équipe. 
            Nous nous engageons à vous répondre sous 2h en jours ouvrés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-mck-blue-600 hover:bg-gray-100">
              📞 Appel d'urgence
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-mck-blue-600">
              📧 Email prioritaire
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
