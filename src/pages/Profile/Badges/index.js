import * as React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomSwiper from '../../../components/Swiper';
import ABCDBadge from '../../../SVG/badges/abcd';
import TelephoneBadge from '../../../SVG/badges/telephone';
import FireBadge from '../../../SVG/badges/fire';
import RadioBadge from '../../../SVG/badges/radio';
import MailBadge from '../../../SVG/badges/mail';
import SnowBadge from '../../../SVG/badges/snow';
import PandaBadge from '../../../SVG/badges/panda';
import TelescopeBadge from '../../../SVG/badges/telescope';
import MaskBadge from '../../../SVG/badges/mask';
import MoonBadge from '../../../SVG/badges/moon';
import CameraBadge from '../../../SVG/badges/camera';
import MonkeyBadge from '../../../SVG/badges/monkey';
import LockBadge from '../../../SVG/badges/lock';
import { AntDesign } from '@expo/vector-icons';
import MiniModal from '../../../components/MiniModal';
import { badges_list } from '../../../contants/profile';


const Badges = (props) => {

    const [swiperIndex, setSwiperIndex] = React.useState(0)
    const [activeModalBadge, setActiveModalBadge] = React.useState(<></>);
    const [activeModalMessage, setActiveModalMessage] = React.useState('')
    const [activeModalHeaderMessage, setActiveModalHeaderMessage] = React.useState('')
    const [modalVisibility, setModalVisibility] = React.useState(false)
    // const [badgesList, setBadgesList] = React.useState([])ss

    const styles = StyleSheet.create({
        container: {
            flex: 3
        },
        slides: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        badgeContainer: {
            flexWrap: 'wrap',
            // backgroundColor: "red",
            flexDirection: 'row',
        },
        badges: {
            flexBasis: '25%',
            // width: '22%',
            textAlign: 'center',
            justifyContent: 'flex-end',
            alignContent: 'center',
            alignItems: 'center',
            padding: 15,
        },
        head: {
            textAlign: 'center',
            fontFamily: 'Bold',
            color: '#262262',
            fontSize: RFPercentage(3)
        },
        heading: {
            paddingTop: hp(7),
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

    console.log(props.data, 'props.data')

    const handleModalTouched = (message, titleMessage, badge) => {
        setModalVisibility(true)
        setActiveModalMessage(message)
        setActiveModalHeaderMessage(titleMessage)
        setActiveModalBadge(badge)
    }

    return (
        <React.Fragment>
            <View style={styles.container}>
                <View style={styles.heading}>
                    {/* <TouchableOpacity
                          onPresss={() => {
                            setSwiperIndex(index === 0 ? index : index - 1)
                        }}
                    >
                        <Text style={styles.buttonText}>‹</Text>
                    </TouchableOpacity> */}
                    <Text style={styles.head}>
                        {
                            swiperIndex === 0 ? (
                                'RECUPERCOOKIE'
                            ) : swiperIndex === 1 ? (
                                'RALLY ALLY'
                            ) : swiperIndex === 2 ? (
                                'MIDWAY MEND'
                            ) : swiperIndex === 3 ? (
                                'RECOVERY MASTER'
                            ) : swiperIndex === 4 ? (
                                'REGAINING CHAMP'
                            ) : null
                        }
                    </Text>
                    {/* <TouchableOpacity
                        onPresss={() => {
                            setSwiperIndex(index === index.length ? index : index + 1)
                        }}
                    >
                        <Text style={styles.buttonText}>›</Text>
                    </TouchableOpacity> */}
                </View>
                <CustomSwiper
                    autoplay={false}
                    showButtons={false}
                    pagination={false}
                    setSwiperIndex={(index) => {
                        setSwiperIndex(index)
                    }}
                    loop={false}
                    swiperIndex={swiperIndex}
                    buttonWrapperStyle={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        flex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // width: '80%',
                    }}
                    nextButton={<Text style={styles.buttonText}><AntDesign name="caretright" size={wp(4)} color="#262262" /></Text>}
                    prevButton={<Text style={styles.buttonText}><AntDesign name="caretleft" size={wp(4)} color="#262262" /></Text>}
                >
                    {
                        props.data.length > 0 && props.data.map(levels => (
                            <View style={styles.slides}>
                                <View style={styles.badgeContainer}>
                                    {
                                        levels.data.map(data => (
                                            data.completed ? (
                                                <TouchableOpacity
                                                    style={styles.badges}
                                                    onPress={() => {
                                                        handleModalTouched(data.description, '', <Text style={styles.icon}>{data.icon}</Text>)
                                                    }}
                                                >
                                                    <Text style={styles.icon}>{data.icon}</Text>
                                                </TouchableOpacity>
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
                        ))
                    }
                    {/* <View style={styles.slides}>
                        <View style={styles.badgeContainer}>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <ABCDBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <ABCDBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <TelephoneBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <TelephoneBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <FireBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <FireBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <SnowBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <SnowBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <RadioBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <RadioBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <MailBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <MailBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <PandaBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <PandaBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem lorem loremloremloremloremlorem', 'lorem ipsum', <TelescopeBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <TelescopeBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <MaskBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <MaskBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <MoonBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <MoonBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <CameraBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <CameraBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.badges}
                                onPress={() => {
                                    handleModalTouched('lorem', 'lorem ipsum', <MonkeyBadge
                                        width={wp('100%')}
                                        height={hp(7.5)}
                                    />)
                                }}
                            >
                                <MonkeyBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                    {/* <View style={styles.slides}>
                        <View style={styles.badgeContainer}>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                            <View style={styles.badges}>
                                <LockBadge
                                    width={wp('100%')}
                                    height={hp(7.5)}
                                />
                            </View>
                        </View>
                    </View> */}
                </CustomSwiper>
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

export default Badges

