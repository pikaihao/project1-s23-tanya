import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await axios.get(url)
    return res.data
}

//const axios = require('axios');

export default async function handler(req, res) {
    // returns name, sprite, and type
    // assuming every request is GET buuuuut
    if (req.method = "GET") {
        var req_string = "https://pokeapi.co/api/v2/pokemon-species/"
        req_string = req_string.concat(req.query.name)

        try {
            const response = await fetch(req_string)
            const responseAsJson = await response.json()
            const response2 = await fetch(responseAsJson.growth_rate.url)
            var responseAsJson2 = await response2.json()
        }
        catch (error) {
            console.error(error)
        }

        var experience = 0
        for (let i = 0; i < responseAsJson2.pokemon_species.length; i++) {
            if (responseAsJson2.pokemon_species[i].name == req.query.name) {
                experience = responseAsJson2.levels[req.query.level].experience
            }
        }

        return res.json({"experience":experience})
    }
}