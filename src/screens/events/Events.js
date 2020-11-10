import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import * as Calendar from "expo-calendar";
import Loading from "../../components/Loading";
import {Avatar, Card, ListItem} from "react-native-elements";

export default function Events({ route, navigation }) {
  const { calendar } = route.params;
  const today = new Date();
  const {startDate, setStartDate} = useState(today);
  const {endDate, setEndDate} = useState(new Date(today.getTime() + 3600000*24));
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      console.log(startDate, endDate);
      const fetchedEvents = await Calendar.getEventsAsync([`${calendar.id}`], new Date(), new Date(Date.now() + 1000*60*60*48*2)).catch(err => {console.log("Error ", err)});
      setEvents(fetchedEvents);
      setLoading(false);
    })();
  }, [])

  return loading ? <Loading /> : (
    <ScrollView>
      {
        events.map((event, i) => {
          return (
            <Card key={i}>
              <Card.Title >{event.title}</Card.Title>
              <Card.Divider/>
              <Text>Organizer: {event.organizerEmail}</Text>
              <Card.Divider/>
              <Text>Start: {event.startDate}</Text>
              <Card.Divider/>
              <Text>End : {event.endDate}</Text>
            </Card>
          );
        })
      }
    </ScrollView>
  );
}
