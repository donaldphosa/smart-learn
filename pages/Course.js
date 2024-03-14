import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuerySnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { setCourses } from '../store/coursesReducer';


const Course = ({navigation}) => {
  const [enrolledCourse,setEnrolledCourses] = useState([])
  const [progress,setProgress] = useState(80)
  
 
const user = useSelector(state=>state.auth.auth);

console.log(user.email);
  
const dispatch = useDispatch()


const loadAllCourses = async()=>{

  const querySnapshot = await getDocs(collection(db, "courses"));
  let data = [];
  QuerySnapshot.forEach((doc) => {
    data.push({id:doc.id, ...doc.data()})
  });

  dispatch(setCourses(data))

}

useEffect(()=>{
  loadAllCourses();
},[])

const schools = useSelector(State=>State.courses.courses);

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
         <ScrollView>{
            !schools?<NoEnrolledCourseModel/>:schools.map((school)=>{
          return<PlanContainer school={school} navigation={navigation}/>
         })}
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

const PlanContainer = ({ navigation, school})=>{
  return<Pressable onPress={()=>{  
    navigation.navigate('CourseView')
  }}>
      <View style={styles.wrapper}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <View >
            <Text style={{color:'#440687',fontSize:18,fontWeight:'600',marginBottom:5}}>{school.courseName}</Text>
            <Text style={{color:'#1F1F39',fontSize:11,fontWeight:'600',marginBottom:5}}>1/{school.courseVideos?.length}</Text>
          </View>
          <View style={styles.vidIcon}>
                <Ionicons name='play' size={18} color={'#FFFFFF'}/>
            </View>
      </View>
      <View style={styles.track}>
      <LinearGradient 
        start={{x:0,y:1}} 
        end={{x:0.8,y:0.2}} 
        style={[styles.bar,{width:`${100}%`}]} 
        colors={['#3D5CFF','#DFF5FF'].reverse()}
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
    width:'98%',
    height:80,
    borderRadius:5,
    shadowOpacity: 0.55,
    elevation: 3,
    backgroundColor:'#ffffff',
    marginVertical:3,
    padding:10,
    shadowColor:'gray',
    
},
vidIcon:{
  backgroundColor:'#3D5CFF',
  width:34,
  height:34,
  borderRadius:100,
  alignItems:'center',
  justifyContent:'center'
},
track:{
  width:'100%',
  backgroundColor:'#F4F7FD',
  height:3,
  marginTop:10,
  borderRadius:10,
  overflow:'hidden'
},
bar:{
  height:'100%',
  borderRadius:10,
  height:3
},
})