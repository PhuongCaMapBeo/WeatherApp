import axios from "axios";
import { apiKey } from "../constrants";

const forecastEndpoint = params=> `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=yes&alerts=no&lang=vi`;
const locationsEndpoint = params=> `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;
const futureEndpoint = params =>`http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${params.cityName}&dt=${params.date}&aqi=yes&alerts=no&lang=vi`
const apiCall = async (endpoint)=>{
    const options = {
        method: 'GET',
        url: endpoint,
    };

      try{
        const response = await axios.request(options);
        return response.data;
      }catch(error){
        console.log('error: ',error);
        return {};
    }
}

export const fetchWeatherForecast = params=>{
    let forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl);
}

export const fetchLocations = params=>{
    let locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl);
}
export const fetchWeatherFuture = params=>{
    let futureUrl = futureEndpoint(params);
    return apiCall(futureUrl);
}