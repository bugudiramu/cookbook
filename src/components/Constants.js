import { Dimensions, StyleSheet } from 'react-native';

export default {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,

  //   Colors
  primaryColor: '#E8505B',
  secondaryColor: '#455A64',
  highlightColor: '#FCBC04',

  //   Background top-left to bottom-right gradient
  // primaryBgColor: '#455A64',
  //   Gaps
  paddingExtraSmall: 4,
  paddingSmall: 8,
  paddingLarge: 16,
  paddingExtraLarge: 24,

  marginExtraSmall: 4,
  marginSmall: 8,
  marginLarge: 16,
  marginExtraLarge: 24,
};
