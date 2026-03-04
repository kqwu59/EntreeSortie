# EntreeSortie

Version actuelle : **écran de déclaration unique** aligné sur le process métier (Étape 1 / Étape 2) avec reprise d'une demande en cours.

## ✅ Ce qui est implémenté

- Une seule page de déclaration (sans ancien écran workflow).
- **Étape 1** avec sections « Réservé SRH » et « Réservé CDS ».
- **Étape 2** avec cases de validation SRH/CDS.
- Case **« Pas de date de fin »** :
  - coche = la date de départ se vide et se grise,
  - décoche = le champ redevient actif.
- Validation : si « Pas de date de fin » n'est pas cochée, la date de départ est obligatoire.
- Liste **Demandes enregistrées** visible sous le formulaire (stockée dans `localStorage`).
- Bouton **Reprendre** sur chaque ligne pour recharger une demande existante, compléter les cases restantes, puis **Mettre à jour**.
- État d'avancement : **En cours** / **Terminé** selon les validations de l'étape 2.

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
3. Cliquer **Reprendre** sur la demande créée.
4. Cocher des cases d'Étape 2 puis cliquer **Mettre à jour**.
5. Vérifier le changement d'état (**En cours** vers **Terminé**) quand toutes les cases sont cochées.
