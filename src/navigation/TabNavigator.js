// Tab Navigator for main app navigation
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../styles/colors'

// Import screens
import HomeScreen from '../screens/main/HomeScreen'
import ServicesScreen from '../screens/main/ServicesScreen'
import BookingScreen from '../screens/main/BookingScreen'
import ResourcesScreen from '../screens/main/ResourcesScreen'
import DonationScreen from '../screens/main/DonationScreen'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Services':
              iconName = focused ? 'medical' : 'medical-outline'
              break
            case 'Booking':
              iconName = focused ? 'calendar' : 'calendar-outline'
              break
            case 'Resources':
              iconName = focused ? 'library' : 'library-outline'
              break
            case 'Donate':
              iconName = focused ? 'heart' : 'heart-outline'
              break
            default:
              iconName = 'circle'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.lightGray,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesScreen}
        options={{
          title: 'Services',
        }}
      />
      <Tab.Screen 
        name="Booking" 
        component={BookingScreen}
        options={{
          title: 'Booking',
        }}
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesScreen}
        options={{
          title: 'Resources',
        }}
      />
      <Tab.Screen 
        name="Donate" 
        component={DonationScreen}
        options={{
          title: 'Donate',
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
