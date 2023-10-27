import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  ImageBackground,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import {theme} from '../theme/index';
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import {getData, storeData} from '../utils/asyncStorage';
import FormForecastDay from '../components/commons/FormForecastDay';
import WeatherAdvice from '../components/commons/WeatherAdvice';
import Geolocation from 'react-native-geolocation-service';


import {backgroundGenerator, checkUv, windType} from '../utils/funcSupport';
import CardAir from '../components/commons/CardAir';
import CardDetail from '../components/commons/CardDetail';
import {
  Ic_Temperature,
  Ic_Wind,
  Ic_Rain,
  Ic_Eye,
  Ic_Uv,
  Ic_Pressure,
  Ic_Bar,
} from '../components/Icons/index';
import * as Progress from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';
import { searchSlice } from '../redux/searchSlice';



export default function HomeScreen({navigation,route}) {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const selectedLocation = useSelector(state=> state.search.loc);
  
  useEffect(()=>{
    if(selectedLocation){
    setLoading(true);
    fetchWeatherForecast({
      cityName: selectedLocation,
      days: numberForecastDay,
    }).then(data => {
      setWeather(data);
      setLoading(false);
    }).catch(error => {
      console.log(error,"aaaa");
      return error;
    });
  }
  },[selectedLocation])
 

  const numberOfDay = useSelector((state) => state.set.numberOfDay);
  const [numberForecastDay, setNumberForecastDay] = useState('7');
  const wind = useSelector((state) => state.set.wind);

  const [unitWind,setUnitWind] = useState(wind);
  // const [userLocation, setUserLocation] = useState(null);
 
  useEffect(()=> setNumberForecastDay(numberOfDay),[numberOfDay]);
  useEffect(()=>setUnitWind(wind),[wind])

  const temp= useSelector((state) => state.set.temp);

  const [unitTemp,setUnitTemp] = useState(temp);
  useEffect(()=>setUnitTemp(temp),[temp]);

  const dispatch = useDispatch();

 
  const handleSearch = search => {
    if (search && search?.length > 2)
      fetchLocations({cityName: search}).then(data => {
        setLocations(data);
      });
  };

  const handleLocation = async loc => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    let historyLoc =await getData('HistoryLoc') || [];
    console.log(historyLoc);
    if (historyLoc) {
      if (historyLoc?.length < 4) {
        historyLoc.push(loc.name);
        storeData('HistoryLoc', JSON.stringify(historyLoc));
      } else {
        historyLoc.shift();
        historyLoc.push(loc.name);
        storeData('HistoryLoc', JSON.stringify(historyLoc));
      }
    } else {
      storeData('HistoryLoc', JSON.stringify([loc.name]));
    }
    dispatch(searchSlice.actions.searchHistory());
  
    fetchWeatherForecast({
      cityName: loc.name,
      days: numberForecastDay,
    }).then(data => {
      setLoading(false);
      setWeather(data);
      storeData('city', loc.name);
    }).catch(error => {
      console.log(error,"aaaa");
      return error;
    });;
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, [numberForecastDay]);

  const fetchMyWeatherData = async () => {
    // let myCity = await getData('city');
    let cityName = 'Ha Noi';
    // if (myCity) {
    //   cityName = myCity;
    // }
    fetchWeatherForecast({
      cityName,
      days: numberForecastDay,
    })
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error,"aaaa");
        return error;
      });
    
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;

  return (
    <>
      {loading ? (
        <View className="w-screen h-screen">
          <ImageBackground
            source={require('../assets/images/day_night.jpg')}
            resizeMode="cover"
            style={{height: '100%', width: '100%'}}>
            {/* <ActivityIndicator animating={true} color={"#34c3eb"}  size={'number'}  className="mx-auto my-auto"/> */}
            <Progress.Bar
              progress={0.3}
              width={300}
              height={8}
              indeterminate={true}
              className="mx-auto my-auto"
              color="#34c0eb"
            />
          </ImageBackground>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* search section */}
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="dark-content"
          />
          <View>
            <ImageBackground
              source={backgroundGenerator(
                location?.localtime,
                current?.condition?.code,
              )}
              resizeMode="cover"
              style={{height: '100%', width: '100%'}}>
              <SafeAreaView className="flex flex-1">
                <View
                  className={`${
                    !showSearch ? 'flex flex-row justify-between' : ''
                  } mt-4`}>
                  {!showSearch ? (
                    <TouchableOpacity
                      className="mx-4"
                      onPress={() => navigation.toggleDrawer()}>
                      <Ic_Bar color="white" />
                    </TouchableOpacity>
                  ) : null}
                  <View
                    style={{height: '7%'}}
                    className="mx-4  my-1 relative z-50">
                    <View
                      className="flex-row justify-end items-center rounded-full"
                      style={{
                        backgroundColor: showSearch
                          ? theme.bgWhite(0.2)
                          : 'transparent',
                      }}>
                      {showSearch ? (
                        <TextInput
                          onChangeText={handleTextDebounce}
                          placeholder="Search city"
                          placeholderTextColor={'lightgray'}
                          className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                        />
                      ) : null}
                      <TouchableOpacity
                        onPress={() => toggleSearch(!showSearch)}
                        className="rounded-full p-3 m-1"
                        style={{backgroundColor: theme.bgWhite(0.3)}}>
                        {showSearch ? (
                          <XMarkIcon size="25" color="white" />
                        ) : (
                          <MagnifyingGlassIcon size="25" color="white" />
                        )}
                      </TouchableOpacity>
                    </View>
                    {locations?.length > 0 && showSearch ? (
                      <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                        {locations.map((loc, index) => {
                          let showBorder = index + 1 != locations?.length;
                          let borderClass = showBorder
                            ? ' border-b-2 border-b-gray-400'
                            : '';
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => handleLocation(loc)}
                              className={
                                'flex-row items-center border-0 p-3 px-4 mb-1 ' +
                                borderClass
                              }>
                              <MapPinIcon size="20" color="gray" />
                              <Text className="text-black text-lg ml-2">
                                {loc?.name}, {loc?.country}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    ) : null}
                  </View>
                </View>

                {/* forecast section */}
                <View className="mx-4 flex justify-around flex-1 mb-8">
                  {/* location */}
                  <Text className="text-white text-center text-2xl font-bold mb-8">
                    {location?.name},
                    <Text className="text-lg font-semibold text-gray-300">
                      {` ${location?.country}`}
                    </Text>
                  </Text>

                  {/* degree celcius */}
                  <View className="space-y-2 mt-4">
                    <Text className="text-center font-bold text-white text-6xl ml-5">
                      {unitTemp ==='c' ? current?.temp_c : current?.temp_f}&#176;
                    </Text>
                    <Text className="text-center text-white text-xl tracking-widest">
                      {current?.condition?.text}
                    </Text>
                  </View>
                </View>
                {/* forecast for next hours */}
                <View
                  className="flex flex-row justify-center items-center rounded-xl py-3 space-y-1 mx-4 max-w-screen-sm mt-2"
                  style={{backgroundColor: theme.bgWhite(0.15)}}>
                  <ScrollView
                    horizontal
                    contentContainerStyle={{paddingHorizontal: 5}}
                    showsHorizontalScrollIndicator={false}>
                    {weather.forecast?.forecastday[0]?.hour?.map(
                      (item, index) => {
                        let hour = item.time.substr(11, 5);
                        return (
                          <View className="mr-6" key={index}>
                            <Text className="text-white text-base font-semibold text-center">
                              {hour}
                            </Text>
                            <Image
                              // source={{uri: 'https:'+item?.day?.condition?.icon}}
                              source={{uri: 'https:' + item?.condition?.icon}}
                              className="w-11 h-11"
                            />
                            <Text className="text-white text-xl font-medium text-center">
                              {unitTemp ==='c' ? item?.temp_c : item?.temp_f}&#176;
                            </Text>
                          </View>
                        );
                      },
                    )}
                  </ScrollView>
                </View>
                {/* WeatherAdvice */}
                <WeatherAdvice code={current?.condition?.code} />
                {/* forecast for next days */}
                <View className="mb-8 space-y-3">
                  <View className="flex-row items-center justify-items-center mx-5 space-x-2">
                    <CalendarDaysIcon size="22" color="white" />
                    <Text className="text-white text-base mt-2 mx-auto my-auto">{`Dự báo ${numberForecastDay} ngày`}</Text>
                  </View>
                  <View
                    className={
                      'flex  rounded-xl py-4 space-y-1 mx-4 max-w-screen-sm'
                    }
                    style={{backgroundColor: '000000'}}>
                    {weather?.forecast?.forecastday.map((item, index) => (
                      <FormForecastDay key={index} item={item} />
                    ))}
                  </View>
                </View>
                {/* air quality */}
                <CardAir data={current?.air_quality} />
                {/* detailWeather */}
                <View className="p-4">
                  <Text className="text-white text-sm font-medium text-center text-left">
                    Chi tiết thời tiết
                  </Text>
                  <View className="flex flex-row flex-wrap justify-between">
                    <CardDetail
                      Icon={Ic_Temperature}
                      title={'Nhiệt độ cảm nhận'}
                      info={unitTemp ==='c' ? current?.feelslike_c : current?.feelslike_f}
                      unit={unitTemp ==='c' ? '°C' : '°F'}
                    />
                    <CardDetail
                      Icon={Ic_Wind}
                      title={windType(current?.wind_dir)}
                      info={`${unitWind=== 'k'? current?.wind_kph : current?.wind_mph}`}
                      unit={`${unitWind=== 'k'? 'km/h': 'm/ph'}`}
                    />
                    <CardDetail
                      Icon={Ic_Rain}
                      title={'Độ ẩm'}
                      info={current?.humidity}
                      unit={'%'}
                    />
                    <CardDetail
                      Icon={Ic_Eye}
                      title={'Tầm nhìn'}
                      info={current?.vis_km}
                      unit={'km'}
                    />
                    <CardDetail
                      Icon={Ic_Uv}
                      title={'UV'}
                      info={current?.uv}
                      unit={checkUv(current?.uv)}
                    />
                    <CardDetail
                      Icon={Ic_Pressure}
                      title={'Áp suất không khí'}
                      info={current?.pressure_mb}
                      unit="hPa"
                    />
                  </View>
                </View>
                <Text className="mx-auto text-white opacity-60 mt-4 mb-2">
                  Thông tin được cung cấp bởi{' '}
                  <Text
                    style={{textDecorationLine: 'underline'}}
                    onPress={() =>
                      Linking.openURL('https://www.weatherapi.com/')
                    }>
                    WeatherApi
                  </Text>
                </Text>
              </SafeAreaView>
            </ImageBackground>
          </View>
        </ScrollView>
      )}
    </>
  );
}
