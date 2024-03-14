import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { get, getDatabase,onValue,ref } from 'firebase/database';
import { app } from '../firebase/firebase.config';
import { useEffect } from 'react';


const Message = () => {
  const [current,setCurrent] = useState('messages')
  const [friends,setFriends] = useState([])
  const [notification,setNotification] = useState([2])
  const user = useSelector(state=>state.users)
  useEffect(()=>{
    
  },[])

  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <View style={styles.container}>
            
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Message

const NomessageModel = () =>{
  return<View style={styles.messageModelContainer}>
      <Image source={require('../assets/images/Illustration4.png')}/>
      <Text style={{color:'#1F1F39',fontSize:16,fontWeight:'700',marginVertical:5}}>No Notifications yet!</Text>
      <Text style={{color:'#B8B8D2',fontSize:12,fontWeight:'500',marginVertical:5,textAlign:'center'}}>we will notify once we have something for you</Text>
  </View>
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    paddingHorizontal:10
  },
  tabs:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:64
  },
  headText:{
    color:'#1F1F39',
    fontSize:24,
    fontWeight:'bold',
    marginVertical:30
  },
  tabText:{
    color:'#1F1F39',
    fontSize:16,
    fontWeight:'600',
    paddingBottom:10,
    borderColor:'#3D5CFF'
  },
  message:{
    width:'100%',
    padding:15,
    shadowOpacity:0.35,
    marginTop:10,
    backgroundColor:'#ffffff',
    borderRadius:15,
    elevation:1
  },
  image:{
    width:48,
    height:48,
    borderRadius:15,
    marginRight:12
  },
  messageUpper:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:13
  },
  notifications:{
    width:'100%',
    alignItems:'center',
    padding:15,
    flexDirection:'row',
    shadowOpacity:0.35,
    marginTop:10,
    backgroundColor:'#ffffff',
    borderRadius:15,
    elevation:1
  },
  iconContainer:{
    width:48,
    height:48,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#EAEAFF'
  },
  messageModelContainer:{
    width:'100%',
    alignItems:'center',
    marginTop:24
  }
})