import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import CartScreen from './src/Screens/CartScreen';
import CustomBottomTab from './Components/CustomBottomTab';
import {AppProvider} from './AppProvider';

const Tabs = createBottomTabNavigator();

export default class App extends Component<BottomTabBarProps> {
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <AppProvider>
          <NavigationContainer>
            <Tabs.Navigator
              screenOptions={{headerShown: false}}
              tabBar={props => <CustomBottomTab {...props} />}>
              <Tabs.Screen name="HomeScreen" component={HomeScreen} />
              <Tabs.Screen name="CartScreen" component={CartScreen} />
            </Tabs.Navigator>
          </NavigationContainer>
        </AppProvider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
