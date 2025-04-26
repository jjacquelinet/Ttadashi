FROM postgis/postgis:17-3.5-alpine

ENV POSTGRES_USER=gisuser
ENV POSTGRES_PASSWORD=gispwd
ENV POSTGRES_DB=gis

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432