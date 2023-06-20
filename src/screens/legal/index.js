import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, AppState } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import * as Segment from 'expo-analytics-segment';


export class LegalScreen extends React.Component {
  state = {
    appState: AppState.currentState,
  };

  static navigationOptions = () => {
    return {
      title: 'Legal',
      headerTitleStyle: {
        fontFamily: 'System',
      }
    }
  };

  componentDidMount() {
    Segment.screen("Legal");
    AppState.addEventListener('change', this._handleAppStateChange);
    if (this.props.settings.agreedToTerms === true) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Capture' })],
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
        <ScrollView>
          <Text style={styles.legalParagraph}>
            This Terms of Service and License Agreement constitutes a legal agreement (collectively, the "Agreement") between the Pacemaker-ID and You and your agents ("You") for the use of Pacemaker-ID (the "Product"), whether You use the mobile application version of the Product or the web version of the Product. The Product allows You to access certain content included in the Product ("Content") relating to identification of implanted cardiac devices. The Pacemaker-ID is not a clinical tool and is should not be used for clinical decision making. By using the Product, you release Pacemaker-ID from any liability relating to any decisions made based on the results of the Product.
          </Text>
                                    
          <Text style={styles.legalParagraph}>By using the Product, You accept and agree to be bound by all of the terms and conditions set forth in this Agreement. If You do not wish to accept the terms and conditions of this Agreement, You may not proceed to use the Product.</Text>
          
          <Text style={styles.legalParagraph}>Pacemaker-ID may change the terms of this Agreement from time to time without further notice directly to You. When the terms are changed, Pacemaker-ID may or may not post a general conspicuous notice. If You do not agree with the revised terms, please discontinue use of the Product immediately. Your continued use of the Product following such notice constitutes your acceptance of and agreement to be bound by any revised terms of the Agreement. This Agreement expressly incorporates by reference and includes rules or disclaimers that may be posted and updated within the Product or communicated to You from time to time.</Text>
          
          <Text style={styles.legalParagraph}>Pacemaker-ID may terminate your access and/or the Product at any time. You agree that any termination of your access to the Product shall not result in any liability or other obligation of Pacemaker-ID to You, or any third party in connection with such termination.</Text>
          
          <Text style={styles.legalParagraph}>This Product, including the information, text, graphics, images, audio and video files, trademarks and other materials that may be contained therein (collectively "Content"), is owned by Pacemaker-ID and/or its suppliers and is protected by patents, copyrights, trademarks, and other proprietary rights. Except as specifically provided in this Agreement, your use of the Product shall be governed and constrained by applicable patent, copyright, trademark and other intellectual property laws.</Text>
          
          <Text style={styles.legalParagraph}>Patient data or protected health information (PHI) should not be uploaded to the Product and Pacemaker-ID is not responsible for any PHI that may be uploaded. Pacemaker-ID may use images or other data that are uploaded by You for further research, improving the Product, sales, marketing, or any other service deemed necessary by Pacemaker-ID.</Text>
          
          <Text style={styles.legalParagraph}>Pacemaker-ID grants You a limited, nonexclusive, nontransferable, revocable license to utilize and access the Product for your noncommercial, personal use according to the terms and conditions in this Agreement. You may not modify, publish, transmit, participate in the transfer or sale of, reproduce, create derivative works from, distribute, perform, display, incorporate into another website, or in any other way exploit the Service and/or any of the Content, in whole or in part. Except as expressly granted by this Agreement, You acquire no right, title or interest in the Product or the Content or other data or materials incorporated in the Product. Pacemaker-ID or affiliates or licensors thereof shall retain all right, title and interest in the Product and Content.</Text>
          
          <Text style={styles.legalParagraph}>TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, Pacemaker-ID HEREBY DISCLAIMS, AND IN NO EVENT SHALL Pacemaker-ID OR ANY PARTY INVOLVED IN CREATING OR PRODUCING THE PRODUCT BE LIABLE FOR, ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA LOSS, PHI LOSS, OR OTHER LOSSES, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, EVEN IF Pacemaker-ID HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, RESULTING FROM: (i) THE USE OR INABILITY TO USE THE PRODUCT, (ii) THE COST OF ANY SUBSTITUTE PRODUCTS AND/OR SERVICES RESULTING FROM ANY PRODUCTS, DATA, INFORMATION OR SERVICES OBTAINED OR WHICH YOU WERE UNABLE TO OBTAIN OR TRANSACTIONS EFFECTED OR FAILED TO BE EFFECTED, (iii) THE USE OR INABILITY TO USE ANY THIRD PARTY APPLICATIONS CONTAINED WITHIN THE PRODUCT, OR (iv) ANY MATTER OTHERWISE RELATED TO YOUR USE OF THE PRODUCT.</Text>
          
          <Text style={styles.legalParagraph}>You assume all risks associated with use of the Product including, but not limited to any harm, injury or damages resulting directly or indirectly from the use of the Product, all such risks being known and understood by You. In consideration of your use of the Product, You, for yourself and anyone entitled to act on your behalf, waive and forever release Pacemaker-ID, its officers, trustees, employees, representatives and successors from all claims and liabilities of any kind arising out of your use or misuse of the Product.</Text>
          
          <Text style={styles.legalParagraph}>You hereby agree to indemnify, save and hold Pacemaker-ID, its directors, officers, shareholders, parents, subsidiaries, affiliates, agents and licensors harmless from and against any and all claims, liability, losses, damages and costs, including, without limitation, reasonable attorneys' fees and costs, arising out of your use or misuse of the Product or Content, or any violation of this Agreement. Pacemaker-ID assumes the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify Pacemaker-ID, and you agree to cooperate with the defense of Pacemaker-ID of these claims. Pacemaker-ID will use reasonable efforts to notify you of any such claim, action, or proceeding upon becoming aware of it.</Text>
          
          <Text style={styles.legalParagraph}>Disclaimer of Warranties</Text>
          
          <Text style={styles.legalParagraph}>THE PRODUCT AND CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. Pacemaker-ID AND ITS SUPPLIERS EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND WITH RESPECT TO THE PRODUCT OR CONTENT, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. Pacemaker-ID MAKES NO WARRANTY THAT THE PRODUCT AND/OR ANY CONTENT THEREIN WILL MEET YOUR REQUIREMENTS, OR WILL BE UNINTERRUPTED, TIMELY, SECURE, CURRENT, ACCURATE, COMPLETE OR ERROR-FREE OR THE RESULTS THAT MAY BE OBTAINED BY USE OF THE PRODUCT OR ANY CONTENT THEREIN WILL BE ACCURATE OR RELIABLE. YOU UNDERSTAND AND ACKNOWLEDGE THAT YOUR SOLE AND EXCLUSIVE REMEDY WITH RESPECT TO ANY DEFECT IN OR DISSATISFACTION WITH THE PRODUCT IS TO CEASE ITS USE.</Text>
          
          <Text style={styles.legalParagraph}>The Content on the Product is presented as an educational service intended for licensed healthcare professionals. While the Content in the Product is about specific medical and healthcare issues, the Content is not a substitute for or replacement of personalized medical advice and is not intended to be used as the sole basis for making individualized medical or health-related decisions.</Text>
          
          <Text style={styles.legalParagraph}>The views and opinions expressed are those of the contributing authors and editors and do not necessarily represent the views of the Pacemaker-ID. The material is not intended to present the only, or necessarily best, methods or procedures for the medical situations addressed, but rather is intended to represent an approach, view, statement or opinion.</Text>
          
          <Text style={styles.legalParagraph}>Any reference to a specific therapy or commercial product in this Product does not constitute a guarantee or endorsement by Pacemaker-ID of the quality or value of such therapy or product or any claims made by the manufacturer of such therapy or commercial product.</Text>
          
          <Text style={styles.legalParagraph}>Pacemaker-ID will be excused from performance under this Agreement and will not be liable or considered in default under this Agreement in the event that the Product is unavailable for any period of time, or if Pacemaker-ID is otherwise unable to perform its obligations hereunder, in whole or in part, as a result of a Force Majeure Event. For purposes of this Section, "Force Majeure Event" means an event or series of events caused by or resulting from any of the following: (1) weather conditions or other elements of nature or acts of God; (2) government regulation; (3) quarantines or embargoes; (4) telecommunications, network, computer, server or Internet downtime; (5) unauthorized access to Pacemaker-ID information technology systems by third parties; or (6) any other causes beyond the reasonable control of Pacemaker-ID.</Text>
          
          <Text style={styles.legalParagraph}>This Agreement is personal to You, and You may not assign your rights or obligations to anyone.</Text>
          
          <Text style={styles.legalParagraph}>This application is used for research purposes and should not be used for clinical decision making.</Text>
          
          <Text style={styles.legalParagraph}>No Waiver</Text>
          
          <Text style={styles.legalParagraph}>Neither failure nor delay on the part of any party to exercise any right, remedy, power or privilege hereunder nor course of dealing between the parties shall operate as a waiver thereof, or of the exercise of any other right, remedy, power or privilege. No term of this Agreement shall be deemed waived, and no breach consented to, unless such waiver or consent shall be in writing and signed by the party claimed to have waived or consented. No waiver of any rights or consent to any breaches shall constitute a waiver of any other rights or consent to any other breach.</Text>
          
          <Text style={styles.legalParagraph}>If any provision in this Agreement is held invalid or unenforceable under applicable law, the remaining provisions shall continue in full force and effect.</Text>
          
          <Text style={styles.legalParagraph}>Governing Law</Text>
          
          <Text style={styles.legalParagraph}>This Agreement will be governed by and construed exclusively in accordance with the laws of the District of Columbia, USA, without regard to its conflicts of law principles and, to the extent applicable, the federal laws of the United States. If a dispute arises between Pacemaker-ID and You, You hereby agree to submit such dispute to non-binding mediation, followed by binding arbitration, if necessary. Both the mediation and arbitration will be conducted by JAMS applying the laws of the District of Columbia without regard to its conflicts of laws principles and in the District of Columbia as venue.</Text>
          
          <Text style={styles.legalParagraph}>Certification</Text>
          
          <Text style={styles.legalParagraph}>I hereby certify that I understand and agree to the terms stated in this Agreement and that this Agreement applies to my initial use of the Product and all other subsequent uses of the Product.</Text>
          
          <Text style={styles.legalParagraph}>BY USING THIS PRODUCT, I HEREBY AFFIRM THAT I HAVE READ, FULLY UNDERSTAND, AND AGREE TO THE ABOVE STATEMENTS.</Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.agreedToTerms(this.props.navigation)}
          style={{margin: 10, marginBottom: 40, marginTop: 30, backgroundColor: '#4F48DD', padding: 18, borderRadius: 9,}}
        >
          <Text style={{color: 'white', fontWeight: 'bold', textAlign:'center', fontFamily: 'System',}}>I Agree</Text>
        </TouchableOpacity>
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
    agreedToTerms: (navigation) => {
      dispatch({type: "AGREED_TO_TERMS"})
      const navAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Capture' })],
      });
      navigation.dispatch(navAction);
    }
  };
})(LegalScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingLeft: 18,
    paddingRight: 18,
  },
  legalParagraph: {
    marginTop: 14,
    fontFamily: 'System',
  }
});
