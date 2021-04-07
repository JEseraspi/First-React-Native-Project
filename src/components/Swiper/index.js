import * as React from 'react';
import { StyleSheet, RecyclerViewBackedScrollView } from 'react-native';
import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
   swiperWrapper: {},
   slides: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
});



const CustomSwiper = (props) => {

   const handleSwipeIndexChange = index => {
      props.setSwiperIndex(index)
   }
   
   return (
        <Swiper 
            style={styles.swiperWrapper} 
            showsButtons={props.showButtons ? true : false}
            showsPagination={props.pagination ? true : false}
            dotColor={'#7878b7'}
            activeDotColor={'#252262'}
            autoplay={props.autoplay ? true : false}
            buttonWrapperStyle={props.buttonWrapperStyle ? props.buttonWrapperStyle : undefined}
            nextButton={props.nextButton ? props.nextButton : undefined}
            prevButton={props.prevButton ? props.prevButton : undefined}
            loop={props.loop ? props.loop : true}
            // height={400}
            dotStyle={{
                marginLeft: 5,
                marginRight: 5,
            }}
            activeDotStyle={{
                marginLeft: 5,
                marginRight: 5,
            }}
            onIndexChanged={handleSwipeIndexChange}
            // index={props.swiperIndex}
        >
            {props.children}
        </Swiper>
   )
}

export default CustomSwiper



