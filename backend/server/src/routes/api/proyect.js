const express = require("express");
const router = express.Router();
const proyectAPIController = require("../../controllers/api/proyectAPIController");

router.get("/", proyectAPIController.list);
router.get("/:id", proyectAPIController.detail);

module.exports = router;