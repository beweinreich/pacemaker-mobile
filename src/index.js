import React from "react";
import { LogBox } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
// import { fromRight, fadeIn } from 'react-navigation-transitions';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Constants from "expo-constants";

import { store, persistor } from "./store";

import LegalScreen from "./screens/legal/index";
import CaptureScreen from "./screens/capture/index";
import ResultsScreen from "./screens/results/index";
import SettingsScreen from "./screens/settings/index";
import OnboardingScreen1 from "./screens/onboarding/screen1";
import OnboardingScreen2 from "./screens/onboarding/screen2";

import * as Segment from "expo-analytics-segment";

const androidWriteKey = "wrHwY8MXMdh6PwIgQ2gP50xjBBe0YBZ9";
const iosWriteKey = "wrHwY8MXMdh6PwIgQ2gP50xjBBe0YBZ9";
const userId = Constants.installationId;

Segment.initialize({ androidWriteKey, iosWriteKey });
Segment.identify(userId);
Segment.track("App Session");
LogBox.ignoreAllLogs(); //Ignore all log notifications

// const handleCustomTransition = ({ scenes }) => {
//   // const prevScene = scenes[scenes.length - 2];
//   const nextScene = scenes[scenes.length - 1];
//   // Custom transitions go there
//   if (nextScene.route.routeName === 'Settings' || nextScene.route.routeName === 'TransitionList') {
//     return fadeIn();
//   }
//   return fromRight();
// }

const MainNavigator = createStackNavigator(
  {
    Legal: { screen: LegalScreen },
    Capture: { screen: CaptureScreen },
    Results: { screen: ResultsScreen },
    Settings: { screen: SettingsScreen },
    OnboardingScreen1: { screen: OnboardingScreen1 },
    OnboardingScreen2: { screen: OnboardingScreen2 },
  },
  {
    initialRouteName: "OnboardingScreen1",
    // transitionConfig: (nav) => handleCustomTransition(nav),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#fff",
        borderBottomWidth: 0,
      },
      // headerTintColor: Color.cinder,
      // headerTitleStyle: {
      // },
    },
  }
);

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}
