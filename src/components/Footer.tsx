import React from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mck-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="/logo-light.webp"
                alt="mcK Africa"
                className="h-10 w-auto filter brightness-0 invert"
              />
            </div>

            <p className="text-gray-300 mb-2 leading-relaxed">
              Cabinet spécialisé en Management Stratégique et Opérationnel
            </p>
            <div className="mt-2 space-y-2 text-sm text-gray-300 mb-4">
              <p>info@mckafrica.com</p>
              <p>+225 27 22 20 45 07</p>
              <p>+225 07 07 20 17 65</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-mck-green-500 bg-white text-mck-blue-600 hover:bg-mck-green-500 hover:text-gray-900">
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="border-mck-green-500 bg-white text-mck-blue-600 hover:bg-mck-green-500 hover:text-gray-900">
                Twitter
              </Button>
            </div>

          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-mck-green-500">Expertises</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Human Capital</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Stratégie, Performance & Transformation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technologie & Innovation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Employabilité des Jeunes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sourcing & Intérim</a></li>
            </ul>
          </div>

          {/* Secteurs */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-mck-green-500">Secteurs d'Expertise</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Finance & Banque</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technologie & Digital</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Énergie & Infrastructure</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conseil & Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Industrie & Manufacturing</a></li>
            </ul>
          </div>

          {/* Contact & Ressources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-mck-green-500">Raccourcis</h4>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li><a href="#" className="hover:text-white transition-colors">Guide du Candidat</a></li>
              <li><a href="/insights" className="hover:text-white transition-colors">Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recrutements Exécutifs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Centre d'Aide</a></li>
            </ul>

          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} mcK Africa. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions d'Utilisation</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            </div>
          </div>
        </div>

        {/* Engagement responsabilité sociale */}
        <div className="mt-8 p-6 bg-white rounded-lg text-center">
          <p className="text-mck-blue-600 text-sm">
            🌍 <strong>Engagement RSE :</strong> mcK Africa s'engage pour la diversité, l'inclusion et le développement durable en Afrique.
            <br />
            Nous soutenons les initiatives locales et promouvons l'égalité des chances dans nos processus de recrutement.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
