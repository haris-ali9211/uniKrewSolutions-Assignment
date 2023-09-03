//import screen
import OnBoarding from './screens/OnBoarding/OnBoarding';
import Products from './screens/ProductsView/Products';
import ProductDetails from './screens/ProductDetails/ProductDetails';
import CartDetails from './screens/Cart/Cart';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import Checkout from './screens/Checkout/Checkout';
import MainLogo from './screens/MainLogo/MainLogo';

// import react
import React, { useState, useEffect } from 'react';

//context
import { OpulentSipsProvider } from './context/OpulentSipsContext';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import native-base
import { NativeBaseProvider } from 'native-base';

// local storage import
import AsyncStorage from '@react-native-async-storage/async-storage';

// import redux
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//notify message
import Toast from 'react-native-toast-message';



//initializing stack
const Stack = createNativeStackNavigator();

function App() {


  const [showOnBoarding, setShowOnBoarding] = useState(true);
  const [loading, setLoading] = useState(true);

  const getDataFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('boarded');
      if (value === 'Yes') {
        setShowOnBoarding(false);
        // await AsyncStorage.removeItem('boarded')
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  };


  useEffect(() => {
    getDataFromAsyncStorage()
  }, [])

  return (
    <>
      {
        loading ? (
          <MainLogo />
        ) : (<NavigationContainer>
          <NativeBaseProvider>
            <OpulentSipsProvider>
              <Stack.Navigator>
                {showOnBoarding && (
                  <Stack.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                    options={{ headerShown: false }}
                  />
                )}
                <Stack.Screen
                  name="Products"
                  component={Products}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Details"
                  component={ProductDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CartDetails"
                  component={CartDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Checkout"
                  component={Checkout}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </OpulentSipsProvider>
          </NativeBaseProvider>
        </NavigationContainer>
        )}
    </>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toast />
      </PersistGate>
    </Provider>
  )
};;
