import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Splash({ navigation }) {
  setTimeout(() => navigation.navigate('Home'), 4000)
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
      }}>
      <Image
        source={require('../../assets/images/splash.gif',)}
        style={{ width: 100, height: 100 }}
      />
      <View style={{ margin: 110 }}>
        <Text
          style={{ color: '#4c4c4c', fontSize: 17, fontWeight: 'bold' }}>
          We are loading the important stuff, Please wait!
        </Text>
      </View>
    </View>
  );
}
