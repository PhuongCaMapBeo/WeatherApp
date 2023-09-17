import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const Ic_Circle = () => {
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
          d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z"
        />
      </Svg>
    </View>
  );
};






