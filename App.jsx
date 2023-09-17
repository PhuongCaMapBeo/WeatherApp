import AppNavigation from "./src/navigation/AppNavigaiton"
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated'
import 'react-native-gesture-handler'


export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}



