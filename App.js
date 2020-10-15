import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SplashScreen from "./src/screens/splash/Splash";
import Home from "./src/screens/home/Home";

const Stack = createStackNavigator();

const HomeIcon = <Icon name="home" size={30} color="#4C4C4C" />;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={Home} mode="modal" options={{
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                // do nothing
              }}
              backImage={props => HomeIcon}
            />
          ),
        }}/>
        <Stack.Screen name="Splash" component={SplashScreen}  options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerTitleStyle: {
            textAlign: 'center',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./src/assets/images/logo.png')}
    />
  );
}

export default App;
