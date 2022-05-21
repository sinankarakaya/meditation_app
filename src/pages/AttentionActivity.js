import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import Slider from '@react-native-community/slider';
import PlayButton from '../component/PlayButton';

function AttentionActivity(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E77D7D'}}>
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
      {/* Music Detail Section */}
      <MusicDetailSection>
        <Image
          source={require('../images/musicLogo.png')}
          style={{marginHorizontal: 81, marginVertical: 60}}
        />
        <View
          style={{
            marginTop: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 24,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Thunder
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: '#fff',
              fontWeight: '500',
              fontSize: 14,
              textAlign: 'center',
            }}>
            Image Dragon
          </Text>
        </View>
      </MusicDetailSection>
      {/* Slider Section */}
      <SliderSection>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={0.2}
          minimumTrackTintColor={'#ED1BA3'}
          maximumTrackTintColor={'#464646'}
          thumbImage={require('../images/thumb.png')}></Slider>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#E7E7E7', fontSize: 12}}>0:17</Text>
          <Text style={{color: '#E7E7E7', fontSize: 12}}>2:37</Text>
        </View>
      </SliderSection>
      {/* Control Button Section */}
      <ControlSection>
        <Image source={require('../images/refresh.png')} />
        <View
          style={{
            width: 231,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 231,
              height: 54,
              borderRadius: 54,
              backgroundColor: '#361E60',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/back.png')}
              style={{marginLeft: 24}}
            />
            <View
              style={{
                width: 88,
                height: 88,
                borderRadius: 88,
                backgroundColor: '#E77D7D',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <PlayButton size={70} icon={require('../images/play.png')} />
            </View>
            <Image
              source={require('../images/next.png')}
              style={{marginRight: 24}}
            />
          </View>
        </View>
        <Image source={require('../images/soundmini.png')} />
      </ControlSection>
      {/* Action Section */}
      <ActionSection>
        <Text style={{fontSize: 14, color: '#fff', fontWeight: '500'}}>
          Attention Activity
        </Text>
      </ActionSection>
    </SafeAreaView>
  );
}

const HeaderSection = styled.View`
  margin: 12px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MusicDetailSection = styled.View`
  margin: 0px 24px;
  justify-content: center;
  align-items: center;
`;

const SliderSection = styled.View`
  margin: 0px 24px;
`;

const ControlSection = styled.View`
  margin: 32px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ActionSection = styled.View`
  margin: 14px 0px;
  align-items: center;
  justify-content: center;
`;

export default AttentionActivity;
