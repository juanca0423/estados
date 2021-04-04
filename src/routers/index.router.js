/**
 * Enrutador de Inicio
 * @module Rutas Index
 */

const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout } = require("../controler/index.controler");

/**
 * Get Home
 * @name inicio
 * @path {GET}/
 */
router.get("/", renderIndex);
/**
 * Get About
 * @name Aserca de Nosotros
 * @path {GET}/about
 */
router.get("/about", renderAbout);

module.exports = router;
