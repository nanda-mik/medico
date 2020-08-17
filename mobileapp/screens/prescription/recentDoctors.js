/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {LINK} from '../../assets/config';

import Card from '../../Components/Card';
import CustomButton from '../../Components/Button';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

const Doctor = (props) => {
  const [loading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const getOrderId = useCallback(async (amount) => {
    setIsLoading(true);

    const res = await axios.post(`${LINK}/booking/createorder`, {amount});
    return res.data.data.id;
  }, []);
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
          {loading ? (
            <ActivityIndicator size="large" color="#34a4eb" />
          ) : (
            <CustomButton
              onPress={async () => {
                try {
                  const orderId = await getOrderId(2000);
                  var options = {
                    description: 'Pay your doctor',
                    image: 'https://i.imgur.com/3g7nmJC.png',
                    currency: 'INR',
                    key: 'rzp_test_2EpN77dvZEjRup',
                    amount: '2000',
                    name: 'Medico',
                    order_id: orderId, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
                    prefill: {
                      email: 'sourav@gmail.com',
                      contact: '+91' + '9826528681',
                      name: 'Sourav Kunda',
                    },
                    theme: {color: '#34a4eb'},
                  };
                  RazorpayCheckout.open(options)
                    .then((data) => {
                      // handle success
                      Alert.alert(
                        'Success!',
                        `Success: ${data.razorpay_payment_id}`,
                      );
                    })
                    .catch((error) => {
                      // handle failure
                      // setIsLoading(false);
                      setIsLoading(false);
                      // setError(error.description);
                    });
                } catch (er) {
                  Alert.alert('Error!', 'Something went wrong!');
                }
              }}>
              Pay Your Doctor
            </CustomButton>
          )}

          <Button
            title="Prescription Page"
            onPress={() => props.navigation.navigate('Prescriptions')}
          />
        </View>
      </View>
    </Card>
  );
};

const RecentDoctors = (props) => {
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
    <ScrollView contentContainerStyle={styles.screen}>
      {doctors.map((el, ind) => {
        return (
          <Doctor
            name={el.name}
            desc={el.desc}
            rating={el.rating}
            key={ind + ''}
            navigation={props.navigation}
          />
        );
      })}
    </ScrollView>
  );
};
export default RecentDoctors;
const styles = StyleSheet.create({
  screen: {alignItems: 'center'},
  card: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
});
