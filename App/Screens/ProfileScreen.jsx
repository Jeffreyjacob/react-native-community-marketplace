import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context';
import diary from '../../assets/Images/icons8-diary-66.png';
import explore from '../../assets/Images/icons8-explore-96.png';
import logout from '../../assets/Images/icons8-logout-64.png';
import Link from '../../assets/Images/icons8-web-link-64.png'
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const UserInfo = useUser();
  const {isLoaded,signOut} = useAuth()
      const menuList = [
        {
          id:1,
          name:'My Products',
          icon:diary,
          path:'MyProduct'
        },
        {
          id:2,
          name:'Explore',
          icon:explore,
          path:"explore-tab"
        },
        {
          id:3,
          name:'External',
          icon:Link,
          url:''
        },
        {
          id:4,
          name:'Logout',
          icon:logout,
        
        },
      ]
      const onMenuPress = (item)=>{
        item?.path ? navigation.navigate(item.path):null;
        if(item.name == 'Logout'){
          signOut()
          return;
        }
      }
  return (
    <SafeAreaView>
      <View>
        <View className='items-center mt-14'>
          <Image source={{ uri: UserInfo.user.imageUrl }}
            className='w-[100px] h-[100px] rounded-full'
          />
          <Text className='font-bold text-[25px] mt-3'>{UserInfo.user.firstName}</Text>
          <Text className='text-[18px] mt-3 text-gray-500'>{UserInfo.user.primaryEmailAddress.emailAddress}</Text>
        </View>
        <FlatList
        data={menuList}
        style={{marginTop:20}}
        numColumns={2}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=>onMenuPress(item)}
          className='flex-1 mx-5 my-3 p-5 
           items-center rounded-lg bg-green-100'>
            {item.icon && <Image source={item?.icon} 
            className='w-[64px] h-[64px]'/>}
            <Text className='mt-3 text-[12px] text-green-500'>{item.name}</Text>
          </TouchableOpacity>
        )}/>
      </View>
    </SafeAreaView>
  )
}