"use client";
import { Input } from "@/components/ui/input";
import { BadgeAlert, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  const asa = [
    {
      titre: "Développeur Frontend",
      entreprise: "TechCorp",
      localisation: "Antananarivo, Madagascar",
      typeContrat: "CDI",
      salaire: "2 000 000 MGA",
      description:
        "Nous recherchons un développeur frontend passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants et aurez l'opportunité de faire évoluer votre carrière dans un environnement stimulant.",
      competences: ["React", "Next.js", "TypeScript", "CSS"],
      datePublication: "2024-06-01",
      datefin: "2024-07-01",
      urgent: true,
    },
    {
      titre: "Chef de Projet IT",
      entreprise: "InnovaTech",
      localisation: "Antananarivo, Madagascar",
      typeContrat: "CDD",
      salaire: "3 500 000 MGA",
      description:
        "InnovaTech recherche un chef de projet IT expérimenté pour diriger nos initiatives technologiques. Vous serez responsable de la planification, de l'exécution et de la livraison de projets IT complexes.",
      competences: ["Gestion de projet", "Agile", "Scrum", "Communication"],
      datePublication: "2024-06-05",
      datefin: "2024-07-01",

      urgent: true,
    },
    {
      titre: "Data Scientist",
      entreprise: "DataSolutions",
      localisation: "Antananarivo, Madagascar",
      typeContrat: "Freelance",
      salaire: "4 000 000 MGA",
      description:
        "DataSolutions recherche un data scientist freelance pour analyser et interpréter des données complexes. Vous travaillerez sur des projets variés et aurez l'opportunité de collaborer avec une équipe de professionnels passionnés.",
      competences: ["Python", "Machine Learning", "Data Analysis", "SQL"],
      datePublication: "2024-06-10",
      datefin: "2024-07-01",
      urgent: false,
    },
    {
      titre: "Stagiaire en Marketing Digital",
      entreprise: "MarketPro",
      localisation: "Antananarivo, Madagascar",
      typeContrat: "Stage",
      salaire: "500 000 MGA",
      description:
        "MarketPro offre une opportunité de stage en marketing digital pour les étudiants passionnés par le marketing en ligne. Vous apprendrez les bases du marketing digital et participerez à des projets réels.",
      competences: [
        "SEO",
        "Content Marketing",
        "Social Media",
        "Google Analytics",
      ],
      datePublication: "2024-06-15",
      datefin: "2024-07-01",
      urgent: true,
    },
    {
      titre: "Développeur Mobile Urgent",
      entreprise: "MobileTech",
      localisation: "Antananarivo, Madagascar",
      typeContrat: "CDI",
      salaire: "3 000 000 MGA",
      description:
        "MobileTech recherche un développeur mobile urgent pour renforcer notre équipe de développement. Vous travaillerez sur des applications mobiles innovantes et aurez l'opportunité de faire  évoluer votre carrière dans un environnement dynamique.",
      competences: [
        "React Native",
        "Flutter",
        "iOS Development",
        "Android Development",
      ],
      datePublication: "2024-06-20",
      datefin: "2024-07-01",
      urgent: false,
    },
  ];
const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // Filtrage des offres selon la recherche et la catégorie
  const filteredAsa = asa.filter((offre) => {
    const matchesSearch =
      offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offre.competences.some((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "Tous"
        ? true
        : selectedCategory === "Urgent"
        ? offre.urgent
        : offre.typeContrat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 container mx-auto ">
      <header className="py-12 px-4 bg-violet-100 rounded-2xl" >
        <div className="mx-auto ">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
              Bienvenue sur M-Easa
            </h1>
            <p className="text-muted-foreground text-lg">
              Donnez un coup d'accélérateur à votre carrière à Madagascar.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <Search size={20} className="text-muted-foreground" />
              <Input
                placeholder="Rechercher ..."
                className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Category Filter */}
        <div className="px-4 my-6"> 
          <h2 className="text-sm font-semibold text-foreground mb-4 ">
            Catégories
          </h2>
          <Tabs
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val)}
          >
            <TabsList>
              <TabsTrigger value="Tous">Tous</TabsTrigger>
              <TabsTrigger value="CDI">CDI</TabsTrigger>
              <TabsTrigger value="CDD">CDD</TabsTrigger>
              <TabsTrigger value="Freelance">Freelance</TabsTrigger>
              <TabsTrigger value="Stage">Stage</TabsTrigger>
              <TabsTrigger value="Urgent">Urgent</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Offres filtrées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
            {filteredAsa.map((offre, index) => (
              <Card
                key={index}
                className="p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex justify-between ">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {offre.titre}{" "}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {offre.entreprise} - {offre.localisation}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {offre.typeContrat} - {offre.salaire}
                    </p>
                    {offre.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div>
                    <img
                      src={`https://picsum.photos/seed/${Math.random()}/400/300`}
                      alt="a"
                      className="w-24 h-24 rounded-full shadow-md object-cover"
                    />
                    
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {offre.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {offre.competences.map((competence, idx) => (
                      <Badge
                        key={idx}
                        className="text-xs bg-violet-100 text-violet-800 px-2 py-1 rounded-full"
                      >
                        {competence}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between border-none">
                  <p className="text-xs text-muted-foreground">
                    Publié le{" "}
                    {new Date(offre.datePublication).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Date de fin:{" "}
                    {new Date(offre.datefin).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}