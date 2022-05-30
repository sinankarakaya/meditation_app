import React, {useContext} from 'react';

const actions = {
  SET_USER: 'SET_USER',
};

const initialState = {
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER: {
      return {...state.user, user: action.user};
    }
    default:
      return state;
  }
};

const UserContext = React.createContext();

const UserProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    user: state.user,
    setUser: user => {
      dispatch({type: actions.SET_USER, user});
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
export {UserContext};
