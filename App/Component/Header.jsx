import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';

export default function Header() {
    const UserInfo = useUser();
    const [searchInput,setSearchInput] = useState('');
    const SearchHandler = (value)=>{
        setSearchInput(value)
    }
    return (
        <View>
            {/**UserInfo section */}
            <View className='flex flex-row items-center gap-2'>
                <Image source={{ uri: UserInfo.user.imageUrl }}
                    className='rounded-full h-10 w-10'
                />
                <View>
                    <Text className='text-[16px]'>Welcome</Text>
                    <Text className='text-[20px] font-bold'>{UserInfo.user.fullName}</Text>
                </View>
            </View>
            {/**Search bar */}
            <View className='flex flex-row  py-4 px-5 mt-5
             bg-white rounded-full border-[2px] border-green-300'>
            <AntDesign name="search1" size={24} color="gray" />
                <TextInput placeholder='Search' className='ml-3 text-[18px]'
                 onChangeText={SearchHandler}
                />
            </View>

        </View>
    )
}