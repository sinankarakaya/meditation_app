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
import firestore from '@react-native-firebase/firestore';

function History(props) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  function getHistory() {
    firestore()
      .collection('attentioanActivity')
      .get()
      .then(attentions => {
        firestore()
          .collection('stressActivity')
          .get()
          .then(stress => {
            let _history = [];
            _history.push(...stress.docs);
            _history.push(...attentions.docs);
            setHistory(_history);
          });
      });
  }

  function renderHistoryItem() {
    return history.map(item => {
      return (
        <TouchableOpacity
          style={{display: 'flex', flexDirection: 'row', marginBottom: 30}}>
          <View
            style={{
              flex: 0.2,
            }}>
            <Image
              source={require('../images/time.png')}
              style={{height: 64, width: 64}}
            />
          </View>
          <View
            style={{
              flex: 0.8,
              marginLeft: 30,
              justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              Stress Activity
            </Text>
            <Text style={{color: '#868688'}}>12:30 24.05.2022</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <StatusBar barStyle="light-content" />
      {/*  Header Section */}
      <HeaderSection>
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
            History
          </Text>
        </View>
      </HeaderSection>

      {/* History List Section */}
      <HistoryListSection>{renderHistoryItem()}</HistoryListSection>
    </SafeAreaView>
  );
}

const HeaderSection = styled.View`
  margin: 12px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HistoryListSection = styled.ScrollView`
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 30px;
`;

export default History;
