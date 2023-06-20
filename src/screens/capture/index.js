import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  AppState,
  ActivityIndicator,
  Platform,
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { Updates } from "expo";
import * as Linking from "expo-linking";
import * as Permissions from "expo-permissions";
import * as Haptics from "expo-haptics";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";

import * as Segment from "expo-analytics-segment";

const DESIRED_RATIO = "1:1";

export default class CaptureScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    capturing: false,
    // px: null,
    // py: null,
    // width: null,
    // height: null,
    appState: AppState.currentState,
  };

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    this.setState({ capturing: false });
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
    AppState.addEventListener("change", this._handleAppStateChange);
    this._checkUpdates();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      Segment.track("App Session");
      this._checkUpdates();
    }
    this.setState({ appState: nextAppState });
  };

  componentWillUpdate() {
    if (this.state.capturing === true) {
      this.setState({ capturing: false });
    }
  }

  takePicture = () => {
    if (this.state.capturing !== true) {
      this.setState({ capturing: true });
      Segment.track("Photo Captured");
      Haptics.selectionAsync();
      this._cropAndResize();
    }
  };

  _cropAndResize = async () => {
    if (this.camera) {
      let image = await this.camera.takePictureAsync();
      this.setState({ capturing: false });

      // make it a square
      console.log(image);

      // excess amount of height beyond image width
      const heightPadding = image.height - image.width;
      const yStart = heightPadding / 2;

      let navigateAction;

      try {
        const manipResult = await ImageManipulator.manipulateAsync(
          image.localUri || image.uri,
          [
            {
              crop: {
                originX: 0,
                originY: yStart,
                width: image.width,
                height: image.height,
              },
            },
            {
              resize: {
                width: 400,
                height: 400,
              },
            },
          ]
          //   { compress: 1, format: ImageManipulator.SaveFormat.JPG }
        );

        console.log(manipResult);

        navigateAction = NavigationActions.navigate({
          routeName: "Results",
          params: { image: manipResult },
        });
      } catch (e) {
        navigateAction = NavigationActions.navigate({
          routeName: "Results",
          params: { image: image },
        });
      }

      this.props.navigation.dispatch(navigateAction);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { showUpdateDialog } = this.state;

    if (
      showUpdateDialog === true &&
      showUpdateDialog !== prevState.showUpdateDialog
    ) {
      // Alert.alert(
      //   'New App Version',
      //   "Hey! There is a new version of this app ready. Let's get updated",
      //   [
      //     {
      //       text: 'Update',
      //       onPress: () => {
      Updates.reloadFromCache();
      //       }
      //     },
      //   ],
      //   { cancelable: false }
      // );
    }
  }

  _checkUpdates = async () => {
    const currentUrl = Linking.makeUrl();
    if (currentUrl !== "exp://127.0.0.1:19000") {
      if (this._checking_update !== true) {
        console.log("Checking for an update...");
        this._checking_update = true;
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            console.log("An update was found, downloading...");
            await Updates.fetchUpdateAsync();
            this.setState({
              showUpdateDialog: true,
            });
          } else {
            console.log("No updates were found");
          }
        } catch (e) {
          console.log("Error while trying to check for updates", e);
        }
        delete this._checking_update;
      } else {
        console.log("Currently checking for an update");
      }
    }
  };

  prepareRatio = async () => {
    if (Platform.OS === "android" && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      let ratio = ratios.find((ratio) => ratio === DESIRED_RATIO);
      if (!ratio) {
        ratio =
          ratios.find((ratio) => ratio === "4:3") || ratios[ratios.length - 1];
      }
      this.setState({ ratio });
    } else {
      this.setState({ ratio: "1:1" });
    }
  };

  render() {
    const { height, width } = Dimensions.get("window");
    const newWidth = height * (3 / 4);

    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View style={styles.container} />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: "Settings" }),
                  ],
                });
                this.props.navigation.dispatch(resetAction);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cameraHelpContainer}>
            <View style={styles.cameraHelpTextBox}>
              <Text style={styles.cameraHelpText}>
                Place Pacemaker/ICD in the square below
              </Text>
            </View>

            {this.state.capturing === true ? (
              <View style={styles.analyzingContainer}>
                <ActivityIndicator size="large" color="#FFFFF" />
                <Text>Analyzing...</Text>
              </View>
            ) : null}
            <View
              style={{
                height: this.state.ratio === "1:1" ? width : 300,
                overflow: "hidden",
              }}
            >
              <Camera
                ref={(ref) => {
                  this.camera = ref;
                }}
                style={{
                  marginTop: -50,
                  width: this.state.ratio === "1:1" ? width : 300,
                  height: width,
                }}
                quality={1}
                // zoom={0.1}
                autoFocus={Camera.Constants.AutoFocus.on}
                ratio={this.state.ratio}
                useCamera2Api={false}
                onCameraReady={this.prepareRatio}
                type={Camera.Constants.Type.back}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={this.takePicture}
              style={styles.takePictureButton}
            ></TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  settingsContainer: {
    height: Dimensions.get("window").height > 568 ? 100 : 60,
  },
  settingsButton: {
    flex: 1,
    marginTop: Dimensions.get("window").height > 568 ? 44 : 24,
  },
  settingsText: {
    padding: 16,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "System",
  },
  takePictureButton: {
    margin: 10,
    width: 70,
    height: 70,
    marginBottom: 40,
    marginTop: 30,
    backgroundColor: "#4F48DD",
    borderColor: "white",
    borderWidth: 3,
    padding: 18,
    borderRadius: 60,
  },
  takePictureText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "System",
  },
  cameraHelpContainer: {
    flex: 1,
    maxHeight: 400,
    marginTop: 100,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraHelpTextBox: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 8,
    marginBottom: 20,
  },
  cameraHelpText: {
    color: "black",
    fontFamily: "System",
  },
});
