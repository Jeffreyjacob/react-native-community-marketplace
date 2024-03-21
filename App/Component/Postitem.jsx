import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Postitem({item}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity  className='flex-1 m-2 p-2' 
    onPress={()=>navigation.push('product-detail',{
        product:item
    })}>
    <Image source={{uri:item.data.image}} 
    className='w-full h-[140px] rounded-lg'
    />
    <View>
        <Text className='text-white bg-green-400 
        p-1 my-2 rounded-full px-3 w-[90px] text-center' >
          {item.data.category}
          </Text>
        <Text className='text-[15px] font-bold mt-2'>
          { item.data.title}
        </Text>
        <Text className='text-[20px] font-bold text-green-500 mt-2'>
            ${item.data.price}
        </Text>
    </View>
</TouchableOpacity>
  )
}