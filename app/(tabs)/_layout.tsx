import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
          height: 58,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 22, // Push tabs further down
          paddingHorizontal: 70,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 30,
        },
        headerShown: false, // <---- REMOVE TOP HEADER!
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: focused ? "#FF9800" : "#fff",
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: focused ? "#FF9800" : "#222",
                shadowOpacity: focused ? 0.23 : 0.08,
                shadowRadius: focused ? 7 : 1,
                borderWidth: focused ? 0 : 1,
                borderColor: "#EEE"
              }}>
              <FontAwesome size={18} name="leaf" color={focused ? "#fff" : "#FF9800"} />
            </View>
          ),
          headerShown: false, // <--- ensures header doesn't show for Home
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: focused ? "#FF9800" : "#fff",
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: focused ? "#FF9800" : "#222",
                shadowOpacity: focused ? 0.23 : 0.08,
                shadowRadius: focused ? 7 : 1,
                borderWidth: focused ? 0 : 1,
                borderColor: "#EEE"
              }}>
              <FontAwesome size={18} name="shopping-basket" color={focused ? "#fff" : "#FF9800"} />
            </View>
          ),
          headerShown: false, // <--- ensures header doesn't show for Cart
        }}
      />
    </Tabs>
  );
}
