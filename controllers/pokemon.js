const Pokemon = require('../models/pokemon')

exports.hiTrainer = async (req,res)=>{
    try {
        res.send("Hola entrenador ahora desde el controlador")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.createPokemon = async (req,res) =>{
    try {
        console.log(req.body)
        const pokemon = new Pokemon(req.body)
        await pokemon.save()
        res.status(201).json(pokemon)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.getPokemons = async (req,res) =>{
    try {
        const pokemones = await Pokemon.find()
        //A futuro vamos a tener que implementar una logica que nos busque las caracteristicas en Pokeapi
        res.status(200).json(pokemones)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.getPokemonByIdPokemon = async (req,res)=>{
    try {
        const pokemonID = req.params.pokemon_id
        const pokemon = await Pokemon.findOne({"pokemon_id":pokemonID})
        //A futuro vamos a tener que implementar una logica que nos busque las caracteristicas en Pokeapi
        if(!pokemon){
            return res.status(404).json({message:"Pokemon not find"})
        }
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(500).json({error:error.message})        
    }
}

exports.viewPokemonById = async (req,res) =>{
    try {
        const pokemon_id = req.params.pokemon_id
        const pokemon_status = req.body.catch
        if(pokemon_status){
           return res.status(400).json({message:"Bad pokemon status"})
        }
        const pokemonNew = {
            pokemon_id:pokemon_id,
            view:true,
            catch:false,
            in_team:false
        }
        const filter ={pokemon_id:pokemon_id}
        const pokemon = await Pokemon.findOneAndReplace(filter,pokemonNew,{new:true})
        if(!pokemon){
            return res.status(404).json({message:"Pokemon not find"})
        }
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(500).json({error:error.message})        
    }
}

exports.catchPokemonById = async (req,res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
        const pokemonStatusView = req.body.view
        const pokemonStatusInTeam = req.body.in_team
        if(pokemonStatusInTeam){
            return res.status(400).json({message:"Bad pokemon status, pokemon in team"})
        }
        if(pokemonStatusView){
            const pokemonNew = {
                pokemon_id:pokemon_id,
                view:true,
                catch:true,
                in_team:false
            }
            const filter = {pokemon_id:pokemon_id}
            const pokemon = await Pokemon.findOneAndReplace(filter,pokemonNew,{new:true})
            if(!pokemon){
                return res.status(404).json({message:"Pokemon not found"})
            }
            res.status(200).json(pokemon) 
        }else{
            return res.status(400).json({message:"Bad pokemon status"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})           
    }
   
}

exports.inTeamPokemonById = async (req,res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
        const pokemonStatusView = req.body.view
        const pokemonStatusCatch = req.body.catch
        const pokemonStatusInTeam = req.body.in_team
        if(pokemonStatusCatch && pokemonStatusView){
            const pokemonNew = {
                pokemon_id:pokemon_id,
                view:true,
                catch:true,
                in_team:!pokemonStatusInTeam
            }
            const filter ={pokemon_id:pokemon_id}
            const pokemon = await Pokemon.findOne(filter)
            if(!pokemon){
                return res.status(404).json({message:"Pokemon not find"})
            }
            if(pokemon.in_team == pokemonStatusInTeam){
                pokemon.in_team = !pokemonStatusInTeam
                await pokemon.save()
                res.status(200).json(pokemon)
            }else{
                return res.status(400).json({message:"Bad pokemon status"})
            }
         }else{
            return res.status(400).json({message:"Bad pokemon status"})
         }         
     } catch (error) {
         res.status(500).json({error:error.message})        
     }
}
