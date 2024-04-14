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
export {
    setCookie,
    getCookie,
    deleteCookie
}