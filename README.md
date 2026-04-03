# 🎪 Kermesse 2026 - École Jean Rostand Messein

Site web pour la kermesse de l'école Jean Rostand de Messein, prévu le **12 juin 2026**.

## ✨ Fonctionnalités

- **Présentation des stands** avec indicateur de besoins en bénévoles
- **Système d'inscription** pour les bénévoles (formulaire avec nom, email, enfant/classe)
- **Programme de la journée** avec timeline
- **Section restauration** avec les produits disponibles
- **Animations spéciales** : Tombola et Panier Garni
- **Espace pour le plan** de l'école avec emplacements des stands
- **Design responsive** optimisé pour mobile (QR codes)
- **PWA ready** : installable sur téléphone

## 🚀 Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre repository GitHub
3. Importez le projet
4. Le déploiement se fait automatiquement !

## 💻 Développement local

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Build de production
npm run build
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
src/
├── app/
│   ├── globals.css      # Styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil
├── components/
│   ├── Header.tsx       # Navigation
│   ├── Hero.tsx         # Section héro
│   ├── StandsSection.tsx    # Liste des stands
│   ├── StandCard.tsx    # Carte individuelle
│   ├── InscriptionModal.tsx # Modal d'inscription
│   ├── InscriptionSection.tsx
│   ├── AnimationsSection.tsx
│   ├── ProgrammeSection.tsx
│   ├── RestaurationSection.tsx
│   ├── PlanSection.tsx
│   └── Footer.tsx
└── data/
    └── stands.ts        # Données des stands
```

## 🎨 Personnalisation

### Modifier les stands

Éditez `src/data/stands.ts` pour :
- Ajouter/supprimer des stands
- Modifier les descriptions
- Changer le nombre de bénévoles nécessaires
- Ajuster les créneaux horaires

### Modifier les horaires

Dans `src/data/stands.ts`, modifiez l'objet `creneaux` :

```typescript
export const creneaux = {
  creneau1: {
    id: "creneau1",
    label: "Créneau 1",
    horaire: "15h00 - 15h45",  // Mettez vos horaires ici
  },
  creneau2: {
    id: "creneau2",
    label: "Créneau 2",
    horaire: "15h45 - 16h30",
  }
};
```

### Ajouter les photos

1. Placez vos images dans `public/images/`
2. Modifiez `PlanSection.tsx` pour afficher vos photos
3. Ajoutez votre plan de l'école

### Icônes PWA

Générez les icônes PNG à partir de `public/icons/icon.svg` :
- Utilisez [Real Favicon Generator](https://realfavicongenerator.net/)
- Ou suivez les instructions dans `public/icons/README.md`

## 🔧 Pour aller plus loin

### Connecter le formulaire à une base de données

Actuellement, le formulaire simule l'envoi. Pour le connecter :

1. **Google Sheets** : Utilisez l'API Google Sheets
2. **Notion** : Utilisez l'API Notion (MCP configuré)
3. **Base de données** : Ajoutez Prisma + PostgreSQL/Supabase

### Ajouter l'envoi d'emails

1. Créez un compte [Resend](https://resend.com) ou [SendGrid](https://sendgrid.com)
2. Ajoutez une API Route dans `src/app/api/inscription/route.ts`
3. Envoyez un email de confirmation lors de l'inscription

## 📱 QR Code

Pour générer un QR code vers votre site :
1. Déployez d'abord sur Vercel
2. Utilisez [QR Code Generator](https://www.qr-code-generator.com/)
3. Entrez l'URL de votre site
4. Imprimez et affichez !

## 📞 Support

Pour toute question, contactez l'APE de l'école Jean Rostand.

---

Fait avec ❤️ pour les enfants de l'école Jean Rostand de Messein
