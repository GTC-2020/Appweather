import { getDate } from "./main.js";
import { createUrl } from "./main.js";
import { correctTimeByTiemZone } from "./main.js";
import { SERVER_URL } from "./main.js";
import { SERVER_URL_FORECAST } from "./main.js";
import { listOfCity } from "./main.js";



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
    FORECAST_CITYNAME:document.querySelector('#forecast').querySelector('p')
}

const ADD_ELEMENT_LIST_CITY =  '<div class="city_name"></div><div class="btn_delete"></div>';
const WEATHER_FORECAST = `<div class="day_weather">
    <div class="date_time">
        <span class="date"></span>
        <span class="time"></span>
    </div>
    <div class="weathet_state">
        <div class="show_temp">
            <ul>
                <li>Temperature: <span class="temp">13</span>
                <img src="img/mask.png" alt="" class="mask"><br></li>
                <li> Feels like: <span class="feels">10</span>
                <img src="img/mask.png" alt="" class="mask"</li>
            </ul>
       </div>
        <div class="image_state">
            <ul>
            <li><span class="state"></span></li>
            <li><img src="" height="40px" alt="rain"></li>
         </ul>
        </div>
    </div>
</div>`;






export function getCityName(){
    return UI_ELEMENTS.INPUT_CITY.value;
}

export function showName(cityName){
    getDate(createUrl(SERVER_URL,cityName))
     .then(respone => {
         console.log(respone);
         UI_ELEMENTS.FIELD_NOW_CITY_NAME.textContent = respone.name;
         UI_ELEMENTS.DETAILS_NAME_CITY.textContent = respone.name;
         UI_ELEMENTS.FORECAST_CITYNAME.textContent = respone.name;
     })
     .catch(err => alert('Введите название города'));
 }

export function  showTemperature(cityName){
    getDate(createUrl(SERVER_URL,cityName))
    .then(response => {
        UI_ELEMENTS.FIELD_NOW_TEMPERATURE.textContent = Math.floor(response.main.temp);
        UI_ELEMENTS.DETAILS_TEMPERATURE_FIELD.textContent =  Math.floor(response.main.temp);
        UI_ELEMENTS.DETAILE_FEELS_LIKE.textContent = Math.floor(response.main.feels_like)
    })
    .catch(err => alert('Введите название города'));
  
}

export function showSunSetRise(cityName){
    getDate(createUrl(SERVER_URL,cityName))
    .then(response => {
        let dateRise = new Date(response.sys.sunrise * 1000);
        let dateSet = new Date(response.sys.sunset * 1000);
        let timezone =response.timezone;
        UI_ELEMENTS.DETAILS_SUNRISE.textContent = correctTimeByTiemZone(dateRise.getUTCHours(), timezone,dateRise.getUTCMinutes());
        UI_ELEMENTS.DETAILS_SUNSET.textContent = correctTimeByTiemZone(dateSet.getUTCHours(), timezone, dateSet.getUTCMinutes());
    })
    
}

 export function shoImageWeatherState(cityName){
    getDate(createUrl(SERVER_URL,cityName))
    .then(respone =>{
        UI_ELEMENTS.DETAIL_WEATHER.textContent = respone.weather[0].main;
        UI_ELEMENTS.FIELD_NOW_IMAGE_STATE_WEATHER.src = `https://openweathermap.org/img/wn/${respone.weather[0].icon}@4x.png`;
        
    })
    
     
 }

export function addCityLocation(){
    let isAddedCity = listOfCity.includes(UI_ELEMENTS.FIELD_NOW_CITY_NAME.textContent);

    if(!isAddedCity){
        let addCity = document.createElement('li');
        addCity.innerHTML = ADD_ELEMENT_LIST_CITY;
        addCity.querySelector('.city_name').textContent = UI_ELEMENTS.FIELD_NOW_CITY_NAME.textContent;
        UI_ELEMENTS.LIST_OF_CITY.append(addCity);
        listOfCity.push(UI_ELEMENTS.FIELD_NOW_CITY_NAME.textContent);


        addCity.querySelector('.city_name').addEventListener('click', function(){
            showName(addCity.textContent);
            showTemperature(addCity.textContent);
            shoImageWeatherState(addCity.textContent);
            showSunSetRise(addCity.textContent);
            forecast(addCity.textContent);
        })

        addCity.querySelector('.btn_delete').addEventListener('click', function(){
            deleteCity();
        });
    }
}


function deleteTask(event){
    listOfCity.splice(listOfCity.findIndex(element => element === event.currentTarget.textContent), 1);
    event.currentTarget.parentNode.remove();
}

export function deleteCity(){
    let btnDelete = document.querySelectorAll('.btn_delete');
    for(let btn of btnDelete){
        btn.addEventListener('click', deleteTask);
    }
}



export function forecast(cityName){
    let oldelements = document.querySelector('.show_day_field_weather').querySelectorAll('.date_time');

    for(let element of oldelements){
        element.parentNode.remove();
    }

    getDate(createUrl(SERVER_URL_FORECAST,cityName ))
    .then(response => {
        let arr = response.list;
       console.log(response);


        arr.forEach(element => {
            let newElement = document.createElement('div');
            newElement.innerHTML = WEATHER_FORECAST;
            document.querySelector('.show_day_field_weather').append(newElement);
            let time = new Date(element.dt_txt);
            newElement.querySelector('.date').textContent = time.toLocaleDateString('en',{month:'long',day:'numeric'});
            newElement.querySelector('.time').textContent = time.toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'});
            newElement.querySelector('.temp').textContent= Math.floor(element.main.temp);
            newElement.querySelector('.feels').textContent = Math.floor(element.main.feels_like);
            newElement.querySelector('.state').textContent = element.weather[0].main;
            newElement.querySelector('.image_state').querySelector('img').src = `https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
            
        })
    })
}
