import React from 'react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img
                src="/lovable-uploads/97df0f49-9381-4123-b527-f4fa3f43c655.png"
                alt="McK Africa"
                className="h-10 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Le cabinet de conseil en recrutement de référence en Afrique.
              Nous connectons les talents exceptionnels aux opportunités transformatrices.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-mck-green-500 text-mck-green-500 hover:bg-mck-green-500 hover:text-gray-900">
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="border-mck-green-500 text-mck-green-500 hover:bg-mck-green-500 hover:text-gray-900">
                Twitter
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-mck-green-500">Nos Services</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Chasse de Tête Executive</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conseil en Stratégie RH</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Évaluation de Talents</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recrutement Sectoriel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Formation & Développement</a></li>
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
            <h4 className="text-lg font-semibold mb-4 text-mck-green-500">Ressources</h4>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li><a href="#" className="hover:text-white transition-colors">Guide du Candidat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Études de Marché</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog & Insights</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières chez McK</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Centre d'Aide</a></li>
            </ul>

            <div className="space-y-2 text-sm text-gray-400">
              <p>📧 contact@mckafrica.com</p>
              <p>📞 +234 1 234 5678</p>
            </div>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} McK Africa. Tous droits réservés.
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
        <div className="mt-8 p-6 bg-gray-800 rounded-lg text-center">
          <p className="text-gray-300 text-sm">
            🌍 <strong>Engagement RSE :</strong> McK Africa s'engage pour la diversité, l'inclusion et le développement durable en Afrique.
            <br />
            Nous soutenons les initiatives locales et promouvons l'égalité des chances dans nos processus de recrutement.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
