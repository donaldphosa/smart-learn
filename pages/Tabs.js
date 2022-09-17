import Ionicons from '@expo/vector-icons/Ionicons';
import React,{useEffect, useState} from 'react'
import Home from './Home';
import Search from './Search'
import Account from './Account'
import Message from './Message'
import Course from './Course'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSelector } from 'react-redux';



const Tabs = ({navigation}) => {
  const users = useSelector(state=>state.users)
  const [focused,setFocused] = useState('home')

useEffect(()=>{
  setFocused('home')
},[])

  return (
    <View style={styles.container}>
      {
        focused==='home'&&<Home  navigation={navigation}/>
      }
      {
         focused==='course'&&<Course navigation={navigation}/>
      }
      {
        focused==='search'&&<Search navigation={navigation}/>
      }
      {
        focused==='message'&&<Message navigation={navigation}/>
      }
      {
         focused==='account'&&<Account navigation={navigation}/>
      }
      <View style={styles.bottomTabs}>
        <Pressable 
          onPress={()=>setFocused('home')}
          style={{alignItems:'center',justifyContent:'center'}}
          >
          <Ionicons name="home-sharp" size={30} color={focused==='home'?"#3D5CFF":'#CEECFE'} /> 
          <Text style={{color:focused==='home'?"#3D5CFF":'#CEECFE'}}>Home</Text>
        </Pressable>
        <Pressable
          onPress={()=>setFocused('course')} 
          style={{alignItems:'center',justifyContent:'center'}}
          >
          <Ionicons name="book" size={30} color={focused==='course'?"#3D5CFF":'#CEECFE'} /> 
          <Text style={{color:focused==='course'?"#3D5CFF":'#CEECFE'}}>Courses</Text>
        </Pressable>
        <Pressable 
          onPress={()=>setFocused('search')}
          style={{alignItems:'center',justifyContent:'center'}}
          >
          <Ionicons name="search-outline" size={30} color={focused==='search'?"#3D5CFF":'#CEECFE'} /> 
          <Text style={{color:focused==='search'?"#3D5CFF":'#CEECFE'}}>Search</Text>
        </Pressable>
        <Pressable
          onPress={()=>setFocused('message')} 
          style={{alignItems:'center',justifyContent:'center'}}
          >
          <Ionicons name="mail" size={30} color={focused==='message'?"#3D5CFF":'#CEECFE'} /> 
          <Text style={{color:focused==='message'?"#3D5CFF":'#CEECFE'}}>Message</Text>
        </Pressable>
        <Pressable 
          onPress={()=>setFocused('account')}
          style={{alignItems:'center',justifyContent:'center'}}
          >
          <Ionicons name="person" size={30} color={focused==='account'?"#3D5CFF":'#CEECFE'} /> 
          <Text style={{color:focused==='account'?"#3D5CFF":'#CEECFE'}}>Account</Text>
        </Pressable>
        </View>
    </View>

  )
}

export default Tabs

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    paddingBottom:52
  },
  bottomTabs:{
    position:'absolute',
    bottom:0,
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor:'#ccc',
    borderTopWidth:1,
    backgroundColor:'#fff',
    paddingVertical:5,
    paddingHorizontal:20
  }
})