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
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';



const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,
    tabBarActiveTintColor:"rgb(74 222 128)",tabBarLabelStyle:{fontSize:"10px"}}}>
    <Tab.Screen name="Home" component={HomeScreenStackNav}
    options={{
        tabBarLabel:({color,size})=>(
            <Text style={{color:color,fontSize:size}}>Home</Text>
        ),
        tabBarIcon:(({color,size})=>(
            <AntDesign name="home" size={size} color={color} />
        ))
    }} />
    <Tab.Screen name="Explore" component={ExploreScreenStackNav}
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
    <Tab.Screen name='profile' component={ProfileScreenStackNav}
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