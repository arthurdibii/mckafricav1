import React from 'react';
import Navigation from '@/components/Navigation';
import ZustandDemo from '@/components/ZustandDemo';

const ZustandTest = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Test des Stores Zustand
            </h1>
            <p className="text-lg text-gray-600">
              Page de démonstration pour tester l'implémentation de Zustand
            </p>
          </div>
          <ZustandDemo />
        </div>
      </div>
    </div>
  );
};

export default ZustandTest;