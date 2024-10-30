import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';


const FindFriends = ({ navigation }) => {


    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.search}>
                        <Ionicons name="search" size={18} color="#B8B8D2" />
                        <TextInput style={styles.searchField} placeholder='Find Friends' />
                        <Text></Text>
                    </View>
                    <ScrollView style={{ width: '100%' }}>
                        {
                            <Pressable
                                key={index}
                                onPress={() => {
                                    Alert.alert('Add friend', `you want to add phosa donald`, [
                                        {
                                            text: 'cancel',
                                            style: 'cancel',
                                            onPress: () => {}
                                        },
                                        {
                                            text: 'yes',
                                            style: 'ok',
                                            onPress: () => { }
                                        }
                                    ])

                                }}
                                style={styles.friend}>
                                <Image style={{ width: 30, height: 30, marginRight: 20 }} source={require('../assets/images/avater.png')} />
                                <Text style={{ color: '#1F1F39', fontSize: 16, fontWeight: 'bold' }}>phosa donald</Text>
                            </Pressable>
                        }
                    </ScrollView>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default FindFriends

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        backgroundColor: '#F4F3FD',
        width: '100%',
        height: 48,
        padding: 14,
        borderRadius: 10
    },
    searchField: {
        width: '70%',
        color: '#B8B8D2'
    },
    friend: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 5,
        borderRadius: 5
    }
})