const express = require("express");
const mapnik = require("@mapnik/mapnik");
const fs = require("node:fs");

mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

const app = express();

app.get("/tile/:z/:x/:y.mvt", (req, res) => {
    const { z, x, y } = req.params;
    const map = new mapnik.Map(256, 256);
    
    map.load("style.xml", function (err) {
        if (err) return res.status(500).send("Erreur de chargement du style");

        const tile = new mapnik.VectorTile(z, x, y);
        map.render(tile, function (err, tile) {
            if (err) return res.status(500).send("Erreur de rendu");
            
            res.setHeader("Content-Type", "application/x-protobuf");
            res.send(tile.getData());
        });
    });
});

app.listen(3000, () => console.log("Serveur en ligne sur http://localhost:3000"));
