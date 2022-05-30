import React from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Main(props) {
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{marginTop: 45, flex: 0.5}}>
          <Text style={{color: '#12175E', fontSize: 28, fontWeight: '600'}}>
            Hi, There
          </Text>
          <Text style={{marginTop: 8, color: '#575757'}}>
            Let’s make this day productive
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 45,
            flex: 0.5,
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: '#f3f6f4',
              borderRadius: 30,
              padding: 20,
              alignItems: 'flex-end',
            }}>
            <Image
              source={require('../images/person.png')}
              style={{width: 36, height: 36}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderActions() {
    return (
      <View>
        <View style={{marginTop: 45, flex: 0.5}}>
          <Text style={{color: '#12175E', fontSize: 24, fontWeight: '600'}}>
            Activities
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AttentionActivity')}
            style={{
              backgroundColor: '#E77D7D',
              height: 150,
              width: '45%',
              borderRadius: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/attention.png')}
              style={{width: 64, height: 64}}
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '500',
                fontSize: 16,
                marginTop: 16,
              }}>
              Attention Activity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('StressActivity')}
            style={{
              backgroundColor: '#7D88E7',
              height: 150,
              width: '45%',
              borderRadius: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/stress.png')}
              style={{width: 64, height: 64}}
            />
            <Text
              style={{
                color: '#FFF',
                fontWeight: '500',
                fontSize: 16,
                marginTop: 16,
              }}>
              Stress Activity
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderDevices() {
    return (
      <View>
        <View style={{marginTop: 45, flex: 0.5}}>
          <Text style={{color: '#12175E', fontSize: 24, fontWeight: '600'}}>
            Device
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SearchDevice')}
            style={{
              backgroundColor: '#F7F9FC',
              height: 125,
              borderRadius: 15,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/headphone.png')}
              style={{width: 56, height: 56}}
            />
            <Text
              style={{
                color: '#12175E',
                fontWeight: '500',
                fontSize: 16,
                marginTop: 16,
              }}>
              Device Not Connected
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#F7F9FC',
              height: 125,
              borderRadius: 15,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/target.png')}
              style={{width: 56, height: 56}}
            />
            <Text
              style={{
                color: '#12175E',
                fontWeight: '500',
                fontSize: 16,
                marginTop: 16,
              }}>
              Start Calibration
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView
        style={{flex: 1, marginLeft: 24, marginRight: 24}}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderActions()}
        {renderDevices()}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Main;
