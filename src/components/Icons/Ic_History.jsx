import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const Ic_History = () => {
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
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9l6-6m0 0l6 6m-6-6v12a6 6 0 01-12 0v-3"
        />
      </Svg>
    </View>
  );
};



