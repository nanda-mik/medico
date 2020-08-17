/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import HeaderButton from '../Components/HeaderButton';
import {ScrollView} from 'react-native-gesture-handler';
import Card from '../Components/Card';
import {Octicons} from '@expo/vector-icons';

const Row = (props) => {
  return (
    <View style={styles.contain}>
      <Octicons
        style={{paddingLeft: 15}}
        name="primitive-dot"
        size={15}
        color="black"
      />
      <Text style={{paddingHorizontal: 10}}>{props.text}</Text>
    </View>
  );
};

const Component = (props) => {
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
  return (
    <ScrollView>
      <View style={{width: '100%', height: 230}}>
        <Image
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          source={{
            uri:
              'https://travelandleisureindia.in/wp-content/uploads/2020/07/Feature-image-Odisha-Pakhala-.jpg',
          }}
        />
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 20,
          paddingVertical: 10,
          paddingLeft: 10,
        }}>
        Today's Diet
      </Text>
      <Card style={styles.card}>
        <Text style={styles.head}>Calories</Text>
        <Text>Total : 2250</Text>
        <Text>Percentage Distribution</Text>
        <Row text="Carbohydrate : 55%" />
        <Row text="Fat : 20%" />
        <Row text="Fat : 25%" />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.head}>Breakfast</Text>
        <Row text="1 banana and some dates" />
        <Row text="Two slices whole-grain Chappati with milk" />
        <Row text="One cup of black herbal tea(tulsi)" />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.head}>Lunch</Text>
        <Row text="50gm Mix salad consists of cucumber, tomato, onion and carrot" />
        <Row text="150gm brown rice with dal" />
        <Row text="Glass of water" />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.head}>Dinner</Text>
        <Row text="2 piece chappati with mix vegetable curry" />
        <Row text="One glass milk" />
        <Row text="dry nuts" />
      </Card>
    </ScrollView>
  );
};
export default Component;
const styles = StyleSheet.create({
  card: {
    width: '90%',
    margin: 5,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  head: {
    fontSize: 16,
    fontWeight: '700',
  },
});
