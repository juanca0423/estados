const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout } = require("../controler/index.controler");

router.get("/", renderIndex);
router.get("/about", renderAbout);

module.exports = router;
