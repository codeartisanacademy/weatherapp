import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import axios from "axios";
import MapView from 'react-native-maps';

const Detail = ({route, navigation}) => {
  const { city } = route.params;
  const [result, setResult] = useState(null);
  const getWeatherData = ()=>{
    navigation.setOptions({title:city})
    const options = {
      method:'GET',
      url:'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {
        q:city
      },
      headers:{
        'X-RapidAPI-Key': '712828510dmshaa0dcff70759db4p1a1489jsn14e58546ca7a',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }

    axios.request(options)
    .then(response =>{
      //console.log(response.data);
      setResult(response.data);
    })
    .catch(error => {
      window.alert(error.message);
    })
  }

  useEffect(() => {
    
    getWeatherData();
  }, []);


  return (
    <View style={styles.container}>
      {
        result ? (
          <>
            <View style={styles.mb}>
              <Text style={styles.title}>Location</Text>
              <Text>{result.location.name}, {result.location.region}, {result.location.country} </Text>
            </View>
            <View style={styles.mb}>
              <Text style={styles.title}>Current Condition</Text>
              <Text>{result.current.condition.text}</Text>
            </View>
            <View style={styles.mb}>
              <Text style={styles.title}>Current Temperature</Text>
              <Text>{result.current.temp_c}C</Text>
            </View>
            <View>
            <Text style={styles.title}>Map</Text>
              <MapView 
              style={styles.map}
                initialRegion={
                  {
                    latitude: result.location.lat,
                    longitude: result.location.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }
                } 
              />
            </View>
          </>
        ):
        (
          <View>
            <Text>We can't find the city {city}</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:20
  },
  title: {
    fontWeight:'bold'
  },
  mb:{
    marginBottom:10,
  },
  map:{
    width:"100%",
    height:220,
    marginVertical:10

  }

})

export default Detail