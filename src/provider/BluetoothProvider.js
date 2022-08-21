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
  SET_LISTENER: 'SET_LISTENER',
};

const initialState = {
  manager: bleManager,
  device: null,
  services: null,
  characteristics: null,
  search: false,
  listener: null,
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
    case actions.SET_LISTENER: {
      return Object.assign({}, state, {
        listener: action.payload,
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
    listener: state.listener,
    setListener: listener => {
      dispatch({type: actions.SET_LISTENER, payload: listener});
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
          console.log(device.name);
          if (device.name === 'Health' || device.name === 'raspberrypi') {
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
            characteristics = characteristics.filter(
              item => item.uuid == '00000002-710e-4a5b-8d75-3e5b444bc3cf',
            );

            dispatch({
              type: actions.SET_CHARACTERISTICS,
              payload: characteristics,
            });

            for (let characteristic of characteristics) {
              characteristic.monitor((err, char) => {
                if (err) {
                  console.log(`characteristic error: ${err}`);
                  console.log(JSON.stringify(err));
                } else {
                  if (
                    char &&
                    char.uuid === '00000002-710e-4a5b-8d75-3e5b444bc3cf'
                  ) {
                    const data = base64.decode(char?.value);
                    console.log(data);
                    //state.listener(char?.value);
                  }
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
