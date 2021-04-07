import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, scroll } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const JournalTab = (props) => {

    const [selected, setSelected] = React.useState(-1)

    const handleSubmitChoices = (data) => {
        props.onAnswerData(data)
    }


    return (
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.chatBoxContainer}>
                    {
                        props.data.length > 0 && props.data.map(item => (
                            <View style={[styles.messageBoxContainer, { flexDirection: item.position !== 'right' ? 'row' : 'row-reverse' }]}>
                                <View style={[styles.profilePicture, { paddingLeft: item.position !== 'right' ? 0 : wp(2), paddingRight: item.position === 'right' ? 0 : wp(2) }]}>
                                    <Image
                                        style={styles.profileImage}
                                        source={item.profile_image}
                                    />
                                </View>
                                <View style={styles.messageContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={[styles.message, { alignSelf: item.position === 'right' ? 'flex-start' : 'flex-end' }]}>{item.description}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.choicesContainer}>

                    {
                        props.choicesData && props.choicesData.map((_c, index) => (
                            _c.type !== 'icon' ? (
                                <View style={{ margin: 10, width: `${Number(100 / props.choicesData.length) - 2.5}%` }}>
                                    <TouchableHighlight
                                        underlayColor={'#0a0442'}
                                        style={[styles.choicesButton]}
                                        onPress={() => {
                                            if (_c.description === 'Sure, thanks') {
                                                // Actions.resources({type: 'reset'})
                                                props.navigation.navigate('Resources')
                                            } else if (_c.description === 'Maybe later') {
                                                // Actions.home({type: 'reset'})
                                                props.navigation.navigate('Home')
                                            } else {
                                                handleSubmitChoices(_c)
                                            }
                                        }}
                                        onShowUnderlay={() => setSelected(index)}
                                        onHideUnderlay={() => setSelected(-1)}
                                    >
                                        <Text style={[styles.choicesText, { color: selected === index ? '#fff' : '#0a0442' }]}>{_c.description}</Text>
                                    </TouchableHighlight>
                                </View>
                            ) : null
                        ))
                    }
                </View>
            </View>
        </React.Fragment>
    )
}

export default JournalTab


const styles = StyleSheet.create({
    container: {
    },
    chatBoxContainer: {
        paddingBottom: 10,
    },
    messageBoxContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profilePicture: {
    },
    messageContainer: {
        flexShrink: 1
    },
    message: {
        color: '#0a0442',
        fontSize: RFPercentage(2),
    },
    textContainer: {
        backgroundColor: '#e5e5e5',
        borderRadius: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    profileImage: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 100,
        overflow: 'hidden',
    },
    choicesContainer: {
        flexDirection: 'row',
        paddingTop: hp(1),
        paddingBottom: hp(1),
        justifyContent: 'center',
    },
    choices: {
        margin: 10,
    },
    choicesButton: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#e5e5e5',
        borderRadius: 15,
    },
    choicesText: {
        color: '#0a0442',
        fontSize: RFPercentage(1.8),
        textAlign: 'center',
        fontFamily: 'SemiBold'
    }
})