import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const Ic_Wind = () => {
  return (
    <View>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          stroke="white" // Change stroke color to white
          strokeWidth={1} // Change stroke width to 1 (thinner line)
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          fill= "none"
          d="M2,15H18.5C20.43,15,22,16.57,22,18.5C22,20.43,20.43,22,18.5,22C16.57,22,15,20.43,15,18.5V18"
        />
        <Path
          stroke="white" // Change stroke color to white
          strokeWidth={1} // Change stroke width to 1 (thinner line)
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M2,12H18.5C20.42,12,22,10.43,22,8.5C22,6.58,20.42,5,18.5,5C16.58,5,15,6.57,15,8.5V9"
          fill="none"
        />
        <Path
          stroke="white" // Change stroke color to white
          strokeWidth={1} // Change stroke width to 1 (thinner line)
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          d="M2,9H9.31C10.8,9,12,7.79,12,6.31C12,4.82,10.79,3.62,9.31,3.62C7.82,3.62,6.62,4.83,6.62,6.31V6.69"
          fill="none"
        />
      </Svg>
    </View>
  );
};


