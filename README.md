### Construire l’image
```docker build -t vector-tile-server .```


```docker build -t mapnik-build -f Dockerfile.mapnik .```
```docker build -t mapnik-node-build -f Dockerfile.node.mapnik .```
```docker build -t vector-tile-server -f Dockerfile.app .```
```docker build -t my-postgis -f Dockerfile.postgis .```


### lancer un conteneur associé à une image
```docker run -it mapnik-node-build sh```
```docker run -it vector-tile-server sh```


### Lancer les conteneurs
```docker run -d --name postgis-container -p 5432:5432 my-postgis```
```docker run -p 3000:3000 vector-tile-server```
http://localhost:3000/tile/1/1/1.mvt