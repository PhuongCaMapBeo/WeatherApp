import {Image, View, Text,ScrollView} from 'react-native';
import windIcon from '../../assets/icons/wind.png';
import {theme} from '../../theme/index';

function CardAir({data}) {
    let AirAdvice ={};
    if(data["us-epa-index"] === 6 ){
        AirAdvice.alert = "Nguy hiểm",
        AirAdvice.message = "Ra ngoài giờ này chỉ có đắp chiếu thôi.",
        AirAdvice.color = "#ff0000"
    }else if(data["us-epa-index"] === 5 || data["us-epa-index"] === 4){
        AirAdvice.alert = "Không lành mạnh",
        AirAdvice.message = "Hạn chế ra ngoài và sử dụng khẩu trang.",
        AirAdvice.color = "#ff7e00"
    }else if(data["us-epa-index"] === 3){
        AirAdvice.alert = "Trung bình",
        AirAdvice.message = "Hạn chế ra ngoài trong thời gian dài với những người nhạy cảm",
        AirAdvice.color = "#ffff00"
    }else if(data["us-epa-index"] === 2){
        AirAdvice.alert = "Tốt",
        AirAdvice.message = "Thật là một dịp đặc biệt để ra ngoài với bạn bè và người thân",
        AirAdvice.color = "#00e400"
    }else{
        AirAdvice.alert = "Tuyệt vời",
        AirAdvice.message ="Cùng người yêu bạn dạo quanh thành phố, tận hưởng không khí trong lành đi nào",
        AirAdvice.color = "#00e400"
    }
    console.log(AirAdvice)
  return (
    <View
      className={'flex  rounded-xl py-3 space-y-1 mx-4 mt-4 pb-4 max-w-screen-sm'}
      style={{backgroundColor: theme.bgWhite(0.3)}}>
     <View className="mx-4">
      <View className="flex flex-row">
        <Image source={windIcon} className="w-8 h-8" />
        <Text className="text-white text-xl mx-auto my-auto ml-4">Chất lượng không khí</Text>
      </View>
      <Text className={`text-3xl font-semibold mt-3`} style={{color: `${AirAdvice.color}`}}>{AirAdvice.alert}</Text>
      <Text className="text-white text-xl mt-2 text-justify">{AirAdvice.message}</Text>
      <View className="flex flex-row justify-between mt-4">
      <ScrollView
                horizontal
                contentContainerStyle={{paddingRight: 60}}
               showsHorizontalScrollIndicator={false}>
        <View className={`px-1 py-2 rounded-lg mr-3 border border-[#fff] min-w-[16%]`} style={{backgroundColor: `${AirAdvice.color}`}}>
            <Text className="text-black mx-auto my-auto font-semibold text-lg ">CO</Text>
            <Text className="text-black text-lg  mx-auto my-auto ">{data.co}</Text>
        </View>
        <View className={`px-1 py-2 rounded-lg mr-3 border border-[#fff] min-w-[16%]`} style={{backgroundColor: `${AirAdvice.color}`}}>
            <Text className="text-black mx-auto my-auto font-semibold text-lg">NO₂</Text>
            <Text className="text-black text-lg  mx-auto my-auto ">{data.no2}</Text>
        </View>
        <View className={`px-1 py-2 rounded-lg mr-3 border border-[#fff] min-w-[17%]`} style={{backgroundColor: `${AirAdvice.color}`}}>
            <Text className="text-black mx-auto my-auto font-semibold text-lg">O₃</Text>
            <Text className="text-black text-lg  mx-auto my-auto">{data.o3}</Text>
        </View>
        <View className={`px-1 py-2 rounded-lg mr-3 border border-[#fff] min-w-[16%]`} style={{backgroundColor: `${AirAdvice.color}`}}>
            <Text className="text-black mx-auto my-auto font-semibold text-lg">SO₂</Text>
            <Text className="text-black text-lg mx-auto my-auto">{data.so2}</Text>
        </View>
        <View className={`px-1 py-2 rounded-lg mr-3 border border-[#fff] min-w-[16%]`} style={{backgroundColor: `${AirAdvice.color}`}}>
            <Text className="text-black mx-auto my-auto font-semibold text-lg">PM₂.₅</Text>
            <Text className="text-black text-lg mx-auto my-auto ">{data.pm2_5}</Text>
        </View>
        <View className={`px-1 py-2 rounded-lg mr-3 border border-[#fff] min-w-[16%]`} style={{backgroundColor: `${AirAdvice.color}`}}>
            <Text className="text-black mx-auto my-auto text-lg font-semibold">PM₁₀</Text>
            <Text className="text-black text-lg  mx-auto my-auto">{data.pm2_5}</Text>
        </View>
        </ScrollView>
      </View>
      <Text className = "text-white text-base mt-2">Đơn vị đo: µg/m³ (Microgram trên mét khối)</Text>
      </View>
    </View>
  );
}

export default CardAir;
