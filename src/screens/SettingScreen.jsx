import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {
  Ic_Bar,
  Ic_ChevronDown,
  Ic_Date,
  Ic_Language,
  Ic_Info,
  Ic_ChevronRight,
} from '../components/Icons';
import {List} from 'react-native-paper';
import * as React from 'react';
import SwitchSelector from 'react-native-switch-selector';

function SettingScreen({navigation}) {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  return (
    <SafeAreaView className="bg-neutral-300">
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View className="mx-4 my-4 ">
        <View className="flex flex-row my-4">
          <TouchableOpacity
            className=""
            onPress={() => navigation.toggleDrawer()}>
            <Ic_Bar color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-semibold text-black mx-auto my-auto">
            Cài đặt
          </Text>
        </View>
        <View className="my-2">
          <Text className="text-xl text-black">Đơn vị</Text>
          <View className="bg-white rounded-lg my-2 ">
            <View className="mx-2 my-2">
              <Text className="text-black text-lg pl-2">Nhiệt độ</Text>
              <View className="max-w-[100px]">
              <SwitchSelector
                initial={0}
                valuePadding={0}
                // onPress={value => this.setState({ gender: value })}
                textColor={'#0893c9'} //'#7a44cf'
                selectedColor={'#fff'}
                buttonColor={'#0893c9'}
                borderColor={'#0893c9'}
                hasPadding
                options={[
                  {label: 'F', value: 'f'},
                  {label: 'C', value: 'c'},
                ]}
                testID="gender-switch-selector"
                accessibilityLabel="gender-switch-selector"
              />
              </View>
            </View>
            <View className="mx-2 my-2">
              <Text className="text-black text-lg pl-2">Gió</Text>
            </View>
          </View>
        </View>
        <View className="my-2">
          <Text className="text-xl text-black">Ứng dụng</Text>
          <View className="bg-white rounded-lg my-2">
            <List.Section>
              <List.Accordion
                title="Ngôn ngữ"
                style={{paddingLeft: 12, paddingTop: 1, paddingBottom: 1}}
                titleStyle={{fontSize: 18, marginTop: -8}}
                left={props => <Ic_Language />}
                right={props => <Ic_ChevronDown />}>
                <List.Item title="VietNamese" />
                <List.Item title="English" />
              </List.Accordion>

              <List.Accordion
                title="Số ngày dự báo"
                style={{paddingLeft: 12, paddingTop: 1, paddingBottom: 1}}
                titleStyle={{fontSize: 18, marginTop: -8}}
                right={props => <Ic_ChevronDown />}
                left={props => <Ic_Date />}
                expanded={expanded}
                onPress={handlePress}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
              </List.Accordion>
              <List.Accordion
                title="Về chúng tôi"
                style={{paddingLeft: 12, paddingTop: 1, paddingBottom: 1}}
                titleStyle={{fontSize: 18, marginTop: -8}}
                right={props => <Ic_ChevronRight />}
                left={props => <Ic_Info />}></List.Accordion>
            </List.Section>
          </View>
          <View className="bg-white rounded-lg my-2">
            <List.Section>
              <List.Accordion
                title="Trợ giúp"
                style={{paddingTop: 1, paddingBottom: 1}}
                titleStyle={{fontSize: 18}}
                right={props => <Ic_ChevronRight />}></List.Accordion>
              <List.Accordion
                title="Quản lý và chính sách"
                style={{paddingTop: 1, paddingBottom: 1}}
                titleStyle={{fontSize: 18}}
                right={props => <Ic_ChevronRight />}></List.Accordion>
            </List.Section>
          </View>
        </View>
        <View className="mx-auto mt-4">
          <Text className="opacity-60">
            Thông tin được cung cấp bởi{' '}
            <Text
              style={{color: 'blue', textDecorationLine: 'underline'}}
              onPress={() => Linking.openURL('https://www.weatherapi.com/')}>
              WeatherApi
            </Text>
          </Text>
          <Image
            source={require('../assets/images/weatherApi.png')}
            style={{width: 60, height: 60}}
            className="mx-auto mt-4"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SettingScreen;
