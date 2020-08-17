/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import Card from '../../Components/Card';
import Button from '../../Components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import Searchbar from 'react-native-search-bar';
import {Picker} from '@react-native-community/picker';

const Doctor = (props) => {
  const [sent, setSent] = useState(false);
  return (
    <Card style={styles.card}>
      <Image
        source={{
          uri:
            'https://i.pinimg.com/564x/01/02/e2/0102e203205553c49d02f5097126c909.jpg',
        }}
        style={{width: 150, height: 150}}
      />
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
          {props.name}
        </Text>
        <Text style={{fontSize: 16}}>{props.desc}</Text>
        <Text style={{fontSize: 15, paddingVertical: 5}}>
          Rating : {props.rating}/5
        </Text>
        <View style={{marginTop: -20}}>
          <Button
            onPress={() => {
              if (!sent) {
                Alert.alert(
                  'Success!',
                  `Request sent to ${props.name}. Wait for response from him/her.`,
                );
                setSent(true);
              } else {
                Alert.alert('Canceled!', 'Request canceled!');
                setSent(false);
              }
            }}>
            {sent ? 'Cancel Request' : 'Request for appointment'}
          </Button>
        </View>
      </View>
    </Card>
  );
};

const DoctorScreen = (props) => {
  const doctors = [
    {
      name: 'Dr Samrat Kar (MBBS)',
      desc: 'Hey!!I am a Gastrologist with 6 years of experiance.',
      rating: 4,
    },
    {
      name: 'Dr Shubhadarshie Nanda (MBBS)',
      desc: 'Hey!!I am a Coronologist, I can treat corona with my groom.',
      rating: 9,
    },
    {
      name: 'Dr Shreyashree Nanda (MD)',
      desc: 'Hey!!I am a cardiologist with 6 years of experiance.',
      rating: 4,
    },
  ];
  return (
    <>
      <Card style={{width: '90%', alignSelf: 'center', marginVertical: 10}}>
        <Searchbar placeholder="Find your doctor.." style={{height: 50}} />
        <Picker selectedValue="All">
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Gastrologist" value="Gastrologist" />
          <Picker.Item label="Neurologist" value="Neurologist" />
          <Picker.Item label="Medicine Spec." value="Medicine Spec." />
          <Picker.Item label="Cardiologist" value="Cardiologist" />
        </Picker>
      </Card>
      <ScrollView contentContainerStyle={styles.screen}>
        {doctors.map((el, ind) => {
          return (
            <Doctor
              name={el.name}
              desc={el.desc}
              rating={el.rating}
              key={ind + ''}
            />
          );
        })}
      </ScrollView>
    </>
  );
};
export default DoctorScreen;
const styles = StyleSheet.create({
  screen: {alignItems: 'center'},
  card: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
});
