# Nuxt Boilerplate

Un boilerplate moderne pour Nuxt 3 avec PrimeVue et Tailwind CSS, idéal pour démarrer rapidement vos projets.

## Fonctionnalités

- **Framework** : [Nuxt 3](https://nuxt.com/) (v3.15.2)
- **UI/UX** :
  - [PrimeVue](https://primevue.org/) (v4.2.5) - Framework de composants UI
  - [Tailwind CSS](https://tailwindcss.com/) (v4.0.0) - Framework CSS utilitaire
  - Système de thème clair/sombre intégré via `@nuxtjs/color-mode`
  - Polices Google Fonts (Poppins)
  - Variables CSS personnalisées pour une gestion cohérente des couleurs
  
- **Gestion d'état** :
  - [Pinia](https://pinia.vuejs.org/) (v2.3.1) pour la gestion d'état
  - Support de la persistance via `pinia-plugin-persistedstate`

- **Autres fonctionnalités** :
  - Icônes via Heroicons et PrimeIcons
  - Validation des formulaires avec [Zod](https://zod.dev/)
  - Optimisation d'images intégrée avec `@nuxt/image`
  - Configuration flexible via `nuxt.config.ts`

- **Pages et composants prêts à l'emploi** :
  - Système d'authentification (login, inscription, vérification email)
  - Layout responsive avec topbar et footer
  - Gestion des thèmes avec variables CSS

## Installation

Assurez-vous d'installer les dépendances :

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Serveur de développement

Lancez le serveur de développement sur `http://localhost:3000` :

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Compilez l'application pour la production :

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Prévisualisez localement la version de production :

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Structure du projet

```
├── assets/               # Fichiers CSS, images, etc.
├── components/           # Composants Vue réutilisables
├── layouts/              # Layouts de l'application
├── middleware/           # Middleware Nuxt
├── pages/                # Pages de l'application
├── plugins/              # Plugins Vue/Nuxt
├── public/               # Fichiers statiques publics
├── server/               # API et fonctions côté serveur
├── store/                # Store Pinia pour la gestion d'état
└── types/                # Définitions TypeScript
```

## Configuration

La configuration du projet est disponible dans `nuxt.config.ts`. Vous pouvez y personnaliser :
- Les fonctionnalités Nuxt
- Les modules et plugins activés
- Les variables d'environnement via `runtimeConfig`
- Le thème PrimeVue

Pour plus d'informations, consultez la [documentation de déploiement Nuxt](https://nuxt.com/docs/getting-started/deployment).
