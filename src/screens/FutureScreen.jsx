import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import {theme} from '../theme';
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import {getData, storeData} from '../utils/asyncStorage';
import {Ic_Rain, Ic_Uv, Ic_Bar} from '../components/Icons';
import {backgroundGenerator} from '../utils/funcSupport';

export default function FutureScreen({navigation}) {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

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
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Islamabad';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;
  console.log(location);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <ImageBackground
        source={require('../assets/images/morning.jpg')}
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

            {/* forecast section */}
            <View className="mx-4 flex justify-around flex-1 mb-2">
              {/* location */}
              <Text className="text-white text-center text-2xl font-bold">
                {location?.name},
                <Text className="text-lg font-semibold text-gray-300">
                  {location.country}
                </Text>
              </Text>
              {/* weather icon */}
              <View className="flex-row justify-center">
                <Image
                  source={{uri: 'https:' + current?.condition?.icon}}
                  className="w-52 h-52"
                />
              </View>
              {/* degree celcius */}
              <View className="space-y-2">
                <Text className="text-center font-bold text-white text-6xl ml-5">
                  {current?.temp_c}&#176;
                </Text>
                <Text className="text-center text-white text-xl tracking-widest">
                  {current?.condition?.text}
                </Text>
              </View>

              {/* other stats */}
              <View className="flex-row justify-between mx-4">
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-white font-semibold text-base">
                    {current?.wind_kph}km
                  </Text>
                </View>
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-white font-semibold text-base">
                    {current?.humidity}%
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
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{paddingHorizontal: 15}}
                showsHorizontalScrollIndicator={false}>
                {weather?.forecast?.forecastday?.map((item, index) => {
                  const date = new Date(item.date);
                  const options = {weekday: 'long'};
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName = dayName.split(',')[0];

                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                      style={{backgroundColor: theme.bgWhite(0.15)}}>
                      <Image
                        source={{uri: 'https:' + item?.day?.condition?.icon}}
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        )}
        <Text className="mx-auto text-white opacity-60 mt-8 mb-2">
          Thông tin được cung cấp bởi{' '}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={() => Linking.openURL('https://www.weatherapi.com/')}>
            WeatherApi
          </Text>
        </Text>
      </ImageBackground>
    </View>
  );
}
