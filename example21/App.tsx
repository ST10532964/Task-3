import { StyleSheet, Text, View } from 'react-native';

export default function App() {
let author:string="K. Radebe"

  return (
    <View style={styles.container}>
      <Text>PROFILE</Text>
      <View>
        <Image 
        style={styles.profileimage}
        source={require('./assets/splash-icon.png')}
        />
    <Text style={styles.programmer}>
     {author}
     </Text style={styles.description}>
     <Text>
     Mobile Application Developer passionate about IPRG
     </Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent:'center',
    padding:10,
   },
   programmer:{
     fontSize:24,
     fontWeight:'bold',

   },
   description:{
     fontSize:16,
     marginTop:4,
     
   },
profileimage:{
width:100,
height:100,
borderRadius: 20,
marginBottom:10,
   },
   card:{
   alignItems: 'center',
   padding:16,
   borderRadius:8,
   backgroundColor:'#fefefe',
   shadowcolor:'#000000',
   shadowOpacity: 0.1,
   shadowRadius:6,
   elevation:3,

   },
});