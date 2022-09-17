import { Pressable, ScrollView, StyleSheet, Text, View,TextInput } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';


import React from 'react'
import { useState } from 'react';


const NotificationView = ({navigation}) => {
 
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
                <MessageBody messageOrigin={'sent'}/>
                <MessageBody messageOrigin={'recieved'}/>
                <MessageBody messageOrigin={'sent'}/>
                <MessageBody messageOrigin={'recieved'}/>
              </ScrollView>
              <View>
                <View style={styles.sendField}>
                  <TextInput placeholder='Enter Message' multiline={true} style={styles.textInput} />
                  <Pressable>
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

const MessageBody = ({messageOrigin}) =>{
  return(
    <View style={[styles.message,{flexDirection:messageOrigin==='sent'?'row-reverse':'row'}]}>
      <View style={styles.iconCont}>
        <Ionicons name='person' size={24} color={'#ccc'}/>
      </View>
      <View style={[styles.textMessageConatiner,{backgroundColor:messageOrigin==='sent'?'#858597':'#ccc'}]}>
        <Text style={styles.textMessage}>One of the cool things about this font generator is that you can choose from more than 20 different styles. That means you can find a unique flair that perfectly fits what you’re trying to say.</Text>
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
    width:48,
    height:48,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#3D5CFF',
    margin:5
  },
  message:{
    flexDirection: 'row',
    margin:10
  },
  textMessageConatiner:{
    padding:10,
    borderRadius:20,
    marginHorizontal:10,
    width:'60%',
    backgroundColor:'#ccc',
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