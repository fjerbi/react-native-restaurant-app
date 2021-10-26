import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import yelp from "../api/yelp";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);

    setResult(response.data);
    //console.log(result.coordinates.latitude);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>{result.name}</Text>
      <ScrollView>
        <MapView
          region={{
            latitude: result.coordinates.latitude,
            longitude: result.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: result.coordinates.latitude,
              longitude: result.coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></Marker>
        </MapView>
      </ScrollView>
      <FlatList
        style={styles.flatlist}
        horizontal
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    marginTop: 50,
    width: 500,
    height: 500,
  },
  image: {
    height: 200,
    width: 300,
  },
  flatlist: {
    marginTop: 35,
  },
});
export default ResultsShowScreen;
