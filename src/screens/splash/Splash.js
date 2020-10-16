import React, {useEffect} from 'react';
import { View, Text, Image } from 'react-native';
import * as Calendar from "expo-calendar";
import * as DB from '../../services/db';

export default function Splash({ navigation }) {
  useEffect(() => {
    (async () => {
      await DB.init().catch(err => console.log("Inside init error block", err));
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        await DB.deleteCalenders();
        calendars.map(async (calendar) => {
          await DB.addCalender(calendar);
        })
      }
      setTimeout(() => navigation.navigate('Home'), 4000)
    })();
  })
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
