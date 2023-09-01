//import screen
import OnBoarding from './screens/OnBoarding/OnBoarding';
import Products from './screens/ProductsView/Products';
import ProductDetails from './screens/ProductDetails/ProductDetails';
import CartDetails from './screens/Cart/Cart';
import Login from './screens/Login/Login';

//context
import { OpulentSipsProvider } from './context/OpulentSips';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import native-base
import { NativeBaseProvider } from 'native-base';

//initializing stack
const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <NativeBaseProvider>
          <OpulentSipsProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="OnBoarding"
                component={OnBoarding}
                options={{ headerShown: false }}
              />
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
            </Stack.Navigator>
          </OpulentSipsProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
