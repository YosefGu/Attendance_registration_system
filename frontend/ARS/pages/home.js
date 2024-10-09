import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../context/auth';
import { CustomButton } from '../utils/customButton';
import styles from '../utils/globalStyles';

const Home = ({ navigation }) => {

    const { logout } = useContext(AuthContext);

    const handleAttendance = () => {
        navigation.navigate('Attendance')
    }

    const handleSetting = () => {
        navigation.navigate('Setting')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My App!</Text>
            <CustomButton title='Attendance' onPress={handleAttendance}/>
            <CustomButton title='Setting' onPress={handleSetting}/>
            <CustomButton title='Logout' onPress={logout}/>
        </View>
    );
};

export default Home;
