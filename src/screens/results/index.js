import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Linking from "expo-linking";
import Modal from "react-native-modal";

import * as Segment from "expo-analytics-segment";

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { image } = this.props.navigation.state.params;

    this.state = {
      image: image,
      filename: (+new Date()).toString() + ".jpg",
      accuracyFeedbackGiven: false,
      relatedImage: null,
      modalVisible: false,
      results: [],
      pacemaker: null,
      // results: [{"name": "Boston Scientific", "confidence": 100}, {"name": "Biotronik", "confidence": 0}, {"name": "Medtronic", "confidence": 0}, {"name": "St. Jude", "confidence": 0}, {"name": "Unknown", "confidence": 0}],
      // pacemaker: {
      //   "name": "Boston Scientific",
      //   "confidence": 100,
      // },
    };
  }

  static navigationOptions = {
    headerTintColor: "#FFD69E",
    headerStyle: {
      backgroundColor: "black",
    },
  };

  componentDidMount() {
    const currentUrl = Linking.makeUrl();
    if (currentUrl !== "exp://127.0.0.1:19000") {
      this.upload("http://app.pacemakerid.com/analyze", this.state.image);
    }
  }

  captureFeedback(isCorrect) {
    this.setState({ accuracyFeedbackGiven: true });

    const data = {
      is_correct: isCorrect,
      filename: this.state.filename,
      results: this.state.results,
    };

    const url = "https://pacemaker-annotation.herokuapp.com/responses";
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    };

    fetch(url, options).then((res) => {
      console.log(res);
    });
  }

  upload(url, image) {
    let data = new FormData();
    data.append("file", {
      uri: image.uri,
      type: "image/jpeg",
      name: this.state.filename,
    });

    let options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      body: data,
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((response) => {
        let maxConfidence = 0;
        response.forEach((result) => {
          if (result.confidence > maxConfidence) {
            maxConfidence = result.confidence;
            this.setState({ pacemaker: result });
          }
        });
        this.setState({ results: response });
      })
      .catch((response) => {
        console.log("Failed: ", response);
        Alert.alert(
          "Pacemaker ID Error",
          "Sorry we couldn't process your image at this time. Try again later",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
  }

  isEven(value) {
    if (value % 2 == 0) return true;
    else return false;
  }

  render() {
    let similarImages = [];
    if (this.state.pacemaker) {
      if (this.state.pacemaker.name === "Boston Scientific") {
        similarImages = [
          require("src/assets/BS-pacemaker1.jpg"),
          require("src/assets/BS-pacemaker2.jpg"),
          require("src/assets/BS-pacemaker3.jpg"),
          require("src/assets/BS-defibrillator1.jpg"),
          require("src/assets/BS-defibrillator2.jpg"),
          require("src/assets/BS-defibrillator3.jpg"),
          require("src/assets/BS-defibrillator4.jpg"),
        ];
      } else if (this.state.pacemaker.name === "Biotronik") {
        similarImages = [
          require("src/assets/BT-pacemaker1.jpg"),
          require("src/assets/BT-pacemaker2.jpg"),
          require("src/assets/BT-pacemaker3.jpg"),
          require("src/assets/BT-defibrillator1.jpg"),
          require("src/assets/BT-defibrillator2.jpg"),
          require("src/assets/BT-defibrillator3.jpg"),
          require("src/assets/BT-defibrillator4.jpg"),
        ];
      } else if (this.state.pacemaker.name === "Medtronic") {
        similarImages = [
          require("src/assets/MDT-pacemaker1.jpg"),
          require("src/assets/MDT-pacemaker2.jpg"),
          require("src/assets/MDT-pacemaker3.jpg"),
          require("src/assets/MDT-defibrillator1.jpg"),
          require("src/assets/MDT-defibrillator2.jpg"),
          require("src/assets/MDT-defibrillator3.jpg"),
          require("src/assets/MDT-defibrillator4.jpg"),
        ];
      } else if (this.state.pacemaker.name === "St. Jude") {
        similarImages = [
          require("src/assets/SJM-pacemaker1.jpg"),
          require("src/assets/SJM-pacemaker2.jpg"),
          require("src/assets/SJM-pacemaker3.jpg"),
          require("src/assets/SJM-defibrillator1-1.jpg"),
          require("src/assets/SJM-defibrillator1-2.jpg"),
          require("src/assets/SJM-defibrillator1-3.jpg"),
          require("src/assets/SJM-defibrillator1-4.jpg"),
          require("src/assets/SJM-defibrillator2-1.jpg"),
          require("src/assets/SJM-defibrillator2-2.jpg"),
          require("src/assets/SJM-defibrillator2-3.jpg"),
          require("src/assets/SJM-defibrillator2-4.jpg"),
        ];
      } else if (this.state.pacemaker.name === "Unknown") {
        similarImages = [];
      }
    }

    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalContent}>
            {this.state.relatedImage ? (
              <Image
                source={this.state.relatedImage}
                // source={{ uri: this.state.relatedImageUri }}
                style={styles.modalContentImage}
              />
            ) : null}
          </View>
        </Modal>
        <Image
          source={{ uri: this.state.image.localUri || this.state.image.uri }}
          style={styles.mainImage}
        />
        <ScrollView
          style={{ marginTop: 300 }}
          contentInset={{ top: 200 }}
          contentOffset={{ y: -200 }}
        >
          <View style={{ backgroundColor: "black" }}>
            {this.state.results.length === 0 ? (
              <View style={styles.analyzingContainer}>
                <ActivityIndicator size="large" color="#FFFFF" />
                <Text style={styles.analyzingText}>Analyzing...</Text>
              </View>
            ) : (
              <View>
                <View style={styles.resultsContainer}>
                  {this.state.results.map((result) => {
                    let highlightStyle = {};
                    if (result.name === this.state.pacemaker.name) {
                      highlightStyle = {
                        color: "#FFD69E",
                        fontWeight: "bold",
                      };
                    }

                    return (
                      <View key={result.name} style={styles.resultsRow}>
                        <Text style={[styles.resultName, highlightStyle]}>
                          {result.name}
                        </Text>
                        <Text style={[styles.resultPercentage, highlightStyle]}>
                          {result.confidence}%
                        </Text>
                      </View>
                    );
                  })}
                </View>
                {this.state.accuracyFeedbackGiven === false ? (
                  <View style={styles.wereWeRightContainer}>
                    <Text style={styles.wereWeRightText}>Were we right?</Text>
                    <TouchableOpacity
                      onPress={() => this.captureFeedback(true)}
                      style={styles.wereWeRightButton}
                    >
                      <Text style={styles.wereWeRightButtonText}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.captureFeedback(false)}
                      style={styles.wereWeRightButton}
                    >
                      <Text style={styles.wereWeRightButtonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.wereWeRightContainer}>
                    <Text style={styles.wereWeRightThanks}>
                      Thanks. Your feedback helps us improve the algorithm.
                    </Text>
                  </View>
                )}
                {this.state.pacemaker &&
                this.state.pacemaker.name != "Unknown" ? (
                  <View style={styles.similarContainer}>
                    <Text style={styles.similarHeading}>
                      {this.state.pacemaker.name} Pacemakers & ICD
                    </Text>
                    <Image
                      source={require("src/assets/ekg-line.png")}
                      style={styles.ekgLine}
                    />
                    <View style={styles.similarImages}>
                      {similarImages.map((image, idx) => {
                        let marginStyle = {
                          marginLeft: "1%",
                        };
                        if (this.isEven(idx)) {
                          marginStyle = {
                            marginRight: "1%",
                          };
                        }
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                modalVisible: true,
                                relatedImage: image,
                              });
                              Segment.track("Selected Related Image");
                            }}
                            key={idx}
                            style={[styles.similarImageButton, marginStyle]}
                          >
                            <Image source={image} style={styles.similarImage} />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                ) : null}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  mainImage: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: 300,
  },
  analyzingText: {
    marginTop: 12,
    color: "white",
    fontFamily: "System",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  analyzingContainer: {
    marginTop: 40,
  },
  resultsContainer: {
    flex: 1,
    marginTop: 24,
    marginLeft: 30,
    marginRight: 30,
  },
  resultsRow: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
  },
  resultName: {
    textAlign: "left",
    color: "white",
    fontFamily: "System",
    fontSize: 16,
    width: "50%",
  },
  resultPercentage: {
    textAlign: "right",
    alignItems: "flex-end",
    color: "white",
    fontFamily: "System",
    fontSize: 16,
    width: "50%",
  },
  wereWeRightContainer: {
    flex: 1,
    paddingTop: 30,
    marginLeft: 30,
    marginRight: 30,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wereWeRightText: {
    color: "white",
    fontFamily: "System",
    fontSize: 14,
  },
  wereWeRightThanks: {
    color: "white",
    fontFamily: "System",
    fontSize: 14,
    height: 40,
    textAlign: "center",
  },
  wereWeRightButton: {
    backgroundColor: "#FFD69E",
    paddingTop: 8,
    paddingBottom: 8,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginLeft: 10,
  },
  wereWeRightButtonText: {
    color: "black",
    fontFamily: "System",
    fontSize: 12,
    fontWeight: "bold",
  },
  similarContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  similarHeading: {
    color: "white",
    fontFamily: "System",
    fontSize: 16,
    marginTop: 44,
    marginLeft: 30,
    marginRight: 30,
  },
  ekgLine: {
    height: 24,
    resizeMode: "cover",
    marginLeft: 30,
    width: Dimensions.get("window").width - 30,
  },
  similarImages: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  similarImageButton: {
    width: "48%",
    height: 120,
    marginBottom: "2%",
  },
  similarImage: {
    width: "100%",
    height: "100%",
  },
  modalContent: {},
  modalContentImage: {
    width: "100%",
    resizeMode: "cover",
    height: 300,
  },
});
