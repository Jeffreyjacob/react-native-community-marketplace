import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { db, firebaseConfig} from "../../firebaseConfig";
import { Formik } from "formik";
import { initializeApp } from "firebase/app";
import {Picker} from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector';
import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { useUser } from "@clerk/clerk-expo";

export default function AddPostScreen() {
  //**const addCategory = async () => {
  //  try {
  //    db.collection("Category").add({
   //     name: "Jobs",
   //     icon: "https://cdn-icons-png.flaticon.com/128/5079/5079335.png",
   //   });
  ///  } catch {}
  //};//
  const [Categorylist,setCategoryList] = useState([])
  const [image, setImage] = useState(null);
  const [loading,setLoading] = useState(false)
  const firebaseInit = initializeApp(firebaseConfig)
  const storage = getStorage(firebaseInit)
  const UserInfo= useUser();
  useEffect(()=>{
    const GetCategory = async ()=>{
        const Category = await db.collection("Category").onSnapshot(
            doc =>{
             const items = doc.docs.map(
                docs =>({
                    id:docs.id,
                    data:docs.data()
                })
             )
             console.log(items)
             setCategoryList(items)
            }
        )
      }
      GetCategory()
  },[])
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onSubmitMethod = async (value) =>{
    setLoading(true)
   // cover uri to blob file 
   const resp = await fetch(image);
   const blob = await resp.blob();
   const storageRef = ref(storage,'MarketPlcae-images/'+Date.now()+'jpg');
   uploadBytes(storageRef,blob).then((snapshot)=>{
    console.log('uploaded a blob or file')
   }).then((resp)=>{
     getDownloadURL(storageRef).then(async(downloadUrl)=>{
      console.log(downloadUrl);
      value.image = downloadUrl;
      value.userName = UserInfo.user.fullName;
      value.userEmail = UserInfo.user.primaryEmailAddress.emailAddress;
      value.userImage = UserInfo.user.imageUrl;
      const DocRef = db.collection('MarketPlacePost').add(value)
      setLoading(false)
      Alert.alert('Post Added Successfully!')
      if(DocRef.id){
       

      }
     })
   })
  }

  return (
    <KeyboardAvoidingView>
       <ScrollView>
    <View className="p-14">
      <Text className="text-[20px] text-[#88BD46] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">Create New post and Start Selling</Text>
      <Formik
       initialValues={{title:"",desc:"",category:"",
       address:"",price:"",image:"",userName:"",
       userEmail:"",userImage:"",createdAt:Date.now()}} onSubmit={(value)=>onSubmitMethod(value)}
       validate={(value)=>{
        const errors = {}
        if(!value.title){
           Alert.alert('Please enter Title')
            errors.name = "Title Must be there"
        }
        return errors
       }}>
        {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
           <View>
            <TouchableOpacity onPress={pickImage}>
              {
                image ? <Image source={{uri:image}} 
                style={{width:100,height:100,borderRadius:10}}/>:
                <Image source={require('./../../assets/Images/placeholder-image.png')}
                style={{width:100,height:100}}/>
              }
          
            </TouchableOpacity>
          
            
            <TextInput style={styles.input} 
            placeholder="title"
            value={values?.title}
            onChangeText={handleChange('title')}/>

            <TextInput style={styles.Textarea}
            placeholder="Description"
            value={values?.desc}
            numberOfLines={5}
            multiline={true}
            onChangeText={handleChange('desc')}
            />

            <TextInput style={styles.input}
            placeholder="Price"
            value={values?.price}
            keyboardType='number-pad'
            onChangeText={handleChange('price')}/>
             
             <TextInput style={styles.input}
             placeholder="Address"
             value={values?.address}
             onChangeText={handleChange('address')}/>

             <Picker selectedValue={values?.category }
             onValueChange={itemValue => setFieldValue('category',itemValue)}>
              {Categorylist && Categorylist.map(({id,data:{name,icon}})=>(
                  <Picker.Item key={id} 
                  label={name} value={name} />
              ))}
             </Picker>
    
             <TouchableOpacity onPress={handleSubmit}
             disabled={loading}
             className = 'p-4 bg-[#88BD46] rounded-full mt-10'>
              {
                loading ? <ActivityIndicator color='#fff'/>:
                <Text className='text-white text-center text-[16px]'>Submit</Text>
              }
          
             </TouchableOpacity>
            
           </View>
        )}
      </Formik>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    
  );
}
const styles = StyleSheet.create({
    input:{
     borderWidth:1,
     borderRadius:10,
     padding:10,
     marginTop:10,marginBottom:6,
     paddingHorizontal:17,
     fontSize:17,
    },
    Textarea:{
      borderWidth:1,
     borderRadius:10,
     padding:10,
     marginTop:10,marginBottom:6,
     paddingHorizontal:17,
     fontSize:17,
     height:100,
     textAlignVertical:"top"
    },
})
