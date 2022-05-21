import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

const start = {x: 0, y: 0};
const end = {x: 1, y: 0};

const PlayButton = ({size, circle, icon, onPress}) => (
  <Container onPress={onPress}>
    <Image source={icon} style={{position: 'relative', zIndex: 1}} />
    <Circle
      size={size}
      colors={['#D91193', '#22DDF2']}
      start={start}
      end={end}
      style={{
        opacity: 0.5,
        position: 'absolute',
        left: 0,
        bottom: 0,
      }}
    />
    <Circle
      size={size}
      colors={['#D91193', '#22DDF2']}
      start={start}
      end={end}
      style={{
        opacity: 0.5,
        position: 'absolute',
        right: 0,
        bottom: 0,
      }}
    />
    <Circle
      size={size}
      colors={['#D91193', '#22DDF2']}
      start={start}
      end={end}
      style={{
        opacity: 0.5,
        position: 'absolute',
        top: 0,
      }}
    />
  </Container>
);

const Container = styled.TouchableOpacity`
  width: ${props => props.width || 78}px;
  height: ${props => props.height || 78}px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(LinearGradient)`
  width: ${props => props.width || 70}px;
  height: ${props => props.height || 70}px;
  border-radius: ${props => props.circle / 2 || 70 / 2}px;
`;

export default PlayButton;
