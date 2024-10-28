const express = require("express")
const pokemonController = require("../controllers/pokemon")
const router = express.Router()

router.get("/hello",pokemonController.hiTrainer)
router.post("/",pokemonController.createPokemon)
router.get("/",pokemonController.getPokemons)
router.get("/:pokemon_id",pokemonController.getPokemonByIdPokemon)
router.put("/view/:pokemon_id",pokemonController.viewPokemonById)
module.exports = router