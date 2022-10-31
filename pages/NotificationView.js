import { Pressable, ScrollView, StyleSheet, Text, View,TextInput } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';


import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getDatabase, ref, update } from 'firebase/database';
import { app } from '../firebase/firebase.config';
  


const NotificationView = ({navigation,message,chatId}) => {
 const [text,setText] = useState()
 const user = useSelector(state=>state.users)
 const onSend = async()=>{
  const database = getDatabase(app)

  update(ref(database,`chatrooms/${chatId}`),{
  messages: [ ...message,
    {own:user[0].name,
    text:text,
    createdAt: new Date()}]
  })
  setText()
 }
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View style={styles.container}>
              <View style={styles.messageHead}>
                <Pressable onPress={()=>navigation.goBack()}>
                  <Ionicons name='arrow-back' size={24} color='#1F1F39'/>
                </Pressable>
                  <Text style={styles.headText}>Donald</Text>
              </View> 
              <ScrollView showsVerticalScrollIndicator={false}>
                {message?.map((message,index)=><MessageBody {...message} key={index} user={user} messageOrigin={message.own}/>)}
              </ScrollView>
              <View>
                <View style={styles.sendField}>
                  <TextInput placeholder='Enter Message' value={text} onChangeText={msg=>setText(msg)} multiline={true} style={styles.textInput} />
                  <Pressable onPress={()=>onSend()}>
                    <Ionicons name='send' size={24} color='#3D5CFF'/>
                  </Pressable>
                </View>
              </View>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default NotificationView

const MessageBody = ({messageOrigin,user,text,createdAt}) =>{
 

  var myDate = new Date(createdAt).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  let index = myDate.lastIndexOf(':')
  let time = myDate.substring(0,index)
 
  return(
    <View style={[styles.message,{flexDirection:messageOrigin===user[0].name?'row':'row-reverse'}]}>
      <View style={styles.iconCont}>
        <Ionicons name='person' size={18} color={'#ccc'}/>
      </View>
      <View style={[styles.textMessageConatiner,{backgroundColor:messageOrigin!==user[0].name?'#858597':'#ccc'}]}>
        <Text style={styles.textMessage}>{text}</Text>
      </View>
      <View style={{height:'100%'}}>
         <Text style={{position:'absolute', bottom:-5}}>{time}</Text>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'#ffffff',
    padding:10,
    
  },
  messageHead:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:5
  },
  headText:{
    color:'#1F1F39',
    marginLeft:15,
    fontSize:16,
    fontWeight:'600'
  },
  iconCont:{
    width:28,
    height:28,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#3D5CFF',
    margin:5
  },
  message:{
    flexDirection: 'row',
    margin:10,
    marginVertical:10
  },
  textMessageConatiner:{
    padding:5,
    borderRadius:10,
    marginHorizontal:10,
    width:'auto',
    backgroundColor:'#ccc',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    maxWidth:'60%'
  },
  textMessage:{
    fontSize:16,
    color:'#1F1F39',
    fontWeight:'600'
  },
  textInput:{
    borderColor:'#ccc',
    width:'90%',
  },
  sendField:{
    height:50,
    borderWidth:1,
    borderColor:'#ccc',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:20,
    flexDirection:'row',
    marginTop:10,
    paddingHorizontal:10
  },
  
})