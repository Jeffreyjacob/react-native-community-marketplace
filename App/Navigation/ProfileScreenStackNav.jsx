import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProduct from '../Screens/MyProduct';
import ExploreScreen from '../Screens/ExploreScreen';
import ProductDetails from '../Screens/ProductDetails';


const Stack = createStackNavigator();

export default function ProfileScreenStackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={ProfileScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name='MyProduct' component={MyProduct}
                options={{
                    headerTitle: "My Product",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "rgb(74 222 128)"
                    }

                }}
            />
            <Stack.Screen name='explore-tab' component={ExploreScreen}
                options={{
                    headerTitle: "Detail",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "rgb(74 222 128)"
                    }

                }}
            />
            <Stack.Screen name='product-detail' component={ProductDetails}
                options={{
                    headerTitle: "Detail",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "rgb(74 222 128)"
                    }

                }}
            />
        </Stack.Navigator>
    )
}