import { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { UserContext } from '../context/userContext'
import { AuthContext } from '../context/auth'
import { FontAwesome } from '@expo/vector-icons';

export const SideBar = ({ navigation, closeSidebar }) => {
    const { state } = useContext(UserContext)
    const { logout } = useContext(AuthContext)
    const user = state.user
  return (
    <View style={style.sideBarContainer}>
        <View style={style.container}>
            <View style={style.user}>
                <FontAwesome6 
                    style={style.cardIcon} 
                    name='user-large' 
                    size={40} 
                /> 
                <View style={style.textContainer}>
                    <Text style={[style.text, style.title]}>{user.fName} {user.lName}</Text>
                    <Text style={style.text}>{user.phone}</Text>
                    <Text style={style.text}>{user.email}</Text>
                </View> 
                <FontAwesome6 
                    name='pen' 
                    size={15} 
                    style={style.icon} 
                    onPress={() => {navigation.navigate('Profile'), closeSidebar()}}
                />  
            </View>
            <TouchableOpacity 
                style={style.card}
                onPress={() => {navigation.navigate('ManagedTeam'), closeSidebar()}}
            > 
                <FontAwesome6 name='people-group' size={15} style={style.cardIcon}/>
                <Text style={style.cardText}>ניהול צוות</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.card}
                onPress={() => {navigation.navigate('ManageStudents'), closeSidebar()}}
            >
                <FontAwesome6 name='users-line' size={15} style={style.cardIcon}/>
                <Text style={style.cardText}>ניהול תלמידים</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.card}
                onPress={() => {navigation.navigate('ArrivalData'), closeSidebar()}}
            >
                <MaterialIcons name="co-present" size={20} style={style.cardIcon} /> 
                <Text style={style.cardText}>נתוני הגעה</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={style.card}
                onPress={() => {navigation.navigate('Documents'), closeSidebar()}}
            >
                <FontAwesome name="file-excel-o" size={20} style={style.cardIcon} /> 
                <Text style={style.cardText}>טפסים</Text>
            </TouchableOpacity>
        </View>
        <View style={style.exitContainer}>
            <TouchableOpacity 
                style={style.exitButton}
                onPress={logout}
            >
                <FontAwesome6 name='door-open' size={15} style={style.exitIcon}/>
                <Text style={style.exitText}>התנתק</Text>
            </TouchableOpacity>
        </View>   
    </View>   
)
}

const style = StyleSheet.create({
    sideBarContainer: {
        position: 'absolute',
        width: '75%',
        height: '100%',
        zIndex: 3,
    },
    container: {
        flex: 1,
        backgroundColor: '#D6F5E6',
        paddingTop: 35,
        paddingHorizontal: 5
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B8EBD3',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#A0EACD',
        borderRadius:20,
        marginHorizontal: 15,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
    },
    icon: {
        margin: 10,
        backgroundColor: '#168C61',
        padding: 8,
        borderRadius: 20,
        color: '#fff',
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    text: {
        color: '#10563B',
        fontSize: 14,
        marginVertical: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B8EBD3',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginHorizontal: 15,
        marginVertical: 6,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    cardIcon: {
        marginRight: 15,
        color: '#10563B',
    },
    cardText: {
        color: '#10563B',
        fontSize: 16,
    },
    exitContainer: {
        paddingBottom: 50,
        backgroundColor: '#D6F5E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B8EBD3',
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
    },
    exitText: {
        color: '#10563B',
        fontSize: 16,
        marginLeft: 8,
    },
    exitIcon: {
        color: '#10563B',
    },
})
