# Cahier des Charges – **StockXBot**

**Nom du projet :** StockXBot
**Client :** Vloo
**Développeur :** Link34500
**Objectif :** Développer un bot Discord permettant de générer et d’envoyer des e-mails factices de confirmation ou suivi de commande, basés sur des templates HTML importés par le client.

# 1. Présentation générale

StockXBot est un bot Discord destiné à automatiser la génération de faux e-mails de commande issus de différentes marques.
Le client importe ses modèles e-mail (HTML complet), et le bot insère dynamiquement des données utilisateurs (nom, adresse, numéro de commande, dates, etc.) pour produire un mail final envoyé depuis l’adresse configurée par l’utilisateur.

Le bot repose sur :

- Discord.js
- Express (API intégrée au bot)
- Prisma (ORM)
- Base de données relationnelle (PostgreSQL ou autre)

# 2. Fonctionnalités principales

## 2.1. Sélection de marque

- Affichage d’un menu déroulant listant les marques disponibles.
- Les marques sont configurées par les administrateurs via des commandes.
- Chaque marque est associée à :
  - un nom,
  - un template HTML importé,
  - un emoji Discord.

## 2.2. Génération des commandes

- Après sélection d’une marque, l’utilisateur accède à un workflow interactif (menus, boutons Discord).
- Le workflow permet de :
  - saisir les informations nécessaires (nom, adresse, destinataire, méthodes/options),
  - générer une commande stockée en base,
  - déclencher l’envoi d’un email basé sur le template HTML importé.

## 2.3. Envoi d’e-mails

- L'utilisateur configure son adresse d’envoi via `/setup`.
- Le bot insère automatiquement les données de commande dans le template via des placeholders (ex: {{username}}, {{order_id}}, {{delivery_date}}…).
- Le bot envoie l’email au destinataire indiqué.

## 2.4. Gestion des templates (admin)

- Importation d’un fichier HTML complet via l’API.
- Le bot formate automatiquement le fichier et remplace les placeholders lors de l’envoi.
- Le système est pensé pour évoluer vers un générateur WYSIWYG externe (via l’API Express).

## 2.5. Base de données (Prisma)

- Stockage des comptes utilisateurs (mail + préférences).
- Stockage des commandes générées.
- Stockage des templates et marques.

## 2.6. Permissions

- Les fonctionnalités admin (création/suppression de marques, placement de menus, etc.) sont réservées aux utilisateurs disposant d’un rôle Discord spécifique.

# 3. Commandes du bot

## 3.1. Commandes utilisateur

**/setup**

- Crée un compte utilisateur dans la base.
- Permet de configurer l’adresse d’envoi.

**/orders**

- Affiche toutes les commandes générées par l’utilisateur.

**/marques**

- Affiche la liste des marques disponibles.
- Affichage en ephemeral avec menu déroulant.

## 3.2. Commandes administrateur

**/marque create**

- Ajoute une marque.
- Paramètres : nom, emoji optionnel, template.

**/marque delete**

- Supprime une marque.

**/place-menu**

- Place le menu de sélection global dans un salon Discord.

# 4. API interne (Express)

L’API est intégrée au même projet que le bot pour assurer cohérence et simplicité de maintenance.

## 4.1. /template/

CRUD sur les modèles HTML :

| Action | Description                   | Données                |
| ------ | ----------------------------- | ---------------------- |
| POST   | Importer un template HTML     | fichier.html, metadata |
| GET    | Liste des templates           | —                      |
| PATCH  | Modifier template ou contexte | fichier.html, context  |
| DELETE | Supprimer un template         | id                     |

---

## 4.2. /commandes/

CRUD sur les commandes utilisateurs :

| Données stockées        |
| ----------------------- |
| discord_user            |
| destinataire            |
| userInfo (nom, adresse) |
| dateOrder               |
| dateDelivery            |
| marqueId                |
| templateId              |

Création d'une commande → insertion BDD → envoi email possible immédiatement.

## 4.3. /mail/

POST : formatage + envoi d’un e-mail.

Payload attendu :

- templateId
- commandeId
- données contextuelles (placeholder → valeur)

Réponse :

- statut d’envoi
- mail généré (HTML après remplacement)

## 4.4. /marque/

CRUD pour gérer les marques (nom, emoji, template associé).

# 5. Points à intégrer plus tard (roadmap)

- Message automatique envoyé à un utilisateur lorsqu’il rejoint le serveur pour lui demander de faire `/setup` (via bouton interactif).
- Gestionnaire centralisé des placeholders (mapping dynamique des valeurs → template).
- Mise en place du générateur WYSIWYG externe pour modifier les templates via l’API.
- Historique complet des envois d’e-mails.
- Validation automatisée des templates (linter HTML email).

# 6. Organigramme

L’organigramme du workflow est disponible ici :
[https://excalidraw.com/#json=wFdMtkuZPRzbsvOSqAIW3,63_Zjw7s9K_8qzqFQQ3E6g](https://excalidraw.com/#json=wFdMtkuZPRzbsvOSqAIW3,63_Zjw7s9K_8qzqFQQ3E6g)
