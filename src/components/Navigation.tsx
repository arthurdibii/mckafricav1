
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items - structure principale du menu
  const navItems = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'À Propos', href: '#apropos' },
    { name: 'Services', href: '#services' },
    { name: 'Offres d\'Emploi', href: '#emplois' },
    { name: 'Insights', href: '#insights' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo McK Africa */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-mck-blue-700">
              McK <span className="text-mck-gold-500">Africa</span>
            </h1>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-mck-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:border-b-2 hover:border-mck-gold-400"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Bouton CTA Desktop */}
          <div className="hidden md:block">
            <Button className="bg-mck-blue-600 hover:bg-mck-blue-700 text-white">
              Nous Contacter
            </Button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-gray-700 hover:text-mck-blue-600 transition-colors duration-200 py-2"
                    >
                      {item.name}
                    </a>
                  ))}
                  <Button className="bg-mck-blue-600 hover:bg-mck-blue-700 text-white mt-4">
                    Nous Contacter
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
