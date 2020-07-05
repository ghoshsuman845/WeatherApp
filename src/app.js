const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title :'Weather App',
        name : 'Suman Ghosh'
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title :'About Me',
        name : 'Suman Ghosh'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        title :'Help page',
        helpText: 'Here we are to help you',
        name : 'Suman Ghosh'
    })
})

app.get('/weather', (req,res)=>{
   if(!req.query.address){
      return res.send({
           error: 'You must provide an address'
       })
   }

   geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
        return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({error})
        }

       res.send({
        forecast: forecastData,
        location,
        address : req.query.address
       })
       
    })
})
   
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMsg:'Help article not found',
        title: '404 error',
        name: 'Suman Ghosh'
    })
})

app.get('*', (req,res)=>{
   res.render('error',{
    errorMsg:'Page not found!',
    title: '404 error',
    name: 'Suman Ghosh'
   })
})

//to start the server
app.listen(port, ()=>{
    console.log('server is up on port '+ port);
    
})