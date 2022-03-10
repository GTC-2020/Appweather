import { UI_ELEMENTS } from "./view.js";
import { getCityName } from "./view.js";
import { showTemperature } from "./view.js";
import { showName } from "./view.js";
import { shoImageWeatherState } from "./view.js";
import { addCityLocation } from "./view.js";
import { deleteCity } from "./view.js";
import { showSunSetRise } from "./view.js";

const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
export const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';

export function createUrl(cityName){
    return `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;
}

export function getDate(url){
    return fetch(url)
    .then(response => response.json())
}

export function correctHourByTiemZone(hourUTC, timezone){
    let h = hourUTC + timezone / 3600;
    if(h > 24){
        return '0'+(h-24);
    }
    return h;
}




UI_ELEMENTS.BUTTON_SEARCH.addEventListener('click',function(){
    let cityName = getCityName();
    showName(cityName);
    showTemperature(cityName);
    shoImageWeatherState(cityName);
    deleteCity();
    showSunSetRise(cityName);
    UI_ELEMENTS.INPUT_CITY.value = '';
})

UI_ELEMENTS.BUTTON_ADD_CITY.addEventListener('click', function(){
    addCityLocation();
})
