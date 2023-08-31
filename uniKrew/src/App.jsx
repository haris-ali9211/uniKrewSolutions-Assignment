//import screen
import OnBoarding from './screens/OnBoarding/OnBoarding';
import Products from './screens/ProductsView/Products';
import ProductDetails from './screens/ProductDetails/ProductDetails';

//context
import {OpulentSipsProvider} from './context/OpulentSips';

//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//initializing stack
const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <OpulentSipsProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Products"
              component={Products}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Details"
              component={ProductDetails}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </OpulentSipsProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
