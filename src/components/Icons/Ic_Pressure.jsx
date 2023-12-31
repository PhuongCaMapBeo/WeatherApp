import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const Ic_Pressure = () => {
  return (
    <View>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#fff" // Set fill color to black
          d="M7.2,14.4m-3.2,0a3.2,3.2 0,1 1,6.4 0a3.2,3.2 0,1 1,-6.4 0"
        />
        <Path
          fill="#fff" // Set fill color to black
          d="M14.8,18m-2,0a2,2 0,1 1,4 0a2,2 0,1 1,-4 0"
        />
        <Path
          fill="#fff" // Set fill color to black
          d="M15.2,8.8m-4.8,0a4.8,4.8 0,1 1,9.6 0a4.8,4.8 0,1 1,-9.6 0"
        />
      </Svg>
    </View>
  );
};

