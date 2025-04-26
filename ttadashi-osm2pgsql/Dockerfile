# Utiliser une image Alpine de base
FROM alpine:3.21

# Mettre à jour les paquets et installer les dépendances nécessaires
RUN apk --update-cache add cmake make g++ nlohmann-json \
  postgresql-dev boost-dev expat-dev bzip2-dev zlib-dev \
  libpq proj-dev lua5.3-dev luajit-dev

# Télécharger et installer osm2pgsql 2.0.1
RUN curl -L https://github.com/osm2pgsql-dev/osm2pgsql/archive/refs/tags/2.0.1.tar.gz -o osm2pgsql.tar.gz \
    && tar -xvzf osm2pgsql.tar.gz \
    && cd osm2pgsql-2.0.1

RUN mkdir build && cd build
RUN cmake ..
    
RUN make \
    && make install \
    && cd .. \
    && rm -rf osm2pgsql.tar.gz osm2pgsql-2.0.1

# Définir le répertoire de travail
WORKDIR /data

# Commande par défaut (peut être modifiée selon les besoins)
CMD ["bash"]
