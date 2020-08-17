/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect, useState} from 'react';
import {ScrollView, Text, Image, StyleSheet, View, Button} from 'react-native';
import HeaderButton from '../../Components/HeaderButton';
import HeadButton from '../../Components/HeadButton';
import Card from '../../Components/Card';
import {LinearGradient} from 'expo-linear-gradient';
import BloodPressureChart from '../../Components/Charts/bloodPressureChart';

const Tile = (props) => {
  return (
    <Card style={styles.card}>
      <Text style={{fontSize: 16}}>{props.time}</Text>
      <Text style={styles.text}>{props.medicine}</Text>
      <View style={{width: '100%'}}>
        <View style={{width: '100%', marginBottom: 5}}>
          <Button title="reminder" />
        </View>
        <View style={{width: '100%'}}>
          <Button title="done" />
        </View>
      </View>
    </Card>
  );
};

const HomeScreen = (props) => {
  let name = 'Sourav Kunda',
    photo =
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

  const [medicines, setMedicines] = useState([
    {time: 'Before Breakfast', medicine: 'Pantacid(For Gastic)'},
    {time: 'Before Lunch', medicine: 'Crocin(For Cold)'},
    {time: 'After Dinner', medicine: 'Azyhtrom(For Cough)'},
  ]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-menu"
            color="white"
            size={25}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        );
      },
      headerRight: () => {
        return <HeadButton name="Logout" color="red" />;
      },
    });
  });
  return (
    <ScrollView>
      <View style={styles.head}>
        <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.gradient}>
          <Image
            style={styles.image}
            source={{
              uri: photo,
            }}
          />

          <Text style={{color: 'white', fontSize: 15, paddingVertical: 3}}>
            {name}
          </Text>
        </LinearGradient>
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 20,
          paddingVertical: 10,
          paddingLeft: 10,
        }}>
        Today's Medicines
      </Text>
      <ScrollView
        contentContainerStyle={{flexDirection: 'row'}}
        horizontal={true}>
        {medicines.map((el, ind) => {
          return <Tile time={el.time} medicine={el.medicine} key={ind + ''} />;
        })}
      </ScrollView>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 20,
          paddingVertical: 10,
          paddingLeft: 10,
        }}>
        Nearest Hospital
      </Text>
      <Card style={{width: '70%', alignSelf: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '700', paddingBottom: 5}}>
          IMS & Sum Hospital, SOA
        </Text>
        <Text>3km away</Text>
        <Text numberOfLines={3}>
          Departments : Gastroenterology & Hepatology, Urology, Neuro Sciences,
          Obstetrics & Gynaecology and Emergency & Trauma Care
        </Text>
        <Text
          style={{
            paddingVertical: 8,
            fontWeight: 'bold',
            fontSize: 16,
            color: 'red',
          }}>
          Contact Ambulance : 108
        </Text>
        <Button title="Show Path" />
      </Card>
      <BloodPressureChart
        labels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        head="BloodPressure monitor"
        data1={[80, 85, 83, 91, 80, 87, 80]}
        data2={[120, 130, 118, 130, 125, 122, 130]}
      />
      <BloodPressureChart
        labels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
        head="Diabetes monitor"
        data1={[213, 220, 112, 213, 80, 87, 80]}
        data2={[32, 65, 60, 130, 125, 222, 130]}
      />
    </ScrollView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  head: {
    width: '100%',
    height: 180,
    backgroundColor: '#6a00f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  authContainer: {
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    width: 140,
    alignItems: 'center',
    margin: 5,
    justifyContent: 'space-between',
  },
});
