import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import colors from 'tailwindcss/colors';
import { CustomHeader } from '~/src/components/Common/CustomHeader';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.gray[950] : colors.gray[200],
          borderColor: isDarkMode ? colors.gray[950] : colors.gray[200],
        },
        header: ({ options }) => <CustomHeader options={options} />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ka Kot Jingrwai',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: 'Ki Jing Rwai',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chorus"
        options={{
          title: 'Ki Khorus',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="book" color={color} />,
        }}
      />
    </Tabs>
  );
}
