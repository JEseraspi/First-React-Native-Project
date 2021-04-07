import { ACCESS_CONTROL, ACCESSIBLE, AUTHENTICATION_TYPE } from 'react-native-secure-storage'
import DeviceInfo from 'react-native-device-info';
import {  getDeviceId } from 'react-native-device-info';

let access_token = null;
// exxpired token


export const setAccessToken = token => {
    access_token = token
}

export const getAccessToken = () => {
    return access_token
}

export const config = {
    accessControl: ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
    authenticationPrompt: 'auth with yourself',
    service: 'example',
    authenticateType: AUTHENTICATION_TYPE.BIOMETRICS,
}

export const refreshKey = DeviceInfo.getDeviceId()