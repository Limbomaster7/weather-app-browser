const path = require("path")
const hbs = require("hbs")

const express = require("express")
const app = express()
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../templates/views"))
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.use(express.static(path.join(__dirname, "../public")))





app.get("", (req, res) => {

    res.render("index", {
        title: "Weather",
        name: "Jin Kim"
    })
    
})

app.get("/about", (req, res) => {

    res.render("about", {
        title: "About Page",
        name : "Jin Kim"
    })
})
app.get("/help", (req, res) => {

    res.render("help", {
        helpText: "This is some help text",
        title: "Help",
        name: "Jin Kim"
    })
})



app.get("/weather", (req,res) => {

    if (!req.query.address) {

        return res.send({
            error: "You must provide address"
        })

    }

    geocode(req.query.address, (error, data) => {


        if (error) {
            return res.send({
                error
            })
        } 
    
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            } 
    
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
    
    
        
    })

    

})

})


app.get("/products", (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products: []
    })


    
})


app.get("/help/*", (req, res) => {

    res.render("404", {
        message: "Help page non-existence - 404 error"
    })
    
})

app.get("*", (req, res) => {

    res.render("404", {
        message: "The page you are looking for does not exist - 404 error"
    })

})

app.listen(3000, () => {

    console.log(`Server running at 3000`)
})