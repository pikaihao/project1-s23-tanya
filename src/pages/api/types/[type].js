export default async function handler(req, res) {
    // returns name, sprite, and type
    // assuming every request is GET buuuuut
    if (req.method = "GET") {
        var req_string = "https://pokeapi.co/api/v2/type/"
        console.log(req.query.type)
        req_string = req_string.concat(req.query.type)

        try {
            const response = await fetch(req_string)
            const responseAsJson = await response.json()
            // responseAsJson.types is an array of key:value pairs
            const poke = []
            // iterate thru
            for (let i = 0; i < responseAsJson.pokemon.length; i++) {
                poke[i] = responseAsJson.pokemon[i].pokemon.name
                console.log(poke)
            }
            return res.json({"pokemon":poke})
        }
        catch (error) {
            console.error(error)
        }
    }
}
