import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import  {createNativeStackNavigator}  from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Auth from './pages/Auth';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import CourseView from './pages/CourseView';
import NotificationView from './pages/NotificationView';
import Splash from './pages/Splash';
import { Provider } from 'react-redux'
import { store } from './store/store'
import FindFriends from './pages/FindFriends';
import { useState } from 'react';


export default function App() {
  const Stack = createNativeStackNavigator();
  const [message,setMessages] = useState([])
  const [chatId,setChatId] = useState()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={ { headerShown: false }} >
          <Stack.Screen name='Splash'>
            { ({navigation})=><Splash navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='Auth'>
            {({navigation})=><Auth navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='SignUp' >
            {({navigation})=><SignUp navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='Login'>
            {({navigation})=><Login navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='Tabs'>
            {({navigation})=><Tabs setChatId={setChatId} setMessages={setMessages} navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='CourseView'>
            {({navigation})=><CourseView  navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='NotificationView'>
            {({navigation})=><NotificationView chatId={chatId} message={message} navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='FindFriends'>
            {({navigation})=><FindFriends  navigation={navigation}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
   
  );
}

