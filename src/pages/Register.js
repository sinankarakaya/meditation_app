import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

function Register(props) {
  const [loading, setLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    passwordAgain: '',
  });

  function onChangeForm(key, value) {
    setRegisterForm({...registerForm, [key]: value});
  }

  function handleRegister() {
    if (registerForm.password === registerForm.passwordAgain) {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(
          registerForm.email,
          registerForm.password,
        )
        .then(() => {
          setLoading(false);
          props.navigation.navigate('Main');
        })
        .catch(error => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          } else {
            console.log(error);
          }
        });
    } else {
      Alert.alert('Password not match');
    }
  }

  function renderGmailRegister() {
    return (
      <>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            height: 50,
            marginTop: 20,
            width: '90%',
            borderRadius: 4,
            borderColor: 'rgba(173, 186, 200, 0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../images/google.png')}
            style={{height: 32, width: 32}}
          />
          <Text style={{marginLeft: 35, color: '#8B959A'}}>
            Google ile kayıt ol
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  function renderRegisterWithMail() {
    return (
      <>
        <View style={{alignItems: 'flex-start', width: '90%', marginTop: 20}}>
          <View style={{width: '100%'}}>
            <Text style={{color: '#8B959A', fontSize: 13}}>Email Adresi</Text>
            <TextInput
              placeholder="Email Adresi"
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: 'rgba(173, 186, 200, 0.4)',
                width: '100%',
                marginTop: 10,
                borderRadius: 5,
                color: '#3E4A59',
              }}
              onChangeText={text => onChangeForm('email', text)}
            />
          </View>
          <View style={{marginTop: 20, width: '100%'}}>
            <Text style={{color: '#8B959A', fontSize: 13}}>Parola</Text>
            <TextInput
              placeholder="*****"
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: 'rgba(173, 186, 200, 0.4)',
                width: '100%',
                marginTop: 10,
                borderRadius: 5,
                color: '#3E4A59',
              }}
              onChangeText={text => onChangeForm('password', text)}
              secureTextEntry={true}
            />
          </View>
          <View style={{marginTop: 20, width: '100%'}}>
            <Text style={{color: '#8B959A', fontSize: 13}}>Parola Tekrar</Text>
            <TextInput
              placeholder="*****"
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: 'rgba(173, 186, 200, 0.4)',
                width: '100%',
                marginTop: 10,
                borderRadius: 5,
                color: '#3E4A59',
              }}
              onChangeText={text => onChangeForm('passwordAgain', text)}
              secureTextEntry={true}
            />
          </View>
          <View style={{marginTop: 20, width: '100%'}}>
            {loading ? (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(173, 186, 200, 0.4)',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#0857AB',
                  borderRadius: 5,
                }}>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(173, 186, 200, 0.4)',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#0857AB',
                  borderRadius: 5,
                }}
                onPress={() => handleRegister()}>
                <Text style={{fontSize: 12, fontWeight: '700', color: '#fff'}}>
                  Kayıt Ol
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  }

  function renderLoginButton() {
    return (
      <View
        style={{
          width: '90%',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Text style={{fontSize: 13, fontWeight: '400', color: '#8B959A'}}>
          Üye Misin?
        </Text>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={{color: '#0857AB', fontSize: 13, fontWeight: '500'}}>
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{height: Dimensions.get('window').height * 0.35}}>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'column',
              width: '100%',
            }}>
            <View style={{margin: 20}}>
              <Text style={{color: '#3E4A59', fontSize: 22, fontWeight: '700'}}>
                Kayıt Ol
              </Text>
              {renderLoginButton()}
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../images/meditation.png')}
                style={{height: 128, width: 128, marginTop: 10}}
              />
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            {renderGmailRegister()}
            <Text
              style={{
                color: '#8B959A',
                fontWeight: '400',
                fontSize: 13,
                marginTop: 20,
              }}>
              veya mail hesabın ile kayıt ol
            </Text>
            {renderRegisterWithMail()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
