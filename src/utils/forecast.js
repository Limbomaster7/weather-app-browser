const request = require("request")


const forecast = (lat, long, callback) => {

    const url = `https://api.darksky.net/forecast/c6a79d5de6fd408057f029ba7b76e2bf/${lat}, ${long}`

    request({ url, json: true }, (error, data) => {

        if (error) {

            callback("Unable to connect!", undefined)

        } else if (data.body.error) {

            callback("Unable to find location", undefined)


            
        } 
        
        else {
            const current = data.body.daily
            callback(undefined, `It is currently ${current.data[0].summary} There is ${current.data[0].precipProbability} % chance of rain!`)
        }  
    })


    
    
}


module.exports = forecast