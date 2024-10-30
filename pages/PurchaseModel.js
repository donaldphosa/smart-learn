import { StyleSheet, Text, View, Pressable, } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


const PurchaseModel = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View style={styles.container}>
            <View style={styles.modelContainer}>
            <View style={styles.model}>
                <View style={styles.tickContainer}>
                    <Ionicons name="checkmark" size={48} color="#FFFFFF" />
                </View>
                <Text style={{color:'#1F1F39',fontSize:16,fontWeight:'600',marginVertical:20}}>Successful purchase</Text>
                
                <Pressable onPress={()=>{}} style={styles.doneButton}>
                    <Text style={{color:'#ffffff',fontSize:16,fontWeight:'600'}}>start learning</Text>
                </Pressable>
            </View>
        </View>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default PurchaseModel

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center'
    },
  
    model:{
        width:291,
        height:301,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        alignItems:'center',
        paddingVertical:48,
    
    },
    tickContainer:{
        width:64,
        height:64,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3D5CFF',
        borderRadius:100,
        marginBottom:16
    },
    doneButton:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3D5CFF',
        width:259,
        height:50,
        borderRadius:10
    }
})