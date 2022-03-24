import { favoriteCityList} from "./main.js";
 



export function setLocalStorageCurrentCity(cityName){
    localStorage.setItem('currentFavoritCity', cityName);
}

export function setListOfFavoriteCity(){
    let cityArray = [];
    favoriteCityList.forEach((value, valueAgain, set)=>{
        cityArray.push(value);
    })
    localStorage.setItem('listFavoriteCity', JSON.stringify(cityArray));
}