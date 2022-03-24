import { URL_CONST, BUTTONS} from "./const.js";
import {changeStateFieldNow, changeStateFieldDetails, changeStateFieldForcast, getInputCityName, addFavoriteCity, createFavoriteListElement} from "./view.js";
import {setLocalStorageCurrentCity, setListOfFavoriteCity} from "./storage.js"


export let favoriteCityList = new Set();
const DEFAULT_CITY = "London";

export async function getDateByCityName(cityName){
    let cityWeather = {};

    let responseWeather = await (await fetch(createUrl(URL_CONST.SERVER_URL, cityName))).json();
    cityWeather.name = responseWeather.name;
    cityWeather.temp = Math.floor(responseWeather.main.temp);
    cityWeather.feels_like = Math.floor(responseWeather.main.feels_like);
    cityWeather.sunrise = responseWeather.sys.sunrise;
    cityWeather.sunset = responseWeather.sys.sunset;
    cityWeather.timezone = responseWeather.timezone;
    cityWeather.weather = responseWeather.weather[0].main;
    cityWeather.icon = responseWeather.weather[0].icon;

    let responseForcast = await (await fetch(createUrl(URL_CONST.SERVER_URL_FORCAST, cityName))).json();
    cityWeather.list = responseForcast.list;

    return cityWeather;
}

export function createUrl(url,cityName){
    return `${url}?q=${cityName}&appid=${URL_CONST.API_KEY}&units=metric`;
}

export function formatTime(hour, minets){
    if(hour > 24){
        hour = hour -24;
    }
    if(hour < 10){
        return `0${hour}:${minets}`;
    }
    return `${hour}:${minets}`;
}

export function correctTimeByTiemZone(hourUTC, timezone){
    return hourUTC + timezone / 3600;
}

export function convertTimeFromMilisecumnd(millisecunds, timezone){
    let time = new Date(millisecunds * 1000);
    let hoursUTC = time.getUTCHours();
    let minutes = time.getMinutes();
   return formatTime(correctTimeByTiemZone(hoursUTC, timezone), minutes);
}

export function changeFavoriteList(cityName){
    let isFavorite = favoriteCityList.has(cityName);
    if(isFavorite){
        favoriteCityList.delete(cityName);
    } else {
        favoriteCityList.add(cityName);
    }
    return isFavorite;
}

function firstLoad(){
    let cityName = localStorage.getItem('currentFavoritCity') || DEFAULT_CITY;
    let city = JSON.parse(localStorage.getItem('listFavoriteCity'));
    changeStateFieldNow(cityName);
    changeStateFieldDetails(cityName);
    changeStateFieldForcast(cityName);
    showCityList(city);
    
};

export function showCityList(city){
    let favoriteCityList = new Set(city)
    favoriteCityList.forEach((value, valueAgain,set) => {
        changeFavoriteList(value);
        let listElement = createFavoriteListElement();
        listElement.querySelector('.city_name').textContent = value;
        listElement.addEventListener('click', function(){
            changeStateFieldNow(value);
            changeStateFieldDetails(value);
            changeStateFieldForcast(value);
            setLocalStorageCurrentCity(value);
        })
    });
}


window.onload = firstLoad();

BUTTONS.BUTTON_SEARCH.addEventListener('click', function(){
    let cityName = getInputCityName();
    changeStateFieldNow(cityName);
    changeStateFieldDetails(cityName);
    changeStateFieldForcast(cityName);
    setLocalStorageCurrentCity(cityName);
})

BUTTONS.BUTTON_ADD_FAVORITE_CITY.addEventListener('click', function(){
    addFavoriteCity();
    setListOfFavoriteCity();
    

})

