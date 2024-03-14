import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';



const CourseComponents = () =>{
    return(
      <Pressable onPress={()=>{}} style={styles.CourseContainer}>
        <View style={styles.imageContainer}>
          {/* <Image resizeMode='cover' style={styles.image} source={{uri:coursePic}}/> */}
        </View>
          <View style={styles.courseDetails}>
            <Text style={{color:'#1F1F39',fontSize:14,fontWeight:'700'}}>React Native</Text>
            <View style={styles.writer}>
            <Ionicons name="person" size={12} color="#B8B8D2" />
            <Text style={{color:'#B8B8D2',fontSize:14,fontWeight:'400',marginLeft:3}}>phosa Donald</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={{color:'#3D5CFF',fontSize:16,fontWeight:'bold'}}>$15</Text>
              <Text style={{backgroundColor:'#FFEBF0',color:'#FF6905',fontSize:14,marginLeft:5,padding:2,borderRadius:20}}>16 hours</Text>
            </View>
          </View>
          <Text></Text>
      </Pressable>
    );
  }
  

export default CourseComponents

const styles = StyleSheet.create({
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