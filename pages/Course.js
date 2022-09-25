import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from '../store/slice';

const Course = ({navigation,data}) => {
  const [enrolledCourse,setEnrolledCourses] = useState([])
  const [progress,setProgress] = useState(80)
  const users = useSelector(state=>state.users)
 
 useEffect(()=>{
  setEnrolledCourses(data.filter(dat=>[...users[0]?.coursesEnrolledIds].toString().includes(dat.id.toString())))
},[users])
  
const dispatch = useDispatch()
  return (
  <SafeAreaProvider>
    <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{color:'#1F1F39',fontSize:24,fontWeight:'bold'}}>Enrolled Course</Text>
            <View style={styles.profilePic}>
              <Image source={require('../assets/images/avater.png')} />
            </View>
          </View>
        
         <SafeAreaView>
         <ScrollView>
          {enrolledCourse.length>0?enrolledCourse.map((course,index)=><PlanContainer navigation={navigation} dispatch={dispatch} key={index} {...course} progress={progress}/>):<NoEnrolledCourseModel/>}
         </ScrollView>
         </SafeAreaView>
        </View>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

export default Course



const NoEnrolledCourseModel = () =>{
  return<View style={styles.messageModelContainer}>
      <Image style={{width:200,height:200}} source={require('../assets/images/Illustration4.png')}/>
      <Text style={{color:'#1F1F39',fontSize:16,fontWeight:'700',marginVertical:10}}>No Course Enrolled</Text>
      <Text style={{color:'#B8B8D2',fontSize:12,fontWeight:'500',marginVertical:5,textAlign:'center'}}>Your courses will appear here once you enroll</Text>
  </View>
}

const PlanContainer = ({ progress,courseName,courseVideos,coursePrice,dispatch,navigation,id,courseLikes,identifier})=>{
  return<Pressable onPress={()=>{  
    dispatch(setVideos({courseName, courseVideos,coursePrice,id,courseLikes,identifier}));
    navigation.navigate('CourseView')
  }}>
      <View style={styles.wrapper}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View >
            <Text style={{color:'#440687',fontSize:25,fontWeight:'600',marginBottom:10}}>{courseName}</Text>
            <Text style={{color:'#1F1F39',fontSize:14,fontWeight:'800',marginBottom:10}}>1/{courseVideos.length} lessons</Text>
          </View>
          <View style={styles.vidIcon}>
                <Ionicons name='play' size={26} color={'#FFFFFF'}/>
            </View>
      </View>
      <View style={styles.track}>
      <LinearGradient 
        start={{x:0,y:1}} 
        end={{x:0.8,y:0.2}} 
        style={[styles.bar,{width:`${progress}%`}]} 
        colors={['#3D5CFF','#3D5CFF']}
        >
      </LinearGradient>
      </View>
      </View>
  </Pressable>
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    paddingHorizontal:5,

  },
  profilePic:{
    borderRadius:100,
    alignItems:'center'
  },
  header:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:"5%",
    padding:10
  },messageModelContainer:{
    width:'100%',
    alignItems:'center',
    marginTop:5
  },
  wrapper:{
    width:'100%',
    height:110,
    borderRadius:15,
    shadowOpacity: 0.55,
    elevation: 10,
    backgroundColor:'#ffffff',
    marginVertical:5,
    padding:10,
    shadowColor:'gray',
    
},
vidIcon:{
  backgroundColor:'#3D5CFF',
  width:44,
  height:44,
  borderRadius:100,
  alignItems:'center',
  justifyContent:'center'
},
track:{
  width:'100%',
  backgroundColor:'#F4F7FD',
  height:4,
  marginTop:10,
  borderRadius:10,
  overflow:'hidden'
},
bar:{
  height:'100%',
  borderRadius:10,
  height:4
},
})