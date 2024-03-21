import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import Slider from '../Component/Slider'
import { db } from '../../firebaseConfig'
import Categories from '../Component/Categories'
import LatestItemList from '../Component/LatestItemList'

export default function HomeScreen() {
  const [sliderList,setSliderList] = useState([]);
  const [Categorylist,setCategoryList] = useState([]);
  const [latestItem,setLatestItem] = useState([]);
  const [loadingCategories,setLoadingCategories] = useState(false);
  const [loadingItemList,setLoadingItemList] = useState(false);

    useEffect(()=>{
        const getSliders = async () =>{
           const querySnapShot = await db.collection('Sliders').onSnapshot(
            doc =>{
                 const sliders = doc.docs.map(docs =>({
                    data:docs.data()
                 }))
                 setSliderList(sliders);
            }
           )
        }

        const GetCategory = async ()=>{
          setLoadingCategories(true)
          const Category = await db.collection("Category").onSnapshot(
              doc =>{
               const items = doc.docs.map(
                  docs =>({
                      id:docs.id,
                      data:docs.data()
                  })
               )
               setCategoryList(items)
               setLoadingCategories(false)
              }
          )
        }

        const GetLatestItemList = async ()=>{
            setLoadingItemList(true)
            const ItemList = await db.collection("MarketPlacePost").orderBy("createdAt","desc").onSnapshot(
              doc =>{
                const items = doc.docs.map(
                  docs =>({
                    id:docs.id,
                    data:docs.data()
                  })
                )
                setLatestItem(items)
                setLoadingItemList(false)
              }
            )
           
        }

        getSliders();
        GetCategory();
        GetLatestItemList();
    },[])
  return (
    <SafeAreaView>
      <ScrollView>
      <View className="px-6 py-3 ">
      <Header/>
      <Slider sliderList={sliderList}/>
      <Categories categoriesList={Categorylist} loading={loadingCategories}/>
      <LatestItemList latestItemList={latestItem} heading='Latest items' loading={loadingItemList}/>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}