import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../../../../env';
import { sendTask } from '../../../redux/actions/task'
import { ThemeConsumer } from 'react-native-elements';
import { connect } from 'react-redux';

const BOT_USER = {
    _id: 2,
    name: 'Insynergy',
    avatar: 'https://i.imgur.com/ZARHjLH.jpg'
};

class OnlineConsultationTab extends Component {
    state = {
        messages: [
            {
                _id: 1,
                text: `Hi! How may I help you with today?`,
                createdAt: new Date(),
                user: BOT_USER
            }
        ],
        configSet: false
    };

    componentDidMount() {
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        );
    }

    handleGoogleResponse(result) {
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        this.sendBotResponse(text);
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        Dialogflow_V2.requestQuery(
            message,
            result => this.handleGoogleResponse(result),
            error => console.log(error)
        );
    }

    sendBotResponse(text) {
        let msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date(),
            user: BOT_USER
        };
        console.log(msg, 'msg')

        let endConsultation = false
        
        if (msg.text.includes(`I'm sorry to hear that`)) {
            endConsultation = true
        } else if (msg.text.includes(`Would you want to call a doctor`)) {
            endConsultation = true
        }

        if (endConsultation) {
            this.props.sendTask({
                type: 'consultation'
            })
        }
        
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    sendTask
})(OnlineConsultationTab)