import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('Token', token)
    } catch (error) {
        console.error('Error storing token', error)
    }
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('Token')
        return token ? token : null
    } catch (error) {
        console.error('Error retrieving token', error)
    }
}

export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('Token')
    } catch (error) {
        confirm.error('Error removing token', error)
    }
}