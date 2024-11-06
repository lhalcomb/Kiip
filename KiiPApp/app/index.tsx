import {
    View, 
    Text, 
    TextInput, 
    Pressable, 
    StyleSheet, 
    KeyboardAvoidingView,
    SafeAreaView,
    Alert,
    Image ,
    Platform
} from "react-native";
import {useRouter} from "expo-router";

import * as Linking from "expo-linking";
import { useEffect, useState } from 'react';
import colors from '../config/colors';

//import ExpoSecureStore, {getItemAsync, setItemAsync} from 'expo-secure-store';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState("");

    const router = useRouter();

    const loginOnPress = async () => {
        if (email && password) {
            //Alert.alert(`Logged in with: ${email} and ${password}`)
            setError("");

            const res = await fetch('http://10.0.2.2:3000/auth', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email, 
                    "password": password
                })
            });

            if (res.ok) {
                router.push("./Transactions");  // Navigate to 'Home' page
            }else{
                setError("Incorrect email or password");
            }

            
        } else {
            setError("Please enter both email and password");
        }
    };

    return(
        <View style={styles.pageContainer}>

        <Image
            source = {require("../assets/images/kiiplogo.png")}
            style = {styles.logo} 
        />

        <View style={styles.inpBox}>
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

            <Pressable style={styles.loginButton} onPress={loginOnPress} >
                <Text style={styles.loginText}>login</Text>
            </Pressable>
        </View>

        <View style = {styles.errCont}>
            {Error &&  <Text style={styles.error}> {Error} </Text> }
        </View>

        <View style = {styles.lgCircle}/>
        <View style = {styles.smCircle}/>

        </View>
     )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  }, 
  logo: {
    width: 269,  
    height: 153, 
    alignSelf: 'center',  
    position: 'absolute',
    top: '5%'
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  }, 
  inpBox: {
    top: '5%',
    alignItems: 'center',
    backgroundColor: "#D9D9D9",
    rowGap: 2,
    height: "35%",
    padding: 25,
    borderRadius: 24,
  },
  inpEle: {
    width: '100%',
    minHeight: '8%',
    backgroundColor: "white",
    borderRadius: 15,
    height: 40,
    fontSize: 20,
    paddingHorizontal: "5%",
    marginBottom: '5%',
  }, 
  loginButton: {
    width: '30%',
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
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
  loginText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  choice: {
    fontSize: 20,
    padding: 10
  },
  lgCircle: {
    position: 'absolute',
    bottom: '-15%',
    left: '10%',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#D9D9D9'
  },
  smCircle: {
    position: 'absolute',
    bottom: '10%',
    right: '20%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D9D9D9'
  },
});

export default Login;
