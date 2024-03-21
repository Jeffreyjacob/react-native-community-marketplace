import { View, Text, FlatList, Image } from 'react-native'

export default function Slider({sliderList,loading}) {
    return (
    <View className = 'mt-6'>
      <FlatList
       data={sliderList}
       horizontal={true}
       showsHorizontalScrollIndicator = {false}
       renderItem={({item})=>(
        <View>
          <Image source={{uri:item.data.image}}
           className='h-[200px] w-[330px] mr-3 
           rounded-lg object-contain'
          />
        </View>
       )}
      />
    </View>
  )
}