import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import {theme} from '../theme';
import {fetchWeatherFuture} from '../api/weather';
import {Ic_Rain, Ic_Uv, Ic_Bar} from '../components/Icons';
import Dialog from "react-native-dialog";
import * as Progress from 'react-native-progress';
import {Popup} from 'react-native-popup-confirm-toast';
import { useSelector } from 'react-redux';



export default function FutureScreen({navigation}) {
  const [showSearch, toggleSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [weather, setWeather] = useState({});
  const [loc, setLoc] = useState("");
  const [time,setTime] = useState("");
  const temp= useSelector((state) => state.set.temp);
  const [unitTemp,setUnitTemp] = useState(temp);
  useEffect(()=>setUnitTemp(temp),[temp]);

  const handleSearch = search => {
      setLoading(true);
      fetchWeatherData();
      toggleSearch(false);
      setLoc("");
      setTime("");
  };
  const handleCancel =()=>{
    toggleSearch(false);
    setLoc("");
    setTime("");
  }

  useEffect(() => {
    if (err) {
      Popup.show({
        type: 'danger',
        title: 'Thất bại!',
        textBody: 'Thời gian phải ở định dạng yyyy-MM-dd và trong khoảng từ 14 ngày đến 300 ngày kể từ hôm nay trong tương lai hoặc địa điểm không hợp lệ. ',
        buttonText: 'OK',
        callback: () => {Popup.hide(), setErr(false)}
      });
    }
  }, [err]);
 useEffect(() => {
  setLoading(true)
  fetchWeatherData();
}, []);

 const fetchWeatherData =async () => {
  let cityName = 'Ha Noi';
  let date = '2024/01/01'
  if(loc.length != 0 ){
    cityName = loc,
    date = time
  }
  fetchWeatherFuture({
    cityName: cityName,
    date: date
  })
    .then(data => {
      setLoading(false);
      setErr(false)
      if(JSON.stringify(data) === '{}'){
        setErr(true);
      }else{
        setWeather(data);
      }
     
    })
    .catch(error => {
      console.log("callapi",error);
      return error;
    });
};

  const {location, current} = weather;
  console.log(err);

  return (
    <ScrollView className="flex-1">
      <StatusBar style="light" />
      { loading ? (
      <View className="w-screen h-screen"> 
       <ImageBackground
       source={require('../assets/images/day_night.jpg')}
       resizeMode="cover"
       style={{height: '100%', width: '100%'}}>
      {/* <ActivityIndicator animating={true} color={"#34c3eb"}  size={'number'}  className="mx-auto my-auto"/> */}
      <Progress.Bar progress={0.3} width={300} height={8} indeterminate={true} className="mx-auto my-auto" color="#34c0eb"/>
      </ImageBackground>
      </View>
      ) : (
      <ImageBackground
        source={require('../assets/images/future.jpg')}
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}>
        {loading ? null : (
          <SafeAreaView className="flex flex-1 mx-4 my-2">
            {/* search section */}
            <View
              className={
                 'flex flex-row justify-between'}>
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}>
                <Ic_Bar color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                className="rounded-full p-3 m-1"
                style={{backgroundColor: theme.bgWhite(0.3)}}>
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>

            <View >
              <Dialog.Container visible={showSearch}>
                <Dialog.Input label="Địa điểm"  onChangeText={(e)=>setLoc(e)} value={loc}/>
                <Dialog.Input label="Thời gian" onChangeText={(e)=>setTime(e)} value={time} />
                <Dialog.Button label="Hủy bỏ" onPress={handleCancel}  />
                <Dialog.Button label="Tìm kiếm" onPress={handleSearch} disabled ={!(time !== "" && loc !== "")} color={!(time !== "" && loc !== "") ? "#878282" : "#169689"}  />
              </Dialog.Container>
            </View>


            {/* forecast section */}
            <View className="mx-4 flex justify-around flex-1 mb-2">
              {/* location */}
              <Text className="text-white text-center text-3xl font-bold">
                {location?.name},
                <Text className="text-lg font-semibold text-gray-300">
                  {location?.country}
                </Text>
              </Text>
              {/* weather icon */}
              <View className="flex-row justify-center">
                <Image
                  source={{uri: 'https:' + weather?.forecast?.forecastday[0]?.day?.condition?.icon}}
                  className="w-52 h-52"
                />
              </View>
              {/* degree celcius */}
              <View className="space-y-2">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                  {unitTemp==='c' ? weather?.forecast?.forecastday[0]?.day?.avgtemp_c : weather?.forecast?.forecastday[0]?.day?.avgtemp_f}&#176;
                </Text>
                <Text className="text-center text-white text-xl tracking-widest">
                  {weather?.forecast?.forecastday[0]?.day?.condition?.text}
                </Text>
              </View>

              {/* other stats */}
              <View className="flex-row justify-between mx-4 mt-4">
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.day?.maxwind_kph}km
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.day?.avghumidity}%
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Ic_Uv />
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>

            {/* forecast for next days */}
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <CalendarDaysIcon size="22" color="white" />
                <Text className="text-white text-base">Dự báo hàng giờ</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}>
                {weather.forecast?.forecastday[0]?.hour?.map((item, index) => {
                  let hour = item.time.substr(11, 5);
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                      style={{backgroundColor: theme.bgWhite(0.15)}}>
                      <Image
                        source={{uri: 'https:' + item?.condition?.icon}}
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{hour}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.temp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        )}
        <Text className="mx-auto text-white opacity-60 mt-10 mb-2">
          Thông tin được cung cấp bởi{' '}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={() => Linking.openURL('https://www.weatherapi.com/')}>
            WeatherApi
          </Text>
        </Text>
      </ImageBackground>)
    }
    </ScrollView>
  );
}
