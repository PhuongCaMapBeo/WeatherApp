import { Text } from "react-native";
import MapView from 'react-native-maps';

function MapScreen() {
    return ( <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className = "w-[100%] h-[100%]"
      /> );
}

export default MapScreen;