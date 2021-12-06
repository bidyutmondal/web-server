
console.log("Client side app.js loaded.");

const weatherForm = document.querySelector('form')
const inputLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = inputLocation.value

    messageOne.textContent = 'Loading weather forecast...'
    messageTwo.textContent = ''

    const url = 'http://localhost:3000/weather?address=' + encodeURI(location)

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            } else{
                messageOne.textContent = data.placeName;
                messageTwo.textContent = data.weather_desc;
            }
        })
    })

})