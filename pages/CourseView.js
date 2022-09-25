import { Image, Pressable, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Video } from "expo-av";
import { useState } from 'react';
import PurchaseModel from './PurchaseModel';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { useDispatch } from 'react-redux';
import { updateUsers } from '../store/userStore';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useEffect } from 'react';
import MediaMeta from 'react-native-media-meta'

const CourseView = ({}) => {
    const dispatch = useDispatch()
    const users = useSelector(state=>state.users)
    const [vid,setVid] = useState('')
    const [purchase,setPurchase] = useState(false)
    const videosData = useSelector(state => state.courses)
    const [liked,setLiked] = useState(videosData.courseLikes.includes(users[0].email))
    const [visible,setVisible] = useState(false)
    const [likes,setLikes] = useState(videosData.courseLikes)

    useEffect(()=>{
            setLiked(videosData.courseLikes.includes(users[0].email))
    },[likes])
    const duration = async ()=>{
       MediaMeta.get(videosData.courseVideos[0].vidUrl)
       .then((metadata)=>console.log(metadata))
       .catch(e=>console.log(e))
    }
    duration()

const likeCourse = ()=>{
    console.log(liked);
    if(!liked){
        love()
    }else if(liked){
         dislike()
    }
}
const love = async()=>{
    const newField ={courseLikes:[ ...new Set([...likes,users[0].email])]}
    const courseDoc = doc(db,'courses',videosData.identifier)
    await updateDoc(courseDoc,newField).then(()=>{
        // dispatch(setLikes([ ...new Set([...likes,users[0].email])]))
        setLiked(true)
    }).catch(e=>console.log(e))
}

const dislike = async()=>{
    const newField = {courseLikes:likes.filter((like)=>{
        return users[0].email !== like
    })}
    const courseDoc = doc(db,'courses',videosData.identifier)
    await updateDoc(courseDoc,newField).then(()=>{
        // dispatch(setLikes(payload))
        setLiked(false)
    }).catch((e)=>{
        console.log(e);
    }) 
}

    const update = async () =>{
        setVisible(true)
       const newField = {coursesEnrolledIds: [...users[0].coursesEnrolledIds,videosData.id?.toString()]}
       const userDoc = doc(db,'users',users[0].id)
        await updateDoc(userDoc,newField).then(()=>{
            setPurchase(true)
            dispatch(updateUsers(videosData.id?.toString()))
            setVisible(false) 
        }).catch((error)=>{
        console.log(error);
        setVisible(false)
       })
    }

    if(purchase){
        return(
            <PurchaseModel setPurchase={setPurchase}/>
        );
    }
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View style={styles.container}>
            <Spinner visible={visible} />
             <View style={styles.upperPart}>
           {  vid?  <Video

                        style={styles.video}
                        source={{uri:vid}}
                        resizeMode="contain"
                        useNativeControls={true}
             />:<>
                 <Text style={styles.bagde}>{videosData.courseName}</Text>
                    <Image source={require('../assets/images/IllustrationC.png')}/>
             </>
            }
                </View>
               <View style={styles.content}>
                    <View style={styles.header}>
                        <View>
                        <Text style={styles.courseName}>{videosData.courseName}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#858597',fontSize:12}}>6h 14min</Text>
                            <Text style={{color:'#858597',fontSize:12}}> . 24 Lessons</Text>
                        </View>

                    </View>
                    <Text style={{color:'#3D5CFF',fontWeight:'bold',fontSize:20}}>${videosData.coursePrice}</Text>
                    </View>
                    <View>
                        <Text style={{color:'#1F1F39',fontWeight:'bold',fontSize:16}}>About this course</Text>
                        <Text style={{color:'#858597',fontSize:12}}>Sed ut perspiciatis unde omnis iste natus error sit 
                                voluptatem accusantium doloremque laudantium, </Text>
                    </View>
                    <View style={{marginTop:34,height:'58%'}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                           {
                                videosData.courseVideos.map((video,index)=><VideoView name={name} {...video} key={index} setPurchase={setPurchase}  setVid={setVid}/>)
                            }
                         
                            <View/>
                        </ScrollView>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Pressable onPress={()=>{
                            likeCourse()
                        }} style={styles.favorate}>
                            <Ionicons name={liked?'star':'star-outline'} color={'#FF6905'} size={18}/>
                        </Pressable>
                        <Pressable disabled={users[0].coursesEnrolledIds?.includes(videosData.id?.toString())} onPress={()=>{
                              Alert.alert('Confirm', 'Confirm purchase', [
                                {
                                  text: 'Cancel',
                                  onPress: () =>  setPurchase(false),
                                  style: 'cancel',
                                },
                                { text: 'OK', onPress: () =>  {
                                    update()  
                                } },
                              ]);
                           
                            }} style={styles.buyBtn}>
                            <Text style={{color:'#ffffff',fontSize:16,fontWeight:'800'}}>{
                               [...users[0].coursesEnrolledIds].toString()?.includes(videosData.id?.toString())?'Enrolled':'Enroll Now'
                            }</Text>
                        </Pressable>
                    </View>
               </View>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

const VideoView = ({setVid,vidNo,vidName,vidUrl})=>{
    return(
        <Pressable onPress={()=>{
            setVid(vidUrl)
            
            }} style={styles.videoContainer}>
            <Text style={{fontSize:24,color:'#B8B8D2',fontWeight:'700'}}>0{vidNo}</Text>
            <View style={{width:185}}>
                <Text style={{fontSize:14,color:'#1F1F39',fontWeight:'600',marginBottom:5}}>{vidName}</Text>
                <Text style={{fontSize:12,color:'#3D5CFF',fontWeight:'700'}}>6:10 mins</Text>
            </View>
            <View style={styles.vidIcon}>
                <Ionicons name='play' size={26} color={'#FFFFFF'}/>
            </View>
        </Pressable >
    );
}

export default CourseView

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#FFE7EE'
    },
    content:{
        width:'100%',
        height:'68%',
        backgroundColor:'#ffffff',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        position:'absolute',
        bottom:0,
        padding:5
    },
    upperPart:{
        padding:5,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        height:'35%'
    },
    bagde:{
       color:'#1F1F39',
       fontSize:20,
       fontWeight:'bold'
    },
    header:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:16
    },
    courseName:{
        color:'#1F1F39',
        fontWeight:'bold',
        fontSize:20
    },
    videoContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:24
    },
    vidIcon:{
        backgroundColor:'#3D5CFF',
        width:44,
        height:44,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    favorate:{
        alignItems:'center',
        justifyContent:'center',
        width:89,
        height:50,
        borderRadius:10,
        backgroundColor:'#FFEBF0'
    },
    buyBtn:{
        alignItems:'center',
        justifyContent:'center',
        width:236,
        height:50,
        borderRadius:10,
        backgroundColor:'#3D5CFF'
    },
    video: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        marginBottom:20
      }
})