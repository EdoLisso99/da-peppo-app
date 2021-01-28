import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Sort from "../screens/Sort";
import SideMenu from "../screens/SideMenu";
import SignIn from "../screens/SignIn";
import BeerDetails from "../screens/BeerDetails";
import Search from "../screens/Search";
import LogIn from "../screens/LogIn";
import Settings from "../screens/Settings";

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
  BeerDetails: {
    screen: BeerDetails,
    navigationOptions: {
      headerShown: false,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      headerShown: false,
    },
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      headerShown: false,
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const homeStack = createStackNavigator(screens);

export default createAppContainer(homeStack);
