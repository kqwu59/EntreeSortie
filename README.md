# EntreeSortie

Version actuelle : **écran de déclaration unique** aligné sur le process métier (Étape 1 / Étape 2).

## ✅ Ce qui est implémenté

- Une seule page de déclaration (sans ancien écran workflow).
- **Étape 1** avec sections « Réservé SRH » et « Réservé CDS ».
- **Étape 2** avec cases de validation SRH/CDS.
- Case **« Pas de date de fin »** :
  - coche = la date de départ se vide et se grise,
  - décoche = le champ redevient actif.
- Validation : si « Pas de date de fin » n'est pas cochée, la date de départ est obligatoire.
- Liste **Demandes enregistrées** visible sous le formulaire (stockée dans `localStorage`).

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

## 🔄 Si vous voyez encore l'ancien affichage

Faites un rechargement forcé du navigateur :
- Windows/Linux : `Ctrl + F5`
- Mac : `Cmd + Shift + R`

## 🧪 Test manuel rapide

1. Créer une demande et cliquer **Enregistrer**.
2. Vérifier qu'elle apparaît dans **Demandes enregistrées**.
3. Cocher **Pas de date de fin** : la date de départ se grise.
4. Décocher : la date de départ redevient saisissable.
5. Cliquer **Vider la liste** pour remettre à zéro.
