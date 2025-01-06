import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import BadgerStack from "./BadgerStack";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";

// a tab for "News" and a tab for "Preferences". I would recommend using a
// BottomTabNavigator in BadgerTabs.jsx to navigate between screens for BadgerNewsScreen.jsx
// and BadgerPreferencesScreen.jsx. You may provide icons for and/or style the tabs,
// but it is not a requirement. However, you must use React Navigation.

const Tab = createBottomTabNavigator();

function BadgerTabs(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "lightblue" },
      }}
    >
      <Tab.Screen name="News" component={BadgerStack} />
      <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />
    </Tab.Navigator>
  );
}

export default BadgerTabs;
