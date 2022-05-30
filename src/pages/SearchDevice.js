import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  NativeAppEventEmitter,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import BleManager from 'react-native-ble-manager';

function SearchDevice(props) {
  useEffect(() => {
    startBluetooth();
  }, []);

  function startBluetooth() {
    BleManager.start({showAlert: false}).then(() => {
      console.log('Module initialized');
      scanStart();
      setTimeout(() => scanStop(), 15000);
    });
  }

  const scanStart = () => {
    BleManager.scan([], 5, true).then(() => {
      console.log('Scan started');
    });
  };

  const scanStop = () => {
    BleManager.stopScan().then(() => {
      console.log('Scan stopped');
      getDiscoveredDevice();
    });
  };

  const getDiscoveredDevice = () => {
    BleManager.getDiscoveredPeripherals([]).then(peripheralsArray => {
      console.log(peripheralsArray);
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1A0938'}}>
      <StatusBar barStyle="light-content" />
      {/* Header Section */}
      <HeaderSection>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={require('../images/left.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../images/more.png')} />
        </TouchableOpacity>
      </HeaderSection>
      <ContainerSection>
        <TouchableOpacity>
          <Image
            source={require('../images/searching.png')}
            style={{height: 128, width: 128}}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#ED1BA3',
            fontSize: 24,
            marginTop: 36,
            fontWeight: '900',
          }}>
          Find Device
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#E7E7E7',
            fontWeight: '500',
            marginTop: 12,
          }}>
          The device will pair automatically when found
        </Text>
      </ContainerSection>
    </SafeAreaView>
  );
}

const HeaderSection = styled.View`
  margin: 12px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContainerSection = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default SearchDevice;
