import { View, Text, StyleSheet, Pressable, ScrollView, Alert, TextInput, ToastAndroid } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import CheckBox from 'react-native-check-box'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { app, auth, db } from '../firebase/firebase.config'
import Spinner from 'react-native-loading-spinner-overlay';
import { doc, setDoc, onSnapshot  } from "firebase/firestore"; 
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authReducer';

const SignUp = ( { navigation } ) =>
{
    const [ checked, setChecked ] = useState( true )
    const [ email, setEmail ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ name, setName ] = useState( '' )
    const [ visible, setVisible ] = useState( false )
    const [ nameError, setNameError ] = useState( false )
    const [ done, setDone ] = useState( false )

    const dispatch = useDispatch();

    function validatePassword(password) {
        // Password should be at least 8 characters long
        if (password.length < 8) {
            ToastAndroid.show("Password should be at least 8 characters long",ToastAndroid['SHORT'])
            return false;
        }
    
        // Password should contain at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            ToastAndroid.show("Password should contain at least one lowercase letter",ToastAndroid['SHORT'])
            return false;
        }
    
        // Password should contain at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            ToastAndroid.show("Password should contain at least one uppercase letter",ToastAndroid['SHORT'])
            return false;
        }
    
        // Password should contain at least one digit
        if (!/\d/.test(password)) {
            ToastAndroid.show("Password should contain at least one digit",ToastAndroid['SHORT'])
            return false;
        }
    
        // Password should contain at least one special character
        if (!/[^a-zA-Z0-9]/.test(password)) {
            ToastAndroid.show("Password should contain at least one special character",ToastAndroid['SHORT'])
            return false;
        }
    
        // If all conditions are satisfied, return true
        return true;
    }
    
 
    

    const signup = async ()=>{
        if (!validatePassword(password)) {
           return;
        }
        setVisible(true)
        createUserWithEmailAndPassword(auth,email,password).then(async(userCredential)=>{
            await setDoc(doc(db, "users", userCredential.user.email), {
                name: name,
                email: email,
                EnrolledCourses: []
              });

              const unsub = onSnapshot(doc(db, "users", userCredential.user.email), (doc) => {
                
                doc.data()
                dispatch(setUser(doc.data()));

              });

              setVisible(false)
        }).catch((error)=>{
            Alert.alert(error.message);
            setVisible(false)
        })
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView>
                <Spinner visible={visible} />
                <View style={styles.container}>
                    <Spinner visible={visible} />
                    <Text style={styles.signupText}>Sign Up</Text>
                    <Text style={styles.detailsText}>Enter your details below & free sign up</Text>
                    <ScrollView style={styles.body}>

                        <View style={styles.textInput}>
                            <Text style={{ color: '#858597' }}>username</Text>
                            <TextInput
                                placeholderTextColor={'#1F1F39'}
                                style={[ styles.inputField, { borderWidth: 1, borderColor: nameError ? 'red' : 'transparent' } ]}
                                placeholder='Name'
                                onChangeText={( text ) =>
                                {
                                    setName( text )
                                    setNameError( false )
                                }}

                            />
                        </View>
                        <View style={styles.textInput}>
                            <Text style={{ color: '#858597' }}>Your Email</Text>
                            <TextInput
                                keyboardType='email-address'
                                placeholderTextColor={'#1F1F39'}
                                style={styles.inputField}
                                placeholder='e.g email@gmail.com'
                                onChangeText={( text ) => setEmail( text )}
                            />
                        </View>
                        <View style={styles.textInput}>
                            <Text style={{ color: '#858597' }}>Your Password</Text>
                            <View style={[ styles.inputField, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 24 } ]}>
                                <TextInput
                                    style={{ width: '95%' }}
                                    keyboardType='visible-password'
                                    placeholderTextColor={'#1F1F39'}
                                    placeholder='Password'
                                    onChangeText={( text ) => setPassword( text )}
                                />
                                <Ionicons name="eye-off" size={18} color="#1F1F39" />

                            </View>
                            <Pressable onPress={() =>
                            {

                                signup();
                            //    navigation.navigate("Tabs")
                            }
                            } style={styles.button}>
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>Create account</Text>
                            </Pressable>
                            <View style={{ flexDirection: 'row', marginTop: 32 }}>
                                <CheckBox
                                    isChecked={checked}
                                    checkBoxColor={!checked ? 'red' : '#B8B8D2'}
                                    style={styles.check}
                                    onClick={() => { setChecked( prev => !prev ) }}
                                />
                                <Text style={{ width: 253, color: '#B8B8D2' }}>By creating an account you have to agree
                                    with our terms & condications.
                                </Text>
                            </View>
                            <Text style={styles.loginText}>Already have an account？
                                <Pressable onPress={() => navigation.navigate( 'Login' )}>
                                    <Text style={{ color: "#3D5CFF", fontWeight: 'bold' }}>Login</Text>
                                </Pressable>
                            </Text>
                        </View>
                    
                    </ScrollView>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SignUp

const Model = ( { setDone, navigation } ) =>
{
    return (
        <View style={styles.modelContainer}>
            <View style={styles.model}>
                <View style={styles.tickContainer}>
                    <Ionicons name="checkmark" size={48} color="#FFFFFF" />
                </View>
                <Text style={{ color: '#1F1F39', fontSize: 16, fontWeight: '600' }}>Success</Text>
                <Text style={styles.congrats}>Congratulations, You have completed your registration</Text>
                <Pressable onPress={() =>
                {
                    navigation.navigate( 'Tabs' )
                }} style={styles.doneButton}>
                    <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600' }}>Done</Text>
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create( {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F2'
    },
    body: {
        backgroundColor: '#FFFFFF',
    },
    signupText: {
        marginTop: 60,
        fontWeight: 'bold',
        fontSize: 32,
        marginHorizontal: 24,
        color: '#1F1F39'

    },
    detailsText: {
        marginLeft: 24,
        color: '#B8B8D2',
        marginBottom: 10
    },
    textInput: {
        marginHorizontal: 24,
        marginTop: 32,

    },
    inputField: {
        backgroundColor: '#B8B8D2',
        borderRadius: 7,
        height: 50,
        paddingLeft: 10,
        color: '#1F1F39',
        width: '100%',
        marginTop: 4
    },
    button: {
        backgroundColor: '#3D5CFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        height: 50,
        borderRadius: 7,
    },
    check: {
        marginRight: 10,
        width: 16,
        height: 16
    },
    loginText: {
        textAlign: 'center',
        marginTop: 32,
        fontSize: 12,
        color: '#858597'
    },
    modelContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#858597',
    },
    model: {
        width: 291,
        height: 301,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 48,

    },
    tickContainer: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3D5CFF',
        borderRadius: 100,
        marginBottom: 16
    },
    congrats: {
        textAlign: 'center',
        width: 182,
        lineHeight: 20,
        fontSize: 12,
        color: '#858597',
        marginVertical: 19
    },
    doneButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3D5CFF',
        width: 259,
        height: 50,
        borderRadius: 10
    }

} )