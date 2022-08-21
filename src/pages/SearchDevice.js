import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {scan} from 'react-native-ble-manager';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BluetoothContext} from '../provider/BluetoothProvider';

function SearchDevice(props) {
  const {startSearch, stopSearch, services, connectDevice, search, device} =
    useContext(BluetoothContext);

  const scanStart = () => {
    startSearch();
  };

  const connect = () => {
    stopSearch();
    connectDevice();
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
            onPress={() => scanStart()}
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
              Search Again
            </Text>
          </TouchableOpacity>
        </View>

        <ContainerSection>
          <TouchableOpacity onPress={() => connect()}>
            {search ? (
              <ActivityIndicator size="large" color="#ED1BA3" />
            ) : (
              <Image
                source={require('../images/bluetooth.png')}
                style={{height: 128, width: 128}}
              />
            )}
          </TouchableOpacity>

          {search ? (
            <Text
              style={{
                color: '#ED1BA3',
                fontSize: 24,
                marginTop: 36,
                fontWeight: '900',
              }}>
              Scanning
            </Text>
          ) : (
            <Text
              style={{
                color: '#ED1BA3',
                fontSize: 24,
                marginTop: 36,
                fontWeight: '900',
              }}>
              {services ? 'Connected' : 'Connect'} {device.name}
            </Text>
          )}
          <Text
            style={{
              fontSize: 14,
              color: '#E7E7E7',
              fontWeight: '500',
              marginTop: 12,
            }}>
            {services ? 'Paired' : 'Pair'} this device
          </Text>
        </ContainerSection>
      </DeviceListSection>
    );
  };

  const renderDeviceNotExist = () => {
    return (
      <ContainerSection>
        <TouchableOpacity onPress={() => scanStart()}>
          {search ? (
            <ActivityIndicator size="large" color="#ED1BA3" />
          ) : (
            <Image
              source={require('../images/searching.png')}
              style={{height: 128, width: 128}}
            />
          )}
        </TouchableOpacity>

        {search ? (
          <Text
            style={{
              color: '#ED1BA3',
              fontSize: 24,
              marginTop: 36,
              fontWeight: '900',
            }}>
            Scanning
          </Text>
        ) : (
          <Text
            style={{
              color: '#ED1BA3',
              fontSize: 24,
              marginTop: 36,
              fontWeight: '900',
            }}>
            Start Scanning
          </Text>
        )}
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

  const renderSearch = () => {
    if (device) {
      return renderDeviceExist();
    } else {
      return renderDeviceNotExist();
    }
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
      {renderSearch()}
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
