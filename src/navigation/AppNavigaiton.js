import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import { Ic_Map } from '../components/Icons/Ic_Map';
import { Ic_Bar } from '../components/Icons/Ic_Bar';
import { Ic_Circle } from '../components/Icons/Ic_Circle';
import { Ic_Future } from '../components/Icons/Ic_Future';
import FutureScreen from '../screens/FutureScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ic_History } from '../components/Icons/Ic_History';
import { Ic_Eye } from '../components/Icons/Ic_Eye';
import CustomDrawerContent from '../components/commons/CustomDrawerContent';
import { Ic_Setting } from '../components/Icons/Ic_Setting';
import SettingScreen from '../screens/SettingScreen';

const Drawer = createDrawerNavigator();

const iconComponents = {
  Map: {focused: Ic_Map, unfocused: Ic_Map},
  Future: {focused: Ic_Future, unfocused: Ic_Future},
  Circle: {focused: Ic_Circle, unfocused: Ic_Circle},
  History: {focused: Ic_Bar, unfocused: Ic_Bar},
};

function AppNavigation() {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={
        {
          drawerStyle:{
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle:{
            backgroundColor: "#000",
            opacity: 0.16,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold"
          },
          drawerActiveBackgroundColor:"#9ecbe6" ,
          drawerActiveTintColor: "blue",
          drawerLabelStyle:{
            color: "#111",
            marginLeft: -25, 
          },
          drawerItemStyle: {
            borderRadius: 30, // Thêm borderRadius khi mục được active
          },
        }
      }

       >
      <Drawer.Screen
        name="Home"
        options={
          {
            drawrLabel: "Dự báo thời tiết hiện tại",
            title: "Dự báo thời tiết hiện tại",
            headerShown: false,
            drawerIcon: ()=>(
              <Ic_Circle />
            )
          }
        }
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Map"
        options={
          {
            drawrLabel: "Dự báo thời tiết tương lai",
            title: "Dự báo thời tiết tương lai",
            drawerIcon: ()=>(
              <Ic_Future />
            )
          }

        }
        component={HomeScreen}
      />
      <Drawer.Screen
        name="History"
        options={
          {
            drawrLabel: "Lịch sử",
            title: "Lịch sử",
            drawerIcon: ()=>(
              <Ic_History />
            )
          }
        }
        component={HistoryScreen}
      />
      <Drawer.Screen
        name="Setting"
        options={
          {
            drawrLabel: "Cài đặt",
            title: "Cài đặt",
            headerShown: false,
            drawerIcon: ()=>(
              <Ic_Setting/>
            )
          }
        }
        component={SettingScreen}
      />
      
    </Drawer.Navigator>
  );
}

export default AppNavigation;

