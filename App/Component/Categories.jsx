import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({categoriesList,loading}) {
  const navigation = useNavigation();
  return (
          <View className='mt-6'>
          <Text className='font-bold text-[20px]'>Categories</Text>
          {
            loading ? <ActivityIndicator className='my-4'
             size={'large'} color={'rgb(74 222 128)'}/> :
            <FlatList
           data={categoriesList}
           numColumns={4}
           renderItem={({item,index})=>(
             <TouchableOpacity 
             onPress={()=>navigation.navigate('item-list',
             {category:item.data.name})}
             className='flex-1 items-center justify-center
              p-2 border-[1px] m-1 h-[80px] rounded-lg border-green-300 bg-green-100'>
                <Image source={{uri:item.data.icon}}
                className='w-[40px] h-[40px]'
                />
                <Text className='text-[12px] mt-1'>{item.data.name}</Text>
             </TouchableOpacity>
           )}
          />
          }
          
        </View>
   
  )
}