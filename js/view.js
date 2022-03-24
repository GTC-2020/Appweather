import { UI_ELEMENTS,NEW_HTML_ELEMENTS } from "./const.js";
import{getDateByCityName, convertTimeFromMilisecumnd, changeFavoriteList} from "./main.js";
import { setLocalStorageCurrentCity, setListOfFavoriteCity } from "./storage.js";


export  async function  changeStateFieldNow(cityName){
    let weatherDate = await getDateByCityName(cityName);
    UI_ELEMENTS.FIELD_NOW.CITY_NAME.textContent = weatherDate.name;
    UI_ELEMENTS.FIELD_NOW.TEMPERATURE.textContent = weatherDate.temp;
    UI_ELEMENTS.FIELD_NOW.IMAGE_WEATHER_STATE.src = `https://openweathermap.org/img/wn/${weatherDate.icon}@4x.png`;
}

export async function changeStateFieldDetails(cityName){
    let weatherDate = await getDateByCityName(cityName);
    UI_ELEMENTS.FIELD_DETAILS.CITY_NAME.textContent = weatherDate.name;
    UI_ELEMENTS.FIELD_DETAILS.TEMPERATURE.textContent = weatherDate.temp;
    UI_ELEMENTS.FIELD_DETAILS.FEELS_LIKE.textContent = weatherDate.feels_like;
    UI_ELEMENTS.FIELD_DETAILS.WEATHER.textContent = weatherDate.weather;
    UI_ELEMENTS.FIELD_DETAILS.SUNRISE.textContent = convertTimeFromMilisecumnd(weatherDate.sunrise, weatherDate.timezone);
    UI_ELEMENTS.FIELD_DETAILS.SUNSET.textContent = convertTimeFromMilisecumnd(weatherDate.sunset, weatherDate.timezone)

}

export async function changeStateFieldForcast(cityName){
    clearForcastField();
    let weatherDate = await getDateByCityName(cityName);
    let listForcastWeather = weatherDate.list;
    UI_ELEMENTS.FIELD_FORCAST.CITY_NAME.textContent = weatherDate.name;
  
    listForcastWeather.forEach(element => {
        let hourWeather = createForcastElement();
        let time = new Date(element.dt_txt);
        hourWeather.querySelector('.date').textContent = time.toLocaleDateString('en',{month:'long',day:'numeric'});
        hourWeather.querySelector('.time').textContent = time.toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'});
        hourWeather.querySelector('.temp').textContent= Math.floor(element.main.temp);
        hourWeather.querySelector('.feels').textContent = Math.floor(element.main.feels_like);
        hourWeather.querySelector('.state').textContent = element.weather[0].main;
        hourWeather.querySelector('.image_state').querySelector('img').src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
    });
}

export function clearForcastField(){
    let dayWeatherArray =  UI_ELEMENTS.FIELD_FORCAST.DAILY_WEATHER.querySelectorAll('.day_weather');
    for(let dayWeather of dayWeatherArray){
        dayWeather.parentNode.remove();
    }
}

export function createForcastElement(){
    let element = document.createElement('div');
    element.innerHTML = NEW_HTML_ELEMENTS.DAY_WEATHER_FORCAST;
    UI_ELEMENTS.FIELD_FORCAST.DAILY_WEATHER.append(element);
    return element;
}

export function getInputCityName(){
    let cityName = UI_ELEMENTS.INPUT_CITY_NAME.INPUT_VALUE.value;
    clearInputValue();
    return cityName;

}

export function clearInputValue(){
    UI_ELEMENTS.INPUT_CITY_NAME.INPUT_VALUE.value = '';
}

export function createFavoriteListElement(){
    let element = document.createElement('li');
    element.innerHTML = NEW_HTML_ELEMENTS.FAVORITE_LIST_CITY;
    UI_ELEMENTS.LIST_FAVORITE_LOCATIONS.FAVORITE_LIST.append(element);
    return element;
}

export function addFavoriteCity(){
    let cityName = UI_ELEMENTS.FIELD_NOW.CITY_NAME.textContent;
    let isFavorite = changeFavoriteList(cityName);
    if(!isFavorite){
        let favoriteCity = createFavoriteListElement();
        favoriteCity.querySelector('.city_name').textContent = cityName;
        favoriteCity.addEventListener('click', function(){
            changeStateFieldNow(cityName);
            changeStateFieldDetails(cityName);
            changeStateFieldForcast(cityName);
            setLocalStorageCurrentCity(cityName);
        })
    } else{
        deleteFavoriteCity(cityName);
    }
    setListOfFavoriteCity();
}

function deleteFavoriteCity(cityName){
    let favoriteCity = document.querySelectorAll('.city_name');
    for(let city of favoriteCity){
        if(city.textContent === cityName){
            city.parentNode.remove();
        }
    }   
}