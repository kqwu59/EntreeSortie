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

## 🔄 Processus cible

### Nouveau collaborateur (onboarding)
1. RH crée une demande d'entrée avec les informations essentielles.
2. La demande est automatiquement notifiée aux Affaires Générales et à l'IT.
3. Chaque service voit ses tâches, ses échéances et son statut.
4. Le manager (ou demandeur) suit l'avancement global depuis un tableau de bord.
5. Le jour d'arrivée, tous les prérequis sont validés (bureau, badge, comptes, matériel).

### Collaborateur sortant (offboarding)
1. RH crée une demande de sortie avec la date effective.
2. Les Affaires Générales organisent la restitution des moyens physiques (clé, badge, bureau).
3. L'IT planifie la désactivation des accès et la récupération du matériel.
4. La clôture est réalisée lorsque toutes les tâches sont confirmées.

## ✅ Fonctionnalités implémentées (MVP)

- Formulaire unique de création de demande (entrée/sortie).
- Données minimales collectées : identité, manager, date effective, besoins IT/logistiques.
- Génération automatique des tâches RH / Affaires Générales / IT.
- Statuts par tâche : À faire, En cours, Bloqué, Terminé.
- Vue globale avec progression de traitement.
- Tableaux de tâches par service.
- Notifications automatiques à chaque création/mise à jour.
- Journal d'audit horodaté.
- Sauvegarde locale (`localStorage`) pour conserver les données entre rechargements.

## 🚀 Lancer l'application

Aucune dépendance n'est nécessaire.

1. Ouvrir `index.html` dans un navigateur, ou
2. Lancer un petit serveur local :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.
