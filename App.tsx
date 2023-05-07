import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from './src/pages/Products';
import Product from './src/pages/Product';
import Carts from './src/pages/Carts';
import ProductCreate from './src/pages/ProductCreate';
import ProductUpdate from './src/pages/ProductUpdate';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Carts" component={Carts} />
        <Stack.Screen name="ProductCreate" component={ProductCreate} />
        <Stack.Screen name="ProductUpdate" component={ProductUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
