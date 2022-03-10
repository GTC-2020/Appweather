import { getDate } from "./main.js";
import { createUrl } from "./main.js";
import { correctHourByTiemZone } from "./main.js";

export const UI_ELEMENTS={
    INPUT_CITY:document.querySelector('#city_input'),
    BUTTON_SEARCH:document.querySelector('.search'),
    FIELD_NOW_CITY_NAME:document.querySelector('.fiels_name_city').querySelector('span'),
    FIELD_NOW_TEMPERATURE:document.querySelector('.field_grade').querySelector('span'),
    FIELD_NOW_IMAGE_STATE_WEATHER: document.querySelector('.fiels_state_weather').querySelector('img'),
    BUTTON_ADD_CITY:document.querySelector('#shape'),
    LIST_OF_CITY:document.querySelector('.added_city').querySelector('ul'),
    ADDED_CITY_NAME:document.querySelector('.added_city'),
    DETAILS_NAME_CITY:document.querySelector('.name-city').querySelector('p'),
    DETAILS_TEMPERATURE_FIELD:document.querySelector('.temperatuer'),
    DETAILE_FEELS_LIKE:document.querySelector('.feels_like'),
    DETAIL_WEATHER:document.querySelector('.weather'),
    DETAILS_SUNRISE:document.querySelector('.sunrise'),
    DETAILS_SUNSET:document.querySelector('.sunset'),

}

const ADD_ELEMENT_LIST_CITY =  '<div class="city_name"></div><div class="btn_delete">';

export function getCityName(){
    return UI_ELEMENTS.INPUT_CITY.value;
}

export function showName(cityName){
    getDate(createUrl(cityName))
     .then(respone => {
         UI_ELEMENTS.FIELD_NOW_CITY_NAME.textContent = respone.name;
         UI_ELEMENTS.DETAILS_NAME_CITY.textContent = respone.name;
     })
     .catch(err => alert('Введите им города'));
 }

export function  showTemperature(cityName){
    getDate(createUrl(cityName))
    .then(response => {
        UI_ELEMENTS.FIELD_NOW_TEMPERATURE.textContent = Math.floor(response.main.temp - 273.15);
        UI_ELEMENTS.DETAILS_TEMPERATURE_FIELD.textContent =  Math.floor(response.main.temp - 273.15);
        UI_ELEMENTS.DETAILE_FEELS_LIKE.textContent = Math.floor(response.main.feels_like - 273.15)
    })
    .catch(err => alert('Введите им города'));
  
}

export function showSunSetRise(cityName){
    getDate(createUrl(cityName))
    .then(response => {
        let timeSunrise = response.sys.sunrise;
        let timeSunSet = response.sys.sunset;
        let dateRise = new Date(timeSunrise * 1000);
        let dateSet = new Date(timeSunSet * 1000);
        let timezone =response.timezone;
        let hourUTCRise = dateRise.getUTCHours();
        let hourUTCSet = dateSet.getUTCHours();
        let hourRise = correctHourByTiemZone(hourUTCRise, timezone);
        let hourSet = correctHourByTiemZone(hourUTCSet, timezone);
        UI_ELEMENTS.DETAILS_SUNRISE.textContent = `${hourRise}:${dateRise.getUTCMinutes()}`;
        UI_ELEMENTS.DETAILS_SUNSET.textContent = `${hourSet}:${dateSet.getUTCMinutes()}`;
        
    })
    
}

 export function shoImageWeatherState(cityName){
    getDate(createUrl(cityName))
    .then(respone =>{
        UI_ELEMENTS.DETAIL_WEATHER.textContent = respone.weather[0].main;
        UI_ELEMENTS.FIELD_NOW_IMAGE_STATE_WEATHER.src = `https://openweathermap.org/img/wn/${respone.weather[0].icon}@4x.png`;
        
    })
    
     
 }

export function addCityLocation(){
    let addCity = document.createElement('li');
    addCity.innerHTML = ADD_ELEMENT_LIST_CITY;
    addCity.querySelector('.city_name').textContent = UI_ELEMENTS.FIELD_NOW_CITY_NAME.textContent;
    UI_ELEMENTS.LIST_OF_CITY.append(addCity);

    addCity.querySelector('.city_name').addEventListener('click', function(){
        showName(addCity.textContent);
        showTemperature(addCity.textContent);
        shoImageWeatherState(addCity.textContent);
        showSunSetRise(addCity.textContent);
        deleteCity();
    })
}
function deleteTask(event){
    event.currentTarget.parentNode.remove();
}

export function deleteCity(){
    let btnDelete = document.querySelectorAll('.btn_delete');
    for(let btn of btnDelete){
        btn.addEventListener('click', deleteTask);
    }
}