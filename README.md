# EntreeSortie

Version actuelle : **étape 1 de création** + **parcours d'arrivée détaillé**.

## ✅ Ce qui est implémenté

- La page principale contient uniquement l'**Étape 1** (SRH/CDS).
- L'ancienne étape 2 de la page principale a été supprimée.
- La case **« Pas de date de fin »** garde son comportement :
  - coche = date de départ vidée et grisée,
  - décoche = champ date de départ réactivé.
- Liste des demandes d'arrivée enregistrées (`localStorage`).
- Pour chaque demande :
  - **Reprendre** la demande (modification des infos étape 1),
  - **Ouvrir parcours** vers une page dédiée de checklist d'arrivée,
  - case **Terminer l'arrivée** directement sur la page principale.
- La page `details.html` affiche le parcours/checklist (par acteur) et mémorise les cases cochées.

## 🚀 Lancer l'application

### Windows (PowerShell)
```powershell
py -m http.server 8000
```
ou
```powershell
python -m http.server 8000
```

### macOS / Linux
```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## 🧪 Test manuel rapide

1. Créer une demande d'arrivée depuis `index.html`.
2. Dans le tableau, cliquer **Ouvrir parcours**.
3. Cocher/décocher des actions dans `details.html`.
4. Revenir à l'accueil : la demande peut être marquée via **Terminer l'arrivée**.
5. Cliquer **Reprendre** pour modifier la demande initiale sans créer de doublon.
