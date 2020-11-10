import {Image, View} from "react-native";
import {Text} from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import React from "react";

export default function Loading({showText=false}) {
  return <View
    style={{
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginHorizontal: 40,
    }}>
    <Image
      source={require('../assets/images/splash.gif',)}
      style={{ width: 100, height: 100 }}
    />
    { showText ? <View style={{ margin: 10 }}>
      <Text
        style={{ color: '#4c4c4c', fontSize: 17, fontWeight: 'bold' }}>
        Welcome to Catnap, we will be keep you posted here !
      </Text>
    </View> : <></> }
    <StatusBar style="auto" />
  </View>
}
