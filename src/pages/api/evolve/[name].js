export default async function handler(req, res) {
    // pokeapi only lets me get the first 20 pokemon
    // tried to specify it in the search 
    if (req.method = "GET") {
        // given the name, get the evolution-chain id
        var req_string_base = "https://pokeapi.co/api/v2/evolution-chain/"
        var req_string2 = ""
        var i = 1

        // go thru all evolution-chain entries until you find one that matches
        while (i <= 1) {
            req_string2 = req_string_base.concat(21, "?offset=100&limit=100")
            try {
                var response2 = await fetch(req_string2)
                if (!response2) {
                    return res.send("None")
                }
                var responseAsJson2 = await response2.json()
            }
            catch {
                console.error(error)
            }
            console.log(responseAsJson2)

            // cases:

            // 1. no evo
            if (responseAsJson2.chain.species.name == req.query.name &&
                (responseAsJson2.chain.evolves_to).length == 0) {
                return res.json({"evolution":"None"})
            }

            // 2. lowest stage
            if (responseAsJson2.chain.species.name == req.query.name) {
                return res.json({"evolution":responseAsJson2.chain.evolves_to[0].species.name})
            }


            // 3. 2nd stage
            if (responseAsJson2.chain.evolves_to[0].species.name == req.query.name) {
                if (responseAsJson2.chain.evolves_to[0].evolves_to.length == 0) {
                    return res.json({"evolution":"None"})
                } else {
                    return res.json({"evolution":responseAsJson2.chain.evolves_to[0].evolves_to[0].species.name})
                }
            }

            // 4. last stage
            if (responseAsJson2.chain.evolves_to[0].evolves_to[0].species.name == req.query.name) {
                return res.json({"evolution":"None"})
            }

            i++
        }
    }
}
