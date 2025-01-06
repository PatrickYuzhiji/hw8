import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerArticleScreen from "../screens/BadgerArticleScreen";

const NewsStack = createNativeStackNavigator();

function BadgerStack() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="AllNews"
        component={BadgerNewsScreen}
        options={{ headerShown: false }}
      />
      <NewsStack.Screen
        name="Article"
        component={BadgerArticleScreen}
        options={{ headerShown: true }}
      />
    </NewsStack.Navigator>
  );
}

export default BadgerStack;
