import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,
    tabBarActiveTintColor:"#88BD46",tabBarLabelStyle:{fontSize:"10px"}}}>
    <Tab.Screen name="Home" component={HomeScreen}
    options={{
        tabBarLabel:({color,size})=>(
            <Text style={{color:color,fontSize:size}}>Home</Text>
        ),
        tabBarIcon:(({color,size})=>(
            <AntDesign name="home" size={size} color={color} />
        ))
    }} />
    <Tab.Screen name="Explore" component={ExploreScreen}
     options={{
        tabBarLabel:({color,size})=>(
            <Text style={{color:color,fontSize:size}}>Explore</Text>
        ),
        tabBarIcon:(({color,size})=>(
            <MaterialIcons name="explore" size={size} color={color} />
        ))
    }} />
    <Tab.Screen name='addpost' component={AddPostScreen}
     options={{
        tabBarLabel:({color,size})=>(
            <Text style={{color:color,fontSize:size}}>AddPost</Text>
        ),
        tabBarIcon:(({color,size})=>(
            <MaterialIcons name="post-add" size={size} color={color} />
        ))
    }}/>
    <Tab.Screen name='profile' component={ProfileScreen}
     options={{
        tabBarLabel:({color,size})=>(
            <Text style={{color:color,fontSize:size}}>Profile</Text>
        ),
        tabBarIcon:(({color,size})=>(
            <Ionicons name="person-circle-sharp" size={size} color={color} />
        ))
    }}
    />
  </Tab.Navigator>
  )
}