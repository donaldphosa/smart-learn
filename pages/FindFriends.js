import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, set, ref, get, push, update, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';

const FindFriends = ({navigation}) => {
    const [friends,setFriends] = useState([])
    const [user,setUser] = useState(null)
    const myself = useSelector(state=>state.users)
    const [buddies,setBuddies] = useState([])
    const [namesOfBuddies,setNameOfBudd] = useState([])
   
    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        getFriends()
    },[])

    const getFriends = async()=>{
        await getDocs(collection(db,'users')).then((docs)=>{
            setFriends( docs.docs.map((doc)=>{
                return doc.data()
            }))
        })
    }

    const onAddFriend = async(newf)=>{
        const database = getDatabase()
        const currentUser = await get(ref(database,`chats/${myself[0].name}`))
        const me = currentUser.val()
       
        onValue(ref(database,`chats/${myself[0].name}`),snapshots=>{
            const data = snapshots.val()
            setBuddies(data.friends)
            setNameOfBudd(data.friends?.map((b)=>{
                return b.name
            }))
        })
       
        if (buddies&&namesOfBuddies.includes(newf.name)) {
            console.log(namesOfBuddies.includes(newf.name));
            navigation.goBack()
            return
        }else{
              // create a chatroom and store the chatroom id

            const newChatroomRef = push(ref(database, 'chatrooms'), {
                firstUser: newf.name,
                secondUser: myself[0].name,
                messages: [],
            });

            const newChatroomId = newChatroomRef.key;

          const userFriends = (await get(ref(database, `chats/${newf.name}`))).val().friends
             //join myself to this user friend list
            update(ref(database, `chats/${newf.name}`), {
                friends: [
                ...userFriends,
                    {
                        username: myself[0].name,
                        avatar: '../assets/images/avater.png',
                        chatroomId: newChatroomId,
                    }
                ]
            });

            
            //add this user to my friend list
            update(ref(database, `chats/${me.name}`), {
              friends: [
                ...buddies,
                {
                  username: newf.name,
                  avatar: '../assets/images/avater.png',
                  chatroomId: newChatroomId,
                },
              ],
            });
            navigation.goBack()
        }
    }

  return (
    <SafeAreaProvider>
        <SafeAreaView>
            <View style={styles.container}>
            <View style={styles.search}>
            <Ionicons name="search" size={18} color="#B8B8D2" />
            <TextInput style={styles.searchField} placeholder='Find Friends'/>
            <Text></Text>
          </View>
          <ScrollView style={{width:'100%'}}>
            {
                friends.map((friend,index)=>{
                    if(user.email.toLowerCase() !== friend.email.toLowerCase())
                        return<Pressable
                            key={index}
                            onPress={()=>{
                                Alert.alert('Add friend',`you want to add ${friend.name}`,[
                                    {
                                        text:'cancel',
                                        style:'cancel',
                                        onPress:()=>{

                                        }
                                    },
                                    {
                                        text:'yes',
                                        style:'ok',
                                        onPress:()=>{
                                            onAddFriend(friend)
                                           
                                        }
                                    }
                                ])
                                
                            }}
                            style={styles.friend}>
                            <Image style={{width:30,height:30,marginRight:20}} source={require('../assets/images/avater.png')}/>
                            <Text style={{color:'#1F1F39',fontSize:16,fontWeight:'bold'}}>{friend.name}</Text>
                        </Pressable>
                    })
            }
        </ScrollView>
                
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default FindFriends

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center'
    },
    search:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:15,
        backgroundColor:'#F4F3FD',
        width:'100%',
        height:48,
        padding:14,
        borderRadius:10
      },
      searchField:{
        width:'70%',
        color:'#B8B8D2'
      },
      friend:{
        flexDirection:'row',
        alignItems:'center',
        width:'95%',
        padding:10,
        borderWidth:1,
        borderColor:'#ccc',
        margin:5,
        borderRadius:5
      }
})