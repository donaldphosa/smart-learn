import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import  {createNativeStackNavigator}  from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Auth from './Auth';
import SignUp from './SignUp';
import Login from './Login';
import Tabs from './Tabs';
import CourseView from './CourseView';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
// import Store from './store/Store';



export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const [message,setMessages] = useState([])
  const [chatId,setChatId] = useState()
  
  const user = useSelector(state=>state.auth.auth)


  const loadCoursesToStore = async ()=>{

  }
  
    if(user){
      return<NavigationContainer>
        <Stack.Navigator initialRouteName='Tabs' screenOptions={ { headerShown: false }} >
          <Stack.Screen name='Tabs'>
            {({navigation})=><Tabs setChatId={setChatId} setMessages={setMessages} navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='CourseView'>
            {({navigation})=><CourseView  navigation={navigation}/>}
          </Stack.Screen>
          <Stack.Screen name='NotificationView'>
            {({navigation})=><NotificationView chatId={chatId} message={message} navigation={navigation}/>}
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
