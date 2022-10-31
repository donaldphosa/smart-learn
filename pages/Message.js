import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { get, getDatabase,onValue,ref } from 'firebase/database';
import { app } from '../firebase/firebase.config';
import { useEffect } from 'react';


const Message = ({navigation,setMessages,setChatId}) => {
  const [current,setCurrent] = useState('messages')
  const [friends,setFriends] = useState([])
  const [notification,setNotification] = useState([2])
  const user = useSelector(state=>state.users)
  useEffect(()=>{
    getsUserFriend()
  },[])

  const getsUserFriend = async()=>{
    const database = getDatabase(app)
    const userInfo = await get(ref(database,`chats/${user[0].name}`))

    setFriends(userInfo.val().friends || [])
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.headText}>Notifications</Text>
            <View style={styles.tabs}>
              <Pressable onPress={()=>setCurrent('messages')}>

                <Text style={[styles.tabText,{borderBottomWidth:current ==='messages'?3:0}]}>Messages</Text>
              </Pressable>
              <Pressable onPress={()=>setCurrent('notifications')}>

                <Text style={[styles.tabText,{borderBottomWidth:current ==='notifications'?3:0}]}>Notifications</Text>
              </Pressable>
            </View>
            {current==='messages'&&
              <ScrollView showsVerticalScrollIndicator={false}>
                {friends.length>0?friends.map((friend,index)=><Messages setChatId={setChatId} setMessages={setMessages} key={index} {...friend} navigation={navigation}/>):<NomessageModel/>}
                
              </ScrollView>}

            {current==='notifications'&&
            <ScrollView showsVerticalScrollIndicator={false}>
              {notification.length>0?<Notifications navigation={navigation}/>:<NomessageModel/>}
            </ScrollView>
            }

            <Pressable 
              onPress={()=>navigation.navigate('FindFriends')}
              style={{position:'absolute',
                      bottom:25,
                      right:10,
                      borderWidth:1,
                      borderColor:'#3D5CFF',
                      borderRadius:100,
                      alignItems:'center',
                      justifyContent:'center',
                      padding:10,
                      backgroundColor:'#3D5CFF',
                      shadowOpacity:1,
                      elevation:5
                    }}>
              <Ionicons name='add' color='#fff' size={30}/>
            </Pressable>
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Message


const Messages = ({navigation,username,chatroomId,setMessages,setChatId}) =>{
  
  const getMesseges = async()=>{
    const database = getDatabase(app)
    // const chatroom = await get(ref(database,`chatrooms/${chatroomId}`)).val()
    setChatId(chatroomId)
    onValue(ref(database,`chatrooms/${chatroomId}`),(chatroom)=>{
      const data = chatroom.val()
      setMessages(data.messages?data.messages:[])
    })
  }
  return(
    <Pressable onPress={()=>{
      getMesseges()
       navigation.navigate('NotificationView')

      }} style={styles.message}>
      <View style={styles.messageUpper}>
        <Image style={styles.image} source={require('../assets/images/avater.png')}/>
        <View style={{width:'60%'}}>
          <Text style={{color:'#1F1F39',fontWeight:'bold',fontSize:12,marginBottom:3}}>{username}</Text>
          <Text style={{color:'#858597',fontWeight:'bold',fontSize:12}}>offline</Text>
        </View>
        <Text style={{color:'#858597',fontWeight:'600',fontSize:12}}>04:32 pm</Text>
      </View>
      <Text style={{color:'#858597',fontWeight:'600',fontSize:12}}>Congratulations on completing the first lesson, 
            keep up the good work!</Text>
    </Pressable>
  );
}

const Notifications = ({navigation}) =>{
  return(
    <Pressable onPress={()=>navigation.navigate('NotificationView')}  style={styles.notifications}>
      <View style={styles.iconContainer}>
        <Ionicons name='mail-unread' color={'#3D5CFF'} size={18}/>
      </View>
      <View style={{marginLeft:10}}>
        <Text style={{color:'#1F1F39',fontSize:12,fontWeight:'700'}}>Successful purchase</Text>
        <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
          <Ionicons name='time' size={16} color='#B8B8D2'/>
          <Text style={{color:'#B8B8D2',marginLeft:3}}>just now</Text>
        </View>
      </View>
    </Pressable>
  );
}

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