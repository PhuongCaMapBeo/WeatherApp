import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import {View, Text} from "react-native"
import { Ic_MapPin } from "../Icons/Ic_MapPin";

function CustomDrawerContent(props) {
    return (<DrawerContentScrollView {...props}>
        <View className="mt-8 ml-5 mb-8">
            <Text className="text-black text-base">Current location</Text>
            <View className="flex flex-row mt-2" >
                <View className="my-auto">
                    <Ic_MapPin/>
                </View>
                <Text className=" my-auto text-xl font-bold ml-2 font-sans">Ha Noi, Viet Nam</Text>
            </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>  );
}

export default CustomDrawerContent;