import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const Auth = ({navigation}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Image style={styles.banner} source={require('../assets/images/illustration.png')}/>
          <Text style={styles.text}>create your own study plan</Text>
          <Text style={styles.textSmall}>Study according to the 
              study plan, make study 
              more motivated
            </Text>
            <View style={styles.btnContainer}>
              <Pressable onPress={()=>navigation.navigate('SignUp')} style={[styles.button,{backgroundColor:'#3D5CFF'}]}><Text style={{color:'white',fontWeight:'700',fontSize:16}}>Sign up</Text></Pressable>
              <Pressable onPress={()=>navigation.navigate('Login')} style={styles.button}><Text style={{color:'#3D5CFF',fontWeight:'700',fontSize:16}}>Log in</Text></Pressable>
            </View>          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Auth

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    banner:{
      width:260,
      height:260,
      marginTop:90,
    },
    text:{
      fontWeight:'bold',
      fontSize:22,
      width:180,
      textAlign:'center',
      color:'#1F1F39',
      height:66,
      marginTop:38
    },
    textSmall:{
      fontSize:16,
      fontWeight:'normal',
      color:'#858597',
      width:180,
      textAlign:'center'
    },
    button:{
      width:140,
      height:55.5,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      borderColor:'#3D5CFF',
      borderWidth:1
    },
    btnContainer:{
      flexDirection:'row',
      width:'85%',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:51
    }
})