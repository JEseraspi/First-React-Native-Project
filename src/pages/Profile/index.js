import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableHighlight, TouchableHighlightBase
} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { connect } from 'react-redux';
import LogoSvg from '../../SVG/logo';
import Buttons from '../../components/Buttons';
import AwardSvg from '../../SVG/award';
import GiftSvg from '../../SVG/gift';
import SettingsSvg from '../../SVG/settings';
import HelpSvg from '../../SVG/help';
import MedalBadge from '../../SVG/badges/medal';
import LearnMore from './LearnMore';
import { changeRoute } from '../../redux/actions/route';
import { getLevels, clearLevels, getProfile, clearProfile, updateUsers } from '../../redux/actions/profile';
import BottomNavTab from '../../components/BottomNavigationTab';
import Badges from './Badges';
import Incentives from './Incentives';
import AccountDetails from './AccountDetails';
import AsyncStorage from '@react-native-community/async-storage';
// import { Header } from 'react-native/Libraries/NewAppScreen';
import ActionSheet from 'react-native-actionsheet'
import NewbieBadge from '../../SVG/badges/newbie';
import IntermediateBadge from '../../SVG/badges/intermediate';
import ProBadge from '../../SVG/badges/pro';
import OneHundredBadge from '../../SVG/badges/one_hundred';
import { badges_list, default_pic } from '../../contants/profile';
import ProgressCircle from '../../SVG/circular-progress-bar';
import { sendTask } from '../../redux/actions/task'
import Toast, { DURATION } from 'react-native-easy-toast'
import LogoutWrapper from '../../components/LogoutWrapper';
import { NavigationActions, StackActions } from 'react-navigation'


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeOption: '',
            navigationOpen: false,
            navigationHeader: '',
            accountOption: '',
            pincode: '',
            nickname: '',
            actionSheetData: '',
            profilePicture: '',
            updatedSomething: '',
            badgesList: badges_list,
            percentage: 0,
            activeOptionBG: '',
            currentPoints: 0,
            totalPoints: 1,
        }
    }

    componentDidMount = async () => {
        this.props.getProfile();

        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
        let totalPoints = 0;
        let currentPoints = 0;
        let patientId = user_data.patient_id;
        let _patientId = '';

        for (var x = 0; x < patientId.length; x++) {
            if (x >= Math.round(patientId.length / 2)) {
                _patientId += patientId.charAt(x);
            } else {
                _patientId += '*'
            }
        }

        // this.props.getLevels();

        // console.log(this.props.profile_data)

        try {
            if (this.props.profile_data) {
                let data = this.props.profile_data.level.requirements
                badges_list.map((item, index) => {
                    item.data.map(d => {
                        data.map(x => {
                            if (item.level < this.props.profile_data.level.level) {
                                d['completed'] = true
                            }
                            if (x.description === d.description && x.level === item.level) {
                                d['completed'] = x.completed && true
                            }
                        })
                    })
                })

                data.map(item => {
                    totalPoints += item.points
                    if (item.completed) {
                        currentPoints += item.points
                    }
                })


                this.setState({
                    badgesList: badges_list,
                    currentPoints: currentPoints,
                    totalPoints: totalPoints,
                    percentage: currentPoints / totalPoints * 100,
                })
            }
        } catch (error) {
            console.log(error)
        }


        this.setState({
            pincode: user_data.pin_code,
            nickname: user_data.nickname,
            patient_number: _patientId,
            profilePicture: user_data.profile_pic
        })

    }

    static getDerivedStateFromProps(props, state) {
        if (props.profile_success_message === 'get profile success') {
            console.log('profile success')
            console.log(Profile.handleSuccessGetProfile(props, state))
            return {
                badgesList: Profile.handleSuccessGetProfile(props, state).badgesList,
                currentPoints: Profile.handleSuccessGetProfile(props, state).currentPoints,
                totalPoints: Profile.handleSuccessGetProfile(props, state).totalPoints,
                percentage: Profile.handleSuccessGetProfile(props, state).percentage,
                // profilePicture: Profile.handleSuccessGetProfile(props, state).profilePicture
            };
        }
        if (props.profile_success_message === 'update profile success') {
            props.getProfile();
        }

        return null
    }

    static handleSuccessGetLevels = (props, state) => {
        // console.log(props.levels, 'levels')
    }

    static handleSuccessGetProfile = (props, state) => {
        let totalPoints = 0;
        let currentPoints = 0;
        try {
            let data = props.profile_data.level.requirements
            badges_list.map((item, index) => {
                item.data.map(d => {
                    data.map(x => {
                        if (item.level < props.profile_data.level.level) {
                            d['completed'] = true
                        }
                        if (x.description === d.description && x.level === item.level) {
                            d['completed'] = x.completed && true
                        }
                    })
                })
            })

            data.map(item => {
                totalPoints += item.points
                if (item.completed) {
                    currentPoints += item.points
                }
            })

            return {
                badgesList: badges_list,
                currentPoints: currentPoints,
                totalPoints: totalPoints,
                percentage: currentPoints / totalPoints * 100,
                profilePicture: props.profile_data.profile_pic
            }

        } catch (error) {
            console.log(error)
        }


    }


    handleChangePin = async (pin) => {
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'))
        user_data['pin_code'] = pin;
        AsyncStorage.setItem('user_data', JSON.stringify(user_data))

        this.refs.toast.show('Your pincode was changed', 500);

        this.setState({
            navigationHeader: 'ACCOUNT SETTINGS',
            accountOption: 'settings'
        })
    }

    handleChangeNickName = async (nickname) => {
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'))
        user_data['nickname'] = nickname;

        AsyncStorage.setItem('user_data', JSON.stringify(user_data))
        this.setState({
            nickname: nickname,
            navigationHeader: 'ACCOUNT SETTINGS',
            accountOption: 'settings'
        })

        this.refs.toast.show('Your nickname was changed ', 500);
    }

    handleUpdatePhoto = async (image) => {

        this.props.updateUsers({
            profile_pic: image
        })

        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'))
        user_data['profile_pic'] = image;

        AsyncStorage.setItem('user_data', JSON.stringify(user_data))

        this.setState({
            profilePicture: image,
            navigationHeader: 'ACCOUNT SETTINGS',
            accountOption: 'settings'
        })

        // this.props.sendTask({
        //     type: 'setup_profilepic'
        // })

        this.refs.toast.show('Your profile photo was changed', 500);
    }

    // static getDerivedStateFromProps (props, state) {

    // }

    handleActiveOption = (option) => {
        let header;
        if (option === 'badges') {
            header = 'BADGES'
        } else if (option === 'incentives') {
            header = 'INCENTIVES'
        } else if (option === 'settings') {
            header = 'ACCOUNT SETTINGS'
        } else {
            header = 'Help'
            WebBrowser.openBrowserAsync('https://www.insynergystl.com/');
        }
        if (header !== 'Help') {
            this.setState({
                activeOptionBG: '',
                activeOption: option,
                navigationOpen: true,
                navigationHeader: header,
            })
        }
    }



    render() {
        return (
            <LogoutWrapper page={'profile'} {...this.props}>
                <View style={styles.container}>
                    {
                        this.state.navigationOpen ? (
                            <View style={styles.navigation}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (this.state.navigationHeader === 'EDIT ACCOUNT DETAILS' || this.state.navigationHeader === 'CHANGE PIN CODE') {
                                            this.setState({
                                                navigationHeader: 'ACCOUNT SETTINGS',
                                                accountOption: 'settings'
                                            })
                                        } else {
                                            this.setState({
                                                navigationOpen: false,
                                                activeOption: ''
                                            })
                                        }
                                        this.setState({
                                            actionSheetData: ''
                                        })
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
                                    fontSize: RFPercentage(2.5),
                                    // paddingLeft: wp(5),
                                }}>{this.state.navigationHeader}</Text>
                            </View>

                        ) : null
                    }
                    {
                        this.state.navigationHeader === 'LEARN MORE' && this.state.navigationOpen ? (
                            <LearnMore />
                        ) : (
                                <>
                                    <View style={[styles.logoContainer, { opacity: this.state.navigationOpen ? 0 : 1, marginBottom: this.state.navigationOpen ? hp(1) : hp(8) }]}>
                                        <LogoSvg
                                            width={wp(45)}
                                            height={hp(5)}
                                        />
                                    </View>
                                    <View style={styles.wrapper}>
                                        {
                                            this.state.navigationHeader !== 'CHANGE PIN CODE' &&
                                            <View style={styles.profileContainer}>
                                                <View style={styles.profilePhotoContainer}>
                                                    <ProgressCircle
                                                        strokeWidth={10}
                                                        percentage={this.state.percentage}
                                                    />
                                                    {
                                                        this.state.profilePicture ? (
                                                            <Image
                                                                style={{
                                                                    width: wp(36),
                                                                    height: wp(36),
                                                                    borderWidth: 4,
                                                                    borderColor: '#FFF',
                                                                    backgroundColor: '#CCC',
                                                                    borderRadius: 100,
                                                                    alignSelf: 'center',
                                                                    position: 'absolute'
                                                                }}
                                                                source={{ uri: 'data:image/png;base64,' + this.state.profilePicture }}
                                                            />
                                                        ) : (
                                                                <Image
                                                                    style={{
                                                                        width: wp(36),
                                                                        height: wp(36),
                                                                        borderWidth: 4,
                                                                        borderColor: '#FFF',
                                                                        backgroundColor: '#CCC',
                                                                        borderRadius: 100,
                                                                        alignSelf: 'center',
                                                                        position: 'absolute'
                                                                    }}
                                                                    source={{ uri: 'data:image/png;base64,' + default_pic }}
                                                                />

                                                            )
                                                    }

                                                </View>
                                                <View style={styles.profileDetailsContainer}>
                                                    <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Bold', color: '#0A0343', lineHeight: hp(3.5) }}>{this.state.nickname}</Text>
                                                    <Text style={{ fontSize: RFPercentage(2.5), fontFamily: 'Regular', color: '#0A0343', lineHeight: hp(3.5), marginBottom: hp(1) }}>{this.state.patient_number}</Text>
                                                    <View style={styles.currentBadgeContainer}>
                                                        {
                                                            this.props.profile_data && this.props.profile_data.level && this.props.profile_data.level.level == 1 ? (
                                                                <NewbieBadge
                                                                    width={wp(3.5)}
                                                                    height={hp(3)}
                                                                />
                                                            ) : this.props.profile_data && this.props.profile_data.level && this.props.profile_data.level.level == 2 ? (
                                                                <IntermediateBadge
                                                                    width={wp(3.5)}
                                                                    height={hp(3)}
                                                                />
                                                            ) : this.props.profile_data && this.props.profile_data.level && this.props.profile_data.level.level == 3 ? (
                                                                <ProBadge
                                                                    width={wp(3.5)}
                                                                    height={hp(3)}
                                                                />
                                                            ) : this.props.profile_data && this.props.profile_data.level && this.props.profile_data.level.level == 4 ? (
                                                                <MedalBadge
                                                                    width={wp(3.5)}
                                                                    height={hp(3)}
                                                                />
                                                            ) : this.props.profile_data && this.props.profile_data.level && this.props.profile_data.level.level == 5 ? (
                                                                <OneHundredBadge
                                                                    width={wp(3.5)}
                                                                    height={hp(3)}
                                                                />
                                                            ) : null
                                                        }
                                                        <Text style={{ fontFamily: 'Bold', color: '#78C01D', fontSize: RFPercentage(2.5), lineHeight: hp(3.5), paddingLeft: 7.5 }}>{this.props.profile_data && this.props.profile_data.level ? this.props.profile_data.level.name : ''}</Text>
                                                    </View>
                                                    <Buttons
                                                        title={'LEARN MORE'}
                                                        size={2}
                                                        width={wp(30)}
                                                        onButtonPress={() => {
                                                            this.setState({
                                                                navigationOpen: true,
                                                                navigationHeader: 'LEARN MORE',
                                                            })
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        }
                                        {
                                            this.state.activeOption === 'badges' ? (
                                                <Badges
                                                    data={this.state.badgesList}
                                                />
                                            ) : this.state.activeOption === 'incentives' ? (
                                                <Incentives
                                                    completed={this.state.currentPoints === this.state.totalPoints ? true : false}
                                                    level={this.props.profile_data && this.props.profile_data.level ? this.props.profile_data.level.level : ''}
                                                />
                                            ) : this.state.activeOption === 'settings' ? (
                                                <AccountDetails
                                                    option={this.state.accountOption}
                                                    pincode={this.state.pincode}
                                                    onChangePin={(pin) => this.handleChangePin(pin)}
                                                    onChangeNickName={(name) => this.handleChangeNickName(name)}
                                                    nickname={this.state.nickname}
                                                    actionSheet={this.state.actionSheetData}
                                                    actionSheetOpen={() => {
                                                        this.ActionSheet.show()
                                                    }}
                                                    setPhotos={(image) => {
                                                        console.log(image)
                                                        this.handleUpdatePhoto(image)
                                                    }}
                                                    changeOption={(data) => {
                                                        this.setState({
                                                            navigationOpen: true,
                                                            navigationHeader: data,
                                                            accountOption: ''
                                                        })
                                                    }}
                                                />
                                            ) : (
                                                            <View style={styles.profileOptionsContainer}>
                                                                <TouchableHighlight underlayColor={'#0A0343'} onHideUnderlay={() => this.setState({ activeOptionBG: '' })} onShowUnderlay={() => this.setState({ activeOptionBG: 'badges' })} style={[styles.profileOptions, { backgroundColor: this.state.activeOptionBG === 'badges' ? '#0A0343' : '#fff' }]} onPress={() => this.handleActiveOption('badges')}>
                                                                    <>
                                                                        <AwardSvg
                                                                            width={wp(7)}
                                                                            height={hp(6)}
                                                                            color={this.state.activeOptionBG === 'badges' ? '#fff' : null}
                                                                        />
                                                                        <Text style={[styles.profileOptionText, { color: this.state.activeOptionBG === 'badges' ? "#fff" : '#0A0343' }]}>Badges</Text>
                                                                    </>
                                                                </TouchableHighlight>
                                                                <TouchableHighlight underlayColor={'#0A0343'} onHideUnderlay={() => this.setState({ activeOptionBG: '' })} onShowUnderlay={() => this.setState({ activeOptionBG: 'incentives' })} style={[styles.profileOptions, { backgroundColor: this.state.activeOptionBG === 'incentives' ? '#0A0343' : '#fff' }]} onPress={() => this.handleActiveOption('incentives')}>
                                                                    <>
                                                                        <GiftSvg
                                                                            width={wp(7)}
                                                                            height={hp(6)}
                                                                            color={this.state.activeOptionBG === 'incentives' ? '#fff' : null}
                                                                        />
                                                                        <Text style={[styles.profileOptionText, { color: this.state.activeOptionBG === 'incentives' ? "#fff" : '#0A0343' }]}>Incentives</Text>
                                                                    </>
                                                                </TouchableHighlight>
                                                                <TouchableHighlight underlayColor={'#0A0343'} onHideUnderlay={() => this.setState({ activeOptionBG: '' })} onShowUnderlay={() => this.setState({ activeOptionBG: 'settings' })} style={[styles.profileOptions, { backgroundColor: this.state.activeOptionBG === 'settings' ? '#0A0343' : '#fff' }]} onPress={() => this.handleActiveOption('settings')}>
                                                                    <>
                                                                        <SettingsSvg
                                                                            width={wp(7)}
                                                                            height={hp(5)}
                                                                            color={this.state.activeOptionBG === 'settings' ? '#fff' : null}
                                                                        />
                                                                        <Text style={[styles.profileOptionText, { color: this.state.activeOptionBG === 'settings' ? "#fff" : '#0A0343' }]}>Account Settings</Text>
                                                                    </>
                                                                </TouchableHighlight>
                                                                <TouchableHighlight underlayColor={'#0A0343'} onHideUnderlay={() => this.setState({ activeOptionBG: '' })} onShowUnderlay={() => this.setState({ activeOptionBG: 'help' })} style={[styles.profileOptions, { backgroundColor: this.state.activeOptionBG === 'help' ? '#0A0343' : '#fff' }]} onPress={() => this.handleActiveOption('help')}>
                                                                    <>
                                                                        <HelpSvg
                                                                            width={wp(7)}
                                                                            height={hp(6)}
                                                                            color={this.state.activeOptionBG === 'help' ? '#fff' : null}
                                                                        />
                                                                        <Text style={[styles.profileOptionText, { color: this.state.activeOptionBG === 'help' ? "#fff" : '#0A0343' }]}>Help</Text>
                                                                    </>
                                                                </TouchableHighlight>
                                                            </View>
                                                        )
                                        }

                                    </View>
                                </>
                            )
                    }

                    {/* <Text>test</Text> */}
                </View>
                <BottomNavTab
                    active_route={'Profile'}
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
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['Change Profile Photo', 'Take Photo', 'Remove Current Photo', 'Cancel']}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={2}
                    onPress={(index) => {
                        console.log(index)
                        this.setState({
                            actionSheetData: index
                        })
                    }}
                />
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#0A0343' }}
                    position='center'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{ color: '#fff' }}
                />
            </LogoutWrapper>
        )
    }
}


const mapStateToProps = (state) => ({
    // active_route: state.routeReducer.active_route,
    profile_data: state.profileReducer.profile_data,
    profile_success_message: state.profileReducer.profile_success_message,
    profile_error_message: state.profileReducer.profile_error_message,
    levels: state.profileReducer.levels,
    levels_success_message: state.profileReducer.levels_success_message,
    levels_error_message: state.profileReducer.levels_error_message,
})

export default connect(mapStateToProps, {
    changeRoute,
    getLevels,
    clearLevels,
    getProfile,
    clearProfile,
    sendTask,
    updateUsers
})(Profile)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    navigation: {
        backgroundColor: '#0A0343',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: hp(7),
        width: '100%',
        zIndex: 2,
        // marginBottom: hp(10),
        // flex: 1,
        // position: 'absolute',
        // top: 0
    },
    wrapper: {
        width: '100%',
        flex: 5,
        // alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(4),

        // flex: 1
    },
    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        width: '100%',
        // paddingTop: hp(2),
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    profilePhotoContainer: {
        flexWrap: 'wrap',
        width: '50%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileBorder: {
        borderWidth: 7,
        borderTopColor: '#52831B',
        borderBottomColor: '#52831B',
        borderRightColor: '#52831B',
        borderLeftColor: '#78C01D',
        borderRadius: 100,
    },
    profileOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 3
        // paddingTop: hp(4.5),
        // paddingBottom: hp(3)
    },
    profileOptions: {
        flexBasis: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderColor: '#0A0343',
        height: hp(18),
        borderRadius: wp(7.5),
        margin: 12.5,
        padding: 25
    },
    profileOptionText: {
        fontSize: RFPercentage(2),
        fontFamily: 'SemiBold',
        color: '#0A0343',
        marginTop: 5,
        textAlign: 'center',
        // lineHeight: 
    },
    profileDetailsContainer: {
        padding: 5,

    },
    currentBadgeContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center'
    }
});


