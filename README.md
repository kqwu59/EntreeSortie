# EntreeSortie

Base simple et propre d'un dashboard RH/AG/IT.

## Ce que contient cette version

- Menu latéral avec icônes.
- Header avec recherche.
- KPI en cartes.
- Bloc **Actions rapides** avec les 4 boutons demandés :
Base frontend "dashboard classique stylé" pour la gestion des entrées/sorties.

## Contenu de cette base

- Sidebar avec menu + icônes.
- Topbar avec titre et recherche.
- KPI en cartes.
- Zone "Actions rapides" avec 4 boutons :
  - Ajouter un nouvel agent / agente
  - Signaler un départ
  - Arrivées en cours
  - Arrivées terminées
- Blocs de suivi et alertes.

## Lancer localement
- Deux blocs d'information (suivi service + alertes).

## Lancer
Interface web simple pour gérer les arrivées et départs d'agents.

## Ce que contient cette version

- Un formulaire **Nouvel arrivé** simplifié (Nom/Prénom séparés, pas d'email, service en saisie libre).
- Un champ **Type de contrat** + **Date de fin de contrat**.
- Un tableau **Arrivées en cours** avec lien vers les actions à réaliser.
- Un bloc **Actions par service** (RH, Affaires Générales, Informatique).
- Des KPI rapides (retards, délai d'activation, taux prêt le jour J).

## Lancer
# EntreeSortie — V2 Premium

Dashboard de gestion des **nouveaux entrants** et **départs d'agents** avec navigation par actions métier.

## Fonctionnalités V2

- Sélection directe de l'action à réaliser :
  - Enregistrer un nouvel arrivé
  - Enregistrer le départ d'un agent
  - Voir les créations en cours
  - Voir l'historique
- KPI rapides orientés performance opérationnelle :
  - délai moyen d'activation IT après arrivée,
  - volume de demandes en retard,
  - taux de préparation le jour J,
  - taux de clôture des départs < 48h.
- Interface moderne type dashboard, responsive.

## Lancer localement
# EntreeSortie

Prototype d'interface moderne pour gérer les **nouveaux entrants** et les **partants**.

## Aperçu

Cette interface est inspirée d'un dashboard "Employee Lifecycle" avec :
- un menu latéral,
- un formulaire collaborateur,
- un suivi des tâches par service (RH / Affaires Générales / IT),
- des cartes de progression.

## Lancer le prototype

Comme il s'agit d'un prototype statique, il suffit d'ouvrir `index.html` dans votre navigateur.

Option simple en local :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.
Ouvrir ensuite `http://localhost:8000`.

## Fichiers

- `index.html` : structure de la page.
- `styles.css` : mise en forme simplifiée.
Puis ouvrir `http://localhost:8000`.

## Structure

- `index.html` : layout + sections métiers.
- `styles.css` : thème premium et responsive.
- `app.js` : navigation entre les vues du dashboard.
Puis ouvrir : `http://localhost:8000`.

## Structure

- `index.html` : structure de l'interface.
- `styles.css` : styles et responsive design.

## Évolutions possibles

- Ajouter une API backend (Node, Python, etc.).
- Connecter les tâches à une base de données.
- Ajouter l'authentification et la gestion des rôles.
- Ajouter des notifications (email / Teams / Slack).
