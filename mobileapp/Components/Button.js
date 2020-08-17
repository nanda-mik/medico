import React from 'react';
import {TouchableNativeFeedback, Text, StyleSheet, View} from 'react-native';

const Button = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={Styles.button}>
        <Text style={Styles.text}>{props.children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;

const Styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 30,
  },
  text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10,
  },
});
