// Importaciones

import express from "express";

import cors from "cors";

var app = express();

var port = process.env.PORT || 44444;

app.use(express.json());

app.use(cors());

// Rutas para carpetas diferentes

// --- Versión 2 ---

import {backend_igr} from "./backend/index.js";

import { handler } from "./frontend/build/handler.js";

// --- Versión 2 ---

backend_igr(app);

app.use(handler);

// Escuchar puertos abiertos

app.listen(port, () => {

    console.log(`Server ready in port ${port}`);

});

