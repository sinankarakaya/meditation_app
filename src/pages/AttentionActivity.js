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
import Slider from '@react-native-community/slider';
import PlayButton from '../component/PlayButton';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {UserContext} from '../provider/UserProvider';
import firestore from '@react-native-firebase/firestore';

const track = {
  url: require('../music/piano.mp3'),
  title: 'Music One',
  artist: 'sample',
  artwork: require('../images/meditation.jpeg'),
  duration: 238,
};

const session = {
  duration: 135,
  type: 'attention',
  data: [
    {id: 12, time: '123'},
    {id: 12, time: '123'},
    {id: 12, time: '123'},
    {id: 12, time: '123'},
    {id: 12, time: '123'},
    {id: 12, time: '123'},
  ],
};

function AttentionActivity(props) {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const progress = useProgress();
  const {user} = useContext(UserContext);

  useEffect(() => {
    Alert.alert('Attention Activity', 'Start the session?', [
      {text: 'Yes', onPress: () => startSession()},
      {text: 'No', onPress: () => props.navigation.pop()},
    ]);
    return () => {
      stopSession();
    };
  }, []);

  useEffect(() => {
    if (progress.position >= track.duration) {
      setPlaying(false);
      TrackPlayer.seekTo(0);
      TrackPlayer.pause();
    }
  }, [progress.position]);

  function startSession() {
    TrackPlayer.setupPlayer().then(() => {
      setLoading(false);
      TrackPlayer.add([track]).then(() => {
        setPlaying(true);
        TrackPlayer.play();
      });
    });
  }

  function stopSession() {
    uploadData();
    TrackPlayer.stop().then(() => {
      setPlaying(false);
    });
  }

  function uploadData() {
    const attentionCollection = firestore().collection('attentioanActivity');
    attentionCollection
      .doc(user.uid)
      .add(session)
      .then(() => {
        console.log('data sended');
      });
  }

  function fancyTimeFormat(duration) {
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    var ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }

  function playOrPause() {
    if (playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    setPlaying(!playing);
  }

  function seekTo(forward = true) {
    let position = progress.position;
    if (forward) {
      position += 10;
    } else {
      if (position > 10) {
        position -= 10;
      } else {
        position = 0;
      }
    }
    TrackPlayer.seekTo(position);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E77D7D'}}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <LoadingSection>
          <ActivityIndicator size="large" color="#fff" />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '500',
              marginTop: 15,
            }}>
            Loading...
          </Text>
        </LoadingSection>
      ) : (
        <>
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
              maximumValue={track.duration}
              value={progress.position}
              minimumTrackTintColor={'#ED1BA3'}
              maximumTrackTintColor={'#464646'}
              onValueChange={value => TrackPlayer.seekTo(value)}
              thumbImage={require('../images/thumb.png')}></Slider>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#E7E7E7', fontSize: 12}}>
                {fancyTimeFormat(progress.position)}
              </Text>
              <Text style={{color: '#E7E7E7', fontSize: 12}}>
                {fancyTimeFormat(track.duration)}
              </Text>
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
                <TouchableOpacity onPress={() => seekTo(false)}>
                  <Image
                    source={require('../images/back.png')}
                    style={{marginLeft: 24}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 88,
                    backgroundColor: '#E77D7D',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <PlayButton
                    size={70}
                    icon={
                      !playing
                        ? require('../images/play.png')
                        : require('../images/stop.png')
                    }
                    onPress={() => playOrPause()}
                  />
                </View>
                <TouchableOpacity onPress={() => seekTo(true)}>
                  <Image
                    source={require('../images/next.png')}
                    style={{marginRight: 24}}
                  />
                </TouchableOpacity>
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
        </>
      )}
    </SafeAreaView>
  );
}

const LoadingSection = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

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
