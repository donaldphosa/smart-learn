import { StyleSheet, View, Text, Alert } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react';
import { auth, db } from '../firebase/firebase.config';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/userStore';
import { collection, getDocs } from 'firebase/firestore';

const Splash = ({navigation}) => {

    const [user,setUser] = useState()
    const userRef = collection(db,'users')
    const dispatch = useDispatch()
  useEffect(()=>{
   const subscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
  })
     getDocuments()
  if(user){
    navigation.navigate('Tabs')
  }else if(user===null){
    navigation.navigate('Auth')
  }
  return()=>{
    subscribe()
    getDocuments()
  } 
  },[user])

  const getDocuments = async ()=>{
    const documents =await getDocs(userRef).catch((error)=>{
        Alert.alert(error)
    })
    const list = documents.docs.map((item)=>{
      return {...item.data(),id:item.id}
    })
    const instance = list.filter((item)=>{
      return item?.email.toLowerCase() === user?.email.toLowerCase() 
    })
    console.log(instance);
    dispatch(getUser(instance))
    return instance
  }

 

  return (
    <View style={styles.container}>
      <Ionicons name='book' size={150} color='#3D5CFF'/>
      <Text style={{fontSize:30,fontWeight:'bold',color:'#3D5CFF'}}>SMART LEARN</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})