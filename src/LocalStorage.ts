import AsyncStorage from "@react-native-async-storage/async-storage"

const getLocalStorage = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (err) {
        console.error("Error in getting from async storage", err)
        return null
    }
}

const setLocalStorage = async (key: string, value: string) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (err) {
        console.error("Error in setting from async storage", err)
        return null
    }
}

const removeLocalStorage = async (key: string) => {
    try {
        return await AsyncStorage.removeItem(key)
    } catch (err) {
        console.error("Error in removing from async storage", err)
        return null
    }
}

export { getLocalStorage, setLocalStorage, removeLocalStorage }