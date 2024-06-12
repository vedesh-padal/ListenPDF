import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { processed, process, home } from '../../constants/icons'
import AppProvider from '../AppContext'

const TabIcon = ({ icon, color, name, focussed }) => {
  return (
    <View className='items-center justify-center gap-1'>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`${focussed ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <AppProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 72

          }
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focussed }) => (
              <TabIcon 
                icon={home}
                color={color}
                name='Home'
                focus={focussed}
              />
            )
          }}
        />
        <Tabs.Screen
          name='process'
          options={{
            title: 'Process',
            headerShown: false,
            tabBarIcon: ({ color, focussed }) => (
              <TabIcon 
                icon={process}
                color={color}
                name='Process'
                focus={focussed}
              />
            )
          }}
        />
        <Tabs.Screen
          name='processed'
          options={{
            title: 'Processed',
            headerShown: false,
            tabBarIcon: ({ color, focussed }) => (
              <TabIcon 
                icon={processed}
                color={color}
                name='Processed'
                focus={focussed}
              />
            )
          }}
        />
      </Tabs>
    </AppProvider>
  )
}

export default TabsLayout