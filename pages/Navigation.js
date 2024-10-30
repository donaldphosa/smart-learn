import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Auth from './Auth';
import SignUp from './SignUp';
import Login from './Login';
import Tabs from './Tabs';
import CourseView from './CourseView';



export default function Navigation() {
  const Stack = createStackNavigator();


    if(false){
      return<NavigationContainer>
        <Stack.Navigator initialRouteName='Tabs' screenOptions={ { headerShown: false }} >
          <Stack.Screen name='Tabs'>
            {({navigation})=><Tabs navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='CourseView'>
            {({navigation})=><CourseView  navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='NotificationView'>
            {({navigation})=><NotificationView  navigation={navigation}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    }else{
        return<NavigationContainer>
        <Stack.Navigator initialRouteName='Auth' screenOptions={ { headerShown: false }} >
          <Stack.Screen name='Auth'>
            {({navigation})=><Auth navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='SignUp' >
            {({navigation})=><SignUp navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='Login'>
            {({navigation})=><Login navigation={navigation}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    }
 
}
