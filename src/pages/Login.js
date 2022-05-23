import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

function Login(props) {
  const [loginForm, setLoginForm] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setLoading(true);
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  function onAuthStateChanged(user) {
    if (initializing) setInitializing(false);
    setLoading(false);
    if (user.email) {
      props.navigation.navigate('Main');
    }
  }

  function onChangeForm(key, value) {
    setLoginForm({...loginForm, [key]: value});
  }

  function handleLogin() {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then(() => {
        setLoading(false);
        props.navigation.navigate('Main');
      })
      .catch(error => {
        Alert.alert('Username and password not match');
        setLoading(false);
      });
  }

  function renderGmailLogin() {
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
            Google ile giriş yap
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  function renderLoginDirectly() {
    return (
      <>
        <View style={{alignItems: 'flex-start', width: '90%', marginTop: 20}}>
          <View style={{width: '100%'}}>
            <Text style={{color: '#8B959A', fontSize: 13}}>Email Adresi</Text>
            <TextInput
              placeholder="Email Adresi"
              onChangeText={text => onChangeForm('email', text)}
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: 'rgba(173, 186, 200, 0.4)',
                width: '100%',
                marginTop: 10,
                borderRadius: 5,
                color: '#3E4A59',
              }}
            />
          </View>
          <View style={{marginTop: 20, width: '100%'}}>
            <Text style={{color: '#8B959A', fontSize: 13}}>Parola</Text>
            <TextInput
              placeholder="*****"
              onChangeText={text => onChangeForm('password', text)}
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: 'rgba(173, 186, 200, 0.4)',
                width: '100%',
                marginTop: 10,
                borderRadius: 5,
                color: '#3E4A59',
              }}
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
                onPress={() => handleLogin()}
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(173, 186, 200, 0.4)',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#0857AB',
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 12, fontWeight: '700', color: '#fff'}}>
                  Giriş Yap
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  }

  function renderRegisterButton() {
    return (
      <View
        style={{
          width: '90%',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 13, fontWeight: '400', color: '#8B959A'}}>
          Üye Değil Misin?
        </Text>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => props.navigation.navigate('Register')}>
          <Text style={{color: '#0857AB', fontSize: 13, fontWeight: '500'}}>
            Kayıt Ol
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
                Giriş Yap
              </Text>
              <Text
                style={{marginTop: 10, color: '#8B959A', fontWeight: '400'}}>
                Hoş Geldiniz.
              </Text>
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
            {renderGmailLogin()}
            <Text
              style={{
                color: '#8B959A',
                fontWeight: '400',
                fontSize: 13,
                marginTop: 20,
              }}>
              veya mail hesabın ile giriş yap
            </Text>
            {renderLoginDirectly()}
            {renderRegisterButton()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default Login;
