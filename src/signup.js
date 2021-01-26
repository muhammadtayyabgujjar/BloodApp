import React ,{useState}from 'react';
import auth from '@react-native-firebase/auth';
import {ScrollView,StyleSheet} from 'react-native'
import {  Header,  Form, Item,
     Input, Label,Icon,Text, Button, Card,} from 'native-base';
import database from '@react-native-firebase/database';
  function Signup({navigation}) {
 
  const[ name, setname] = useState()
  const[ email, setemail] = useState()
  const[ age, setage] = useState("")
  const[ password, setpassword] = useState("")
  const[ location, setlocation] = useState("")
    const Savedata=()=>{
     
      console.log("tayyab")

      {email || password ? alert("Make sure all values are filled") : 

  auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
    const newReference = database()
  .ref('/users')
  .push();

console.log('Auto generated key: ', newReference.key);

newReference
  .set({
    name : name,
    email:email,
    age :age,
    location:location,
    password: password,
  })
  .then(() => console.log('Data updated.'));
  navigation.navigate('login')

  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      alert('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      alert('That email address is invalid!');
    }

    console.error(error);
  });
  setname("")
  setage("")
  setemail("")
  setlocation("")
  setpassword("")
   }
  }
  
    return (
      
        
          <Form>
            <ScrollView>
              <Card style={styles.signup}>
              {/* <Header><Text style={{color : "white"}}>Signup</Text></Header> */}
            <Item stackedLabel>
              <Label style={styles.label}>Username</Label>
              <Input placeholder="" value={name} onChangeText={(text)=>setname(text)} required/>
            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>Email</Label>
              <Input placeholder=""  value={email} onChangeText={(text)=>setemail(text)} required/>

            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>Age</Label>
              <Input placeholder=""  value={age} onChangeText={(text)=>setage(text)} required/>
            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>password</Label>
              <Input placeholder=""  value={password} onChangeText={(text)=>setpassword(text)} required/>
            </Item>
            <Item stackedLabel>
              <Label style={styles.label}>confirm Password</Label>
              <Input placeholder=""  required />
            </Item>
          {/* <PickerInput></PickerInput> */}
              
            
            <Item stackedLabel>
              <Label style={styles.label}>Location</Label>
              <Input placeholder="" value={location} onChangeText={(text)=>setlocation(text)}/>
            </Item> 
           
            <Item style={{justifyContent: 'space-around'}}>
            <Button onPress={()=>Savedata()} typeof="submit"><Text>Sign Up</Text></Button>
         
            </Item>
           
          </Card>
            </ScrollView>
          </Form>
       
     
    );
  }

  const styles = StyleSheet.create({
    signup:{
      // backgroundColor: "lightgrey",
      fontFamily:'serif',
      margin: 30,
      padding:20,
      shadowColor: 'grey'
    },
    label:{
      color:'black',
      fontFamily:'serif'
    }
  })
export default Signup
