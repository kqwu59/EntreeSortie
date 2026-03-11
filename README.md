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

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Structure

- `index.html` : layout + sections métiers.
- `styles.css` : thème premium et responsive.
- `app.js` : navigation entre les vues du dashboard.
