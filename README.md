# EntreeSortie

Version actuelle : **écran de déclaration** aligné sur le process métier affiché (Étape 1 / Étape 2).

## ✅ Ce qui est implémenté

- Une page unique de déclaration (sans tableaux, sans liste de tâches, sans notifications).
- **Étape 1** avec sections « Réservé SRH » et « Réservé CDS ».
- **Étape 2** avec cases de validation SRH/CDS.
- Ajout de la case **« Pas de date de fin »** :
  - si cochée, la date de départ est vidée et désactivée,
  - sinon la date de départ est obligatoire.
- Enregistrement local des déclarations dans `localStorage`.

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

1. Renseigner les champs de l'Étape 1.
2. Laisser la date de départ vide **sans** cocher « Pas de date de fin » : un message d'erreur doit apparaître.
3. Cocher « Pas de date de fin » : le champ date de départ se grise.
4. Soumettre : le message « Déclaration enregistrée. » doit s'afficher.
