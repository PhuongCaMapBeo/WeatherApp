import morningImage from '../assets/images/morning.jpg'
import afternoonImage from "../assets/images/afternoon.jpg";
import nightImage from '../assets/images/night.jpg';
import rainImage from '../assets/images/rain.jpg';
import stormImage from '../assets/images/storm.jpg';
import darkImage from '../assets/images/dark.jpg'

export const backgroundGenerator = (curTime,code)=>{
    if(checkCode([1000, 1003 ,1150, 1153],code))
        return getDayTime(curTime);
    else if (checkCode([1063, 1066, 1069, 1072, 1198, 1201, 1240, 1243, 1246, 1273, 1276],code))
        return rainImage;
    else if (checkCode([1087],code))
        return stormImage;
    else if (checkCode([ 1009, 1030, 1222, 1237, 1249, 1255, 1261],code))
        return darkImage;
    else return "";
} 
const getDayTime = (curTime)=>{
  const curHour = parseInt(curTime.substr(11, 2));
    if(curHour >= 6 && curHour <= 11){
        return morningImage;
    }else if(curHour>= 12 && curHour <= 17)
        return afternoonImage;
    else
        return nightImage;
}

const checkCode = (arr,code) => {
    return arr.filter((value) => value === code);
}