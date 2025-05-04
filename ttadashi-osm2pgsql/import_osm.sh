#!/bin/sh

PG_USER="gisuser"
PG_PASSWORD="gispwd"
PG_DB="gis"
PG_HOST="postgis"
OSM_FILE="/import/data.osm.pbf"

echo "Importation des données OpenStreetMap..."

PGPASSWORD="$PG_PASSWORD" osm2pgsql --create --slim -d "$PG_DB" -U "$PG_USER" -H "$PG_HOST" \
    --hstore --cache 1000 --number-processes 4 \
    --style railways.style \
    --output pgsql \
    "$OSM_FILE"

echo "Importation terminée !"
