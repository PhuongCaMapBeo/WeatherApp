import {View,Text} from "react-native";
import {theme} from '../../theme/index';

function WeatherAdvice({code}) {
    const checkCode = (arr) => {
        return arr.filter((value) => value === code);
    }
    const advice =[];
    if(code === 1000)
        advice.push("Trời nắng và trong trẻo", "Hãy tận hưởng thời tiết đẹp!");
    else if(checkCode([1003,1006]))
        advice.push("Trời hơi có mây", "Có thể nên mang ô khi ra ngoài");
    else if(checkCode([1009, 1030, 1135, 1147, 1150, 1153]))
        advice.push("Sương mù hoặc mưa phùn","Hãy cẩn thận khi lái xe");
    else if(checkCode([1063, 1066, 1069, 1072, 1087, 1114, 1117]))
        advice.push( "Có thể có mưa","Hãy xem xét ở trong nhà")
    else if(checkCode([1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237 ]))
        advice.push("Đang có tuyết hoặc trời lạnh","Hãy giữ ấm và cẩn thận khi di chuyển")
    else if(checkCode([1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246]))
        advice.push( "Có mưa hoặc có thể có cơn mưa","Đừng quên mang ô")
    else if (checkCode(1261, 1264))
        advice.push("Có thể có mưa đá", "Hãy cẩn thận và chú ý đến các bước đi")
    else if(checkCode( 1273, 1276))
        advice.push("Có thể có cơn giông","Tìm nơi trú ẩn và tránh các khu vực mở")
    else if(checkCode(1279, 1282))
        advice.push("Có thể có tuyết kèm sấm sét","Ở trong nhà và tận hưởng cảnh tượng")
    else advice.push("Không rõ điều kiện thời tiết.", "");

    return ( <View className="flex-col items-center justify-items-center mx-5 space-x-2 my-8"
    >
        <Text className="text-white text-lg font-semibold text-center">{advice[0]}</Text>
        <Text className="text-white text-lg ">{advice[1]}</Text>

    </View> );
}

export default WeatherAdvice;


<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
</svg>
