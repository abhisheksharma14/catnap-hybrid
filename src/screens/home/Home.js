import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import { BackHandler, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function Home() {
  const exitDialog = () =>
    Alert.alert(
      "Exit !",
      "Do you want to leave already? :(",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Exit", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { exitDialog(); return true});
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
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
