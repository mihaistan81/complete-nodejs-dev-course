const https = require('https')

const url = 'https://api.darksky.net/forecast/e55152ffd03a00c13bda0ee3f5d2ef21/37.8267,-122.4233?lang=ro&units=si';

const request = https.request(url, (response) => {
    let data = ''
    
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    })

    response.on('end', () => {
        body = JSON.parse(data)
        console.log(body);
    })
});
request.on('error', (error) => {
    console.log('An error: ', error);
})

request.end();