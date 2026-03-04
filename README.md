# EntreeSortie

Version actuelle : **étape 1 de création** + **parcours d'arrivée détaillé avec filtres par catégories**.

## ✅ Ce qui est implémenté

- En haut de page: **uniquement les arrivées en cours** à traiter.
- En bas de page: **historique des arrivées terminées**.
- La case **« Pas de date de fin »** :
  - coche = date de départ vidée et grisée,
  - décoche = champ réactivé.
- Liste des demandes d'arrivée enregistrées (`localStorage`) avec tri visuel :
  - **En cours** en haut,
  - **Terminées** en bas.
  - **Reprendre** la demande,
  - **Ouvrir parcours**.
  - case **Terminer l'arrivée**.
- Page `details.html` modernisée :
  - checklist d'arrivée enrichie (plus de tâches, acteurs CdS/SCMS/SPPS/SRH/SSI),
  - **filtres par catégories** (acteur + échéance + recherche texte),
  - **catégories repliables** (non toutes ouvertes en même temps),
  - badges de progression visuels.

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
2. Cliquer **Ouvrir parcours**.
3. Filtrer par acteur/échéance/recherche texte et vérifier l'affichage.
4. Ouvrir une catégorie, cocher des tâches, vérifier la progression.
5. Revenir à l'accueil, cocher **Terminer l'arrivée** si besoin.
