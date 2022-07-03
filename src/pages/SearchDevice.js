import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BleManager} from 'react-native-ble-plx';

function SearchDevice(props) {
  const bleManager = new BleManager();
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    return () => {
      bleManager.stopDeviceScan();
      bleManager.destroy();
    };
  }, []);

  const scanStart = () => {
    bleManager.startDeviceScan([], null, (error, device) => {
      if (device?.name || device?.localName) {
        let onNewDevice = {name: device.name ?? '', id: device.id ?? ''};
        if (deviceList.indexOf(onNewDevice) < 0) {
          let newDeviceList = JSON.parse(JSON.stringify(deviceList));
          newDeviceList.push(onNewDevice);
          setDeviceList(newDeviceList);
        }
        console.log('new DEVICE = ', onNewDevice);
      }
    });
  };

  const scanStop = () => {
    bleManager.stopDeviceScan();
  };

  const handleConnectDevice = item => {};

  const connectDevice = item => {
    Alert.alert('Warning', 'Connect to ' + item.name + ' ?', [
      {text: 'Yes', onPress: () => handleConnectDevice(item)},
      {text: 'No', onPress: () => console.log('cancel')},
    ]);
  };

  const renderDevices = () => {
    return deviceList.map(item => {
      return (
        <TouchableOpacity
          onPress={() => connectDevice(item)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 10,
            padding: 10,
          }}>
          <View>
            <Image
              source={require('../images/bluetooth.png')}
              style={{height: 48, width: 48}}
            />
          </View>
          <View
            style={{
              marginLeft: 30,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 21}}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const renderDeviceExist = () => {
    return (
      <DeviceListSection>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#ED1BA3',
              fontSize: 24,
              fontWeight: '900',
            }}>
            Device List
          </Text>
          <TouchableOpacity
            onPress={() => scanStop()}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                fontWeight: '900',
                marginLeft: 12,
              }}>
              Stop Scan
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 16,
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          {renderDevices()}
        </View>
      </DeviceListSection>
    );
  };

  const renderDeviceNotExist = () => {
    return (
      <ContainerSection>
        <TouchableOpacity onPress={() => scanStart()}>
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
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1A0938'}}>
      <StatusBar barStyle="light-content" />
      {/* Header Section */}
      <HeaderSection>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={require('../images/left.png')} />
        </TouchableOpacity>
      </HeaderSection>
      {deviceList.length == 0 ? renderDeviceNotExist() : renderDeviceExist()}
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

const DeviceListSection = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export default SearchDevice;
