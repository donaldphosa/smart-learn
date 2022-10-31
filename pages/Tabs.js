import Ionicons from '@expo/vector-icons/Ionicons';
import React,{useEffect, useState} from 'react'
import Home from './Home';
import Search from './Search'
import Account from './Account'
import Message from './Message'
import Course from './Course'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';



const Tabs = ({navigation,setMessages,setChatId}) => {
  const users = useSelector(state=>state.users)
  const [focused,setFocused] = useState('home')

useEffect(()=>{
  setFocused('home')
},[])


const courseRef = collection(db,'courses')
const [data,setData] = useState([])
useEffect(()=>{
  getCourses()
},[])

const getCourses = async()=>{
const documents =await getDocs(courseRef).catch((error)=>{
  Alert.alert(error)
})
const list = documents.docs.map((item)=>{
return {...item.data(),identifier:item.id}
})
setData(list)
}

  return (
    <View style={styles.container}>
      {
        focused==='home'&&<Home data={data}  navigation={navigation}/>
      }
      {
         focused==='course'&&<Course data={data} navigation={navigation}/>
      }
      {
        focused==='search'&&<Search courseData={data} navigation={navigation}/>
      }
      {
        focused==='message'&&<Message setChatId={setChatId} setMessages={setMessages} navigation={navigation}/>
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




// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import React from 'react'
// import Home from './Home';
// import Search from './Search'
// import Account from './Account'
// import Message from './Message'
// import Course from './Course'
// import { View } from 'react-native';



// const Tabs = () => {
//   const Tab = createBottomTabNavigator()
//   return (
//     <Tab.Navigator 
//       initialRouteName='Homes' 
//       screenOptions={{
//         headerShown:false,
//         tabBarShowLabel:true,
//         tabBarStyle:{
//           paddingHorizontal:0,
//           height:70,
//           alignItems:'center',
//           paddingBottom:10,
//           color:'#3D5CFF',
//           width:'100%',
//           justifyContent:'space-between'
//         },
        
       
//       }}
//      >
//       <Tab.Screen
//         options={
//           {
//             tabBarIcon:({focused})=>{
//               return(
//                 <View style={{marginBottom:0}}>
//                   <Ionicons name="home-sharp" size={30} color={focused?"#3D5CFF":'#CEECFE'} />
//                 </View>
//               )
//             }
            
//           }
//         }
//         name="Home" component={Home} />
//       <Tab.Screen
//         options={
//           {
//             tabBarIcon:({focused})=>{
//               return(
//                 <View style={{marginBottom:0}}>
//                   <Ionicons name="book" size={30} color={focused?"#3D5CFF":'#CEECFE'} />
//                 </View>
//               )
//             }
            
//           }
//         }
//         name="Course" component={Course} />

//       <Tab.Screen
//         options={
//           {
//             tabBarIcon:({focused})=>{
//               return(
//                 <View style={{marginBottom:0}}>
//                   <Ionicons name="search-outline" size={30} color={focused?"#3D5CFF":'#CEECFE'} />
//                 </View>
//               )
//             }
            
//           }
//         }
//         name="Search" component={Search} />
//       <Tab.Screen
//         options={
//           {
//             tabBarIcon:({focused})=>{
//               return(
//                 <View style={{marginBottom:0}}>
//                   <Ionicons name="mail" size={30} color={focused?"#3D5CFF":'#CEECFE'}/>
//                 </View>
//               )
//             }
            
//           }
//         }
//         name="Message" component={Message} />
//       <Tab.Screen
//         options={
//           {
//             tabBarIcon:({focused})=>{
//               return(
//                 <View style={{marginBottom:0}}>
//                   <Ionicons name="person" size={28} color={focused?"#3D5CFF":'#CEECFE'} />
//                 </View>
//               )
//             }
            
//           }
//         }
//         name="Account" component={Account} />
 
//     </Tab.Navigator>
//   )
// }

// export default Tabs
