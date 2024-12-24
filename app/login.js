import { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS, SIZES, SHADOWS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import styles from '../style/Styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { logIn } from '../services/services'


const login = () => {
   const router = useRouter()
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState('')
   
   
   const handleLogin = async () => {
  try {
    if (!email || !password) {
      Alert.alert("Error", "Please provide both email and password!");
      return;
    }
    
    await logIn(email, password); // Call your login function
    Alert.alert("Logged in successfully");
    router.push(`/home`);
  } catch (error) {
    // Handle Firebase-specific errors
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      Alert.alert("Error", "No registered user with such information.");
      router.push(`/signup`); // Redirect to signup if user doesn't exist
    } else {
      Alert.alert("Error", "Login failed, please try again!");
    }
  }
};




  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <StatusBar backgroundColor={COLORS.lightWhite} />
        <Stack.Screen 
           options={{
              headerTitleAlign: "center",
              headerTitle: "Hello",
              headerTitleStyle: {
                 fontFamily: "DMItali",
                 color: COLORS.primary,
                 fontSize: SIZES.xxLarge,
              },
              headerBackVisible: false,
              
           }}
        />
<KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' works best for iOS, 'height' for Android
        style={{ flex: 1 }}
        >
           <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', marginHorizontal: 15, paddingTop: 40 }} keyboardDismissMode='on-drag'>
        <View style={{flex:1,marginHorizontal:15,marginTop:50, }}>
           <Text style={{color:COLORS.primary, fontWeight:"bold",fontFamily:"DMRegular", marginBottom: 20}}>Welcome!</Text>
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

           <TouchableOpacity onPress={handleLogin}>
              <Text style={{ color: "white", textAlign: "center", marginTop: 10, borderColor: COLORS.gray2, borderRadius: 15, backgroundColor: COLORS.tertiary, padding:10, justifyContent:"center",alignItems:"center", fontWeight:"900"
              }}>Login</Text>
           </TouchableOpacity>

           <View style={{ flex: 1, flexDirection: "row",  justifyContent: "space-between" }}>
            
              <TouchableOpacity onPress={()=>router.push(`https://github.com/jezreelfasa?tab=repositories`)} style={styles.gcont}>
                 <MaterialCommunityIcons name="github"  size={30} color="black"/>
                 <Text style={styles.social}>My Github Repo</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>router.push(`https://www.linkedin.com/in/emmanuel-odubu-799351168/`)} style={[styles.gcont, ]}>
                 <MaterialCommunityIcons name="linkedin" size={30} color="#3b5998"/>
                 <Text style={[styles.social,{color:"#3b5998"}]}> My Linkedin</Text>
                 </TouchableOpacity>
            
           </View>
           <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 50, justifyContent: "center",  }}>
              
              <Text style={{color:COLORS.gray2}}>Don't have an account?</Text>
           <TouchableOpacity onPress={()=>router.push(`/signup`)}>
              <Text style={{ color: 'red', fontWeight: "bold" }}>Sign Up</Text>
           </TouchableOpacity>
           </View>
        
        
              </View>
              </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default login