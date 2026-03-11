# EntreeSortie

Interface web simple pour gérer les arrivées et départs d'agents.

## Ce que contient cette version

- Un formulaire **Nouvel arrivé** simplifié (Nom/Prénom séparés, pas d'email, service en saisie libre).
- Un champ **Type de contrat** + **Date de fin de contrat**.
- Un tableau **Arrivées en cours** avec lien vers les actions à réaliser.
- Un bloc **Actions par service** (RH, Affaires Générales, Informatique).
- Des KPI rapides (retards, délai d'activation, taux prêt le jour J).

## Lancer

```bash
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`.

## Fichiers

- `index.html` : structure de la page.
- `styles.css` : mise en forme simplifiée.
