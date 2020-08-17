/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Alert,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import HeaderButton from '../Components/HeaderButton';

const LocationModal = (props) => {
  const [location, setLocation] = useState(null);
  const [value, setValue] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [isFocused, setFocused] = useState(true);

  const getLocation = async () => {
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'give permission',
        'Permission to access location was denied',
      );
    }

    let res = await Location.getCurrentPositionAsync({});
    const resp = await axios.get(
      `https://discover.search.hereapi.com/v1/discover?at=${res.coords.latitude},${res.coords.longitude}&limit=20&q=hospital&in=countryCode:IND&apiKey=1KgX9HXsbICB9OiqnMPTq7GPw2HLFiMy_5TZNuZ0yo4`,
    );
    console.log(resp.data.items);
    setLocation(res.coords);
    setHospitals(resp.data.items);
  };

  useEffect(() => {
    getLocation();
    props.navigation.setOptions({});
    const uns = props.navigation.addListener('focus', () => {
      setFocused(true);
    });
    props.navigation.addListener('blur', () => {
      setFocused(false);
    });
    return uns;
  }, [props.navigation]);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-arrow-round-back"
            color="white"
            size={38}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        );
      },
    });
  });
  if (!isFocused) {
    return null;
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={{
            position: 'absolute',
            height: 80,
            borderColor: 'gray',
            borderWidth: 1,
            width: '100%',
            bottom: 10,
            zIndex: 100,
            backgroundColor: 'white',
            padding: 30,
          }}
          onSubmitEditing={async (e) => {
            const myApiKey = 'xKY10BBNp7cUAsRjzs70x205CQUqW0bu';
            fetch(
              `https://www.mapquestapi.com/geocoding/v1/address?key=${myApiKey}&inFormat=kvp&outFormat=json&location=${value}&thumbMaps=false`,
            )
              .then((response, err) => {
                if (err) {
                  Alert.alert('error!!', err);
                } else {
                  return response.json();
                }
              })
              .then((responseJson) => {
                const loc = responseJson.results[0].locations[0].latLng;
                setLocation({latitude: loc.lat, longitude: loc.lng});
              });
          }}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholder="Enter address or drag pin to desired location"
        />
        {location ? (
          <MapView
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0222,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            showsMyLocationButton={true}
            showsCompass={true}
            showsUserLocation={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            onPress={(e) => {
              setLocation(e.nativeEvent.coordinate);
            }}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
              onDragEnd={(e) => {
                setLocation(e.nativeEvent.coordinate);
              }}
            />
            {hospitals.map((el) => {
              return (
                <Marker
                  coordinate={{
                    latitude: el.position.lat,
                    longitude: el.position.lng,
                  }}
                  key={el.id}>
                  <View
                    style={{
                      backgroundColor: 'rgba(214, 210, 199,0.5)',
                      padding: 2,
                    }}>
                    <Image
                      style={{width: 40, height: 30, alignSelf: 'center'}}
                      source={{
                        uri:
                          'https://i7.pngguru.com/preview/779/816/863/hospital-free-content-clip-art-hospitals-cliparts.jpg',
                      }}
                    />

                    <Text
                      style={{
                        maxWidth: 70,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 10,
                      }}>
                      {el.title}
                    </Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LocationModal;
