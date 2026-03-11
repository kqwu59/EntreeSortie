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

Puis ouvrir : `http://localhost:8000`.

## Structure

- `index.html` : structure de l'interface.
- `styles.css` : styles et responsive design.

## Évolutions possibles

- Ajouter une API backend (Node, Python, etc.).
- Connecter les tâches à une base de données.
- Ajouter l'authentification et la gestion des rôles.
- Ajouter des notifications (email / Teams / Slack).
