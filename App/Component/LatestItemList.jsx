import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Postitem from './Postitem'

export default function LatestItemList({latestItemList,heading,loading}) {
  return (
    <View className='mt-3'>
       <Text className='font-bold text-[20px]'>{heading}</Text>
       {
        loading ? <ActivityIndicator className='my-4'
        size={'large'} color={'rgb(74 222 128)'}/> :
        <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({item,index})=>(
        <Postitem item={item} />
        )}/>

       }
     
    </View>
  )
}