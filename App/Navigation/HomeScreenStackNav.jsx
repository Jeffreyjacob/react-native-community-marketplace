import { View, Text } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemListScreen from '../Screens/ItemListScreen';
import ProductDetails from '../Screens/ProductDetails';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={HomeScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='item-list' component={ItemListScreen}
                options={({ route }) => ({
                    title: route.params.category,
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: " rgb(134 239 172)"
                    }
                })}

            />
            <Stack.Screen name='product-detail' component={ProductDetails}
                options={{
                    headerTitle:"Detail",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "rgb(74 222 128)"
                    }
                    
                }}
            />
        </Stack.Navigator>
    )
}
