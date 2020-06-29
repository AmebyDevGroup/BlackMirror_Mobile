import React, { useState } from 'react';
import { createStore, combineReducers,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk'

import elementsReducer from './store/reducers/element';

import authReducer from './store/reducers/auth';
import NavigationContainer from "./navigation/NavigationContainer";
const rootReducer = combineReducers({
  elements: elementsReducer,
  auth: authReducer
});
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-light': require('./assets/fonts/Quicksand-Light.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>

            <NavigationContainer />

    </Provider>

  );



}
// return(
//     <AdMobBanner
//         bannerSize="banner"
//         adUnitID="ca-app-pub-8731014179800764/2334467495" // Test ID, Replace with your-admob-unit-id
//         servePersonalizedAds // true or false
//         onDidFailToReceiveAdWithError={this.bannerError} />
//
// );
