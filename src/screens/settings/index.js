import React from 'react';
import { StyleSheet, Linking, ScrollView, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import Constants from "expo-constants";

import * as Segment from 'expo-analytics-segment';


export class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    Segment.screen("Settings");
  }

  onPressCall(number) {
    const url = `tel://${number}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
            .catch(() => alert("Sorry, we couldn't launch the Phone for you."));
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Capture' })],
            });
            this.props.navigation.dispatch(resetAction);
          }}
          activeOpacity={0.7}>
          <View style={styles.closeIcon}>
            <Image source={require("src/assets/close-icon.png")} />
          </View>
        </TouchableOpacity>
        <Image style={styles.topLogo} source={require("src/assets/logo-white.png")} />
        <Text style={styles.description}>Pacemaker-ID is a simple application that analyzes and identifies Boston Scientific, Biotronik, Medtronik, and St. Jude pacemakers and defibrillators.</Text>
        <View style={styles.settingsList}>
          <ScrollView>
            <View style={styles.bottomSettings}>
              <TouchableOpacity
                style={styles.supportButton}
                onPress={() => this.onPressCall('18002273422') }
                title="support@madebybread.com"
                activeOpacity={0.7}>
                <View style={styles.settingsRowLayout}>
                  <Text style={styles.settingsRowText}>Call Boston Scientific</Text>
                  <Image style={styles.settingsRowIcon} source={require("src/assets/chevron-right.png")} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.supportButton}
                onPress={() => this.onPressCall('18005470394') }
                title="support@madebybread.com"
                activeOpacity={0.7}>
                <View style={styles.settingsRowLayout}>
                  <Text style={styles.settingsRowText}>Call Biotronik</Text>
                  <Image style={styles.settingsRowIcon} source={require("src/assets/chevron-right.png")} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.supportButton}
                onPress={() => this.onPressCall('18006338766') }
                title="support@madebybread.com"
                activeOpacity={0.7}>
                <View style={styles.settingsRowLayout}>
                  <Text style={styles.settingsRowText}>Call Medtronic</Text>
                  <Image style={styles.settingsRowIcon} source={require("src/assets/chevron-right.png")} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.supportButton}
                onPress={() => this.onPressCall('18007223774') }
                title="support@madebybread.com"
                activeOpacity={0.7}>
                <View style={styles.settingsRowLayout}>
                  <Text style={styles.settingsRowText}>Call St. Jude</Text>
                  <Image style={styles.settingsRowIcon} source={require("src/assets/chevron-right.png")} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.websiteButton}
                onPress={() => Linking.openURL('http://www.onlinejacc.org/content/73/9_Supplement_1/307') }
                title="http://www.onlinejacc.org/content/73/9_Supplement_1/307"
                activeOpacity={0.7}>
                <View style={styles.settingsRowLayout}>
                  <Text style={styles.settingsRowText}>Our study in JACC</Text>
                  <Image style={styles.settingsRowIcon} source={require("src/assets/chevron-right.png")} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.websiteButton}
                onPress={() => Linking.openURL('https://www.madebybread.com') }
                title="https://www.madebybread.com"
                activeOpacity={0.7}>
                <View style={styles.settingsRowLayout}>
                  <Text style={styles.settingsRowText}>madebybread.com</Text>
                  <Image style={styles.settingsRowIcon} source={require("src/assets/chevron-right.png")} />
                </View>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
        <Text style={styles.versionText}>Version {Constants.manifest['version']}</Text>
      </View>
    )
  }
}

export default connect(state => {
  return {
  };
}, (dispatch) => {
  return {
  };
})(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingTop: 16,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#141A1D',
  },
  closeIcon: {
    marginTop: Dimensions.get('window').height > 568 ? 44 : 20,
    // backgroundColor: 'red',
    padding: 15,
    marginLeft: -10,
  },
  topLogo: {
    marginTop: Dimensions.get('window').height > 568 ? 20: 0,
    height: 44, 
    resizeMode: 'center',
    width: 200,
    // width: Dimensions.get('window').width - 10,
    // backgroundColor: 'red',
  },
  description: {
    color: '#AAA',
    fontFamily: 'System',
    marginTop: 20,
    fontSize: 16,
  },
  settingsList: {
    paddingTop: 20
  },
  settingsRowButton: {
    flex: 1,
    justifyContent: 'center',
    height: 60,
  },
  settingsRowButtonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  settingsRowButtonInfo: {
    flexDirection: 'row',
  },
  settingsRowInfoIcon: {
    marginRight: 16,
  },
  settingsRowLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  settingsRowIcon: {
    marginLeft: 16,
  },
  settingsRowText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'System',
  },
  bottomSettings: {
    paddingTop: 10,
  },
  versionText: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 20,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#AAA',
    fontSize: 12,
    fontFamily: 'System',
  }  
});
