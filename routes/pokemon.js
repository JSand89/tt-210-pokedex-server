const express = require("express")
const pokemonController = require("../controllers/pokemon")
const router = express.Router()

router.get("/hello",pokemonController.hiTrainer)
router.post("/",pokemonController.createPokemon)
router.get("/",pokemonController.getPokemons)
router.get("/:pokemon_id",pokemonController.getPokemonByIdPokemon)
router.put("/view/:pokemon_id",pokemonController.viewPokemonById)
router.put("/catch/:pokemon_id",pokemonController.catchPokemonById)
router.put("/in_team/:pokemon_id",pokemonController.inTeamPokemonById)
module.exports = router