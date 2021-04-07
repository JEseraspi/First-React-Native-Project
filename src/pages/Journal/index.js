import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { connect } from 'react-redux'
import LogoSvg from '../../SVG/logo';
import OnlineConsultationTab from './OnlineConsultationTab';
import JournalTab from './JournalTab';
import { showLoader, hideLoader } from '../../redux/actions/loader';
import { getJournalQuestions, journalClear } from '../../redux/actions/journal'
import AsyncStorage from '@react-native-community/async-storage';
import { changeRoute } from '../../redux/actions/route';
import BottomNavTab from '../../components/BottomNavigationTab';
import LogoutWrapper from '../../components/LogoutWrapper';
import { NavigationActions, StackActions } from 'react-navigation';

const screenWidth = Math.round(Dimensions.get('window').width);

class Journal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMenu: 'journal',
            updatedSomething: '',
            onlineConsultationData: [
                {
                    profile_image: require('../../../assets/images/journal/jinkee.png'),
                    message: 'Hi, This is Dr. Drake Ramoray. Feel free to reach out if ever you need anything :)',
                    position: 'left',
                }
            ],
            journalData: [],
            journalChoices: [],
            onlineConsultationChoices: [
                {
                    label: 'Sure, thanks!',
                    type: 'button'
                },
                {
                    label: 'Maybe later .',
                    type: 'button'
                }
            ],

        };
    }


    static getDerivedStateFromProps(props, state) {
        if (props.get_success_message === 'get journal question success') {
            // handleSetJournalQuestions()s
            console.log('pasok sa journal-', props.journal_questions)

            return {
                journalData: Journal.handleSetJournalQuestions(props, state),
                journalChoices: Journal.handleSetJournalChoices(props, state)
            }
        }
    }

    componentDidMount = () => {
        this.handleGetJournalQuestions();
        // this.props.showLoader();
        // this.setState({
        //     journalData: Journal.handleSetJournalQuestions(this.props),
        //     journalChoices: Journal.handleSetJournalChoices(this.props)
        // })
    }

    static handleSetJournalChoices = (props, state) => {
        let jData = props.journal_questions;
        console.log(jData, 'jData')
        let data = [];

        if (jData) {
            data = jData ? jData.choices : []
        }


        return data
    }

    static handleSetJournalQuestions = (props, state) => {
        let jData = props.journal_questions;
        // console.log(jData)
        let data = [];

        if (jData) {
            // data = jData.filter((item, index) => (
            //     index <= state.journalData.length
            // ))
            jData['profile_image'] = require('../../../assets/images/journal/jinkee.png')
            data.push(jData)

            // data.map(item => {
            //     item['profile_image'] =  require('../../../assets/images/journal/jinkee.png')
            // })
            props.hideLoader()
            props.journalClear()
        }

        return data
    }

    handleGetJournalQuestions = async () => {
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
        if (!user_data.journal_date) {
            user_data['journal_date'] = new Date()
            AsyncStorage.setItem('user_data', JSON.stringify(user_data))
            this.props.getJournalQuestions(1)
        } else {

            let day = Number(new Date().getDay() - new Date(user_data.journal_date).getDay())
            // console.log(day, 'day');
            // this.props.getJournalQuestions(day !== 0 ? day : 1)
            this.props.getJournalQuestions(1)
        }
        // this.props.showLoader()
    }

    handleJournalClick = () => {
        this.setState({
            activeMenu: 'journal'
        })
    }

    handleOnlineConsultationClick = () => {
        this.setState({
            activeMenu: 'consultation'
        })
    }

    handleAnswerConsultationData = (data) => {
        let consultation_data = this.state.onlineConsultationData;
        consultation_data.push({
            profile_image: require('../../../assets/images/journal/manny.png'),
            message: data.message,
            position: 'right',
        })

        this.setState({
            onlineConsultationData: consultation_data,
            onlineConsultationChoices: []
        })
    }

    handleAnswerJournalData = (data) => {
        let journal_data = this.state.journalData;

        journal_data.push({
            description: data.description,
            profile_image: require('../../../assets/images/journal/manny.png'),
            position: 'right',
        })
        if (data.next) {
            journal_data.push({
                description: data.next.description,
                profile_image: require('../../../assets/images/journal/jinkee.png'),
                position: 'left',
            })
        }

        this.setState({
            journalData: journal_data,
            journalChoices: data.next && data.next.choices ? data.next.choices : []
        })
    }




    render() {
        return (
            <>
                <LogoutWrapper page={'journal'} {...this.props}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <LogoSvg
                                width={wp(45)}
                                height={hp(5)}
                            />
                        </View>
                        <View style={styles.menuContainer}>
                            <View style={styles.menuTextContainer}>
                                <TouchableOpacity
                                    style={{
                                        padding: 5,
                                        borderBottomWidth: this.state.activeMenu === 'journal' ? 2 : 0,
                                        borderBottomColor: '#94bf74',
                                        width: '90%',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => this.handleJournalClick()}
                                >
                                    <Text style={styles.menuText}>Journal</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menuTextContainer}>
                                <TouchableOpacity
                                    style={{
                                        padding: 5,
                                        borderBottomWidth: this.state.activeMenu !== 'journal' ? 2 : 0,
                                        borderBottomColor: '#94bf74',
                                        width: '90%',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => this.handleOnlineConsultationClick()}
                                >
                                    <Text style={styles.menuText}>Online Consultation</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            this.state.activeMenu === 'journal' ? (
                                <ScrollView>
                                    <View style={styles.bodyContainer}>
                                        <View style={styles.bodyWrapper}>
                                            <JournalTab
                                                data={this.state.journalData}
                                                onAnswerData={this.handleAnswerJournalData}
                                                choicesData={this.state.journalChoices}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            ) : (
                                    <OnlineConsultationTab
                                        data={this.state.onlineConsultationData}
                                        onAnswerData={this.handleAnswerConsultationData}
                                        choicesData={this.state.onlineConsultationChoices}
                                    />
                                )
                        }
                    </View>
                </LogoutWrapper>
                <BottomNavTab
                    active_route={'Journal'}
                    changeRoute={(route) => {
                        console.log(route)
                        // this.props.navigation.pop()
                        // this.props.navigation.navigate(`${route}`)
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: `${route}` }]
                        })
                    }}
                // {...this.props}
                />
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    journal_questions: state.journalReducer.journal_questions,
    get_success_message: state.journalReducer.get_success_message,
    get_error_message: state.journalReducer.get_error_message,
    // active_route: state.routeReducer.active_route,
})

export default connect(mapStateToProps, {
    getJournalQuestions,
    journalClear,
    showLoader,
    hideLoader,
    changeRoute
})(Journal)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    menuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    menuTextContainer: {
        width: '50%',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    menuText: {
        fontFamily: 'SemiBold',
        fontSize: RFPercentage(2),
        textTransform: 'uppercase',
        color: '#0a0442',
        textAlign: 'center',
    },
    bodyContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    bodyWrapper: {
        width: '90%',
        // backgroundColor: 'red',
    }
});

