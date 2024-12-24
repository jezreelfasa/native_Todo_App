import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

export const unstable_settings = {
  initalRouteName: "todoscreen"
  
}

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/icons/fonts/DMSans-Bold.ttf'),
    DMRegular: require('../assets/icons/fonts/DMSans-Regular.ttf'),
    DMItali: require("../assets/icons/fonts/Ephesis-Regular.ttf")
})
  if (!fontsLoaded) {
    return null
  }
  
  return (
    <Stack>
      <Stack.Screen name="home" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="todoscreen" />
      <Stack.Screen name="login"/>
    </Stack>
  )
}

export default Layout


