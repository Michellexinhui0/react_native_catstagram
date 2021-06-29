import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Card, Button, Text } from "react-native-elements";
import { useEffect, useState } from "react";
const axios = require("axios");

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
      console.log("response", response);
      setBreeds(response.data);
    });
  }, []);
  return (
    <SafeAreaView>
      {breeds.map((breed) => {
        if (breed.image) {
          return (
            <Card key={breed.id}>
              <Card.Title>{breed.name}</Card.Title>
              <Card.Divider />
              <Card.Image
                source={{
                  uri: breed.image.url,
                }} style={{ width: 300, height: 300 }}
              ></Card.Image>
              <Card.Divider />
              <Button
                title="Details"
                onPress={() => navigation.navigate("Profile", { breed: breed })}
              />
            </Card>
          );
        }
      })}
    </SafeAreaView>
  );
}


function ProfileScreen({ navigation, route }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?breed_id=${breed.id}&limit=5
`
      )
      .then((response) => {
        console.log("response", response);
        setImages(response.data);
        console.log(response.data);
      });
  }, []);

  const breed = route.params.breed;
  return (
    <SafeAreaView>
      <Card>
        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 18, backgroundColor: 'pink' }}>{breed.name}</Text>
        <Card.Divider />
        <Card.Image
          source={{
            uri: breed.image.url,
          }} style={{ width: 300, height: 300 }}

        ></Card.Image>
        <Card.Divider />
        <Text>Origin : {breed.origin}</Text>
        <Text>Description : {breed.description}</Text>
      </Card>
      {images.map((image) => {
        return (
          <Card key={image.id}>
            <Card.Image
              source={{
                uri: image.url,
              }} style={{ width: 350, height: 200 }}
            ></Card.Image>
          </Card>
        );
      })}



    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer></SafeAreaProvider>
  );
}