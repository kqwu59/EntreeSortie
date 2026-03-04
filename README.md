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

## ✅ Fonctionnalités recommandées

- Formulaire de création de demande (entrée/sortie).
- Workflow de validation et d'assignation par service.
- Statuts par tâche (À faire, En cours, Bloqué, Terminé).
- Historique et journal d'audit.
- Notifications automatiques (email/Teams/Slack).
- Gestion des délais et alertes en cas de retard.
- Tableaux de bord par service et vue globale.

## 📌 Données minimales à collecter

- Identité : nom, prénom, email, service.
- Type de demande : Entrée / Sortie.
- Date effective d'arrivée/de départ.
- Manager responsable.
- Besoins IT : matériel, logiciels, droits.
- Besoins logistiques : bureau, badge, clé.

## 🔐 Sécurité & conformité

- Gestion des rôles (RH, AG, IT, manager, admin).
- Traçabilité des actions (qui a fait quoi, quand).
- Respect de la confidentialité des données RH.
- Politique de conservation/suppression des données.

## 🚀 Vision MVP (version simple)

Pour démarrer rapidement :
- 1 formulaire unique de demande.
- 3 tableaux de tâches (RH, Affaires Générales, IT).
- 1 vue de suivi globale.
- Notifications automatiques à chaque changement de statut.

Cette base permet de déployer un premier système utile, puis d'ajouter des règles métier plus avancées (validation manager, modèles par type de poste, automatisations AD, etc.).
