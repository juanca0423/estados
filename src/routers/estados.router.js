const express = require("express");
const router = express.Router();
const {renderEstados,renderEF} = require("../controler/estados.controler");
//const {render} = require("../controler/ef.controler");
router.get("/estados", renderEstados);

router.post("/estados", renderEF);

module.exports = router;
