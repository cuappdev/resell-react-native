import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// Declare global constants here
export const bottomTabsHeight = 85;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
