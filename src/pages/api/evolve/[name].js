export default async function handler(req, res) {
    // returns name, sprite, and type
    // assuming every request is GET buuuuut
    if (req.method = "GET") {
        var req_string = "https://pokeapi.co/api/v2/pokemon-species/"
        req_string = req_string.concat(req.query.name)

        try {
            const response = await fetch(req_string)
            const responseAsJson = await response.json()
            const response2 = await fetch(responseAsJson.evolution_chain.url)
            var responseAsJson2 = await response2.json()
        }
        catch (error) {
            console.error(error)
        }

        //check if passed in name is base species
        if (responseAsJson2.chain.species.name == req.query.name) {
            if (responseAsJson2.chain.evolves_to.length == 0) {
                return res.json({"evolution":responseAsJson2.chain.species.name})
            } else {
                return res.json({"evolution":responseAsJson2.chain.evolves_to[0].species.name})
            }
        }
        
        //check if is middle or last evo
        for (let i = 0; i < responseAsJson2.chain.evolves_to.length; i++) {
            //is middle
            if (responseAsJson2.chain.evolves_to[i].species.name == req.query.name) {
                if (responseAsJson2.chain.evolves_to[i].evolves_to.length != 0) {
                    return res.json({"evolution":responseAsJson2.chain.evolves_to[i].evolves_to[0].species.name})
                } else {
                    return res.json({"evolution":responseAsJson2.chain.evolves_to[i].species.name})
                }
            }
            else {
                return res.json({"evolution":responseAsJson2.chain.evolves_to[i].evolves_to[0].species.name})
            }
        }
    }
}
