import {useEffect, useState} from 'react';
import {Ic_Bar} from '../components/Icons';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Card} from 'react-native-paper';
import {getData} from '../utils/asyncStorage';
import {fetchWeatherForecast} from '../api/weather';
import axios from 'axios';
import {apiKey} from '../constrants';
import {backgroundGenerator} from '../utils/funcSupport';
import {ScrollView} from 'react-native-gesture-handler';

function HistoryScreen({navigation}) {
  const [dataLoc, setDataLoc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState([]);
  let historyLocData ;
  useEffect(() => {
    const fetchData = async () => {
      console.log(loading);
      setDataLoc( JSON.parse( await getData('HistoryLoc')));// get từ localstorage
      
      setWeather([]);
      if (dataLoc.length!== 0 ) {
        setLoading(false);
        console.log("1")
        dataLoc.map(loc => {
          axios
            .get(
              `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${loc}&days=${1}&aqi=yes&alerts=no&lang=vi`,
            )
            .then(res => {
              console.log(res.data.location)
              setWeather(weather => [...weather, res.data]);
            });
        });
      }else{
        setLoading(true);
      }
    };
    fetchData();
    console.log(dataLoc);
  }, [loading]);


  return (
<>
{loading ? null : (
    <SafeAreaView>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"
      />
      <ScrollView>
        <ImageBackground
          source={require('../assets/images/History.jpg')}
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}>
          <View className="mx-4 my-4 ">
            <View className="flex flex-row my-4 justify-between">
              <TouchableOpacity
                className="my-auto"
                onPress={() => navigation.toggleDrawer()}>
                <Ic_Bar color="white" />
              </TouchableOpacity>
              <Text className="text-xl font-light text-white my-auto">Sửa</Text>
            </View>
            <Text className="text-white text-3xl">Thời tiết</Text>
            <View>
              {weather.map((loc, index) => {
                return (
                  <Card className="mt-4" key={index}>
                    <View className="relative">
                      <Card.Cover
                        source={backgroundGenerator(
                          loc?.location?.localtime,
                          loc?.current?.condition?.code,
                        )}
                        className="h-[120]"
                      />
                      <View className="flex flex-row absolute justify-end mx-3.5 my-2">
                        <View className="basis-[65%]">
                          <Text className="text-white text-2xl">
                            {loc.location.name}
                          </Text>
                          <Text className="text-white text-base">
                            {loc.location.localtime.substr(11, 5)}
                          </Text>
                          <Text className="text-white mt-[24px] text-base">
                            {loc.current.condition.text}
                          </Text>
                        </View>
                        <Text
                          className={`text-white text-5xl basis-[35%] ${
                            loc.current.temp_c.toString().length > 2
                              ? 'pl-1'
                              : 'pl-8'
                          }`}>
                          {loc.current.temp_c}&#176;
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>)}
    </>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
