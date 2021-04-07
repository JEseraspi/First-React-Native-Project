import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BottomNavigation, Layout, Text } from '@ui-kitten/components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { HomeSvg, JournalSvg, ResourcesSvg, ProfileSvg } from '../../SVG/NavIcon';
import { Actions } from 'react-native-router-flux'

const BottomNavTab = (props) => {
    const [active_route, setChangeRoute] = React.useState(props.active_route)
    const styles = StyleSheet.create({
        nav: {
            position: 'relative',
            alignItems: 'center'
        },
        navContainer: {
            flex: 1,
            justifyContent: 'center', 
            alignItems: 'center',
            textAlign: 'center',
        },
        touchContainer: {
            justifyContent: 'center', 
            alignItems: 'center',
            textAlign: 'center',
            padding: RFPercentage(1),
        },
        navTitle: {
            paddingTop: RFPercentage(0.75),
            fontSize: RFPercentage(1.45),
            fontFamily: 'AvenirRegular',
        }
    })

    // React.useEffect(() => {
    //     switch(active_route) {
    //         case 'home':
    //             Actions.home()
    //         break;
    //         case 'journal':
    //             Actions.journal()
    //         break;
    //         case 'resources':
    //             Actions.resources()
    //         break;
    //         case 'profile':
    //             Actions.profile()
    //         break;
    //         default:
               
    //         break;
    //     }

    // },[active_route])

    return (
        <BottomNavigation style={styles.nav}>
            <Layout style={styles.navContainer}>
                <TouchableOpacity
                    style={styles.touchContainer}
                    onPress={() => { 
                        setChangeRoute('Home') 
                        if (active_route !== 'Home') {
                            // Actions.home({type: 'reset'})
                            // props.navigation.navigate('Home')
                            props.changeRoute('Home')
                        }
                    }}
                >
                <HomeSvg
                    width={wp(6)}
                    height={hp(3)}
                    active={active_route === 'Home' ? true : false}
                />
                <Text style={styles.navTitle} numberOfLines={1}numberOfLines={1}>HOME</Text>
                </TouchableOpacity>
            </Layout>
            <Layout style={styles.navContainer}>
                <TouchableOpacity
                    style={styles.touchContainer}
                    onPress={() => { 
                        setChangeRoute('Journal') 
                        if (active_route !== 'Journal') {
                            // Actions.journal({type: 'reset'})
                            // props.navigation.navigate('Jounal')
                            // console.log('Journal')
                            props.changeRoute('Journal')
                        }
                    }}
                >
                    <JournalSvg
                        width={wp(6)}
                        height={hp(3)}
                        active={active_route === 'Journal' ? true : false}
                    />
                    <Text style={styles.navTitle} numberOfLines={1}>JOURNAL</Text>
                </TouchableOpacity>
            </Layout>    
            <Layout style={styles.navContainer}>
                <TouchableOpacity
                    style={styles.touchContainer}
                    onPress={() => { 
                        setChangeRoute('Resources')
                        if (active_route !== 'Resources') {
                            // Actions.resources({type: 'reset'})
                            // props.navigation.navigate('Resources')
                            props.changeRoute('Resources')
                        }
                    }}
                >
                    <ResourcesSvg
                        width={wp(6)}
                        height={hp(3)}
                        active={active_route === 'Resources' ? true : false}
                    />
                    <Text style={styles.navTitle} numberOfLines={1}>RESOURCES</Text>
                </TouchableOpacity>
            </Layout>    
            <Layout style={styles.navContainer} numberOfLines={1}>
                <TouchableOpacity
                    style={styles.touchContainer}
                    onPress={() => { 
                        setChangeRoute('Profile')
                        if (active_route !== 'Profile')  {
                            // Actions.profile({type: 'reset'}) 
                            // props.navigation.navigate('Profile')
                            props.changeRoute('Profile')
                        }
                    }}
                >
                    <ProfileSvg
                        width={wp(6)}
                        height={hp(3)}
                        active={active_route === 'Profile' ? true : false}
                    />
                    <Text style={styles.navTitle}>PROFILE</Text>
                </TouchableOpacity>
            </Layout>        
        </BottomNavigation>
    ) 
}

export default BottomNavTab