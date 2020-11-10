import React, {useEffect, useState} from 'react';
import {ScrollView, BackHandler, Alert} from 'react-native';
import { Card, ListItem, Text, Avatar, Badge } from 'react-native-elements'

import ShowToast from '../../utils'
import * as DB from '../../services/db';
import Loading from "../../components/Loading";

export default function Home({ navigation }) {
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

  const fetchAllCalenders = async () => {
    let calendarList =  await DB.getCalenders();
    setCalenders(calendarList);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await fetchAllCalenders();
      ShowToast("Calenders loaded successfully");
    })();
    BackHandler.addEventListener('hardwareBackPress', () => { exitDialog(); return true});
    return BackHandler.removeEventListener('hardwareBackPress', () => true );
  }, [])

  const updateSyncFlag = async (id, flag) => {
    await DB.enableCalenderSync(id, flag);
    await fetchAllCalenders();
  }

  return loading ? <Loading showText={true} /> : (
    <ScrollView>
      <Card >
        <Card.Title><Text h4>Available Calenders</Text></Card.Title>
        {
          calenders.map((calendar, i) => {
            return (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => {navigation.navigate('Events', { calendar })}}
              >
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
