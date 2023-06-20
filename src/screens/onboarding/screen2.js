import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, AppState, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import Constants from "expo-constants";

import * as Segment from 'expo-analytics-segment';


export class OnboardingScreen2 extends React.Component {
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
    Segment.screen("Onboarding2");
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

  captureFeedback(answer) {
    Segment.track(answer);
    const userId = Constants.installationId;
    Segment.identifyWithTraits(userId, {
      profession: answer,
    });
    this.props.completedOnboarding();
    this.props.navigation.navigate('Legal');
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.explainerContainer}>
          <Text style={styles.welcome}>I am a...</Text>

          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              onPress={()=> this.captureFeedback("Cardiologist")}
              style={styles.button}>
              <Text style={styles.buttonText}>Cardiologist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("Electrophysiologist")}
              style={styles.button}>
              <Text style={styles.buttonText}>Electrophysiologist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("EM Physician")}
              style={styles.button}>
              <Text style={styles.buttonText}>EM Physician</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("Fellow / Resident / Student")}
              style={styles.button}>
              <Text style={styles.buttonText}>Fellow / Resident / Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("PA / NP")}
              style={styles.button}>
              <Text style={styles.buttonText}>PA / NP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("Physician (Other)")}
              style={styles.button}>
              <Text style={styles.buttonText}>Physician (other)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("Tech")}
              style={styles.button}>
              <Text style={styles.buttonText}>Tech</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("Device Rep")}
              style={styles.button}>
              <Text style={styles.buttonText}>Device Rep</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> this.captureFeedback("Other")}
              style={styles.button}>
              <Text style={styles.buttonText}>Other</Text>
            </TouchableOpacity>

          </View>

        </View>

        </ScrollView>        
      </View>
    )
  }
}

export default connect(state => {
  return {
    settings: state.settings
  };
}, (dispatch) => {
  return {
    completedOnboarding: () => {
      dispatch({type: "COMPLETED_ONBOARDING"})
    }
  };
})(OnboardingScreen2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 24,
  },
  explainerContainer: {
    paddingLeft: 18,
    paddingRight: 18,
    justifyContent: 'center', 
    alignItems: 'center',
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
  },
  button: {
    width: '70%',
    backgroundColor: '#4F48DD',
    padding: 14,
    marginTop: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
    fontFamily: 'System',
  }
});
