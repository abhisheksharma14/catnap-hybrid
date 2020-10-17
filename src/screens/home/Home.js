import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import { BackHandler, Alert, ToastAndroid } from 'react-native';
import { Card, ListItem, Text, Avatar, Badge } from 'react-native-elements'

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

  const showToast = (msg, duration="SHORT") => {
    ToastAndroid.show(msg, ToastAndroid[duration]);
  };

  const [loading, setLoading] = useState(true);
  const [calenders, setCalenders] = useState([]);

  const fetchAllCalenders = async () => {
    let calendarList =  await DB.getCalenders();
    setCalenders(calendarList);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await fetchAllCalenders();
      showToast("Calenders loaded successfully");
    })();
    BackHandler.addEventListener('hardwareBackPress', () => { exitDialog(); return true});
    return BackHandler.removeEventListener('hardwareBackPress', () => true );
  }, [])

  const updateSyncFlag = async (id, flag) => {
    await DB.enableCalenderSync(id, flag);
    await fetchAllCalenders();
  }

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
    <ScrollView>
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
                {/*<Badge
                  value={3}
                  status={success}
                  textStyle={{ color: calendar.color }}
                />*/}
                <ListItem.Chevron
                  name={calendar.enableSync ? "sync": "sync-disabled"}
                  color={calendar.enableSync ? "#199700": "#970000"}
                  onPress={() => updateSyncFlag(calendar.id, !calendar.enableSync)} />
                <ListItem.Chevron />
              </ListItem>
            );
          })
        }
      </Card>
    </ScrollView>
  );
}
