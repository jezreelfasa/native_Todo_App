import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES, FONT } from '../constants/themes'

const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    alignItems: 'center',
    
   
  },
  header: {
    marginVertical: 70,
    
  },
  welcomeText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
     textAlign: 'center',
     color: COLORS.primary,
    fontFamily: FONT.medium
  },
  imgContainer: {
    //marginVertical: 50,
    alignItems: 'center',
    //rowGap:
    
  },
  logoImage: {
    width: 50,
    height: 50,
     borderRadius: 10,
    marginBottom: 0,
     marginTop:"auto"
   },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
     width: '100%',
    alignItems: "center",
    columnGap: 50
    
   },
  
  firstImg: {
     marginTop:'auto',
     marginBottom:'17%'
   },
   

   //FOR TODO SCREEN APP//
   holder: {
      textAlign: "center",
      padding: SIZES.medium,
      flexDirection: "row",
      borderWidth: 0.5,
      borderColor: COLORS.primary,
      borderRadius: 50,
      padding: SIZES.small,
      marginHorizontal: 80,
     color: COLORS.primary,
      
   },

   mix: {
      textAlign: "center",
      paddingBottom: SIZES.medium,
      marginTop: SIZES.xxLarge,
      fontFamily: FONT.regular,
      fontWeight: 700,
     color: COLORS.primary,
  
      
   },

   icons: {
      backgroundColor: 'none',
      //...SHADOWS.small,
     shadowColor: COLORS.primary, 
     marginLeft: 10,
     padding: 1,
     borderRadius: 5,
     borderColor: "green",
     borderWidth:0.5
      
},
   
  profile: {
    flex: 1,
    flexDirection: 'row',
    
  },
  
//login styles
  logstyle: {
    //top: 5,
    padding: SIZES.medium,
    borderColor: COLORS.gray2,
    borderRadius: 15,
    backgroundColor: '#EBEBEB',
    marginBottom:10
   
  },
  //social
  social: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: SIZES.small,
    marginLeft: 5,
    
    
    
    
  },

  gcont: {
  
    flexDirection: "row",
    marginTop: SIZES.xxLarge,
    borderRadius: 20,
  width: '50%',
    textAlign:"center",
    height: 50,
    borderBlockColor: COLORS.white,
  ...SHADOWS.medium,
    shadowColor:COLORS.gray2,
    paddingLeft:15,
    alignItems: 'center',
 justifyContent:"center"
   
   
  
  }
})

export default styles