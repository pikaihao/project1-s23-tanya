export default async function handler(req, res) {
    if (req.method = "POST") {
        var req_string = "https://pokeapi.co/api/v2/pokemon/"
        var req_string = req_string.concat(req.body.pokemon)

        try {
            const response = await fetch(req_string)
            var responseAsJson = await response.json()
        }
        catch (error) {
            console.error(error)
        }
        
        for (let i = 0; i < responseAsJson.stats.length; i++) {
            if (responseAsJson.stats[i].stat.name == "hp") {
                let n = Math.floor(Math.random() * (255 - 1 + 1) ) + 1
                let ball = Math.floor(Math.random() * (255 - 1 + 1) ) + 1
                let hp_max = responseAsJson.stats[i].base_stat
                let hp_current = Math.floor(Math.random() * (hp_max - 1 + 1) ) + 1
                // \frac{(HP_{max} \times 255 \times 4)}{(HP_{current} \times BALL)}$
                let f = Math.floor((hp_max * 255) / (hp_current * ball))
                console.log(n)
                console.log(ball)
                console.log(hp_current)
                console.log(f)
                console.log(f >= n)
                if (f >= n) {
                    return res.json({"caught":true})
                }
                else {
                    return res.json({"caught":false})
                }
            }
        }
    }
}
