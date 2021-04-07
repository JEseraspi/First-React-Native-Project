import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, Slider } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import Buttons from '../../../../components/Buttons';
import HeartSvg from '../../../../SVG/heart';
import ClockSvg from '../../../../SVG/clock'
import ProgressBar from '../../../../SVG/progress-bar';

const MultipleChoice = (props) => {
    return (
        <View style={styles.container}>
            {
                props.wrapperIndex === 0 ? (
                    <View style={styles.iconContainer}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: wp(65) }}>
                            <ClockSvg
                                width={wp(20)}
                                height={hp(20)}
                            />
                            <Text style={{ textAlign: 'center', color: '#252262', fontFamily: 'Bold', fontSize: RFPercentage(3.2) }}>Fast & Easy!</Text>
                            <Text style={{ textAlign: 'center', color: '#252262', fontSize: RFPercentage(2.5), lineHeight: 25 }}>It only takes about 12 minutes (or less). All you have to do is click!</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: wp(65) }}>
                            <HeartSvg
                                width={wp(20)}
                                height={hp(20)}
                            />
                            <Text style={{ textAlign: 'center', color: '#252262', fontFamily: 'Bold', fontSize: RFPercentage(3.2) }}>Be Yourself!</Text>
                            <Text style={{ textAlign: 'center', color: '#252262', fontSize: RFPercentage(2.51), lineHeight: 25 }}>And answer honestly!</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 40,
                        }}>
                            <Buttons
                                title={'NEXT'}
                                onButtonPress={() => {
                                    props.changeIndex(props.wrapperIndex + 1);
                                }}
                            />
                        </View>
                    </View>
                ) : null
            }
            <ScrollView >
                {
                    props.testQuestions ? props.testQuestions.map((setData, index) => (
                        <React.Fragment>
                            {
                                props.wrapperIndex === index + 1 &&
                                <View style={styles.setContainer}>
                                    {
                                        setData.set.map((item, i) => (
                                            <React.Fragment>
                                                <View style={styles.questionContainer}>
                                                    <Text style={{ fontFamily: 'Regular', color: '#252262', textAlign: 'center', fontSize: RFPercentage(1.75), paddingTop: hp(3), paddingBottom: hp(3), fontStyle: 'italic' }} >{setData.instruction}</Text>
                                                    <Text style={{ fontFamily: 'SemiBold', color: '#252262', textAlign: 'center', fontSize: RFPercentage(2) }}>{item.question}</Text>
                                                    <View style={styles.choicesContainer}>
                                                        {
                                                            item.type === 'multiple' ? item.choices && item.choices.map((choices) => (
                                                                <>
                                                                    <View style={{ flexBasis: '50%', padding: 5 }}>
                                                                        <Buttons
                                                                            title={choices.choice}
                                                                            size={2}
                                                                            bgcolor={choices.answer ? '#549920' : "#fff"}
                                                                            color={choices.answer ? "#fff" : '#549920'}
                                                                            borderColor={'#549920'}
                                                                            onButtonPress={() => {
                                                                                props.handleAnswer(false, choices.choice, index, i)
                                                                            }}
                                                                        />
                                                                    </View>
                                                                </>
                                                            )) : item.type === 'scale' && item.choices && item.choices.length > 0 ? (
                                                                <>
                                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: wp(65) }}>
                                                                        <View style={{ width: '25%', height: hp(2), backgroundColor: '#ADDB50' }}></View>
                                                                        <View style={{ width: '25%', height: hp(2), backgroundColor: '#8ECA37' }}></View>
                                                                        <View style={{ width: '25%', height: hp(2), backgroundColor: '#68AF2F' }}></View>
                                                                        <View style={{ width: '25%', height: hp(2), backgroundColor: '#549920' }}></View>
                                                                    </View>
                                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: wp(65), paddingTop: 10 }}>
                                                                        <View style={{ width: '25%', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: RFPercentage(2) }}>0</Text>
                                                                        </View>
                                                                        <View style={{ width: '25%', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: RFPercentage(2) }}>1</Text>
                                                                        </View>
                                                                        <View style={{ width: '25%', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: RFPercentage(2) }}>2</Text>
                                                                        </View>
                                                                        <View style={{ width: '25%', alignItems: 'center' }}>
                                                                            <Text style={{ fontSize: RFPercentage(2) }}>3</Text>
                                                                        </View>
                                                                    </View>
                                                                    <Slider
                                                                        step={1}
                                                                        maximumValue={3}
                                                                        minimumValue={0}
                                                                        onValueChange={(e) => props.handleAnswer(false, e, index, i)}
                                                                        style={{ width: wp(33.5), transform: [{ scaleX: 2 }, { scaleY: 2 }], marginTop: hp(-10) }}
                                                                        thumbTintColor={'#ccc'}
                                                                        maximumTrackTintColor={'transparent'}
                                                                        minimumTrackTintColor={'transparent'}
                                                                    />
                                                                </>
                                                            ) : null
                                                        }
                                                    </View>
                                                </View>
                                                {
                                                    item.sub_question && item.sub_question.map((subData, _i) => (
                                                        <React.Fragment>
                                                            <View style={styles.questionContainer}>
                                                                <Text style={{ color: '#252262', textAlign: 'center', fontSize: RFPercentage(2) }}>{subData.question}</Text>
                                                                <View style={styles.choicesContainer}>
                                                                    {
                                                                        item.type === 'multiple' ? subData.choices && subData.choices.map((subChoices) => (
                                                                            <>
                                                                                <View style={{ flexBasis: '50%', padding: 5 }}>
                                                                                    <Buttons
                                                                                        title={subChoices.choice}
                                                                                        size={2}
                                                                                        bgcolor={subChoices.answer ? '#549920' : "#fff"}
                                                                                        color={subChoices.answer ? "#fff" : '#549920'}
                                                                                        borderColor={'#549920'}
                                                                                        onButtonPress={() => {
                                                                                            props.handleAnswer(true, subChoices.choice, index, i, _i)
                                                                                        }}
                                                                                    />
                                                                                </View>
                                                                            </>
                                                                        )) : item.type === 'scale' && subData.choices && subData.choices.length > 0 ? (
                                                                            <>
                                                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: wp(65) }}>
                                                                                    <View style={{ width: '25%', height: hp(2), backgroundColor: '#ADDB50' }}></View>
                                                                                    <View style={{ width: '25%', height: hp(2), backgroundColor: '#8ECA37' }}></View>
                                                                                    <View style={{ width: '25%', height: hp(2), backgroundColor: '#68AF2F' }}></View>
                                                                                    <View style={{ width: '25%', height: hp(2), backgroundColor: '#549920' }}></View>
                                                                                </View>
                                                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: wp(65), paddingTop: 10 }}>
                                                                                    <View style={{ width: '25%', alignItems: 'center' }}>
                                                                                        <Text style={{ fontSize: RFPercentage(2) }}>0</Text>
                                                                                    </View>
                                                                                    <View style={{ width: '25%', alignItems: 'center' }}>
                                                                                        <Text style={{ fontSize: RFPercentage(2) }}>1</Text>
                                                                                    </View>
                                                                                    <View style={{ width: '25%', alignItems: 'center' }}>
                                                                                        <Text style={{ fontSize: RFPercentage(2) }}>2</Text>
                                                                                    </View>
                                                                                    <View style={{ width: '25%', alignItems: 'center' }}>
                                                                                        <Text style={{ fontSize: RFPercentage(2) }}>3</Text>
                                                                                    </View>
                                                                                </View>
                                                                                <Slider
                                                                                    step={1}
                                                                                    maximumValue={3}
                                                                                    minimumValue={0}
                                                                                    onValueChange={(e) => props.handleAnswer(true, e, index, i, _i)}
                                                                                    style={{ width: wp(33.5), transform: [{ scaleX: 2 }, { scaleY: 2 }], marginTop: hp(-10) }}
                                                                                    thumbTintColor={'#ccc'}
                                                                                    maximumTrackTintColor={'transparent'}
                                                                                    minimumTrackTintColor={'transparent'}
                                                                                />
                                                                            </>
                                                                        ) : null
                                                                    }
                                                                </View>
                                                            </View>
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: hp(3),
                                        marginBottom: hp(4),
                                    }}>
                                        <Buttons
                                            title={props.testQuestions.length === props.wrapperIndex ? 'SUBMIT' : 'NEXT'}
                                            onButtonPress={() => {
                                                props.changeIndex(props.wrapperIndex + 1);
                                            }}
                                        />
                                    </View>
                                    <View style={{marginBottom: hp(2), justifyContent: 'center',
                                        alignItems: 'center',}}>
                                        <ProgressBar
                                            percentage={Math.round(props.wrapperIndex / props.testQuestions.length * 100)}
                                        />
                                    </View>
                                </View>
                            }
                        </React.Fragment>
                    )) : null
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    setContainer: {
        textAlign: 'center'
    },
    questionContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        width: '90%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomColor: '#252262',
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    choicesContainer: {
        paddingTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    iconContainer: {
        flex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    }
})

export default MultipleChoice
