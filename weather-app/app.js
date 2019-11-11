const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if( !address ) {
    console.log('Please provide an address');
} else {
    geocode(address, (error, {latitude, longitude, location}) => {
        if(error) {
            return console.log('Error: ', error)
        }
    
        // -71.0596 , 42.3605 -> New York
        // 37.8267,-122.4233  -> Bucharest
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log('Error: ', error)
            }
            console.log('Location: ', location)
            console.log('Forecast: ', forecastData)
        })

    })
}