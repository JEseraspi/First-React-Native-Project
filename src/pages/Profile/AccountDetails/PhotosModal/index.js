
import * as React from 'react';
import { Text, StyleSheet, ScrollView, Image, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Modal } from '@ui-kitten/components';

const PhotosModal = (props) => {
    const [selectedPhoto, setSelectedPhoto] = React.useState();

    const styles = StyleSheet.create({
        modalContainer: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        },
        text: {
            color: '#5AA622',
            fontFamily: 'Regular',
            fontSize: RFPercentage(2),
            top: 0,
        },
        imageContainer: {
            flexBasis: '50%'
        },
        wrapper: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        cropContainer: {
            width: '100%',
            height: hp(50)
        }
    });
    return (
        <Modal
            visible={props.visibility}
            style={styles.modalContainer}
        >
            <ScrollView>
                <View style={styles.cropContainer}>
                    {
                        selectedPhoto ?
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                source={{ uri: selectedPhoto }}
                            />
                            : null
                    }

                </View>
                <View style={styles.wrapper}>
                    {props.photos && props.photos.map((p, i) => {
                        return (
                            <TouchableOpacity
                                style={styles.imageContainer}
                                onPress={() => {
                                    setSelectedPhoto(p.node.image.uri)
                                }}
                            >
                                <Image
                                    key={i}
                                    style={{
                                        width: '100%',
                                        height: hp(30),
                                    }}
                                    source={{ uri: p.node.image.uri }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </Modal>
    )
}

export default PhotosModal

