import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth';
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
            <View style={styles.buttonContainer}>
          <Button 
              title= 'Attendance'
              onPress={handleAttendance}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button 
              title= 'Setting'
              onPress={handleSetting}
          />
        </View>
            <Button title='Logout' onPress={logout} />
        </View>
    );
};

export default Home;
