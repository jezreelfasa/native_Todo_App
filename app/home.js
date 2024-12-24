import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar, ScrollView, BackHandler, Alert} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import icons from '../constants/icons'
import styles from '../style/Styles'
import { SHADOWS } from '../constants/themes'
import { useEffect } from 'react'
import DateComponent from '../components/date/Date'
import { COLORS, FONT, SIZES } from '../constants/themes'
//import Icon from 'react-native-vector-icons/Ionicons';
import { logOut } from '../services/services'



const Home = () => {
const router = useRouter()
  
  handleSignOut = async () => {
    try {
      await logOut()
      Alert.alert("Signed out successfully!")
      router.push(`/login`)
    } catch (error) {
      Alert.alert("Network error",error.message)
    }
}
  
  
  useEffect(() => {
    const backAction = () => {
      // Do nothing and return true to disable the back button
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup the event listener
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "whitesmoke" }}>
      <StatusBar backgroundColor="whitesmoke"/>
      <Stack.Screen 
        options={{
        headerShown:false
        }}
      />
      <View style={{ backgroundColor: "whitesmoke" , padding:10, flexDirection:"row", ...SHADOWS.medium, marginTop:20, }}>
        <TouchableOpacity style={{marginLeft:"auto"}} onPress={()=> router.push('/todoscreen')}>
          
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome!{'\n'} What would you like to do today?</Text>
          <DateComponent/> 
        </View>
       
        <ScrollView  keyboardDismissMode='on-drag'  showsVerticalScrollIndicator={true} contentContainerStyle={{ alignItems: "center", paddingVertical: 10 }}>
          <View style={styles.firstImg}>
          <TouchableOpacity style={styles.imgContainer} onPress={() => router.push(`/todoscreen`)}>
            <Image 
              source={icons.lion}
              style={styles.logoImage}
            />
            <Text style={{color:COLORS.gray,fontFamily:FONT.medium, fontWeight:700, padding:10}}>Visit Todo App</Text>
        </TouchableOpacity>
          </View>
          <View style={styles.secondRow}>
          <TouchableOpacity style={styles.imgContainer} onPress={() => router.push(`https://github.com/jezreelfasa?tab=repositories`)}>
            <Image 
              source={icons.ggg}
              style={styles.logoImage}
            />
              <Text style={{ color: 'black', fontFamily: FONT.medium, fontWeight: 700, padding:10 }}>GitHub Repository </Text>
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.imgContainer} onPress={() => router.push(`https://expo.dev/preview/update?message=Job%20Search%20App%20built%20with%20React%20Native&updateRuntimeVersion=1.0.0&createdAt=2024-12-24T09%3A08%3A41.552Z&slug=exp&projectId=2bb2ab32-d60c-403f-9d3f-0ec55642884a&group=78ea0029-de02-403d-b4e3-dc3b241e0394`)}>
            <Image 
              source={icons.job}
              style={styles.logoImage}
            />
              <Text style={{ color: COLORS.primary, fontFamily: FONT.medium, fontWeight: 700, padding:10 }}>Search for Job</Text>
          </TouchableOpacity>
           
            </View>
        </ScrollView>
        
        <View style={{marginBottom:SIZES.xxLarge}}>
          <TouchableOpacity onPress={handleSignOut}>
             <Text  style={[styles.logstyle, {color:"white",backgroundColor:COLORS.tertiary, fontWeight:"900"}]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
         
        </View>
        
   </SafeAreaView>
  )
}

export default Home