FROM node:20-bullseye-slim


## app : 
# Création du dossier de l'application
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances Node.js
ENV NODE_ENV=development
RUN npm install

# Copie du reste du code source dans le conteneur
COPY . .

# Exposer le port du serveur
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "dev"]
