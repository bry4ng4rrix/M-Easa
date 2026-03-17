"use client";
import { Input } from "@/components/ui/input";
import { Navigation, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Card,CardHeader,CardContent,CardFooter,} from "@/components/ui/card";
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const jobListings = [
    {
      id: 1,
      titre: "Développeur Frontend",
      entreprise: "TechCorp",
      localisation: "Antananarivo, Madagascar",
      typeContrat: "CDI",
      salaire: "2 000 000 MGA",
      description:
        "Nous recherchons un développeur frontend passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants et aurez l'opportunité de faire évoluer votre carrière dans un environnement stimulant.",
      competences: ["React", "Next.js", "TypeScript", "CSS"],
      profile: "bachelor en informatique ",
      datePublication: "2024-06-01",
      datefin: "2024-07-01",
      urgent: true,
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
      titre: "Développeur Mobile Urgent",
      entreprise: "MobileTech",
      localisation: "Antananarivo, Madagascar",
      typeContrat: "CDI",
      salaire: "3 000 000 MGA",
      description:
        "MobileTech recherche un développeur mobile urgent pour renforcer notre équipe de développement. Vous travaillerez sur des applications mobiles innovantes et aurez l'opportunité de faire évoluer votre carrière dans un environnement dynamique.",
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
  const Profile = {
    Nom: "andrana",
    Prenom: "Faharoa",
    Email: "bryanmfb4@gmail.com",
    tel: "+261383572066",
    CV: "",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showPostulationModal, setShowPostulationModal] = useState(false);
  const [selectedJobForPostulation, setSelectedJobForPostulation] =
    useState<any>(null);

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.competences.some((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "Tous"
        ? true
        : selectedCategory === "Urgent"
          ? job.urgent
          : job.typeContrat === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen  w-full">
      <div className="container mx-auto px-4 py-12 absolute top-10 left-0 right-0">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-3 text-balance">
            Bienvenue sur M-Easa
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Donnez un coup d'accélérateur à votre carrière à Madagascar.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <Search
                size={20}
                className="text-muted-foreground flex-shrink-0"
              />
              <Input
                placeholder="Rechercher par poste, entreprise ou compétence..."
                className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
            Filtrer par type
          </h2>
          <Tabs
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val)}
            className="w-full"
          >
            <TabsList className="w-full">
              <TabsTrigger value="Tous">Tous</TabsTrigger>
              <TabsTrigger value="CDI">CDI</TabsTrigger>
              <TabsTrigger value="CDD">CDD</TabsTrigger>
              <TabsTrigger value="Freelance">Freelance</TabsTrigger>
              <TabsTrigger value="Stage">Stage</TabsTrigger>
              <TabsTrigger value="Urgent">Urgent</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Job Listings */}
        <div>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredJobs.length} offre{filteredJobs.length !== 1 ? "s" : ""}{" "}
              d'emploi trouvée{filteredJobs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden "
                >
                  <CardHeader className="pb-4">
                    <div className="flex gap-4 items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {job.titre}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                          {job.entreprise}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {job.localisation}
                        </p>
                      </div>
                      <img
                        src={`https://picsum.photos/seed/${job.id}/100/100`}
                        alt={job.entreprise}
                        className="w-16 h-16 rounded-lg shadow-md object-cover flex-shrink-0"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap mt-4">
                      <Badge variant="outline" className="text-xs">
                        {job.typeContrat}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.salaire}
                      </Badge>
                      {job.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 pb-4">
                    {/* description  */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {job.description.split(" ").slice(0, 20).join(" ")}
                      {job.description.split(" ").length > 20 ? "  .... " : ""}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap justify gap-2">
                        {job.competences.map((competence, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-amber-300 bg-amber-100/50 text-gray-700"
                          >
                            {competence}
                          </Badge>
                          // comantera
                        ))}
                      </div>
                      <Dialog
                        open={selectedJob?.id === job.id}
                        onOpenChange={(open) => !open && setSelectedJob(null)}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="lg"
                            onClick={() => setSelectedJob(job)}
                            className="items-center justify-center hover:scale-105 translation-all duration-105 hover:bg-violet-900 hover:shadow-2xl"
                          >
                            Voir détails <Navigation size={24} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl">
                              {job.titre}
                            </DialogTitle>
                            <DialogDescription>
                              {job.entreprise} - {job.localisation}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline">{job.typeContrat}</Badge>
                              <Badge variant="outline">{job.salaire}</Badge>
                              {job.urgent && (
                                <Badge variant="destructive">Urgent</Badge>
                              )}
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">
                                Description
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {job.description}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">
                                Compétences requises
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {job.competences.map((competence, idx) => (
                                  <Badge
                                    key={idx}
                                    className="text-xs bg-primary/10 text-primary"
                                  >
                                    {competence}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">
                                  Date de publication:
                                </span>
                                <p className="text-muted-foreground">
                                  {new Date(
                                    job.datePublication,
                                  ).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">
                                  Date limite:
                                </span>
                                <p className="text-muted-foreground">
                                  {new Date(job.datefin).toLocaleDateString(
                                    "fr-FR",
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="border-red-500 text-red-700 hover:scale-105 translation-all duration-300"
                              >
                                Fermer
                              </Button>
                            </DialogClose>
                            {/* postulations  */}
                            <Button
                              className="bg-violet-700 hover:bg-violet-900 hover:scale-105 translation-all duration-300"
                              onClick={() => {
                                setSelectedJobForPostulation(job);
                                setShowPostulationModal(true);
                              }}
                            >
                              Postuler maintenant
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-border pt-4 flex justify-between text-xs text-muted-foreground">
                    <p>
                      Publié le{" "}
                      {new Date(job.datePublication).toLocaleDateString(
                        "fr-FR",
                      )}
                    </p>
                    <p>
                      Fin: {new Date(job.datefin).toLocaleDateString("fr-FR")}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-2">
                Aucune offre d'emploi trouvée
              </p>
              <p className="text-sm text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Postulation Modal */}
      <Dialog
        open={showPostulationModal}
        onOpenChange={setShowPostulationModal}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Postuler à l'offre</DialogTitle>
            <DialogDescription>
              {selectedJobForPostulation?.titre} -{" "}
              {selectedJobForPostulation?.entreprise}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Votre Profil</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Nom:</span>
                  <span>{Profile.Nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Prénom:</span>
                  <span>{Profile.Prenom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{Profile.Email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Téléphone:</span>
                  <span>{Profile.tel}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">CV</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!Profile.CV}
                >
                  {Profile.CV
                    ? "Utiliser CV enregistré"
                    : "Aucun CV enregistré"}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer w-full">
                    Uploader un nouveau CV
                  </label>
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button className="bg-violet-700 hover:bg-violet-900">
              Confirmer la postulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
