import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import DoctorSvg from '../../SVG/doctor'
import Buttons from '../../components/Buttons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LogoSvg from '../../SVG/logo';
import { AntDesign } from '@expo/vector-icons';
import MultipleChoice from './Types/MultipleChoice';
import AsyncStorage from '@react-native-community/async-storage';
import { answerQuestionaire, clearAnswerQuestionaire } from '../../redux/actions/home'
import { sendTask } from '../../redux/actions/task'
import { showLoader, hideLoader } from '../../redux/actions/loader';
import Loader from '../../components/Loader';
import CustomModal from '../../components/CustomModal';

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeWrapper: 'start',
            testQuestions: [],
            title: [],
            wrapperIndex: 0,
            errorMessage: '',
            customModalVisibility: false
        }
    }

    componentDidMount = () => {
        AsyncStorage.getItem('test').then((data) => {
            this.setState({
                testQuestions: JSON.parse(data).questions,
                title: JSON.parse(data).title
            })
        })

    }

    static getDerivedStateFromProps(props, state) {
        if (props.success_message === 'answer questionaire success') {
            props.hideLoader();
            props.clearAnswerQuestionaire()
            return {
                wrapperIndex: 0,
                activeWrapper: 'end'
            }
        } else if (props.error_message) {
            props.hideLoader();
            props.clearAnswerQuestionaire()
            return {
                wrapperIndex: 0,
                activeWrapper: 'end',
                errorMessage: props.error_message,
            }
        }
    }

    handleTakeTheTest = () => {
        this.setState({
            activeWrapper: 'middle'
        })
    }

    handleBackPress = () => {
        this.setState({
            wrapperIndex: this.state.wrapperIndex - 1 !== 0 ? this.state.wrapperIndex - 1 : 1
        })
        if (this.state.wrapperIndex - 1 === 0) {
            this.setState({customModalVisibility: true})
        }
    }

    handleAnswer = (isSubQuestion, answer, setIndex, questionIndex, subIndex) => {
        let data = this.state.testQuestions;
        console.log(isSubQuestion, answer, setIndex, questionIndex, subIndex)

        data.length > 0 && data.map((item, i) => {
            if (item.set) {
                if (setIndex === i) {
                    item.set.map((setData, _questionIndex) => {
                        if (_questionIndex === questionIndex) {
                            if (isSubQuestion) {
                                setData.sub_question.map((questionData, _subIndex) => {
                                    if (subIndex === _subIndex) {
                                        questionData.choices.map(choices => {
                                            if (choices.choice === answer) {
                                                choices['answer'] = true
                                            } else {
                                                choices['answer'] = false
                                            }
                                        })
                                    }
                                })
                            } else {
                                setData.choices && setData.choices.map(choices => {
                                    if (choices.choice === answer) {
                                        choices['answer'] = true
                                    } else {
                                        choices['answer'] = false
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })

        this.setState({
            testQuestions: data
        })
    }

    handleSubmitTest = async () => {
        this.props.showLoader('Submitting your test');
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
        let _data = JSON.parse(await AsyncStorage.getItem('test'))
        _data['questions'] = this.state.testQuestions;
        delete _data['__v']
        delete _data['createdAt']

        console.log(JSON.stringify(_data), 'data')
        this.props.answerQuestionaire(_data, user_data._id)

        // this.props.sendTask({
        //     type: 'answered_test'
        // })
    }

    render() {
        return (
            <React.Fragment>
                <View style={styles.container}>
                    {
                        this.state.activeWrapper === 'start' ? (
                            <View style={styles.startWrapper}>
                                <View style={styles.imageContainer}>
                                    <DoctorSvg
                                        width={wp(55)}
                                        height={hp(30)}
                                    />
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={{
                                        fontFamily: 'Bold',
                                        fontSize: RFPercentage(2.5),
                                        maxWidth: wp(70),
                                        textAlign: 'center',
                                        lineHeight: 35,
                                        color: '#1A1A1A',
                                        marginTop: hp(2)
                                    }}>“Knowing yourself is the beginning of all wisdom.”</Text>
                                    <Text style={{
                                        fontFamily: 'Bold',
                                        fontSize: RFPercentage(2.5),
                                        textAlign: 'center',
                                        lineHeight: 35,
                                        color: '#1A1A1A'
                                    }}>-Aristotle</Text>
                                    <Text style={{
                                        marginTop: hp(2),
                                        marginBottom: hp(2),
                                        fontSize: RFPercentage(2.15)
                                    }}>Get to know yourself better!</Text>
                                    <Text style={{
                                        marginBottom: hp(3
                                        ),
                                        fontSize: RFPercentage(2.15),
                                        maxWidth: wp(70),
                                        textAlign: 'center'
                                    }}>Take our series of tests and understand the reasons behind your behavior.</Text>
                                </View>
                                <View style={styles.buttonsContainer}>
                                    <View style={{ margin: hp(1.5) }}>
                                        <Buttons
                                            title={'TAKE THE TEST'}
                                            onButtonPress={() => {
                                                console.log('wew')
                                                this.handleTakeTheTest();
                                            }}
                                            width={wp(45)}
                                            variant={'primary'}
                                        />
                                    </View>
                                    <View style={{ margin: hp(1.5) }}>
                                        <Buttons
                                            title={'BACK'}
                                            onButtonPress={() => {
                                                // Actions.home({ type: 'reset' })
                                                this.props.navigation.navigate('Home')
                                            }}
                                            width={wp(45)}
                                            variant={'primary'}
                                        />
                                    </View>
                                </View>
                                <View style={styles.logoContainer}>
                                    <LogoSvg
                                        width={wp(45)}
                                        height={hp(5)}
                                    />
                                </View>
                            </View>
                        ) : this.state.activeWrapper === 'middle' ? (
                            <View style={styles.middleWrapper}>
                                <View style={styles.navigation}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.handleBackPress()
                                        }}
                                        style={{ position: 'absolute', left: '5%' }}
                                    >
                                        <AntDesign
                                            name="caretleft"
                                            size={wp(4)}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <Text style={{
                                        color: '#fff',
                                        fontFamily: 'SemiBold',
                                        fontSize: RFPercentage(2.25),
                                        // paddingLeft: wp(5),
                                    }}>{this.state.title ? this.state.title : ''}</Text>
                                </View>
                                <MultipleChoice
                                    wrapperIndex={this.state.wrapperIndex}
                                    testQuestions={this.state.testQuestions}
                                    handleAnswer={this.handleAnswer}
                                    changeIndex={(index) => {
                                        this.setState({
                                            wrapperIndex: index
                                        })
                                        if (index - 1 === this.state.testQuestions.length) {
                                            this.handleSubmitTest();
                                        }
                                    }}
                                />
                            </View>
                        ) : this.state.activeWrapper === 'end' ? (
                            <View style={styles.endWrapper}>
                                <View style={styles.imageContainer}>
                                    <DoctorSvg
                                        width={wp(55)}
                                        height={hp(30)}
                                    />
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <Text style={{
                                        fontFamily: 'Bold',
                                        fontSize: RFPercentage(2.5),
                                        maxWidth: wp(70),
                                        textAlign: 'center',
                                        lineHeight: 35,
                                        color: '#0A0343',
                                        marginTop: hp(2)
                                    }}>{this.props.error_message ? 'Something went wrong.' : 'Thank you for answering!'}</Text>
                                    <Text style={{
                                        marginTop: hp(2),
                                        marginBottom: hp(2),
                                        color: '#0A0343',
                                        fontSize: RFPercentage(2.15),
                                        maxWidth: wp(70),
                                        textAlign: 'center'
                                    }}>{this.props.error_message ? this.props.error_message : 'Your doctor will be in contact with you regarding the results of this screening.'}</Text>
                                </View>
                                <View style={styles.buttonsContainer}>
                                    <View style={{ margin: hp(1.5) }}>
                                        <Buttons
                                            title={'GOT IT!'}
                                            onButtonPress={() => {
                                                // Actions.home({ type: 'reset' });
                                                this.props.navigation.navigate('Home')
                                            }}
                                            width={wp(45)}
                                            variant={'primary'}
                                        />
                                    </View>
                                </View>
                            </View>
                        ) : null
                    }
                    <Loader
                        visibility={this.props.visibility}
                        message={this.props.loader_message}
                    />
                    <CustomModal
                        visibility={this.state.customModalVisibility}
                        closeModal={() => this.setState({customModalVisibility: false})}
                    >
                        <View style={{textAlign: 'center'}}>
                            <Text style={{color: '#fff', fontFamily: 'SemiBold', fontSize: RFPercentage(2.7), textAlign: 'center'}}>LEAVING SO SOON?</Text>
                            <Text style={{color: '#fff', fontFamily: 'Regular', fontSize: RFPercentage(2.25), textAlign: 'center', marginTop: hp(1)}}>You will lose your progress</Text>
                            <Text style={{color: '#fff', fontFamily: 'Regular', fontSize: RFPercentage(2.25), textAlign: 'center', marginBottom: hp(2)}}>if you exit now.</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={{marginRight: wp(4)}} onPress={() => this.setState({customModalVisibility: false})}>
                                    <Text style={{color: '#60A73A', fontSize: RFPercentage(2.25), fontFamily: 'SemiBold', borderBottomWidth: 1, borderBottomColor: '#60A73A'}}>Resume</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{marginLeft: wp(4)}} 
                                    onPress={() => this.props.navigation.navigate('Register')}
                                >
                                    <Text style={{color: '#60A73A', fontSize: RFPercentage(2.25), fontFamily: 'SemiBold', borderBottomWidth: 1, borderBottomColor: '#60A73A'}}>Exit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </CustomModal>
                </View>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    success_message: state.homeReducer.answer_questionaire_success_message,
    error_message: state.homeReducer.answer_questionaire_error_message,
    loader_message: state.loaderReducer.message,
    visibility: state.loaderReducer.visibility,
})

export default connect(mapStateToProps, {
    answerQuestionaire,
    sendTask,
    showLoader,
    hideLoader,
    clearAnswerQuestionaire,
})(Test)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        // justifyContent: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    startWrapper: {
        justifyContent: 'center',
        flex: 1,
    },
    middleWrapper: {
        justifyContent: 'flex-start',
        flex: 1,
    },
    endWrapper: {
        justifyContent: 'center',
        flex: 1,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: hp(5)
    },
    navigation: {
        backgroundColor: '#0A0343',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: hp(10)
    },
});

const sample_test = [
    {
        "questionaire": "MOOD DISORDER QUESTIONNAIRE",
        "set": [
            {
                "question": "Has there ever been a period of time when you were not your usual self and…",
                "type": "multiple",
                "sub_question": [
                    {
                        "question": "… you feel so good or so hyper that other people thought you were not your normal self or you were so hyper that you got into trouble?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you were so irritable that you shouted at people or started fights or arguments?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you felt much more self-confident than usual?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you got much less sleep than usual and found you didn’t really miss it?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you were much more talkative or spoke much faster than usual?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… thoughts raced through your head or you couldn’t slow your mind down?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you were so easily distracted by things around you that you had trouble concentrating or staying on track?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you had much more energy than usual?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you were much more active or did many more things than usual?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… you were much more social or outgoing than usual, for example, you telephone friends in the middle of the night?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    }, {
                        "question": "… you did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    },
                    {
                        "question": "… spending money got you or your family into trouble?",
                        "choices": [
                            {
                                "choice": "Yes"
                            },
                            {
                                "choice": "No"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "questionaire": "MOOD DISORDER QUESTIONNAIRE",
        "set": [
            {
                "question": "If you checked YES to more than one of the above, have several of these ever happened during the same period of time?",
                "type": "multiple",
                "choices": [
                    {
                        "choice": "Yes"
                    },
                    {
                        "choice": "No"
                    }
                ]
            },
            {
                "question": "How much of a problem did any of these cause you – like being unable to work; having family, money, or legal troubles; getting into arguments or fights? Please select one response only.",
                "type": "multiple",
                "choices": [
                    {
                        "choice": "No Problem"
                    },
                    {
                        "choice": "Minor Problem"
                    },
                    {
                        "choice": "Moderate Problem"
                    },
                    {
                        "choice": "Serious Problem"
                    }
                ]
            }
        ]
    },
    {
        "questionaire": "MOOD DISORDER QUESTIONAIRE",
        "set": [
            {
                "question": "Have any of your blood relatives (i.e. children, siblings, parents, grandparents, aunts, uncles) had manic-depressive illness or bipolar disorder",
                "type": "multiple",
                "choices": [
                    {
                        "choice": "Yes"
                    },
                    {
                        "choice": "No"
                    }
                ]
            },
            {
                "question": "Has a health professional ever told you that you have manic-depressive illness or bipolar disorder?",
                "type": "multiple",
                "choices": [
                    {
                        "choice": "Yes"
                    },
                    {
                        "choice": "No"
                    }
                ]
            }
        ]
    }
]

