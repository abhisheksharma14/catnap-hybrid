import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import { BackHandler, Alert } from 'react-native';
import { Card, ListItem, Text, Icon, Avatar } from 'react-native-elements'

import * as DB from '../../services/db';

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

  const [loading, setLoading] = useState(true);
  const [calenders, setCalenders] = useState([]);

  useEffect(() => {
    (async () => {
      let calendarList =  await DB.getCalenders();
      setCalenders(calendarList);
      setLoading(false);
    })();
    BackHandler.addEventListener('hardwareBackPress', () => { exitDialog(); return true});
    return BackHandler.removeEventListener('hardwareBackPress', () => true );
  }, [])

  return loading ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          marginHorizontal: 40,
        }}>
        <Image
          source={require('../../assets/images/splash.gif',)}
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
  ) : (
    <View>
      <Card >
        <Card.Title><Text h4>Available Calenders</Text></Card.Title>
        {
          calenders.map((calendar, i) => {
            return (
              <ListItem key={i} bottomDivider>
                <Avatar rounded title={calendar.title[0].toUpperCase()} containerStyle={{backgroundColor: calendar.color}}/>
                <ListItem.Content>
                  <ListItem.Title>{calendar.title}</ListItem.Title>
                  <ListItem.Subtitle>{calendar.name}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            );
          })
        }
      </Card>
    </View>
  );
}
