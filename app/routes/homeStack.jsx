import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Sort from "../screens/Sort";

const screens = {
  HomePage: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  SortPage: {
    screen: Sort,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);
