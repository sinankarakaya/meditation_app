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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';

function Result(props) {
  const [history, setHistory] = useState([]);
  const [alfabetRatio, setAlfabetRatio] = useState([]);
  const [mean, setMean] = useState([]);

  useEffect(() => {
    let _alfabetRatio = props.route.params.alfabetRatio;
    let _mean = props.route.params.alfabetRatio;

    setAlfabetRatio(_alfabetRatio);
    setMean(_mean);
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
