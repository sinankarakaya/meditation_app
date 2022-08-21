import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Main from './src/pages/Main';
import AttentionActivity from './src/pages/AttentionActivity';
import StressActivity from './src/pages/StressActivity';
import SearchDevice from './src/pages/SearchDevice';
import UserProvider from './src/provider/UserProvider';
import BluetoothProvider from './src/provider/BluetoothProvider';
import History from './src/pages/History';

function App(props) {
  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <BluetoothProvider>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen
                  name="AttentionActivity"
                  component={AttentionActivity}
                />
                <Stack.Screen
                  name="StressActivity"
                  component={StressActivity}
                />
                <Stack.Screen name="SearchDevice" component={SearchDevice} />
                <Stack.Screen name="History" component={History} />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </BluetoothProvider>
    </UserProvider>
  );
}

export default App;
