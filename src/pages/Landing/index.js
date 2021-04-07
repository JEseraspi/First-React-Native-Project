import AsyncStorage from '@react-native-community/async-storage';
import React from 'react'
import { Actions } from 'react-native-router-flux';

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        console.log('cons')
    }

    componentDidMount = async () => {
        let user_data = await AsyncStorage.getItem('user_data');
        if (user_data) {
            user_data = JSON.parse(user_data)
            if (user_data.pin_code) {
                Actions.login({ type: 'reset' });
            } else {
                Actions.welcome({ type: 'reset' });
            }
        } else {
            Actions.welcome({ type: 'reset' });
        }
    }

    render() {
        return (
            <>
            </>
        )
    }
}

export default Landing
