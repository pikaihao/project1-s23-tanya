export default async function handler(req, res) {
    // returns name, sprite, and type
    // assuming every request is GET buuuuut
    if (req.method = "GET") {
        var req_string = "https://pokeapi.co/api/v2/pokemon/"
        req_string = req_string.concat(Math.floor(Math.random() * (1279 - 1 + 1) ) + 1)

        try {
            const response = await fetch(req_string)
            const responseAsJson = await response.json()
            let pokemonName = responseAsJson.species.name
            let sprite = responseAsJson.sprites.front_default
            // responseAsJson.types is an array of key:value pairs
            const types = []
            // iterate thru 
            for (let i = 0; i < responseAsJson.types.length; i++) {
                types[i] = responseAsJson.types[i].type.name
            }
            return res.json({"pokemonName":pokemonName,
                            "sprite":sprite,
                            "types":types})
        }
        catch (error) {
            console.error(error)
        }
        
    }
}