import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { db } from '../../firebaseConfig';
import LatestItemList from '../Component/LatestItemList';

export default function MyProduct() {
    const UserInfo = useUser(); 
    const [ProductInfo,setProductInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
      const getProduct = async ()=>{
        setLoading(true)
          const getProductbyEmail = db.collection('MarketPlacePost').where('userEmail','==',UserInfo.user.primaryEmailAddress.emailAddress)
          .onSnapshot(
            doc =>{
                const product = doc.docs.map(
                    docs =>({
                        id:docs.id,
                        data:docs.data()
                    })
                )
                console.log(product)
                setProductInfo(product)
                setLoading(false)
            }
          )
      }
      getProduct();
    },[])
  return (
    <View>
       <LatestItemList latestItemList={ProductInfo}  loading={loading}/>
    </View>
  )
}