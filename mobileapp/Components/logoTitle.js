/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
const Component = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri:
            'https://www.myhealthrecord.gov.au/sites/default/files/styles/large/public/docicon.png?itok=b99yS3DK',
        }}
      />
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
          paddingLeft: 20,
        }}>
        DocBot
      </Text>
    </View>
  );
};
export default Component;
