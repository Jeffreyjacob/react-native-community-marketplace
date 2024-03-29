import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './App/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigation/TabNavigation';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_aGFuZHktY2hvdy0zNC5jbGVyay5hY2NvdW50cy5kZXYk'>
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SignedIn>
        <NavigationContainer>
          <TabNavigation/>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
      <LoginScreen/>
      </SignedOut>
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
