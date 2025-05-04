Ttadashi aims to print on a map all train, metro, bus lines, from [OpenStreetMap](https://www.openstreetmap.org/#map=13/48.10090/-1.67524&layers=T) data. 

### Launch the app

```shell
docker compose up
```

### Import the osm data to the database

Name your OpenStreetMap data file `data.osm.pbf` and put it inside the `data/` folder of the main repository folder. 

```shell
docker-compose exec osm2pgsql sh
```

Inside the container, inside the `/app` folder : 
```shell
./import_osm.sh
```

### Show the map

http://localhost:3000/tile/1/1/1.mvt