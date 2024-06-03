import AsyncStorage from '@react-native-async-storage/async-storage';

const setCookie = async cookie => {
    try {
        await AsyncStorage.setItem('token', cookie);
    } catch (error) {
        console.error('Error setting cookie:', error);
    }
};

const getCookie = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error('Error getting cookie:', error);
        return null;
    }
};

const deleteCookie = async () => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        console.error('Error deleting cookie:', error);
    }
}

const setAppOpenDate = async (date, thekedarId) => {
    try {
        let prevData = JSON.parse(await AsyncStorage.getItem('appOpenDates'));
        prevData = {...prevData, [thekedarId]: date};
        await AsyncStorage.setItem('appOpenDates', JSON.stringify(prevData));
        console.log('App open date saved:', date, thekedarId);
    } catch (error) {
        console.log('Error setting app open date:', error);
    }
}
const getAppOpenDate = async (thekedarId) => {
    try {
        let response = JSON.parse(await AsyncStorage.getItem('appOpenDates'));
        return response === null ? null : response[thekedarId];
    } catch (error) {
        console.log('Error getting app open date:', error);
        return null;
    }
}
const deleteAppOpenDate = async (thekedarId) => {
    try {
        let response = JSON.parse(await AsyncStorage.getItem('appOpenDates'));
        if(!response) return;
        delete response[thekedarId];
        await AsyncStorage.setItem('appOpenDates', JSON.stringify(response));
    } catch (error) {
        console.log('Error deleting app open date:', error);
    }
}
const clearAppOpenDates = async () => {
    try {
        await AsyncStorage.removeItem('appOpenDates');
    } catch (error) {
        console.log('Error clearing app open dates:', error);
    }
}

export {
    setCookie,
    getCookie,
    deleteCookie,
    setAppOpenDate,
    getAppOpenDate,
    deleteAppOpenDate,
    clearAppOpenDates
}