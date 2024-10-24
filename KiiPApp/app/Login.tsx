import {
    View, 
    Text, 
    TextInput, 
    Pressable, 
    StyleSheet, 
    KeyboardAvoidingView,
    SafeAreaView,
    Image ,
    Platform} from "react-native";
//import {Image} from "expo-image";
import {Feather} from "@expo/vector-icons";

import * as Linking from "expo-linking";
import { useEffect, useState } from 'react';
import colors from '../config/colors';

//import ExpoSecureStore, {getItemAsync, setItemAsync} from 'expo-secure-store';



function Login() 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState("");

   

    return(
        <KeyboardAvoidingView 
        behavior='padding' 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 0} 
        style={styles.container1}>
        <View style={styles.container1}>
            {/* <Image
                    source = {require("../assets/images/kiiplogo.png")}
                    style = {styles.logo} 
                /> */}
            <View style={styles.form}>
                <View>
                    
                    <TextInput 
                    style={styles.inpEle}
                    placeholder='email address'
                    value={email}
                    autoCapitalize='none'
                    onChangeText={setEmail}/>
                    <TextInput 
                    style={styles.inpEle}
                    placeholder='password' 
                    secureTextEntry
                    value={password}
                    autoCapitalize='none'
                    onChangeText={setPassword}/>
                </View>
                <Pressable style={styles.signInButton}/* onPress={loginOnPress}*/ >
                <Text style={styles.signInText}>Sign In</Text>
                </Pressable>
                <View style= {styles.errCont}>
                    {Error &&  <Text style={styles.error}> {Error} </Text> }
                </View>
                
            </View>
            <View style={styles.container2}>
                <Feather name= 'check-square' size = {24} color = 'black' />
                <Text style={styles.choice}>Stay Logged In</Text>
                <Text style={styles.choice}>Forgot Password?</Text>
                <Text style={styles.choice}>Create Account</Text>
            </View>
            

        </View>
        </KeyboardAvoidingView>
     )
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  }, 
  logo: {
    width: 150,   // Adjust width as needed
    height: 100,  // Adjust height as needed
    alignSelf: 'center',  // Center the logo
    marginBottom: 20,  // Add some spacing below the logo
    },
  textStyle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    }, 
  form: {
      backgroundColor: "white",
      padding: 50,
      },
  inpEle: {
      width: '100%',
      borderBottomWidth: 1,
      height: 40,
      marginTop: 30,
      fontSize: 20,
  }, 
  signInButton: {
      width: '100%',
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      height: 50,
      backgroundColor: colors.VibrantGreen
  }, 
  errCont: {
      width: '100%',
      alignItems: "center",
      justifyContent: "center",
  },
  error:{
      
      marginTop: 30,
      color:"red",
  },
  signInText: {
      fontSize: 20,
  },
  container2: {
      alignItems:  "flex-start",
      paddingLeft: 35
      
  },
  choice: {
      fontSize: 20,
      padding: 10
  }

 
  });

export default Login;