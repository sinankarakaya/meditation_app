import React, {useContext} from 'react';
import {BleManager} from 'react-native-ble-plx';
import base64 from 'react-native-base64';

export const bleManager = new BleManager();

const actions = {
  SET_MANAGER: 'SET_MANAGER',
  SET_DEVICE: 'SET_DEVICE',
  SET_SERVICES: 'SET_SERVICES',
  SET_CHARACTERISTICS: 'SET_CHARACTERISTICS',
  SET_SEARCH: 'SET_SEARCH',
  SET_DATA: 'SET_DATA',
};

const initialState = {
  manager: bleManager,
  device: null,
  services: null,
  characteristics: null,
  search: false,
  data: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_DEVICE: {
      return Object.assign({}, state, {
        device: action.payload,
      });
    }
    case actions.SET_SERVICES: {
      return Object.assign({}, state, {
        services: action.payload,
      });
    }
    case actions.SET_CHARACTERISTICS: {
      return Object.assign({}, state, {
        characteristics: action.payload,
      });
    }
    case actions.SET_SEARCH: {
      return Object.assign({}, state, {
        search: action.payload,
      });
    }
    case actions.SET_DATA: {
      return Object.assign({}, state, {
        data: action.payload,
      });
    }
    default:
      return state;
  }
};

const BluetoothContext = React.createContext();

const BluetoothProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    manager: state.manager,
    device: state.device,
    services: state.services,
    characteristics: state.characteristics,
    search: state.search,
    data: state.data,
    setData: data => {
      dispatch({type: actions.SET_DATA, payload: data});
    },
    setDevice: device => {
      dispatch({type: actions.SET_DEVICE, payload: device});
    },
    setServices: services => {
      dispatch({type: actions.SET_SERVICES, payload: services});
    },
    setCharacteristics: characteristics => {
      dispatch({type: actions.SET_SERVICES, payload: characteristics});
    },
    startSearch: () => {
      dispatch({type: actions.SET_SEARCH, payload: true});
      state.manager.startDeviceScan([], null, (error, device) => {
        if (device) {
          if (
            device.name === 'Battery Service' ||
            device.name === 'raspberrypi'
          ) {
            state.manager.stopDeviceScan();
            dispatch({type: actions.SET_DEVICE, payload: device});
            dispatch({type: actions.SET_SEARCH, payload: false});
          }
        }
      });
    },
    stopSearch: () => {
      state.manager.stopDeviceScan();
    },
    disConnectDevice: () => {},
    connectDevice: () => {
      state.device
        .connect()
        .then(device => {
          return device.discoverAllServicesAndCharacteristics();
        })
        .then(device => {
          let services = device.services(device.id);
          dispatch({type: actions.SET_SERVICES, payload: services});
          return services;
        })
        .then(services => {
          services.map(async service => {
            var characteristics = await service.characteristics();
            dispatch({
              type: actions.SET_CHARACTERISTICS,
              payload: characteristics,
            });
            for (let characteristic of characteristics) {
              characteristic.monitor((err, char) => {
                if (char) {
                  const data = base64.decode(char?.value);
                  dispatch({type: actions.SET_DATA, payload: data});
                }
              });
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
  };

  return (
    <BluetoothContext.Provider value={value}>
      {children}
    </BluetoothContext.Provider>
  );
};

export default BluetoothProvider;
export {BluetoothContext};
