import React from 'react';
import { Svg, Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const CheckMark = () => {
  return (
    <Svg width="109" height="109" viewBox="0 0 109 109" fill="none">
      <Circle cx="54.5" cy="50.5" r="44.5" fill="white" />
      <Circle cx="54.5" cy="50.5" r="43" stroke="url(#paint0_linear_16387_48310)" strokeWidth="3" />
      <Path d="M72.3334 38.5L51.2501 59.5833L41.6667 50" stroke="url(#paint1_linear_16387_48310)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Defs>
        <LinearGradient id="paint0_linear_16387_48310" x1="90.4423" y1="-17.9615" x2="-1.87419" y2="-0.748884" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#DF9856" />
          <Stop offset="0.489583" stopColor="#DE6CD3" />
          <Stop offset="0.942708" stopColor="#AD68E3" />
        </LinearGradient>
        <LinearGradient id="paint1_linear_16387_48310" x1="69.3847" y1="32.8237" x2="38.7245" y2="41.1389" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#DF9856" />
          <Stop offset="0.489583" stopColor="#DE6CD3" />
          <Stop offset="0.942708" stopColor="#AD68E3" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default CheckMark;
