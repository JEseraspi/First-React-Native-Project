import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomSwiper from '../../../components/Swiper';
import LockBadge from '../../../SVG/badges/lock';
import { AntDesign } from '@expo/vector-icons';
import { incentives_list } from '../../../contants/profile';
import MiniModal from '../../../components/MiniModal';


const Incentives = (props) => {

    const [swiperIndex, setSwiperIndex] = React.useState(0)
    const [activeModalBadge, setActiveModalBadge] = React.useState(<></>);
    const [activeModalMessage, setActiveModalMessage] = React.useState('')
    const [activeModalHeaderMessage, setActiveModalHeaderMessage] = React.useState('')
    const [modalVisibility, setModalVisibility] = React.useState(false)

    const styles = StyleSheet.create({
        container: {
            flex: 3
        },
        slides: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        badgeContainer: {
            flexWrap: 'wrap',
            // backgroundColor: "red",
            flexDirection: 'row',
        },
        badges: {
            flexBasis: '25%',
            textAlign: 'center',
            justifyContent: 'flex-end',
            alignContent: 'center',
            alignItems: 'center',
            padding: 15
        },
        head: {
            textAlign: 'center',
            fontFamily: 'Bold',
            color: '#262262',
            fontSize: RFPercentage(3),
            paddingTop: hp(7)
        },
        heading: {
            paddingTop: hp(2),
            flexDirection: 'row',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonText: {
            fontFamily: 'Bold',
            color: '#262262',
            fontSize: RFPercentage(2.5),
            marginLeft: 25,
            marginRight: 25,
        },
        icon: {
            fontSize: RFPercentage(5)
        }
    })

    const handleModalTouched = (message, titleMessage, badge) => {
        setModalVisibility(true)
        setActiveModalMessage(message)
        setActiveModalHeaderMessage(titleMessage)
        setActiveModalBadge(badge)
    }

    console.log(props.completed, 'level')

    return (
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.head}>
                        {
                            props.level === 1 ?
                                'RECUPERCOOKIE'
                            : props.level === 2 ?
                                'RALLY ALLY'
                            : props.level === 3 ?
                                'MIDWAY MEND'
                            : props.level === 4 ?
                                'RECOVERY MASTER'
                            : props.level === 5 ?
                                'REGAINING CHAMP'
                            : null
                        }
                    </Text>
                </View>
                <View style={styles.slides}>
                    <View style={styles.badgeContainer}>
                        {
                            incentives_list.map(data => (
                                data.level <= props.level ? (
                                    props.level === data.level && props.completed ? (
                                        <TouchableOpacity
                                            style={styles.badges}
                                            onPress={() => {
                                                handleModalTouched(data.description, '', <Text style={styles.icon}>{data.icon}</Text>)
                                            }}
                                        >
                                            <Text style={styles.icon}>{data.icon}</Text>
                                        </TouchableOpacity>
                                    ) : props.level !== data.level ? (
                                        <TouchableOpacity
                                            style={styles.badges}
                                            onPress={() => {
                                                handleModalTouched(data.description, '', <Text style={styles.icon}>{data.icon}</Text>)
                                            }}
                                        >
                                            <Text style={styles.icon}>{data.icon}</Text>
                                        </TouchableOpacity>
                                    ) : null
                                ) : (
                                        <TouchableOpacity
                                            style={styles.badges}
                                            onPress={() => {
                                                handleModalTouched(data.description, '', <Text style={styles.icon}>{data.icon}</Text>)
                                            }}
                                        >
                                            <LockBadge
                                                width={wp('100%')}
                                                height={hp(6.5)}
                                            />
                                        </TouchableOpacity>
                                    )

                            ))
                        }

                    </View>
                </View>
                <MiniModal
                    visibility={modalVisibility}
                    closeModal={() => setModalVisibility(false)}
                    message={activeModalMessage}
                    headerMessage={activeModalHeaderMessage}
                >
                    {activeModalBadge}
                </MiniModal>
            </View>
        </React.Fragment>
    )
}

export default Incentives

