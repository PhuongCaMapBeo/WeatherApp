import {View, Image, Text} from 'react-native';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

function FormForecastDay({item}) {
  const temp= useSelector((state) => state.set.temp);

  const [unitTemp,setUnitTemp] = useState(temp);
  useEffect(()=>setUnitTemp(temp),[temp]);

  const date = new Date(item.date);
  const options = {weekday: 'long'};
  let dayName = date.toLocaleDateString('vi-VN', options);
  dayName = dayName.split(',')[0];
  return (
    <View className="flex flex-row justify-between mx-4 border-b-[1px] border-slate-300">
      <Text className="text-white text-lg font-normal text-center my-auto basis-[25%] text-left">{dayName}</Text>
      <Image source={{uri: 'https:' + item?.day?.condition?.icon}}  className="w-11 h-11 basis-[15%] "/>
      <Text className="my-auto text-white text-base basis-[30%] ml-[4px]" numberOfLines={1} ellipsizeMode="tail">{item?.day?.condition?.text}</Text>
      <Text className="text-white text-lg font-medium text-center my-auto basis-[25%]">{unitTemp ==='c' ? item?.day?.avgtemp_c : item?.day?.avgtemp_f}&#176;</Text>
    </View>
  );
}

export default FormForecastDay;
