import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Declare global constants here
export const bottomTabsHeight = 85;

// Margin top for menu bar, taken into account of platform difference
export const menuBarTop = Platform.OS === 'android' ? 47 : 57

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
