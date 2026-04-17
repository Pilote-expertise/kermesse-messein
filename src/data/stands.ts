// Configuration de l'événement
export const eventConfig = {
  date: "2026-06-12", // Format YYYY-MM-DD
  name: "Kermesse 2026",
};

export interface Stand {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  slots: {
    creneau0?: { needed: number; registered: number };
    creneau1: { needed: number; registered: number };
    creneau2: { needed: number; registered: number };
  };
}

export const stands: Stand[] = [
  {
    id: "peluches",
    name: "Stand des peluches",
    description: "Tirez une balle numérotée (type Motus) et repartez avec la peluche correspondante !",
    icon: "🧸",
    color: "#ec4899",
    bgGradient: "from-pink-400 to-pink-600",
    slots: { creneau1: { needed: 2, registered: 0 }, creneau2: { needed: 2, registered: 0 } }
  },
  {
    id: "chamboule-tout",
    name: "Chamboule-tout",
    description: "Renversez toutes les boîtes pour gagner ! Précision et force sont de mise.",
    icon: "🎯",
    color: "#f97316",
    bgGradient: "from-orange-400 to-orange-600",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  },
  {
    id: "circuit-velo",
    name: "Circuit vélo & trottinette",
    description: "Parcours d'obstacles pour les petits cyclistes et trotteurs en herbe !",
    icon: "🚲",
    color: "#22c55e",
    bgGradient: "from-green-400 to-green-600",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  },
  {
    id: "peche-canards",
    name: "Pêche aux canards",
    description: "Attrapez les petits canards qui flottent et découvrez votre lot !",
    icon: "🦆",
    color: "#3b82f6",
    bgGradient: "from-blue-400 to-blue-600",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  },
  {
    id: "jeux-eau",
    name: "Jeux d'eau - tir au pistolet",
    description: "Rafraîchissez-vous en visant les cibles avec des pistolets à eau !",
    icon: "🔫",
    color: "#06b6d4",
    bgGradient: "from-cyan-400 to-cyan-600",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  },
  {
    id: "course-garcons-cafe",
    name: "Course des garçons de café",
    description: "Courez le plus vite possible sans renverser le plateau ! Équilibre et rapidité.",
    icon: "☕",
    color: "#78350f",
    bgGradient: "from-amber-600 to-amber-800",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  },
  {
    id: "maquillage",
    name: "Maquillage & tatouage",
    description: "Transformez-vous en super-héros, princesse ou animal avec nos artistes !",
    icon: "🎨",
    color: "#a855f7",
    bgGradient: "from-purple-400 to-purple-600",
    slots: { creneau1: { needed: 3, registered: 0 }, creneau2: { needed: 3, registered: 0 } }
  },
  {
    id: "jardin-sucettes",
    name: "Jardin des sucettes",
    description: "Plantez votre main et cueillez une délicieuse sucette surprise !",
    icon: "🍭",
    color: "#ec4899",
    bgGradient: "from-pink-300 to-rose-500",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  },
  {
    id: "fort-boyard",
    name: "Jeux Fort Boyard",
    description: "Jeu des bâtonnets et jeu du verre flottant. Qui sera le plus malin ?",
    icon: "🏰",
    color: "#eab308",
    bgGradient: "from-yellow-400 to-amber-500",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  }
];

export const creneaux = {
  creneau0: {
    id: "creneau0",
    label: "Avant spectacle",
    horaire: "17h00 - 17h30",
  },
  creneau1: {
    id: "creneau1",
    label: "Créneau 1",
    horaire: "18h30 - 19h15",
  },
  creneau2: {
    id: "creneau2",
    label: "Créneau 2",
    horaire: "19h15 - 20h00",
  }
};

// Stands d'organisation (pas des jeux)
export const standsOrganisation: Stand[] = [
  {
    id: "caisse",
    name: "Caisse",
    description: "Gestion de la caisse centrale : vente de tickets et encaissements.",
    icon: "💰",
    color: "#16a34a",
    bgGradient: "from-green-500 to-green-700",
    slots: { creneau0: { needed: 2, registered: 0 }, creneau1: { needed: 2, registered: 0 }, creneau2: { needed: 2, registered: 0 } }
  },
  {
    id: "distribution-cadeaux",
    name: "Distribution des cadeaux",
    description: "Remise des lots aux enfants ayant terminé tous les stands de jeux.",
    icon: "🎁",
    color: "#dc2626",
    bgGradient: "from-red-400 to-red-600",
    slots: { creneau1: { needed: 1, registered: 0 }, creneau2: { needed: 1, registered: 0 } }
  },
  {
    id: "buvette",
    name: "Buvette",
    description: "Service des boissons : eau, sirops, sodas, bières. Vin à confirmer.",
    icon: "🍹",
    color: "#0891b2",
    bgGradient: "from-cyan-500 to-cyan-700",
    slots: { creneau1: { needed: 3, registered: 0 }, creneau2: { needed: 3, registered: 0 } }
  },
  {
    id: "crepes-barbapapa",
    name: "Crêpes & barbe à papa",
    description: "Crêpes déjà préparées : il suffit d'étaler le Nutella ! Barbe à papa pour régaler petits et grands.",
    icon: "🥞",
    color: "#d97706",
    bgGradient: "from-amber-400 to-amber-600",
    slots: { creneau1: { needed: 2, registered: 0 }, creneau2: { needed: 2, registered: 0 } }
  },
];

export const animations = [
  {
    id: "tombola",
    name: "Grande tombola",
    description: "De nombreux lots à gagner ! Tentez votre chance avec nos tickets.",
    icon: "🎟️",
    color: "#f59e0b"
  },
  {
    id: "panier-garni",
    name: "Panier garni",
    description: "Un magnifique panier rempli de jeux de société du partenaire Iello (fabricant d'Heillecourt). Estimez son poids au gramme près !",
    icon: "🧺",
    color: "#84cc16"
  }
];

export const restaurationManger = [
  { name: "Crêpes", icon: "🥞", price: "À définir" },
  { name: "Pop-corn (à confirmer)", icon: "🍿", price: "À confirmer" },
  { name: "Barbe à papa", icon: "🍬", price: "À définir" },
  { name: "Mister Freeze (si le temps le permet)", icon: "🧊", price: "À définir" },
];

export const restaurationBoire = [
  { name: "Bouteille d'eau (petite)", icon: "💧", price: "À définir" },
  { name: "Bouteille d'eau (grande)", icon: "💧", price: "À définir" },
  { name: "Soft / Sirop à l'eau", icon: "🥤", price: "À définir" },
  { name: "Sodas", icon: "🥤", price: "À définir" },
  { name: "Bière", icon: "🍺", price: "À définir" },
  { name: "Vin (bouteilles auberge espagnole)", icon: "🍷", price: "À confirmer" },
];

export const programme = [
  {
    time: "17h30",
    title: "Spectacle des enfants",
    description: "Danses et représentations de toutes les classes",
    icon: "💃"
  },
  {
    time: "18h30",
    title: "Ouverture de la kermesse",
    description: "Tous les stands ouvrent leurs portes !",
    icon: "🎪"
  },
  {
    time: "19h15",
    title: "Deuxième créneau d'animation",
    description: "Rotation des bénévoles et des activités",
    icon: "🎡"
  },
  {
    time: "20h00",
    title: "Fin des stands & tirage",
    description: "Tirage de la tombola et du panier garni !",
    icon: "🏆"
  },
  {
    time: "Après le tirage",
    title: "Repas auberge espagnole",
    description: "Chacun apporte un plat à partager. N'oubliez pas vos couverts et assiettes !",
    icon: "🍽️"
  }
];
