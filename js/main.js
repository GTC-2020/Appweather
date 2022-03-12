import { UI_ELEMENTS } from "./view.js";
import { getCityName } from "./view.js";
import { showTemperature } from "./view.js";
import { showName } from "./view.js";
import { shoImageWeatherState } from "./view.js";
import { addCityLocation } from "./view.js";
import { deleteCity } from "./view.js";
import { showSunSetRise } from "./view.js";
import { forecast } from "./view.js";

export let listOfCity = [];

const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
export const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
export const SERVER_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast`

export function createUrl(url,cityName){
    return `${url}?q=${cityName}&appid=${API_KEY}&units=metric`;

}

export function getDate(url){
    return fetch(url)
    .then(response => response.json())
}

export function correctTimeByTiemZone(hourUTC, timezone, minets){
    let hour = '';
    let minet = '';
    let h = hourUTC + timezone / 3600;
    if(h > 24){
        h = h-24;
    } 

    if(h < 10){
        hour = '0' + h;
    }else  hour = +h;

    if(minets < 10){
        minet = '0' + minets;
    } else minet = +minets;

    return `${hour}:${minet}`;
}
 



UI_ELEMENTS.BUTTON_SEARCH.addEventListener('click',function(){
    let cityName = getCityName();
    showName(cityName);
    showTemperature(cityName);
    shoImageWeatherState(cityName);
    deleteCity();
    showSunSetRise(cityName);
    forecast(cityName);
    UI_ELEMENTS.INPUT_CITY.value = '';
})

UI_ELEMENTS.BUTTON_ADD_CITY.addEventListener('click', function(){
    addCityLocation();
})
