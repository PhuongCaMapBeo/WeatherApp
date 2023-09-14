import {View, Text} from 'react-native';
import {theme} from '../../theme/index';
function CardDetail({Icon, title, info, unit}) {
  return (
    <View style={{backgroundColor: theme.bgWhite(0.3)}} className="basis-[48%] p-3 rounded-xl mt-4">
      <Icon size="24" color="white" />
      <Text className="text-white text-base mt-2 ">{title}</Text>
      <Text className="text-white font-bold text-2xl mt-2">{`${info}`}<Text className="text-lg font-normal">{` ${unit}`}</Text></Text>
    </View>
  );
}

export default CardDetail;
