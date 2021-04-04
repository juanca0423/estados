/**
 * Enrutador de estados
 * @module Rutas Estados
 */
const express = require("express");
const router = express.Router();
const {renderEstados,renderEF} = require("../controler/estados.controler");
//const {render} = require("../controler/ef.controler");

/**
 * Get Estados
 * @name Formulario de Ingreso
 * @path {GET}/estados
 */
router.get("/estados", renderEstados);
/**
 * POST Estados Detallados
 * @name Estados Financieros
 * @path {POST}/estados
 */
router.post("/estados", renderEF);

module.exports = router;
