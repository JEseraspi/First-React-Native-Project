
import AsyncStorage from '@react-native-community/async-storage';

const FIVE_MIN = 5 * 60 * 1000;

let toLogout = false

let logoutDate = new Date().getTime() + FIVE_MIN;
// export const checkLogoutDate = () => {
//     let current_date = new Date();
//     var FIVE_MIN = 5 * 60 * 1000;
//     return (current_date - new Date(db_date)) > FIVE_MIN
// }

export const saveLogoutDate = () => {
    // console.log(String(new Date()), 'save date')
    logoutDate = new Date().getTime() + FIVE_MIN;
}

export const getLogoutDate = () => {
    return logoutDate
}





// export const renewLogoutTimer = () => {
//     // clearInterval(interval)
// }

// export const setLogoutDate = () => {
//     console.log(interval)
//     clearInterval(interval)
//     let interval = setInterval(() => {
//         toLogout = false;
//         let countdownDate = logoutDate
//         let countdown = new Date().getTime();
//         console.log(new Date().toString(), logoutDate)
//         if (countdownDate <= countdown) {
//             clearInterval(interval);
//             toLogout = true
//         }
//     }, 1000)
// }

export const isToLogout = () => {
    return toLogout
}

export const setToLogout = bool => {
    toLogout = bool
}