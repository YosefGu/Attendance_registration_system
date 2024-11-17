import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserID = async (userID) => {
    try {
        await AsyncStorage.setItem('userID', userID)
    } catch (error) {
        console.error('Error storing userID', error)
    }
}

export const getUserID = async () => {
    try {
        const userID = await AsyncStorage.getItem('userID')
        return userID ? userID : null
    } catch (error) {
        console.error('Error retrieving userID', error)
    }
}

export const deleteUserID = async () => {
    try {
        await AsyncStorage.removeItem('userID')
    } catch (error) {
        confirm.error('Error removing userID', error)
    }
}