import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AppState } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import * as Segment from 'expo-analytics-segment';
import { Video } from 'expo-av';


export class OnboardingScreen1 extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  static navigationOptions = () => {
    return {
      title: null,
      headerTitleStyle: {
        fontFamily: 'System',
      }
    }
  };

  componentDidMount() {
    Segment.screen("Onboarding");
    AppState.addEventListener('change', this._handleAppStateChange);
    if (this.props.settings.onboardingComplete === true) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Legal' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      Segment.track("App Session");
    }
    this.setState({appState: nextAppState});
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.explainerContainer}>
          <Text style={styles.welcome}>Welcome to Pacemaker-ID</Text>
          <Text style={styles.description}>It's simple. Using the camera, place the Pacemaker/ICD in the box, touching all four corners.</Text>

          <View style={{backgroundColor: 'black', marginTop: 40,}}>
            <Video
              source={require("src/assets/example.mp4")}
              posterSource={require("src/assets/example.jpg")}
              posterStyle={{width: '100%', height: 300}}
              usePoster={true}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode={Video.RESIZE_MODE_COVER}
              shouldPlay
              isLooping
              style={{ width: '100%', height: 300 }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={()=> this.props.navigation.navigate('OnboardingScreen2')}
          style={{position: 'absolute', bottom: 40, left: 20, right: 20, backgroundColor: '#4F48DD', padding: 18, borderRadius: 9,}}>
          <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center', fontFamily: 'System',}}>Continue</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(state => {
  return {
    settings: state.settings
  };
}, () => {
  return {
  };
})(OnboardingScreen1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
  explainerContainer: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  welcome: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'System',
    lineHeight: 24,
  }
});
