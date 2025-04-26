FROM node:23-alpine

## mapnik : 
RUN apk update && apk upgrade

RUN apk add bash make git python3 gdal-dev cairo-dev \
    postgresql-dev harfbuzz-dev g++ boost-dev sqlite-dev \
    proj-dev jpeg-dev tiff-dev libwebp-dev

RUN mkdir /build

WORKDIR /build

RUN git clone https://github.com/mapnik/mapnik.git

WORKDIR mapnik

RUN git checkout v4.0.6
RUN git submodule update --init

RUN ./configure INPUT_PLUGINS='postgis,geojson,sqlite,csv'
RUN JOBS=4 make
RUN make install

## node-mapnik : 
WORKDIR /build

RUN git clone https://github.com/mapnik/node-mapnik.git

WORKDIR node-mapnik

RUN git checkout v4.6.9
RUN git submodule update --init

RUN npm install --build-from-source || true  # first command fails but we must continue 
RUN npm run prebuildify
RUN npm install --build-from-source


## app : 
# Création du dossier de l'application
WORKDIR /app

# Copie des fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances Node.js
RUN npm install

# Copie du reste du code source dans le conteneur
COPY . .

# Exposer le port du serveur
EXPOSE 3000

# Démarrer l'application
CMD ["node", "server.js"]
