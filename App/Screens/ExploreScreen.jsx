import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../../firebaseConfig'
import LatestItemList from '../Component/LatestItemList'

export default function ExploreScreen() {
   const [loading,setLoading] = useState(false)
   const [latestItem,setLatestItem] =useState([])
  useEffect(()=>{
    const GetLatestItemList = async ()=>{
      setLoading(true)
      const ItemList = await db.collection("MarketPlacePost").orderBy("createdAt","desc").onSnapshot(
        doc =>{
          const items = doc.docs.map(
            docs =>({
              id:docs.id,
              data:docs.data()
            })
          )
          setLatestItem(items)
          setLoading(false)
        }
      )
     
  }
  GetLatestItemList();
  },[])

  return (
    <SafeAreaView>
      <ScrollView className='pt-3 px-5'>
      <Text className='text-[30px] font-bold'>Explore More</Text>
      <LatestItemList latestItemList={latestItem}/>
    </ScrollView>
    </SafeAreaView>
    
  )
}