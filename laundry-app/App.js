import "react-native-gesture-handler";
import React, { useEffect } from "react";
import {Text, View,LogBox} from 'react-native'
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductProvider, ProductConsumer} from "./context";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from "./screens/auth/splash";
import Login from "./screens/auth/login";
import SignUp from "./screens/auth/signup";
import ShopName from "./screens/vendor/ShopName";
import MainScreen from "./screens/customer/MainScreen";
import VendorMain from "./screens/vendor/VendorMain";
import EditCustomer from "./screens/customer/EditScreen";
import Searched from "./screens/customer/SearchScreen";
import SelectScreen from "./screens/customer/SelectScreen";
import CartContextProvider from "./context/cart";
import Cart from "./screens/customer/CartScreen";
import Checkout from "./screens/customer/CheckoutScreen";
import CardPayment from "./screens/customer/CardPayment";
import OrdersScreen from "./screens/customer/OrdersScreen";
import RiderMain from './screens/rider/RiderMain'
import ChatBot from './screens/customer/ChatBot'
import AboutScreen from "./screens/customer/AboutScreen";
import CreateShop from './screens/vendor/CreateShop'
import {colors} from './global/colors'
import NotificationApp from "./components/Notification";
import PendingOrders from "./screens/vendor/PendingOrders";
import PendingScreenContainer from "./screens/vendor/PendingContainer";
import FullfillOrders from "./screens/vendor/FulfilledScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs()

export default function App() {
  const VendorTabNavigator = () => {
    return (
      <ProductConsumer>
        {(value) => {
          return (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "VendorMain") {
                    iconName = focused ? "home" : "home-outline";
                  } else if (route.name === "Shop") {
                    iconName = focused ? "shirt" : "shirt-outline";
                  } 
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false
              })
              
              }
              tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                activeBackgroundColor: 'gray',
                inactiveBackgroundColor: colors.darkBlue,
                    style: {
                          backgroundColor: '#CE4418',
                          paddingBottom: 3
                    }
             }}
            >
              
            
              <Tab.Screen name="VendorMain" component={VendorMain} />
              <Tab.Screen
                name="Shop"
                component={ShopName}
                options={{ tabBarBadge: 1 }}
              />
            </Tab.Navigator>
          );
        }}
      </ProductConsumer>
    );
  };

  const CustomerTabNavigator = () => {
    return (
      <ProductConsumer>
        {(value) => {
          return (
           
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "MainScreen") {
                    iconName = focused ? "home" : "home-outline";
                  } 
                  if (route.name === "EditCustomer") {
                    iconName = focused ? "create" : "create-outline";
                  } 
                  if (route.name === "OrdersScreen") {
                    iconName = focused ? "card" : "card-outline";
                  }
                  if (route.name === "RatingScreen") {
                    iconName = focused ? "star" : "star-outline";
                  } 
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                headerShown: false
              })
            }
            tabBarOptions={{
              activeTintColor: '#fff',
              inactiveTintColor: 'lightgray',
              activeBackgroundColor: 'gray',
              inactiveBackgroundColor: colors.darkBlue,
                  style: {
                        backgroundColor: '#CE4418',
                        paddingBottom: 3
                  }
           }}
            >
              <Tab.Screen name="MainScreen" component={MainScreen} options={{title:"home"}} />
              <Tab.Screen name="EditCustomer" component={EditCustomer} options={{title:'Edit'}} />
              <Tab.Screen name="OrdersScreen" component={OrdersScreen} options={{title:'My Orders'}} />
              <Tab.Screen name="RatingScreen" component={AboutScreen} options={{title:'About'}} />
              
            </Tab.Navigator>
          );
        }}
      </ProductConsumer>
    );
  };

  return (
    <SafeAreaProvider>
    <NavigationContainer>
    <ProductProvider>
      <NotificationApp />
      <CartContextProvider>
        <StatusBar backgroundColor={colors.pinkColor}/>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerLeft: () => null,headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          <Stack.Screen name="Login" component={Login} options={{ headerLeft: () => null,headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }}} />
          <Stack.Screen
            name="MainScreenContainer"
            component={CustomerTabNavigator}
            options={{ title: "Welcome", headerLeft: () => null, headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },}}
          />
          <Stack.Screen
            name="VendorScreen"
            component={VendorTabNavigator}
            options={{ title: "Vendor", headerLeft: () => null,
            headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
          />
          <Stack.Screen
            name="CreateShop"
            component={CreateShop}
            options={{ title: "Create Shop",
            headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }}
          />
          <Stack.Screen
            name="RiderScreen"
            component={RiderMain}
            options={{ title: "Rider", headerLeft: () => null,headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
           <Stack.Screen
            name="SearchScreen"
            component={Searched}
            options={{ title: "Searched Items",headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          
          <Stack.Screen
            name="SelectedVendorScreen"
            component={SelectScreen}
            options={{ title: "Place Order",headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
           <Stack.Screen
            name="CartScreen"
            component={Cart}
            options={{ title: "Cart",headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          <Stack.Screen
            name="CheckoutScreen"
            component={Checkout}
            options={{ title: "Checkout",headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          <Stack.Screen
            name="CardScreen"
            component={CardPayment}
            options={{ title: "Payment",headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
          
          <Stack.Screen
            name="ChatBotScreen"
            component={ChatBot}
            options={{title:'Intelligent Assistor',headerStyle: {
              backgroundColor: colors.darkBlue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
          />
           <Stack.Screen
            name="PendingScreen"
            component={PendingOrders}
            options={{title:'Pending Orders',headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
            />
            <Stack.Screen
            name="PendingScreenContainer"
            component={PendingScreenContainer}
            options={{title:'Pending Orders',headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
            />
            <Stack.Screen
            name="FullfilledScreen"
            component={FullfillOrders}
            options={{title:'Fullfill Orders',headerStyle: {
              backgroundColor: colors.pinkColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            } }}
            />
        </Stack.Navigator>
      </CartContextProvider>
    </ProductProvider>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
