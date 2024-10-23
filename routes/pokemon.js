const express = require("express")
const pokemonController = require("../controllers/pokemon")
const router = express.Router()

router.get("/",pokemonController.saludoEntrenador)
router.post("/",pokemonController.create)
module.exports = router