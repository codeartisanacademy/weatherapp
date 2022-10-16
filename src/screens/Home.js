import { View, Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'

const Home = ({navigation}) => {
  const [city, setCity] = useState();

  const changeText = (value)=>{
    console.log(value);
    setCity(value);
  }

  const goToDetail = ()=>{
    if(city){
        navigation.navigate("Detail", {
            city: city
        } );
        setCity('');
    }else{
        window.alert("Please enter a city");
    }
    
  }  
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <TextInput style={styles.searchField} onChangeText={changeText} placeholder="Enter a city" value={city}></TextInput>
            <TouchableOpacity style={styles.button} onPress={goToDetail} >
                <Text style={styles.textLight}>Search</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(
    {
        container:{
            marginTop:100,
            alignItems: 'center',
            justifyContent: 'center'

        },
        searchField:{
            width:320,
            padding:20,
            borderWidth:1,
            fontSize:20,
            marginBottom:20
        },
        button:{
            backgroundColor:'black',
            width:320,
            padding:10
        },
        textLight:{
            color:'white',
            alignSelf:'center'
        }
    }
)

export default Home