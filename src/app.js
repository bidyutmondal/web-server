const express = require('express')
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.port || 3000

//Define paths for Express config
const publilcDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views to serve
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup statc directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Home',
        desc: 'Welcome to our site',
        author: 'Bidyut Mondal',
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        desc: 'Let us know how can we help you.',
        author: 'Bidyut Mondal',
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        desc: 'This is the about page',
        author: 'Bidyut Mondal',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'Please provide an address.'
        })
    } else{
        const address = req.query.address;
        geocode(address, (error, data) => {
            if(error){
                res.send({error})
            } else{
                //console.log(data);
                if(data){
                    forecast(data.latitude, data.longitude, (error, forecastData) => {
                        if(error){
                            res.send({error})
                        }
                        else{
                            res.send(forecastData);
                        }
                    })
                }
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        desc: 'Help article not found.',
        author: 'Bidyut Mondal',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        desc: '404. Page not found.',
        author: 'Bidyut Mondal',
    })
})

app.listen(port, () => {
    console.log('The server is up at port ' + port);
})