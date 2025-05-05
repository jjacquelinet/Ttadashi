const express = require("express");
const mapnik = require("@mapnik/mapnik");

mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

const app = express();

// authorize CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get("/tile/:z/:x/:y.mvt", (req, res) => {
    const { z, x, y } = req.params;
    
    // TODO : placing Mapnik render tasks into a concurrency-limited queue to avoid running too many in parallel with p-limit
    const map = new mapnik.Map(256, 256);
    map.load('style.xml', function (err) {
        if (err) return res.status(500).send(`Erreur de chargement du style : ${err.message}`);
        const vt = new mapnik.VectorTile(+z, +x, +y);
        map.render(vt, {
            z: +z,
            x: +x,
            y: +y,
            buffer_size: 64
          }, (err, tile) => {
            if (err) {
              console.error('Erreur rendu Mapnik:', err);
              res.status(500).send('Erreur interne');
            } else {
              const buffer = tile.getData();
              res.send(buffer);
            }
        });    
    });
});
app.listen(3000, () => console.log("Server started, on http://localhost:3000"));
