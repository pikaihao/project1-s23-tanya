export default async function handler(req, res) {
    // returns pokemon w higher base stat
    // just chose the first base stat listed lol
    if (req.method = "POST") {
        var req_string = "https://pokeapi.co/api/v2/pokemon/"
        var req_string_p1 = req_string.concat(req.body.pokemon1)
        var req_string_p2 = req_string.concat(req.body.pokemon2)

        try {
            const response_p1 = await fetch(req_string_p1)
            var responseAsJson_p1 = await response_p1.json()
        }
        catch (error) {
            console.error(error)
        }

        try {
            const response_p2 = await fetch(req_string_p2)
            var responseAsJson_p2 = await response_p2.json()
        }
        catch (error) {
            console.error(error)
        }

        if (responseAsJson_p1.stats[0].base_stat > responseAsJson_p2.stats[0].base_stat) {
            return res.json({"winner":req.body.pokemon1})
        }
        if (responseAsJson_p1.stats[0].base_stat < responseAsJson_p2.stats[0].base_stat) {
            return res.json({"winner":req.body.pokemon2})
        }
        return res.json({"winner":"tie!"})
    }
}
