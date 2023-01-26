import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {LineChart} from 'react-native-chart-kit';
const screenWidth =
  Dimensions.get('window').width - Dimensions.get('window').width * 0.1;

function Result(props) {
  const [history, setHistory] = useState([]);
  const [alfabetRatioX, setAlfabetRatioX] = useState([]);
  const [alfabetRatioY, setAlfabetRatioY] = useState([]);

  const [meanX, setMeanX] = useState([]);
  const [meanY, setMeanY] = useState([]);

  useEffect(() => {
    let _mean = props.route.params.mean;
    let _alfabetRatio = props.route.params.alfabetRatio;
    let _alfabetRatioTime = [];
    let _alfabetRatioTimeValue = [];
    let _meanTime = [];
    let _meanValue = [];

    for (var key in _alfabetRatio) {
      _alfabetRatioTime.push(parseInt(key));
      _alfabetRatioTimeValue.push(_alfabetRatio[key]);
    }

    setAlfabetRatioY(_alfabetRatioTimeValue);
    setAlfabetRatioX(_alfabetRatioTime);

    for (var key in _mean) {
      _meanTime.push(parseInt(key));
      _meanValue.push(_mean[key]);
    }

    setAlfabetRatioY(_alfabetRatioTimeValue);
    setAlfabetRatioX(_alfabetRatioTime);

    setMeanY(_meanValue);
    setMeanX(_meanTime);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar barStyle="light-content" />

      <ResultSection>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../images/back-black.png')}
            style={{height: 28, width: 28}}
          />
        </TouchableOpacity>
        <View
          style={{flex: 0.9, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              marginLeft: -40,
              color: '#000',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            Result
          </Text>
        </View>
      </ResultSection>

      {alfabetRatioX.length > 0 ? (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 40}}>
          <Text>AlfaBetRatio</Text>
          <LineChart
            data={{
              labels: alfabetRatioX,
              datasets: [
                {
                  data: alfabetRatioY,
                },
              ],
            }}
            width={Dimensions.get('window').width - 50} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
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
      ) : null}

      {meanX.length > 0 ? (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 40}}>
          <Text>Mean</Text>
          <LineChart
            data={{
              labels: meanX,
              datasets: [
                {
                  data: meanY,
                },
              ],
            }}
            width={Dimensions.get('window').width - 50} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
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
      ) : null}
    </SafeAreaView>
  );
}

const ResultSection = styled.View`
  margin: 12px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default Result;
