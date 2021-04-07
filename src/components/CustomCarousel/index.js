
import * as React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View, Dimensions, FlatList, Animated, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import CheckSvg from '../../SVG/check';
import { LinearGradient } from 'expo-linear-gradient';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const OVERFLOW_HEIGHT = 70
const SPACING = 10
const ITEM_WIDTH = width * 0.8
const ITEM_HEIGHT = ITEM_WIDTH * 1.7
const VISIBLE_ITEMS = 3

const CustomCarousel = (props) => {
    const data = props.data;

    const scrollXIndex = React.useRef(new Animated.Value(0)).current;
    const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start();

        // setInterval(() => {
        //     scrollXIndex.setValue(Math.floor(Math.random() * data.length))
        // }, 3000)
    })

    const styles = StyleSheet.create({

    });


    return (
        <React.Fragment>
            <FlingGestureHandler
                key='left'
                direction={Directions.LEFT}
                onHandlerStateChange={ev => {
                    console.log(ev.nativeEvent.state)
                    if (ev.nativeEvent.state === State.END) {
                        if (index === data.length - 1) {
                            return
                        }
                        setIndex(index + 1)
                        scrollXIndex.setValue(index + 1)
                    }
                }}
            >
                <FlingGestureHandler
                    key='right'
                    direction={Directions.RIGHT}
                    onHandlerStateChange={ev => {
                        if (ev.nativeEvent.state === State.END) {
                            if (index === 0) {
                                return
                            }
                            setIndex(index - 1)
                            scrollXIndex.setValue(index - 1)
                        }
                    }}
                >
                    <View style={{ width: width, marginLeft: wp(-6.5) }}>
                        <FlatList
                            data={props.data}
                            keyExtractor={(_, index) => String(index)}
                            horizontal
                            // inverted
                            contentContainerStyle={{
                                flex: 1,
                                justifyContent: 'center',
                                padding: SPACING * 2,
                                width: ITEM_WIDTH,
                                height: hp(30),
                            }}
                            scrollEnabled={false}
                            removeClippedSubviews={false}
                            CellRendererComponent={({ item, index, children, style, ...props }) => {
                                const inputRange = [index - 1, index, index + 1]
                                const translateX = scrollXAnimated.interpolate({
                                    inputRange,
                                    outputRange: [15, 0, -50]
                                })

                                const scale = scrollXAnimated.interpolate({
                                    inputRange,
                                    outputRange: [1, 1, 1]
                                })

                                const opacity = scrollXAnimated.interpolate({
                                    inputRange,
                                    outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
                                })

                                const newStyle = [
                                    style,
                                    {
                                        zIndex: data.length - index,
                                        elevation: (Platform.OS === 'android') ? data.length - index : 0,
                                        position: 'absolute',
                                        // left: -ITEM_WIDTH / 2,
                                        opacity: opacity,
                                        transform: [
                                            { translateX },
                                            { scale },
                                        ],
                                    }
                                ];

                                return (
                                    <Animated.View style={newStyle}>
                                        {children}
                                    </Animated.View>
                                )
                            }}
                            renderItem={({ item, index }) => {
                                // console.log(item)


                                return (
                                    <View
                                        style={{
                                        }}>
                                        <LinearGradient
                                            colors={item.color ? [item.color[0], item.color[1]] : ['red', 'orange']}
                                            style={{
                                                borderRadius: 20,
                                                height: hp(30),
                                                width: wp(81),
                                                paddingTop: RFPercentage(5),
                                                paddingBottom: RFPercentage(5),
                                                paddingLeft: RFPercentage(5),
                                                paddingRight: RFPercentage(5)
                                            }}>
                                            {
                                                item.quote === 'You’re all caught up!' ? (
                                                    <>
                                                        <Text style={{ fontSize: RFPercentage(2.2), fontFamily: 'Regular', color: '#7FC21F', paddingBottom: RFPercentage(2) }}>{'YOUR DAILY AFFIRMATION'}</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <View style={{ paddingRight: RFPercentage(1.5) }}>
                                                                <CheckSvg
                                                                    width={wp(13)}
                                                                    height={wp(13)}
                                                                />
                                                            </View>
                                                            <View style={{width: wp(55)}}>
                                                                <Text style={{ fontSize: RFPercentage(2.75), fontFamily: 'SemiBold', color: '#7FC21F' }}>{item.quote ? item.quote : ''}</Text>
                                                                <Text style={{ fontSize: RFPercentage(1.8), fontFamily: 'Regular', color: '#7FC21F', paddingRight: RFPercentage(5) }}>{item.description ? item.description : ''}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{position: 'absolute', left: 25, bottom: 25}}>
                                                            <AntDesign
                                                                name="caretleft"
                                                                size={wp(3.5)}
                                                                color="#0A0343"
                                                            />
                                                        </View>
                                                    </>
                                                ) : (
                                                        <>
                                                            <Text style={{ fontSize: RFPercentage(2.2), fontFamily: 'Regular', color: 'white', paddingBottom: RFPercentage(2) }}>{'YOUR DAILY AFFIRMATION'}</Text>
                                                            <Text style={{ fontSize: RFPercentage(3.5), fontFamily: 'SemiBold', color: 'white', lineHeight: RFPercentage(5) }}>{item.quote ? item.quote : ''}</Text>
                                                            <View style={{position: 'absolute', right: 25, bottom: 25}}>
                                                                <AntDesign
                                                                    name="caretright"
                                                                    size={wp(3.5)}
                                                                    color="#fff"
                                                                />
                                                            </View>
                                                        </>
                                                    )
                                            }

                                        </LinearGradient>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </FlingGestureHandler>
            </FlingGestureHandler>
        </React.Fragment>
    )
}

export default CustomCarousel

