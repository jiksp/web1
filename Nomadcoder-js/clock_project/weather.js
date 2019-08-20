const weather = document.querySelector(".js-date");
const API_KEY = "29f0548095cc76ebce2f746a3bfe15b6";
const COORDS = "coords";

 function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=127&appid=${API_KEY}&units=metric`
        //`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${API_KEY}`//
        ).then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
 }

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longtitude;
    const coordsObj = {
        latitude,
        longtitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longtitude);
}

function handleGeoError() {
    
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longtitude);
    }
}

function init(){
    loadCoords();
}

init();