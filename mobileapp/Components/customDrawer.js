/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  let email = 'sourav@gmail.com',
    photo =
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  return (
    <DrawerContentScrollView {...props}>
      <TouchableNativeFeedback
        onPress={() => {
          props.navigation.navigate('Home');
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 30,
            alignItems: 'center',
          }}>
          <Image
            style={styles.container}
            source={{
              uri: photo,
            }}
          />
          <Text
            style={{
              marginTop: 20,
              color: 'black',
              fontSize: 16,
              fontWeight: '700',
            }}>
            {email}
          </Text>
          <Text>view profile</Text>
        </View>
      </TouchableNativeFeedback>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'red',
  },
});
