import { useState } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, Alert, TextInput,TouchableOpacity, SafeAreaView, Image, StatusBar, ScrollView} from 'react-native'
import { signUp } from '../services/services';
import { useRouter, Stack } from 'expo-router'
import {icons,COLORS,SIZES,SHADOWS} from '../constants'
import styles from'../style/Styles'
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const SignUp = () => {
   const router = useRouter()
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false)
   

   const handleSignUp = async () => {
      if (!password || !email) {
         Alert.alert("Error", "All fields are required!")
         router.push(`/login`)
         return;
      }
      if (password.length < 8) {
         Alert.alert("Password must be at least 8 characters long")
      }
      
       try {
          setLoading(true);
          await signUp(email, password)
            Alert.alert('Success!', 'You have registered successfully!');
            router.push(`/home`); // Navigate to home
        } catch (error) {
            // Handle Firebase-specific errors
            const errorMessage = error.message.includes('auth/')
                ? error.message.split('auth/')[1].replace(/-/g, ' ').toUpperCase()
                :""
        } finally {
            setLoading(false);
        }
    };


   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
         <StatusBar backgroundColor="white"/>
         <Stack.Screen
            options={{
               headerShown: false,
            }}
         />
         <View style={{backgroundColor:COLORS.lightWhite, flexDirection:'row',alignItems:"center",padding:10, marginTop:15, ...SHADOWS.medium,}}> 
        <TouchableOpacity style={{marginLeft:10, flexDirection:"row"}} onPress={() => (router.canGoBack() ? router.back() : router.push())}>
              <Image 
                source={icons.left}
                style={{height:30,width:30, marginLeft:5}}
               />
               
            </TouchableOpacity>
            <Text style={{textAlign:"center",marginHorizontal:110, fontSize:SIZES.xLarge, fontFamily:"DMItali" }}>Sign Up</Text>
         </View>
         
         <ScrollView keyboardDismissMode='on-drag'>
            <View style={{ flex: 1, marginHorizontal: 15, marginTop: 75 }}>
           <Text style={{color:COLORS.primary, fontWeight:"bold",fontFamily:"DMRegular", marginBottom:25}}>Register!</Text>
           <TextInput
              value={email}
              placeholder='Email'
              onChangeText={setEmail}
              style={styles.logstyle}
           />

           <TextInput
              value={password}
              placeholder='Password'
              onChangeText={setPassword}
              secureTextEntry
              style={styles.logstyle}
           />
           
           <TouchableOpacity onPress={handleSignUp} disabled={loading}>
             <Text style={{ color: "white", textAlign: "center", marginTop: 20, borderColor: COLORS.gray2, borderRadius: 15, backgroundColor: COLORS.tertiary, padding:10, justifyContent:"center",alignItems:"center", fontWeight:"900"
              }}>Signup</Text>
            </TouchableOpacity>
             <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 50, justifyContent: "center", marginTop:30 }}>
              
               
              <Text style={{color:COLORS.gray2}}>Already have an account?</Text>
           <TouchableOpacity onPress={()=>router.push(`/login`)}>
              <Text style={{ color: COLORS.tertiary, fontWeight: "bold" }}>Login</Text>
               </TouchableOpacity>
               
            </View>
            
         </View>
         </ScrollView>
 
   
      </SafeAreaView>
  )
}

export default SignUp