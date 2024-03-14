import { View, Text,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser()
    const {startOAuthFlow} = useOAuth({strategy:"oauth_google"})
    const signin = async ()=>{
        try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();
       
            if (createdSessionId) {
              setActive({ session: createdSessionId });
            } else {
              // Use signIn or signUp for next steps such as MFA
            }
          } catch (err) {
            console.error("OAuth error", err);
          } 
    }
  return (
    <View>
      <Image source={require('./../../assets/Images/restaurant-reopening-post-pandemic-new-normal-with-organic-veggies.jpg')}
      className='w-full h-[400px] object-cover'/>
      <View className='p-10 bg-white mt-[-20px] rounded-t-3xl'>
        <Text className='text-[30px] font-bold'>Community MarketPlace</Text>
        <Text className='text-[18px] text-slate-500 mt-6'>Buy Sell Marketplace where you can sell old items and make real money</Text>
        <TouchableOpacity onPress={signin}
        className="p-4 bg-blue-500 rounded-full mt-20">
            <Text className="text-white text-center text-[18px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}