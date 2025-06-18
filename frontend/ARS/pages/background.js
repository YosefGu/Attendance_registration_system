// Background.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function Background({ children }) {
  return (
    <View style={styles.container}>
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        {/* עיגול למעלה */}
        <Circle
          cx={width * 0.3}
          cy={-100}
          r={250}
          fill="#C1F2DC"
          opacity={0.5}
        />
        {/* גל למטה */}
        <Path
          d={`M0 ${height * 0.8} 
              Q${width * 0.5} ${height * 0.9}, 
              ${width} ${height * 0.8} 
              L${width} ${height} 
              L0 ${height} Z`}
          fill="#A0EACD"
          opacity={0.4}
        />
      </Svg>

      {/* פה מגיע התוכן של כל עמוד */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dff7ee'
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
