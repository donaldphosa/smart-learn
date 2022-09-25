import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Pressable, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
// import data from '../data'
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from '../store/slice';


const Home = ({navigation,data}) => {
  const [index,setIndex]=useState(1)
  const dispatch = useDispatch()
  const users = useSelector(state=>state.users)

  return (
<SafeAreaProvider>
    <SafeAreaView>
        <View style={styles.container}>
         
          <View style={styles.profile}>
            <View>
              <Text style={styles.Greet}>Hi, {users[0]?.name}</Text>
              <Text style={styles.sText}>let's start learning</Text>
            </View>
            <View style={styles.profilePic}>
              <Image style={{width:'100%',height:'100%'}} resizeMode='contain' source={require('../assets/images/avater.png')}/>
            </View>
          </View>
            <View style={styles.bottomContainer}>
          
      <ScrollView  style={{paddingHorizontal:15,zIndex:15}} showsVerticalScrollIndicator={false}>
            <View style={{paddingVertical:10}}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    <Card/>
                    <Card/>
                </ScrollView>
              </View>
            <Text style={{color:'#1F1F39',fontSize:18,fontWeight:'600',marginVertical:18}}>Chose course</Text>

                 {/* ----------------------filters ------------------------------- */}

          <View style={styles.filters}>
            <Pressable onPress={()=>setIndex(1)}>
              <View style={[styles.filterCont,index===1?{backgroundColor:'#3D5CFF'}:{backgroundColor:'transparent'}]}>
                <Text style={[styles.text , index===1?{color:'#ffffff'}:{}]}>All</Text>
              </View>
            </Pressable>
            <Pressable onPress={()=>setIndex(2)}>
              <View style={[styles.filterCont,index===2?{backgroundColor:'#3D5CFF'}:{backgroundColor:'transparent'}]}>
                <Text style={[styles.text , index===2?{color:'#ffffff'}:{}]}>Popular</Text>
              </View>
            </Pressable>
            <Pressable onPress={()=>setIndex(3)}>
              <View style={[styles.filterCont,index===3?{backgroundColor:'#3D5CFF'}:{backgroundColor:'transparent'}]}>
                <Text style={[styles.text , index===3?{color:'#ffffff'}:{}]}>New</Text>
              </View>
            </Pressable>
            </View> 

            <View style={{height:'60%',marginTop:10}}>
            {
              data.map((course,index)=>{
                return <Courses dispatch={dispatch} navigation={navigation} key={index} {...course} />
              })
            }
          </View>       
      </ScrollView>
          </View>
      </View>
           
       
    </SafeAreaView>
</SafeAreaProvider>
  )
}

export default Home


const Card = ()=>{
  return(
    
    <View style={styles.card}>
      <Text style={styles.cardText}>What do you learn today?</Text>
      <TouchableOpacity style={styles.cardButton}>
        <Text style={{color:'#ffffff',fontSize:12,fontWeight:'bold'}}>Get Started</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const Courses = ({courseName,coursePic,dispatch,coursePrice,courseWriter,navigation,courseVideos,id,courseLikes,identifier}) =>{
  return(
    <Pressable onPress={()=>{
      
      dispatch(setVideos({courseName, courseVideos,coursePrice,id,courseLikes,identifier}));
      navigation.navigate('CourseView')
    }} style={styles.CourseContainer}>
      <View style={styles.imageContainer}>
        <Image resizeMode='cover' style={styles.image} source={{uri:coursePic}}/>
      </View>
        <View style={styles.courseDetails}>
          <Text style={{color:'#1F1F39',fontSize:14,fontWeight:'700'}}>{courseName}</Text>
          <View style={styles.writer}>
          <Ionicons name="person" size={12} color="#B8B8D2" />
          <Text style={{color:'#B8B8D2',fontSize:14,fontWeight:'400',marginLeft:3}}>{courseWriter}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={{color:'#3D5CFF',fontSize:16,fontWeight:'bold'}}>${coursePrice}</Text>
            <Text style={{backgroundColor:'#FFEBF0',color:'#FF6905',fontSize:14,marginLeft:5,padding:2,borderRadius:20}}>16 hours</Text>
          </View>
        </View>
        <Text></Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'#3D5CFF',
    alignItems:'center',
  },
  bottomContainer:{
    width:'100%',
    height:'75%',
    backgroundColor:'#FFFFFF',
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    paddingTop:15
  
  },
  profile:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    marginTop:44,
    paddingHorizontal:20
  },
  profilePic:{
    width:60,
    height:60,
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center'
  },
  Greet:{
    fontSize:24,
    fontWeight:'bold',
    color:'#FFFFFF'
  },
  sText:{
    fontSize:14,
    color:'#FFFFFF'
  },
 
  card:{
    width:253,
    height:140,
    borderRadius:15,
    backgroundColor:'#CEECFE',
    marginRight:10,
    padding:10,
    justifyContent:'space-between',
   
  },
  cardText:{
    fontWeight:'bold',
    fontSize:16,
    color:'#1F1F39'
  },
  cardButton:{
    backgroundColor:'#FF6905',
    alignItems:'center',
    justifyContent:'center',
    width:85,
    height:31,
    borderRadius:5
  },
  

filters:{
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'space-between',
  width:'80%'
},
filterCont:{
  alignItems:'center',
  justifyContent:'center',
  width:73,
  height:28,
  borderRadius:100
},
text:{
  color:'#858597',
  fontSize:14
},
CourseContainer:{
  width:'100%',
  height:100,
  backgroundColor:'#ffffff',
  marginBottom:15,
  borderRadius:15,
  shadowOpacity: 1,
  shadowColor:'gray',
  elevation: 5,
  flexDirection:'row',
  alignItems:'center',
  padding:10,
  justifyContent:'space-between'
},
image:{
  width:'110%',
  height:'110%',
},
imageContainer:{
  width:70,
  height:70,
  borderRadius:10,
  overflow:'hidden'
},
courseDetails:{
  width:'60%',
  
},
writer:{
  flexDirection:'row',
  alignItems:'center',
  marginVertical:3
},
priceContainer:{
  flexDirection:'row',
  alignItems:'center'
}
})