import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import { BackHandler } from 'react-native';


export default function Home() {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return BackHandler.removeEventListener('hardwareBackPress', () => true );
  })

  return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          marginHorizontal: 40,
        }}>
        <Image
          source={require('../../assets/images/logo.png',)}
          style={{ width: 100, height: 100 }}
        />
        <View style={{ margin: 10 }}>
          <Text
            style={{ color: '#4c4c4c', fontSize: 17, fontWeight: 'bold' }}>
            Welcome to Catnap, we will be keep you posted here !
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
  );
}
