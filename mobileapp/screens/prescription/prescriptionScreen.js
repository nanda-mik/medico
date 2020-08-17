/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions, Alert, Button} from 'react-native';
import CustomButton from '../../Components/Button';
import Card from '../../Components/Card';
import {ScrollView} from 'react-native-gesture-handler';
import {Ionicons, Octicons} from '@expo/vector-icons';

const Presc = (props) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.head}>Featured</Text>
      <Text style={styles.time}>Prescribed on {props.time}</Text>
      <View>
        {props.tips.map((el, ind) => {
          return <Text key={ind + ''}>- {el}</Text>;
        })}
      </View>
      <Text style={styles.time}>Medicines</Text>
      {props.medicines.map((el) => {
        let round = [];
        for (let i = 0; i < el.num; i++) {
          round.push(
            <Octicons
              style={{paddingLeft: 5}}
              name="primitive-dot"
              size={15}
              color="red"
            />,
          );
        }
        return (
          <View
            key={el.name}
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', textAlignVertical: 'center'}}>
                {el.name} - <Text style={{fontWeight: '600'}}>{el.time}</Text>
              </Text>
              {round}
            </View>
            <Ionicons name="ios-add-circle-outline" size={28} color="green" />
          </View>
        );
      })}

      <View style={{marginTop: -20}}>
        <CustomButton>Rate your Doctor</CustomButton>
      </View>
      <Button title="mark as read" />
    </Card>
  );
};

const PrescriptionScreen = (props) => {
  const prescriptions = [
    {
      time: '8/12/2020, 11:30:58 PM',
      medicines: [
        {name: 'Coronil', time: 'before food', num: 2},
        {name: 'Pantacid', time: 'After food', num: 1},
      ],
      tips: ['Do early yoga', 'Drink more water'],
    },
    {
      time: '18/11/2020, 9:30:50 PM',
      medicines: [
        {name: 'Sinarest', time: 'before food', num: 3},
        {name: 'Pantacid', time: 'After food', num: 2},
      ],
      tips: ['Do early yoga', 'Drink more water'],
    },
    {
      time: '10/08/2020, 8:30:08 PM',
      medicines: [
        {name: 'Coronil', time: 'before food', num: 3},
        {name: 'Sinarest', time: 'After food', num: 1},
      ],
      tips: ['Do early yoga', 'Drink more water'],
    },
  ];
  return (
    <View style={styles.screen}>
      <View style={{marginTop: -20, width: '100%'}}>
        <CustomButton
          onPress={() =>
            Alert.alert(
              'Success!',
              'A request for video appointment is sent. Wait for doctor response',
            )
          }>
          Request for Video appointment
        </CustomButton>
      </View>
      <ScrollView
        contentContainerStyle={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
        }}>
        {prescriptions.map((el, ind) => {
          return (
            <Presc
              key={ind + ''}
              tips={el.tips}
              time={el.time}
              medicines={el.medicines}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export default PrescriptionScreen;
const styles = StyleSheet.create({
  screen: {alignItems: 'center', justifyContent: 'center', flex: 1},
  card: {
    width: '80%',
    marginVertical: 10,
  },
  head: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 10,
  },
  time: {
    fontWeight: '700',
    paddingVertical: 10,
    fontSize: 14,
    alignSelf: 'center',
  },
});
