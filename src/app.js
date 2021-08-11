const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const { query } = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title :'Weather',
        name : 'Prabhat Kasera'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title :'About',
        name : 'Prabhat Kasera'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        title :'Help',
        helpText : 'This is all about creating help, but as I am learning node js , so will write what my mentor will say.',
        name: 'Prabhat Kasera'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'you must provide a location to get weather information'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, {summary}) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast : summary,
                location,
                address: req.query.address,
                lat : latitude,
                long : longitude
            })
        })
    })
    
})
app.get('/products',(req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title :'Help article not found',
        message: 'Help article not found',
        name: 'Prabhat Kasera'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title :'404 : Page Not Found ',
        message: '404 : Page Not Found',
        name: 'Prabhat Kasera'
    })
})
// app.get('/help', (req, res) => {
//     res.send([{
//         name : 'Andrew',
//         age : 27
//     },{
//         name : 'Prabhat',
//         age : 34
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    res.send({
        forcast : 'Rain',
        location : 'Indore'
    })
})


// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})