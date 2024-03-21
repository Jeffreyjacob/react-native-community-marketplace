import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { db } from '../../firebaseConfig';
import LatestItemList from '../Component/LatestItemList';

export default function ItemListScreen() {
   const {params} = useRoute();
   const [itemList,setItemList] = useState([]);
   const [loading,setLoading] = useState(false)
   useEffect(()=>{
      console.log(params.category)
      const getItemListByCategory = async ()=>{
        setLoading(true)
        const q = db.collection('MarketPlacePost').where('category','==',params.category)
        .onSnapshot(
            doc =>{
                const item = doc.docs.map(docs =>({
                    id:docs.id,
                    data:docs.data()
                }))
                setItemList(item)
                setLoading(false)
            }
        )
      }
      getItemListByCategory();
   },[params])
  return (
    <View className='px-3'>
      {
        loading ? <ActivityIndicator size={'large'} color={'rgb(74 222 128)'}/>:(
          itemList?.length > 0 ? <LatestItemList latestItemList={itemList}/>:
          <Text className='p-5 text-[20px] justify-center text-center mt-24 text-gray-500'>
            No Post
          </Text>
        )
}
    </View>
  )
}