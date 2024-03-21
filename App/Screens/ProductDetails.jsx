import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../../firebaseConfig';


export default function ProductDetails({ navigation }) {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);
  const UserInfo = useUser();
  const Nav = useNavigation();
  useEffect(() => {
    setProduct(params?.product)
    shareButton()
  }, [params, navigation])

  const sendEmailMessage = () => {
    const subject = 'Regarding' + (product?.data?.title ?? '');
    const body = 'Hi' + (product?.data?.userName ?? '') + '\n' + 'I am interested in this product'
    Linking.openURL(`mailto:${product?.data?.userEmail}?subject=${subject}&body=${body}`)
  }

  const shareButton = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => shareProduct()}>
          <Ionicons name="share-social-sharp" size={24} color="white"
            style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }
  const shareProduct = async () => {
    const content = {
      message: product?.data?.title
    }
    Share.share(content).then(
      resp => {
        console.log(resp)
      }, (error) => {
        console.log(error)
      }
    )
  }
  const deletePost = (title) => {
    Alert.alert('Do you want to Delete?', 'Are you sure that, you want to Detele this Post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteFromFireStore(title)
        }])
  }
  const deleteFromFireStore = async (title) => {
    console.log(title)
    try {
      const querySnapshot = await db.collection('MarketPlacePost').where('title', '==', title).get();
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
        console.log('Document successfully deleted!');
        Nav.goBack()
      });
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }
  return (
    <ScrollView className='bg-white'>
      <Image source={{ uri: product?.data?.image }}
        className='h-[320px] w-full' />
      <View className='p-3 mb-4'>
        <Text className='text-[24px] font-bold'>{product?.data?.title}</Text>
        {/**Product category */}
        <View className='items-baseline mt-2' style={{ borderRadius: 8 }}>
          <Text className='px-2 p-1 text-green-500  bg-green-300'>
            {product?.data?.category}
          </Text>
        </View>

        <Text className='mt-3 font-bold text-[20px] mb-1'>Description</Text>
        <Text className='text-[17px] text-gray-500'>{product?.data?.desc}</Text>
      </View>
      {/**User info */}

      <View className='p-3 flex flex-row items-center gap-3'>
        <Image source={{ uri: product?.data?.userImage }}
          className='w-12 h-12 rounded-full'
        />
        <View>
          <Text className='font-bold text-[18px]'>{product?.data?.userName}</Text>
          <Text className='text-gray-500'>{product?.data?.userEmail}</Text>
        </View>
      </View>
      {/**Button */}
      {
        UserInfo.user.primaryEmailAddress.emailAddress == product?.data?.userEmail ?
          <TouchableOpacity onPress={() =>deletePost(product?.data?.title)}
            className='bg-red-500 mt-6 mx-3 rounded-full'>
            <Text className='text-center text-white font-bold py-4'>Delete Post</Text>
          </TouchableOpacity> :
          <TouchableOpacity onPress={() => sendEmailMessage()}
            className='bg-green-400 mt-6 mx-3 rounded-full'>
            <Text className='text-center text-white font-bold py-4'>Send Message</Text>
          </TouchableOpacity>
      }


    </ScrollView>
  )
}