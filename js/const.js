export const URL_CONST= {
    API_KEY :'f660a2fb1e4bad108d6160b7f58c555f',
    SERVER_URL :'https://api.openweathermap.org/data/2.5/weather',
    SERVER_URL_FORCAST :`https://api.openweathermap.org/data/2.5/forecast`,
}



export const UI_ELEMENTS = {
    INPUT_CITY_NAME:{
        INPUT_VALUE: document.querySelector('#city_input'),
    },
    FIELD_NOW :{
        CITY_NAME: document.querySelector('.name').querySelector('span'),
        TEMPERATURE:document.querySelector('.field_grade').querySelector('span'),
        IMAGE_WEATHER_STATE:document.querySelector('.fiels_state_weather').querySelector('img'),
    },
    FIELD_DETAILS:{
        CITY_NAME:document.querySelector('.name-city').querySelector('p'),
        TEMPERATURE:document.querySelector('.temperature'),
        FEELS_LIKE:document.querySelector('.feels_like'),
        WEATHER:document.querySelector('.weather'),
        SUNRISE:document.querySelector('.sunrise'),
        SUNSET:document.querySelector('.sunset'),
    },
    LIST_FAVORITE_LOCATIONS:{
        FAVORITE_LIST:document.querySelector('.added_city').querySelector('ul'),
        CITY_NAME:document.querySelector('.city_name'),
    },
    FIELD_FORCAST:{
        CITY_NAME:document.querySelector('.city').querySelector('p'),
        DAILY_WEATHER:document.querySelector('.show_day_field_weather'),
    },

}

export const BUTTONS = {
    BUTTON_SEARCH:document.querySelector('.search'),
    BUTTON_ADD_FAVORITE_CITY:document.querySelector('#shape'),
}

export const NEW_HTML_ELEMENTS ={
    FAVORITE_LIST_CITY : '<div class="city_name"></div>',

    DAY_WEATHER_FORCAST: `<div class="day_weather">
    <div class="date_time">
        <span class="date">17 May</span>
        <span class="time">18:00</span>
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
</div>`,
}