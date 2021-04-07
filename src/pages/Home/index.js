
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import * as WebBrowser from 'expo-web-browser';
import { Layout } from '@ui-kitten/components';
import { Image, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, BackHandler, ToastAndroid, RefreshControl, Pressable, TouchableHighlight, View, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';
import LogoSvg from '../../SVG/logo';
import PlayIconSvg from '../../SVG/play-icon';
import { showLoader, hideLoader } from '../../redux/actions/loader';
import { connect } from 'react-redux'
import {
    getDailyAffirmationQuotes,
    dailyQuotesClear,
    getFeaturedVideos,
    getFeaturedArticles,
    featuredArticlesClear,
    featuredVideosClear,
    clearQuestionaire,
    getQuestionaire,
    questionaireLoaded,
    quotesLoaded,
    videosLoaded,
    articlesLoaded
} from '../../redux/actions/home'
import Loader from '../../components/Loader';
import { LinearGradient } from 'expo-linear-gradient';
import { changeRoute } from '../../redux/actions/route';
import ContentLoader, { Rect } from 'react-content-loader/native'
// import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import BottomNavTab from '../../components/BottomNavigationTab';
import { sendTask } from '../../redux/actions/task'
import { getProfile, clearProfile } from '../../redux/actions/profile'
import { checkToken, clearCheckToken } from '../../redux/actions/checktoken'
import { showModal, hideModal } from '../../redux/actions/modal'
import CheckSvg from '../../SVG/check';
import CustomCarousel from '../../components/CustomCarousel';
import LogoutWrapper from '../../components/LogoutWrapper';
// import SuccessModal from '../../components/SuccessModal';
import { NavigationActions, StackActions } from 'react-navigation'
// import { store } from '../../../App' // or from whatever your app exists


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // paddingTop: 10,
        // paddingBottom: 100,

    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        paddingBottom: 30,
        flex: 1,
    },
    headingContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: RFPercentage(6),
        paddingRight: RFPercentage(6),
    },
    cards: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: RFPercentage(2),
        paddingBottom: RFPercentage(2),
        paddingLeft: 0
    },
    sliders: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 0
    },
    p: {
        fontFamily: 'Regular',
        fontSize: RFPercentage(2.2),
        color: '#1a1a1a'
    },
    h: {
        fontFamily: 'Bold',
        fontSize: RFPercentage(3.4),
        color: '#1a1a1a'
    },
    featuredText: {
        fontSize: RFPercentage(2.2),
        fontFamily: 'Bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingLeft: RFPercentage(8.25),
        paddingBottom: 10,
        color: '#0a0343'
    }
})

const screenWidth = Math.round(Dimensions.get('window').width);

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            cardsActiveIndex: 0,
            videoActiveIndex: 0,
            articleActiveIndex: 0,
            questionaireActiveIndex: 0,
            article_id: '',
            video_id: '',
            updateSomething: '',
            refresh: false,
            daily_quotes: [],
            questionaires: [],
            loading: true,
        }
        this.willFocusListener = this.props.navigation.addListener('willFocus', () => {
            this.componentWillFocus();
        });
        this.didBlurListener = this.props.navigation.addListener('didBlur', () => {
            this.componentDidBlur();
        });
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
        console.log('eto na')
        this.props.hideLoader()
        // BackHandler.addEventListener('hardwareBackPress');
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
        this.setState({
            nickName: user_data.nickname
        })

        this.props.checkToken();

    }


    componentWillFocus() {
        console.log('focus');
    }

    componentDidBlur() {
        console.log('blur');
    }

    static callAllApi = async (props, state) => {
        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
        console.log('callAllApi', moment().diff(moment(user_data.verified_since), 'days'))

        props.getDailyAffirmationQuotes();
        props.getFeaturedArticles();
        props.getFeaturedVideos();
        props.getQuestionaire(moment().diff(moment(user_data.verified_since), 'days'))
        props.getProfile()
        console.log('constructor')
        return null
    }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress');
    // }

    handleApplyColors = (data) => {
        var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

        function populate(a) {
            for (var i = 0; i < 6; i++) {
                var x = Math.round(Math.random() * 14);
                var y = hexValues[x];
                a += y;
            }
            return a;
        }



        data.map(item => {
            var newColor1 = populate('#');
            var newColor2 = populate('#');
            item['color'] = [newColor1, newColor2]
        })

        return data;

    }

    static staticHandleApplyColors = (data, type) => {
        var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

        function populate(a) {
            for (var i = 0; i < 6; i++) {
                var x = Math.round(Math.random() * 14);
                var y = hexValues[x];
                a += y;
            }
            return a;
        }

        data.map(item => {
            var newColor1 = populate('#');
            var newColor2 = populate('#');

            item['color'] = [newColor1, newColor2]
        })

        if (type && type === 'home') {
            let lastSlide = {
                quote: "You’re all caught up!",
                description: "You may want to check our Featured Resources below.",
                color: ['#f5f5f5', "#d1d0c6"]
            }
            data.push(lastSlide);
        }

        return data;
    }


    static getDerivedStateFromProps(props, state) {
        if (props.get_quotes_success_message === 'get daily quotes success') {
            props.hideLoader();
            props.dailyQuotesClear();
            props.quotesLoaded(true)
            if (props.daily_quotes && props.daily_quotes.length > 0) {
                return {
                    daily_quotes: Home.staticHandleApplyColors(props.daily_quotes, 'home')
                }
            }
        }

        if (props.get_articles_success_message === 'get featured articles success') {
            props.hideLoader();
            props.featuredArticlesClear();
            props.articlesLoaded(true)

        }

        if (props.get_videos_success_message === 'get featured videos success') {
            props.hideLoader();
            props.featuredVideosClear();
            props.videosLoaded(true)
        }

        if (props.get_questionaire_success_message === 'get questionaire success') {
            props.hideLoader();
            props.clearQuestionaire();
            props.questionaireLoaded(true)
            if (props.questionaire_data) {
                return {
                    questionaires: Home.staticHandleApplyColors(props.questionaire_data)
                }
            }
        }

        if (props.profile_success_message === 'get profile success') {
            return {
                article_id: Home.handleSuccessGetProfile(props, state, 'article'),
                video_id: Home.handleSuccessGetProfile(props, state, 'video'),
            }
        }

        if (props.token_success_message === 'token success') {
            props.clearCheckToken();
            return {
                updatedSomething: Home.callAllApi(props, state)
            }
        }

        return null
    }

    static handleSuccessGetProfile = (props, state, type) => {
        props.clearProfile()
        // console.log('profile', props.profile_data)

        try {
            let requirements = props.profile_data.level.requirements;

            if (requirements && requirements.length > 0) {
                let a = [];
                let v = [];

                let article = requirements.filter(item => (
                    item.type === 'read_article' && !item.completed
                ))

                article.map(data => {
                    a.push(data.consecutives)
                })

                let video = requirements.filter(item => (
                    item.type === 'watched_video' && !item.completed
                ))

                video.map(data => {
                    v.push(data.consecutives)
                })

                if (video && video.length > 0 && type === 'video') {
                    return video[v.indexOf(Math.max(...v))].requirement_id
                }

                if (article && article.length > 0 && type === 'article') {
                    return article[a.indexOf(Math.max(...a))].requirement_id
                }
            }
        } catch (error) {
            console.log(error)
        }


        // return null
    }

    onRefresh = async () => {
        this.setState({
            refresh: true
        })

        let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));
        this.setState({
            nickName: user_data.nickname
        })
        console.log(this.state.video_id, this.state.article_id, 'videoday')
        // this.props.getDailyAffirmationQuotes();
        // this.props.getFeaturedArticles();
        // this.props.getFeaturedVideos();
        // this.props.getQuestionaire(moment().diff(moment(user_data.verified_since), 'days'))
        // this.props.getProfile()
        this.props.questionaireLoaded(false)
        this.props.videosLoaded(false)
        this.props.quotesLoaded(false)
        this.props.articlesLoaded(false)
        this.props.checkToken();

        setTimeout(() => {
            this.setState({
                refresh: false
            })
        }, 2000)
    }


    render() {
        return (
            <LogoutWrapper page={'home'} {...this.props}>
                {/* <Layout style={styles.wrapper}> */}
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh} />
                    }
                >
                    <Layout style={styles.logoContainer}>
                        <LogoSvg
                            width={wp(45)}
                            height={hp(5)}
                        />
                    </Layout>
                    <Layout style={styles.headingContainer}>
                        <Text style={styles.h}>Hi, {this.state.nickName}!</Text>
                        <Text style={styles.p}>How are you today? Here are some reminders and featured resources!</Text>
                    </Layout>

                    <Layout style={styles.cards}>

                        <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Carousel
                                                layout={'stack'}
                                                layoutCardOffset={`18`}
                                                loop={false}
                                                data={this.state.daily_quotes}
                                                // sliderWidth={screenWidth  > 480 ? wp(65) : screenWidth - wp(5)}
                                                // itemWidth={screenWidth  > 480 ? wp(65) : screenWidth - wp(10)}
                                                sliderWidth={screenWidth - wp(5)}
                                                itemWidth={screenWidth - wp(10)}
                                                renderItem={this.renderCardStack}
                                                onSnapToItem={index => {
                                                    this.setState({ cardsActiveIndex: index })
                                                    if (index + 1 === this.props.daily_quotes.length) {
                                                        this.props.sendTask({
                                                            type: 'viewed_quote_all'
                                                        })
                                                    }
                                                }}
                                                inactiveSlideOpacity={1}
                                                enableMomentum={true}
                                            />      */}
                            {
                                this.props.quotes_loaded && this.props.daily_quotes.length > 0 ?
                                    <CustomCarousel
                                        data={this.state.daily_quotes}
                                        renderItem={this.renderCardStack}
                                    /> :
                                    <ContentLoader
                                        speed={2}
                                        width={'100%'}
                                        height={hp(30)}
                                        viewBox="0 0 400 160"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        style={{
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <Rect x={wp(7)} y={hp(0)} rx="3" ry="0" width="81%" height="100%" />
                                    </ContentLoader>
                            }
                        </Layout>
                    </Layout>
                    <Layout style={styles.cards}>
                        <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                this.props.questionaire_loaded ?
                                    <Carousel
                                        layout={'stack'}
                                        loop={false}
                                        data={this.state.questionaires}
                                        // sliderWidth={screenWidth  > 480 ? wp(65) : screenWidth - wp(5)}
                                        // itemWidth={screenWidth  > 480 ? wp(65) : screenWidth - wp(10)}
                                        sliderWidth={screenWidth - wp(5)}
                                        itemWidth={screenWidth - wp(10)}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View>
                                                    <TouchableHighlight
                                                        activeOpacity={0.6}
                                                        underlayColor="#fff"
                                                        onPress={() => {
                                                            AsyncStorage.setItem('test', JSON.stringify(item)).then(() => {
                                                                this.props.questionaireLoaded(false)
                                                                this.props.videosLoaded(false)
                                                                this.props.quotesLoaded(false)
                                                                this.props.articlesLoaded(false)
                                                                // Actions.test({ type: 'reset' })
                                                                this.props.navigation.navigate('Test')
                                                            })
                                                            console.log(item, 'item');
                                                        }}>
                                                        <>
                                                            <LinearGradient
                                                                colors={item.color ? [item.color[0], item.color[1]] : ['red', 'orange']}
                                                                style={{
                                                                    borderRadius: 20,
                                                                    height: hp(30),
                                                                    paddingTop: RFPercentage(5),
                                                                    paddingBottom: RFPercentage(5),
                                                                    paddingLeft: RFPercentage(5),
                                                                    paddingRight: RFPercentage(5),
                                                                    marginLeft: RFPercentage(2.5),
                                                                    marginRight: RFPercentage(2.5),
                                                                }}>
                                                                <Text style={{ fontSize: RFPercentage(2.2), fontFamily: 'Regular', color: 'white', paddingBottom: RFPercentage(2) }}>TAKE THE TEST!</Text>
                                                                <Text style={{ fontSize: RFPercentage(3.5), fontFamily: 'SemiBold', color: 'white', lineHeight: RFPercentage(5) }}>{item.title ? item.title : ''}</Text>
                                                            </LinearGradient>
                                                        </>
                                                    </TouchableHighlight>
                                                </View>
                                            )
                                        }}
                                        onSnapToItem={index => this.setState({ questionaireActiveIndex: index })}
                                        inactiveSlideOpacity={1}
                                        enableMomentum={true}
                                    /> :
                                    <ContentLoader
                                        speed={2}
                                        width={'100%'}
                                        height={hp(30)}
                                        viewBox="0 0 400 160"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        style={{
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <Rect x={wp(7)} y={hp(0)} rx="3" ry="0" width="81%" height="100%" />
                                    </ContentLoader>
                            }
                        </Layout>
                    </Layout>
                    <Layout style={styles.sliders}>
                        {
                            this.props.videos_loaded && this.props.featured_videos.length > 0 ? <Text style={styles.featuredText}>FEATURED VIDEOS</Text> : null
                        }
                        <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            {
                                this.props.videos_loaded && this.props.featured_videos.length > 0 ?
                                    <Carousel
                                        layout={'default'}
                                        data={this.props.featured_videos}
                                        // sliderWidth={screenWidth  > 480 ? wp(40) : screenWidth - wp(5)}
                                        // itemWidth={screenWidth  > 480 ? wp(36.5) : screenWidth - wp(15)}
                                        sliderWidth={screenWidth - wp(5)}
                                        itemWidth={screenWidth - wp(15)}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View
                                                    style={{
                                                        backgroundColor: 'white',
                                                        borderRadius: 20,
                                                        height: hp(30),
                                                        marginLeft: RFPercentage(1.25),
                                                        marginRight: RFPercentage(1.25),
                                                        borderWidth: 1,
                                                        borderColor: '#78c01d',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <TouchableHighlight
                                                        activeOpacity={0.6}
                                                        underlayColor="#fff"
                                                        onPress={() => {
                                                            WebBrowser.openBrowserAsync(item.url);
                                                            if (this.state.video_id) {
                                                                this.props.sendTask({
                                                                    type: 'watched_video',
                                                                    requirement_id: this.state.video_id,
                                                                    video_id: item._id
                                                                })
                                                            }

                                                            console.log(this.state.video_id, 'video')
                                                        }}
                                                    >
                                                        <>
                                                            {
                                                                item.thumbnail && item.thumbnail.length > 30 ?
                                                                    <Image
                                                                        style={{
                                                                            width: '100%',
                                                                            height: hp(24)
                                                                        }}
                                                                        source={{ uri: 'data:image/jpg;base64,' + item.thumbnail }}
                                                                    /> :
                                                                    <Image
                                                                        style={{
                                                                            width: '100%',
                                                                            height: hp(24)
                                                                        }}
                                                                        source={{ uri: 'data:image/jpg;base64,' + default_thumb }}
                                                                    />
                                                            }
                                                            <PlayIconSvg
                                                                style={{ zIndex: 2, position: 'absolute', alignSelf: 'center', top: '20%' }}
                                                                width={wp(20)}
                                                                height={hp(10)}
                                                            />
                                                            <Layout style={{ flex: 1, paddingTop: RFPercentage(0.25), paddingBottom: RFPercentage(0.25), paddingLeft: RFPercentage(4), paddingRight: RFPercentage(4) }}>
                                                                <Text style={{ fontSize: RFPercentage(1.7), fontFamily: 'SemiBold', color: '#0a0343', lineHeight: RFPercentage(2.75) }} numberOfLines={1}>{item.title}</Text>
                                                                <Text style={{ fontSize: RFPercentage(1.5), fontFamily: 'Regular', color: '#6b65ab', lineHeight: RFPercentage(2.25) }} numberOfLines={1}>{item.url}</Text>
                                                            </Layout>
                                                        </>
                                                    </TouchableHighlight>
                                                </View>
                                            )
                                        }}
                                        onSnapToItem={index => this.setState({ videoActiveIndex: index })}
                                        inactiveSlideScale={1}
                                        inactiveSlideOpacity={1}
                                        enableMomentum={true}
                                    /> :
                                    <ContentLoader
                                        speed={2}
                                        width={'100%'}
                                        height={hp(30)}
                                        viewBox={`0 0 ${wp('100%')} ${hp(30)}`}
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        style={{
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <Rect x={wp(11.25)} y="0" rx="3" ry="3" width="23%" height="8.5%" />
                                        <Rect x={wp(7)} y={hp(4)} rx="3" ry="3" width="81%" height="90%" />
                                        <Rect x={wp(92)} y={hp(4)} rx="3" ry="3" width="10%" height="90%" />
                                    </ContentLoader>
                            }
                        </Layout>
                    </Layout>
                    <Layout style={styles.sliders}>
                        {
                            this.props.articles_loaded && this.props.featured_articles.length > 0 ? <Text style={styles.featuredText}>FEATURED ARTICLES</Text> : null
                        }
                        <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            {
                                this.props.articles_loaded && this.props.featured_articles.length > 0 ?
                                    <Carousel
                                        layout={'default'}
                                        data={this.props.featured_articles}
                                        // sliderWidth={screenWidth  > 480 ? wp(40) : screenWidth - wp(5)}
                                        // itemWidth={screenWidth  > 480 ? wp(36.5) : screenWidth - wp(15)}
                                        sliderWidth={screenWidth - wp(5)}
                                        itemWidth={screenWidth - wp(15)}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View
                                                    style={{
                                                        backgroundColor: 'white',
                                                        borderRadius: 20,
                                                        height: hp(30),
                                                        marginLeft: RFPercentage(1.25),
                                                        marginRight: RFPercentage(1.25),
                                                        borderWidth: 1,
                                                        borderColor: '#78c01d',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <TouchableHighlight
                                                        activeOpacity={0.6}
                                                        underlayColor="#fff"

                                                        onPress={() => {
                                                            WebBrowser.openBrowserAsync(item.url);
                                                            if (this.state.article_id) {
                                                                this.props.sendTask({
                                                                    type: 'read_article',
                                                                    requirement_id: this.state.article_id,
                                                                    article_id: item._id
                                                                })
                                                            }

                                                            console.log(this.state.article_id, 'article')
                                                        }}
                                                    >
                                                        <>
                                                            {
                                                                item.thumbnail && item.thumbnail.length > 30 ?
                                                                    <Image
                                                                        style={{
                                                                            width: '100%',
                                                                            height: hp(24)
                                                                        }}
                                                                        source={{ uri: 'data:image/jpg;base64,' + item.thumbnail }}
                                                                    /> :
                                                                    <Image
                                                                        style={{
                                                                            width: '100%',
                                                                            height: hp(24)
                                                                        }}
                                                                        source={{ uri: 'data:image/jpg;base64,' + default_thumb }}
                                                                    />
                                                            }
                                                            <Layout style={{ flex: 1, paddingTop: RFPercentage(0.25), paddingBottom: RFPercentage(0.25), paddingLeft: RFPercentage(4), paddingRight: RFPercentage(4) }}>
                                                                <Text style={{ fontSize: RFPercentage(1.7), fontFamily: 'SemiBold', color: '#0a0343', lineHeight: RFPercentage(2.75) }} numberOfLines={1}>{item.title}</Text>
                                                                <Text style={{ fontSize: RFPercentage(1.5), fontFamily: 'Regular', color: '#6b65ab', lineHeight: RFPercentage(2.25) }} numberOfLines={1}>{item.url}</Text>
                                                            </Layout>
                                                        </>
                                                    </TouchableHighlight>
                                                </View>
                                            )
                                        }}
                                        onSnapToItem={index => this.setState({ articleActiveIndex: index })}
                                        inactiveSlideScale={1}
                                        inactiveSlideOpacity={1}
                                        enableMomentum={true}
                                    /> :
                                    <ContentLoader
                                        speed={2}
                                        width={'100%'}
                                        height={hp(30)}
                                        viewBox={`0 0 ${wp('100%')} ${hp(30)}`}
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                        style={{
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <Rect x={wp(11.25)} y="0" rx="3" ry="3" width="23%" height="8.5%" />
                                        <Rect x={wp(7)} y={hp(4)} rx="3" ry="3" width="81%" height="90%" />
                                        <Rect x={wp(92)} y={hp(4)} rx="3" ry="3" width="10%" height="90%" />
                                    </ContentLoader>
                            }
                        </Layout>
                    </Layout>
                </ScrollView>
                {/* </Layout> */}
                <Loader
                    visibility={this.props.visibility}
                    message={this.props.loader_message}
                />
                <BottomNavTab
                    active_route={'Home'}
                    changeRoute={(route) => {
                        console.log(route)
                        this.props.questionaireLoaded(false)
                        this.props.videosLoaded(false)
                        this.props.quotesLoaded(false)
                        this.props.articlesLoaded(false)
                        // this.props.navigation.pop()
                        // this.props.navigation.navigate(`${route}`)
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: `${route}` }]
                        })

                    }}
                // {...this.props}
                />
            </LogoutWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    daily_quotes: state.homeReducer.daily_quotes,
    get_quotes_success_message: state.homeReducer.get_quotes_success_message,
    get_quotes_error_message: state.homeReducer.get_quotes_error_message,
    featured_videos: state.homeReducer.featured_videos,
    get_videos_success_message: state.homeReducer.get_videos_success_message,
    get_videos_error_message: state.homeReducer.get_videos_error_message,
    featured_articles: state.homeReducer.featured_articles,
    get_articles_success_message: state.homeReducer.get_articles_success_message,
    get_articles_error_message: state.homeReducer.get_articles_error_message,
    get_questionaire_success_message: state.homeReducer.get_questionaire_success_message,
    get_questionaire_error_message: state.homeReducer.get_questionaire_error_message,
    questionaire_data: state.homeReducer.questionaire_data,
    questionaire_loaded: state.homeReducer.questionaire_loaded,
    quotes_loaded: state.homeReducer.quotes_loaded,
    videos_loaded: state.homeReducer.videos_loaded,
    articles_loaded: state.homeReducer.articles_loaded,
    loader_message: state.loaderReducer.message,
    visibility: state.loaderReducer.visibility,
    profile_data: state.profileReducer.profile_data,
    profile_success_message: state.profileReducer.profile_success_message,
    profile_error_message: state.profileReducer.profile_error_message,
    token_success_message: state.checkTokenReducer.token_success_message,
    token_error_message: state.checkTokenReducer.token_error_message,
    modal_visibility: state.modalReducer.visibility,
    modal_message: state.modalReducer.message,
    // active_route: state.routeReducer.active_route,
})

export default connect(mapStateToProps, {
    getDailyAffirmationQuotes,
    getFeaturedVideos,
    getFeaturedArticles,
    featuredVideosClear,
    featuredArticlesClear,
    getQuestionaire,
    clearQuestionaire,
    dailyQuotesClear,
    questionaireLoaded,
    quotesLoaded,
    videosLoaded,
    articlesLoaded,
    showLoader,
    hideLoader,
    changeRoute,
    sendTask,
    getProfile,
    clearProfile,
    checkToken,
    clearCheckToken,
    showModal,
    hideModal
})(Home)

const default_thumb = "/9j/4AAQSkZJRgABAQAAAQABAAD/4QlQaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAlgDIAMBIgACEQEDEQH/xAAdAAEBAAMBAQEBAQAAAAAAAAAACQYHCAQFAgoD/8QAPxABAAAFAQMKAggEBgMBAAAAAAECAwQGBQcRVggSGSE3dZGSs9MxQQkTFyJRYZXSFBUWQiQyUmJxgTaCoXL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="