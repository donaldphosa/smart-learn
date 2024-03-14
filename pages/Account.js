import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React,{ useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker'
import {signOut} from 'firebase/auth'
import { auth, storageRef} from '../firebase/firebase.config';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useSelector } from 'react-redux';

const Account = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [visible,setVisible] = useState(false);
  



  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     // setSubmit(!submit);
  //     setImage(result.uri);
  //     const blob = await new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = function () {
  //         reject(new TypeError("Network request failed!"));
  //       };
  //       xhr.responseType = "blob";
  //       xhr.open("GET", result.uri, true);
  //       xhr.send(null);
  //     });
  //     const ref = storageRef.child(new Date().toISOString());
  //     const snapshot = (await ref.put(blob)).ref
  //       .getDownloadURL()
  //       .then((imageUrl) => {
  //         //getting image link from storage
  //         setImage(imageUrl);
         
  //         // setSubmit(false);
  //       });
  //   } else {
  //     setImage(result.uri);
  //     // setSubmit(false);
  //   }

   
  // };



  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <Spinner visible={visible} color='#3D5CFF'/>
        <View style={styles.container}>
          <Text style={{color:'#1F1F39',fontWeight:'bold',fontSize:24}}>Account</Text>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={image?{uri:image}:require('../assets/images/avater.png')}/>
            <Pressable onPress={()=>{}} style={styles.camera}>
              <Ionicons name='camera' size={24} color='#fff'/>
            </Pressable>
          </View>
            <Pressable style={styles.setting}>
              <Text style={styles.settingText}>Favourite</Text>
              <Ionicons name='star' size={18} color='#1F1F39'/>
            </Pressable>
            <Pressable style={styles.setting}>
              <Text style={styles.settingText}>Edit Account</Text>
              <Ionicons name='pencil' size={18} color='#1F1F39'/>
            </Pressable>
            <Pressable style={styles.setting}>
              <Text style={styles.settingText}>Settings and Privacy</Text> 
              <Ionicons name='settings' size={18} color='#1F1F39'/>
            </Pressable>
            <Pressable style={styles.setting}>
              <Text style={styles.settingText}>Help</Text>
              <Ionicons name='help' size={18} color='#1F1F39'/>
            </Pressable>
            <Pressable onPress={()=>{}} style={styles.setting}>
              <Text style={styles.settingText}>Log Out</Text>
              <Ionicons name='log-out-outline' size={18} color='#1F1F39'/>
            </Pressable>
              
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Account

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
    paddingHorizontal:10,
    paddingTop:40
  },
  imageContainer:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:40
  },
  image:{
    width:100,
    height:100,
    borderRadius:100,
    shadowOpacity:0.55,
    shadowColor:'gray'
  },
  camera:{
    backgroundColor:'#3D5CFF',
    width:35,
    height:35,
    borderRadius:100,
    padding:2,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:-5,
    right:'38%',
    zIndex:100
  },
  settingText:{
    color:'#1F1F39',
    fontWeight:'600',
    fontSize:16,
    opacity:0.8
  },
  setting:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'100%',
    marginBottom:23,
    paddingRight:10
  }
})