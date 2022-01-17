import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Screens/HomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import { Provider } from 'react-redux';
import configureStore from './src/Redux/store'
import EncryptedStorage from 'react-native-encrypted-storage';
import CartScreen from './src/Screens/CartScreen';
import SplashScreen from './src/Screens/SplashScreen';
import OrdersScreen from './src/Screens/OrdersScreen';
const Stack = createStackNavigator();
const store = configureStore();
const App = () => {
  const [user,setUser]=useState(false)
  useEffect(() => {
    async function fetchUser() {
      let userData = await EncryptedStorage.getItem('user')
      if (userData) {
        userData=JSON.parse(userData)
        setUser(userData.user)
      }
    }
    fetchUser()
  }, [])
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={RegisterScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
