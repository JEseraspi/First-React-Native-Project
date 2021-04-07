import React from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RFPercentage } from "react-native-responsive-fontsize";
import * as WebBrowser from 'expo-web-browser';
import IntermediateBadge from '../../../SVG/badges/intermediate';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import OneHundredBadge from '../../../SVG/badges/one_hundred';
import MedalBadge from '../../../SVG/badges/medal';
import ProBadge from '../../../SVG/badges/pro';
import NewbieBadge from '../../../SVG/badges/newbie';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f2f2f2'
    },
    wrapper: {
        backgroundColor: '#f2f2f2',
        //   paddingLeft: 15, 
        //   paddingRight: 15,
        //   paddingBottom: 25,
        //   paddingTop: 25,
    },
    header: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'Bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    regularText: {
        fontSize: RFPercentage(1.8),
        fontFamily: 'Regular',
        marginTop: 10,
        marginBottom: 10,
    },
    regularText2: {
        fontSize: RFPercentage(1.8),
        fontFamily: 'Regular',
        paddingRight: 5
    },
    header2: {
        fontFamily: 'Bold',
        fontSize: RFPercentage(2.25),
        marginTop: 10,
    },
    url: {
        fontSize: RFPercentage(1.8),
        fontFamily: 'Regular',
        color: '#78BC22',
        textDecorationLine: 'underline',
        textDecorationColor: '#78BC22'
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    }
});

const LearnMore = (props) => {

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 25 }}>
                <View style={styles.wrapper}>
                    <Text style={styles.header2}>Get more out of your program for free! </Text>
                    <Text style={styles.regularText}> Get program extensions when you complete tasks and maintain your streak.</Text>
                    <Text style={styles.header2}>What is a streak? </Text>
                    <Text style={styles.regularText}>A streak is when you are able to complete all your tasks in a day, multiple days in a row</Text>
                    <Text style={styles.header2}>What are badges?</Text>
                    <Text style={styles.regularText}> You earn badges everytime you complete a task. If you complete all the badges in your level, you advance to the next level!</Text>
                    <Text style={styles.header2}> What are the levels?</Text>
                    <Text style={styles.regularText}>Each level corresponds to an emoji:</Text>
                    <Text style={styles.header2}>Progress Bar</Text>
                    <Text style={styles.regularText}>The progress bar indicates how far you are in your level.</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.regularText2}>Recuperookie</Text>
                        <NewbieBadge
                            width={wp(4.5)}
                            height={hp(3)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.regularText2}>Rally Ally</Text>
                        <IntermediateBadge
                            width={wp(4.5)}
                            height={hp(3)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.regularText2}>Midway Mend</Text>
                        <ProBadge
                            width={wp(4.5)}
                            height={hp(3)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.regularText2}>Recovery Master</Text>
                        <MedalBadge
                            width={wp(4.5)}
                            height={hp(3)}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.regularText2}>Regaining Champ</Text>
                        <OneHundredBadge
                            width={wp(4.5)}
                            height={hp(3)}
                        />
                    </View>
                    <Text style={styles.regularText}>For more information, visit</Text>
                    <TouchableOpacity
                        onPress={() => {
                            WebBrowser.openBrowserAsync('https://www.insynergystl.com/-');
                        }}
                    >
                        <Text style={styles.url}>https://www.insynergystl.com/</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default LearnMore

