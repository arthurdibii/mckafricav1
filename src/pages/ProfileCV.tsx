import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Waves from '@/components/Waves';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Linkedin, MapPin, Calendar, Award, Building, GraduationCap } from 'lucide-react';

const ProfileCV = () => {
  const { prenomNom } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer les données du membre passées via la navigation
  const memberData = location.state?.memberData;

  // Données de profil utilisant les données passées ou des données par défaut
  const profileData = memberData ? {
    id: memberData.id,
    name: memberData.name,
    position: memberData.position,
    category: memberData.category,
    image: memberData.image.replace('public/', '/'),
    linkedin: memberData.linkedin,
    currentRole: `${memberData.position} chez mcK Africa, spécialisé dans le conseil stratégique et la transformation organisationnelle des entreprises africaines.`,
    yearsOfExperience: 15,
    location: "Abidjan, Côte d'Ivoire",
    expertises: [
      "Stratégie d'entreprise",
      "Transformation digitale",
      "Management opérationnel",
      "Développement des marchés africains",
      "Leadership et gouvernance"
    ],
    experienceDomains: [
      "Conseil en stratégie",
      "Services financiers",
      "Télécommunications",
      "Secteur public",
      "Industrie manufacturière"
    ],
    education: [
      {
        school: "HEC Paris",
        degree: "MBA Executive",
        year: "2010-2012",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/HEC_Paris_Logo.svg/200px-HEC_Paris_Logo.svg.png"
      },
      {
        school: "École Polytechnique",
        degree: "Ingénieur Généraliste",
        year: "2005-2008",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_EP.svg/200px-Logo_EP.svg.png"
      }
    ],
    experience: [
      {
        company: "McKinsey & Company",
        role: "Senior Partner",
        period: "2015-2020",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/McKinsey_%26_Company_Logo.svg/200px-McKinsey_%26_Company_Logo.svg.png"
      },
      {
        company: "Boston Consulting Group",
        role: "Principal",
        period: "2012-2015",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/BCG_Corporate_Logo.svg/200px-BCG_Corporate_Logo.svg.png"
      },
      {
        company: "Deloitte",
        role: "Senior Manager",
        period: "2008-2012",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/200px-Deloitte.svg.png"
      }
    ],
    biography: `Mohamed KABA est un leader visionnaire dans le domaine du conseil en management avec plus de 15 ans d'expérience internationale. Diplômé de l'École Polytechnique et titulaire d'un MBA Executive d'HEC Paris, il a débuté sa carrière chez Deloitte avant de rejoindre Boston Consulting Group puis McKinsey & Company où il a occupé le poste de Senior Partner.

    Passionné par le développement économique de l'Afrique, Mohamed a fondé mcK Africa en 2020 avec la vision de créer un cabinet de conseil de classe mondiale, entièrement dédié aux défis et opportunités du continent africain. Son expertise couvre la stratégie d'entreprise, la transformation digitale, et le développement des marchés émergents.

    Reconnu pour son approche innovante et sa capacité à allier rigueur analytique et compréhension profonde des contextes locaux, Mohamed accompagne les dirigeants africains dans leurs projets de transformation et de croissance. Il est également un conférencier recherché et contribue régulièrement aux débats sur l'avenir économique de l'Afrique.

    Sous sa direction, mcK Africa est devenu un acteur incontournable du conseil en Afrique de l'Ouest, avec des missions réalisées dans plus de 15 pays et une équipe de consultants de haut niveau issus des meilleures institutions internationales.`
  } : {
    id: 1,
    name: "Mohamed KABA",
    position: "Associé",
    category: "Associé",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/mohamed-kaba",
    currentRole: "Directeur Général et Fondateur de mcK Africa, spécialisé dans le conseil stratégique et la transformation organisationnelle des entreprises africaines.",
    yearsOfExperience: 15,
    location: "Abidjan, Côte d'Ivoire",
    expertises: [
      "Stratégie d'entreprise",
      "Transformation digitale",
      "Management opérationnel",
      "Développement des marchés africains",
      "Leadership et gouvernance"
    ],
    experienceDomains: [
      "Conseil en stratégie",
      "Services financiers",
      "Télécommunications",
      "Secteur public",
      "Industrie manufacturière"
    ],
    education: [
      {
        school: "HEC Paris",
        degree: "MBA Executive",
        year: "2010-2012",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/HEC_Paris_Logo.svg/200px-HEC_Paris_Logo.svg.png"
      },
      {
        school: "École Polytechnique",
        degree: "Ingénieur Généraliste",
        year: "2005-2008",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Logo_EP.svg/200px-Logo_EP.svg.png"
      }
    ],
    experience: [
      {
        company: "McKinsey & Company",
        role: "Senior Partner",
        period: "2015-2020",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/McKinsey_%26_Company_Logo.svg/200px-McKinsey_%26_Company_Logo.svg.png"
      },
      {
        company: "Boston Consulting Group",
        role: "Principal",
        period: "2012-2015",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/BCG_Corporate_Logo.svg/200px-BCG_Corporate_Logo.svg.png"
      },
      {
        company: "Deloitte",
        role: "Senior Manager",
        period: "2008-2012",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/200px-Deloitte.svg.png"
      }
    ],
    biography: `Mohamed KABA est un leader visionnaire dans le domaine du conseil en management avec plus de 15 ans d'expérience internationale. Diplômé de l'École Polytechnique et titulaire d'un MBA Executive d'HEC Paris, il a débuté sa carrière chez Deloitte avant de rejoindre Boston Consulting Group puis McKinsey & Company où il a occupé le poste de Senior Partner.

    Passionné par le développement économique de l'Afrique, Mohamed a fondé mcK Africa en 2020 avec la vision de créer un cabinet de conseil de classe mondiale, entièrement dédié aux défis et opportunités du continent africain. Son expertise couvre la stratégie d'entreprise, la transformation digitale, et le développement des marchés émergents.

    Reconnu pour son approche innovante et sa capacité à allier rigueur analytique et compréhension profonde des contextes locaux, Mohamed accompagne les dirigeants africains dans leurs projets de transformation et de croissance. Il est également un conférencier recherché et contribue régulièrement aux débats sur l'avenir économique de l'Afrique.

    Sous sa direction, mcK Africa est devenu un acteur incontournable du conseil en Afrique de l'Ouest, avec des missions réalisées dans plus de 15 pays et une équipe de consultants de haut niveau issus des meilleures institutions internationales.`
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Navigation />

      {/* Background Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Waves
          lineColor="#1017E0"
          backgroundColor="rgba(0, 0, 0, 0)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-4 md:px-8 lg:px-40 ">
          {/* Header avec bouton retour */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => navigate('/apropos', {
                state: {
                  activeTab: 'equipe',
                  filters: location.state?.filters,
                  scrollToMember: location.state?.memberName
                }
              })}
              className="mb-4 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'équipe
            </Button>
          </div>

          {/* Layout en 3 sections */}
          <div className="space-y-8">
            {/* 1. Section Présentation */}
            <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  {/* Photo et infos de base */}
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <img
                        src={profileData.image}
                        alt={profileData.name}
                        className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2">
                        <Badge className="bg-[#0066CC] text-white px-3 py-1">
                          {profileData.category}
                        </Badge>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                    <div className="flex items-center justify-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profileData.location}
                    </div>
                    <div className="flex items-center justify-center text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      {profileData.yearsOfExperience} ans d'expérience
                    </div>
                    <Button
                      className="bg-[#0066CC] hover:bg-[#0052A3] text-white"
                      onClick={() => window.open(profileData.linkedin, '_blank')}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>

                  {/* Poste actuel et expertises */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Poste Actuel</h2>
                      <p className="text-gray-700 leading-relaxed">{profileData.currentRole}</p>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Expertises</h2>
                      <div className="flex flex-wrap gap-2">
                        {profileData.expertises.map((expertise, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {expertise}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">Domaines d'Expérience</h2>
                      <div className="flex flex-wrap gap-2">
                        {profileData.experienceDomains.map((domain, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2 & 3. Sections côte à côte */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* 2. Expérience et Expertise (50%) */}
              <div className="space-y-6">
                {/* Études et formations */}
                <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <GraduationCap className="w-6 h-6 mr-2 text-[#0066CC]" />
                      Études et Formations
                    </h2>
                    <div className="space-y-4">
                      {profileData.education.map((edu, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
                            <img
                              src={edu.logo}
                              alt={edu.school}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/48x48?text=" + edu.school.charAt(0);
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.school}</p>
                            <p className="text-sm text-gray-500">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Expériences Professionnelles */}
                <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Building className="w-6 h-6 mr-2 text-[#0066CC]" />
                      Expériences Professionnelles
                    </h2>
                    <div className="space-y-4">
                      {profileData.experience.map((exp, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/48x48?text=" + exp.company.charAt(0);
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-sm text-gray-500">{exp.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 3. Biographie (50%) */}
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-[#0066CC]" />
                    Biographie
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {profileData.biography.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileCV;