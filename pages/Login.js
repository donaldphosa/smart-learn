import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Image } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay/lib';


const Login = ({ navigation }) => {

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Spinner visible={false} />
          <Text style={styles.signupText}>Login</Text>
          <ScrollView style={styles.body}>
            <View style={styles.textInput}>
              <Text style={{ color: '#858597' }}>Your Email</Text>
              <TextInput
                onChangeText={text => { }}
                keyboardType='email-address'
                placeholderTextColor={'#1F1F39'}
                style={styles.inputField}
                placeholder='e.g email@gmail.com'

              />
            </View>
            <View style={styles.textInput}>
              <Text style={{ color: '#858597' }}>Your Password</Text>
              <View style={[styles.inputField, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 24 }]}>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={text => { }}
                  style={{ width: '95%' }}
                  keyboardType='visible-password'
                  placeholderTextColor={'#1F1F39'}
                  placeholder='Password'

                />
                <Pressable onPress={() => { }}>
                  <Ionicons name="eye-off" size={18} color="#1F1F39" />
                </Pressable>

              </View>
              <View style={styles.ForgetP}>
                <Text></Text>
                <Pressable>

                  <Text style={{ color: '#858597', fontSize: 14, marginTop: 13 }}>Forget Password?</Text>
                </Pressable>
              </View>
              <Pressable onPress={() => { }} style={styles.button}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff' }}>Log in</Text>
              </Pressable>

              <Text style={styles.loginText}>Don't have an account？
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text style={{ color: "#3D5CFF", fontWeight: 'bold' }}>Sign up</Text>
                </Pressable>
              </Text>
              <View style={styles.logOptions}>
                <View style={styles.line}></View>
                <Text style={{ color: '#858597', fontSize: 12 }}>Or login with</Text>
                <View style={styles.line}></View>
              </View>
              <View style={styles.options}>
                <Pressable>
                  <Image style={[styles.icon, { marginRight: 36 }]} source={require('../assets/images/google.png')} />
                </Pressable>
                <Pressable>
                  <Image style={styles.icon} source={require('../assets/images/facebook.png')} />
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Login

const styles = StyleSheet.create({
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
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 32,
    marginHorizontal: 24,
    color: '#1F1F39',
    overflow: 'hidden'
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
    borderRadius: 7
  },

  loginText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 12,
    color: '#858597'
  },
  ForgetP: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  logOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 23,

  },
  line: {
    width: '33%',
    borderColor: '#858597',
    borderWidth: 1,
    height: 1
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 48,
    height: 48,
  }
})