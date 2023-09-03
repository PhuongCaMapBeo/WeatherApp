import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import {theme} from '../theme/index';
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import * as Progress from 'react-native-progress';
import {getData, storeData} from '../utils/asyncStorage';
import FormForecastDay from '../components/commons/FormForecastDay';
import {SelectList} from 'react-native-dropdown-select-list';
import WeatherAdvice from '../components/commons/WeatherAdvice';

import { backgroundGenerator } from '../utils/funcSupport';


export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [numberForecastDay, setNumberForecastDay] = useState('2');


  const data = [
    {key: '1', value: '1'},
    {key: '2', value: '2'},
    {key: '3', value: '3'},
    {key: '4', value: '4'},
    {key: '5', value: '5'},
    {key: '6', value: '6'},
    {key: '7', value: '7'},
  ];


  const handleSearch = search => {
    // console.log('value: ',search);
    if (search && search.length > 2)
      fetchLocations({cityName: search}).then(data => {
        // console.log('got locations: ',data);
        setLocations(data);
      });
  };

  const handleLocation = loc => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setLoading(false);
      setWeather(data);
      storeData('city', loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, [numberForecastDay]);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Ha Noi';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: numberForecastDay,
    })
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;


  return (
    <>
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center w-full h-full">
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="dark-content"
          />
          <Image
            blurRadius={70}
            source={require('../assets/images/morning.jpg')}
            className="absolute w-full h-full"
          />
          <Progress.CircleSnail
            thickness={10}
            size={140}
            color="#20bde8"
            className="mx-auto my-auto"
          />
        </View>
      ) : (
        <ScrollView>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="dark-content"
          />
          <Image
            blurRadius={70}
            source={backgroundGenerator(location?.localtime,current?.condition?.code)}
            className="absolute w-full h-full"
          />
          <SafeAreaView className="flex flex-1">
            {/* search section */}

            <View style={{height: '7%'}} className="mx-4 relative z-50">
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
              {locations.length > 0 && showSearch ? (
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl ">
                  {locations.map((loc, index) => {
                    let showBorder = index + 1 != locations.length;
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

            {/* forecast section */}
            <View className="mx-4 flex justify-around flex-1 mb-2 mt-8">
              {/* location */}
              <Text className="text-white text-center text-2xl font-bold">
                {location?.name},
                <Text className="text-lg font-semibold text-gray-300">
                  {location?.country}
                </Text>
              </Text>
              {/* weather icon */}
              <View className="flex-row justify-center">
              </View>

              {/* degree celcius */}
              <View className="space-y-2 mt-4">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                  {current?.temp_c}&#176;
                </Text>
                <Text className="text-center text-white text-xl tracking-widest">
                  {current?.condition?.text}
                </Text>
              </View>

              {/* other stats */}
              <View className="flex-row justify-between mx-4 mt-2">
                <View className="flex-row space-x-2 items-center">
                  {/* <Image source={require('../assests/icons/wind.png')} className="w-6 h-6" /> */}
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require('../assets/icons/drop.png')}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Image
                    source={require('../assets/icons/sun.png')}
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-semibold text-base">
                    {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>
            {/* forecast for next hours */}
            <View
              className="flex flex-row justify-center items-center rounded-xl py-3 space-y-1 mx-4 max-w-screen-sm mt-2"
              style={{backgroundColor: theme.bgWhite(0.15)}}>
              <ScrollView
                horizontal
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}>
                {weather.forecast?.forecastday[0]?.hour?.map((item, index) => {
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
                        {item?.temp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            {/* WeatherAdvice */}
            <WeatherAdvice code={current?.condition?.code}/>
            {/* forecast for next days */}
            <ScrollView className="mb-2 space-y-3">
              <View className="flex-row items-center justify-items-center mx-5 space-x-2">
                <CalendarDaysIcon size="22" color="white" />
                <SelectList
                  setSelected={val => setNumberForecastDay(val)}
                  data={data}
                  // save="value"
                  search={false}
                  placeholder=""
                  defaultOption={{key: '7', value: '7'}}
                />
                <Text className="text-white text-base mt-2">{`Dự báo ${numberForecastDay} ngày`}</Text>
              </View>
              <View
                className={
                  'flex  rounded-xl py-3 space-y-1 mx-4 max-w-screen-sm'
                }
                style={{backgroundColor: theme.bgWhite(0.15)}}>
                {weather?.forecast?.forecastday.map((item, index) => (
                  <FormForecastDay key={index} item={item} />
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
          <Text className="text-white mx-auto my-auto mt-40 mb-2">
            Design by @Phuong
          </Text>
        </ScrollView>
      )}
    </>
  );
}