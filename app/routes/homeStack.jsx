import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Sort from "../screens/Sort";
import SideMenu from "../screens/SideMenu";
import SignIn from "../screens/SignIn";

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
  SideMenu: {
    screen: SideMenu,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);
