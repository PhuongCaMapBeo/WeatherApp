import {View,Text} from "react-native";
import {theme} from '../../theme/index';
import { useEffect, useState } from "react";
import axios from "axios";
import { adaptNavigationTheme } from "react-native-paper";

function WeatherAdvice({code}) {
    
    const [advice,setAdvice] = useState([]);
    useEffect(()=>{
        if(code !== 1000){
            const dataAdvice = async ()=>{
                try{
                    const res = await axios.post(`https://server-phuong-weather.onrender.com/get-advice-by-code?code=${code}`)
                    let dataAdvice = [ res.data.weatherConVn,res.data.adviceVn]
                    setAdvice(dataAdvice);
                }catch{
                    let dataAdvice = ["Trời nắng và trong trẻo", "Hãy tận hưởng thời tiết đẹp!"]
                    setAdvice(dataAdvice);
                }
            };
            dataAdvice();
        }else{

        }

    }, [code])
    
   console.log(advice);

    return ( <View className="flex-col items-center justify-items-center mx-5 space-x-2 my-8">
        <Text className="text-white text-lg font-semibold text-center">{advice[0]}</Text>
        <Text className="text-white text-lg ">{advice[1]}</Text>

    </View> );
}

export default WeatherAdvice;


<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
</svg>
