import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
const BloodPressureChart = (props) => {
  return (
    <View>
      <Text style={styles.text}>{props.head}</Text>
      <LineChart
        data={{
          labels: props.labels,
          datasets: [
            {
              data: props.data1,
            },
            {
              data: props.data2,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: '#00416A',
          backgroundGradientTo: '#86fde8',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
export default BloodPressureChart;
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});
