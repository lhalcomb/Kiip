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
//import ExpoSecureStore, {getItemAsync, setItemAsync} from 'expo-secure-store';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import colors from '../config/colors';

export async function getUrl() {
  const ip = await Linking.getInitialURL();
  return `http${ip?.substring(3, ip.length - 4)}3000`;
}

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState("");

    const router = useRouter();

    const loginOnPress = async () => {
        if (email && password) {
            setError("");
            const address = await getUrl();
            const res = await fetch(`${address}/auth`, {
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
                const data = await res.json();
                const token = data.token;
                await SecureStore.setItemAsync("token", token);
                router.push("./tabs/transactions");  // Navigate to 'Home' page
                
            }else{
                setError("Incorrect email or password");
          
            }   
        } else {
            setError("Please enter both email and password");
        }
    };
    const checkToken = async () => {
      // await SecureStore.setItemAsync("token", "");
      try {
          const token = await SecureStore.getItemAsync("token");
          
          if (token) {
              // fetch /authorize
              const address = await getUrl();
              const res = await fetch(`${address}/checkToken`, {
                method: "POST",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "token": token
                })
              });

              if (res.ok) {
                router.push("./tabs/transactions");
               
              } else {
                await SecureStore.setItemAsync("token", "");
                
              }
          }
      } catch (error) {
          console.error("Error checking token:", error);
      }
  };

    useEffect(() => {
    
      // const token = SecureStore.getItemAsync("token");
      // if (token) {
      //   router.push("./tabs/transactions");
      // }
      checkToken();
    }, [router]);

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
                placeholderTextColor="#DFDFDF" 
                value={email}
                autoCapitalize='none'
                onChangeText={setEmail}/>
            <TextInput 
                style={styles.inpEle}
                placeholder='password'
                placeholderTextColor="#DFDFDF" 
                secureTextEntry
                value={password}
                autoCapitalize='none'
                onChangeText={setPassword}/>

            <Pressable style={styles.loginButton} onPress={loginOnPress} >
                <Text style={styles.loginText}>LOGIN</Text>
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
    height: '30.5%',
    alignItems: 'center',
    backgroundColor: "#D9D9D9",
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
    marginTop: 50,
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
