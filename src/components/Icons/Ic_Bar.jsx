import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const Ic_Bar = () => {
  return (
    <View>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          stroke="white" 
          fill="none"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </Svg>
    </View>
  );
};


