import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const Ic_ChevronDown = () => {
  return (
    <View>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        >
        <Path
          stroke="black" 
          fill="none"
          strokeWidth={1.5}
          stroke-linecap="round"
          stroke-linejoin="round"
          d= "M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </Svg>
    </View>
  );
};


