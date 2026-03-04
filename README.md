# EntreeSortie

EntreeSortie est une application de gestion des **nouveaux entrants** et des **partants** dans l'entreprise.
L'objectif est d'orchestrer les actions entre les différents services pour éviter les oublis et fluidifier l'onboarding/offboarding.

## 🎯 Objectifs

- Centraliser les demandes d'arrivée et de départ.
- Assurer le suivi des tâches par service.
- Clarifier les responsabilités et les délais.
- Garantir que chaque collaborateur dispose de ses accès, équipements et moyens physiques au bon moment.

## 👥 Services impliqués

### 1) Ressources Humaines (RH)
Le service RH crée et maintient les informations collaborateur dans les outils RH :
- Création du dossier collaborateur.
- Saisie des informations contractuelles.
- Déclaration de la date d'arrivée/de départ.
- Transmission des données nécessaires aux autres services.

### 2) Affaires Générales
Le service des affaires générales prépare l'environnement physique :
- Attribution/préparation du bureau.
- Remise des clés.
- Création et remise du badge d'accès.
- Vérification de la disponibilité logistique le jour J.

### 3) Service Informatique (IT)
Le service informatique gère les éléments techniques :
- Création/désactivation du compte Active Directory (AD).
- Création des comptes applicatifs nécessaires.
- Préparation de la machine (PC portable/fixe).
- Préparation des périphériques (écran, clavier, etc.).
- Vérification des droits d'accès et de la sécurité.

## ✅ Fonctionnalités livrées (MVP)

- Formulaire de déclaration structuré en **Étape 1 / Étape 2** pour refléter le process SRH/CDS.
- Données Étape 1 : identité, service, type de demande, dates d'arrivée/départ, bureau, pôle, fonction.
- Données Étape 2 : cases de validation (Sirhus, Reseda, IAM, matrice pré-IAM).
- Génération automatique des tâches RH / Affaires Générales / IT selon le type de demande.
- Mise à jour des statuts de tâche (À faire, En cours, Bloqué, Terminé).
- Vue globale des demandes (profil + pôle/fonction + dates + progression).
- Flux de notifications à chaque création et changement de statut.
- Persistance locale via `localStorage` (aucun backend requis pour cette version).

## 📌 Données collectées

- Identité : nom, prénom, email, service.
- Type de demande : Entrée / Sortie.
- Date d'arrivée et/ou date de départ.
- Manager responsable.
- Données métier : bureau, pôle, fonction.
- Validations : Sirhus, Reseda, IAM, matrice pré-IAM.
- Besoins IT : matériel, logiciels, droits.
- Besoins logistiques : bureau, badge, clé.

## 🚀 Lancer l'application

Cette version est une application statique HTML/CSS/JS.

### Windows (PowerShell)
```powershell
py -m http.server 8000
```
Ou, selon installation :
```powershell
python -m http.server 8000
```

### macOS / Linux
```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000` dans un navigateur.

## 🧪 Tester rapidement

1. Créer une demande **Entrée** (date d'arrivée obligatoire).
2. Créer une demande **Sortie** (date de départ obligatoire).
3. Vérifier la génération automatique des tâches RH/AG/IT.
4. Changer des statuts de tâche et vérifier progression + notifications.
5. Recharger la page : les données restent présentes (localStorage).

## 🔐 Sécurité & conformité (prochaine étape)

Pour passer à une version production, il faudra ajouter :
- Gestion des rôles (RH, AG, IT, manager, admin).
- Traçabilité serveur (qui a fait quoi, quand).
- Contrôles d'accès, chiffrement et politiques de conservation.
- Intégrations de notifications (email/Teams/Slack) côté backend.
