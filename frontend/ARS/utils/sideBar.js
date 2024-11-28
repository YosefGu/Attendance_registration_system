import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { UserContext } from '../context/userContext'
import { AuthContext } from '../context/auth'

export const SideBar = ({ navigation, closeSidebar }) => {
    const { state } = useContext(UserContext)
    const { logout } = useContext(AuthContext)
    const user = state.user
  return (
    
        <View style={styles.sideBarContainer}>
            <SafeAreaView style={styles.safeArea}></SafeAreaView>

            <View style={styles.container}>
                
                <View style={styles.user}>
                    <FontAwesome6 
                        name='pen' 
                        size={15} 
                        style={styles.icon} 
                        onPress={() => {navigation.navigate('Profile'), closeSidebar()}}
                    />    
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, styles.title]}>{user.fName} {user.lName}</Text>
                        <Text style={styles.text}>{user.phone}</Text>
                        <Text style={styles.text}>{user.email}</Text>
                    </View>
                    <FontAwesome6 
                        style={styles.cardIcon} 
                        name='user-large' 
                        size={40} 
                    />   
                </View>


                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => {navigation.navigate('ManagedTeam'), closeSidebar()}}
                >
                    <Text style={styles.cardText}>ניהול צוות</Text>
                    <FontAwesome6 name='people-group' size={15} style={styles.cardIcon}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.card}
                    onPress={() => {navigation.navigate('ManageStudents'), closeSidebar()}}
                >
                    <Text style={styles.cardText}>ניהול תלמידים</Text>
                    <FontAwesome6 name='users-line' size={15} style={styles.cardIcon}/>
                </TouchableOpacity>

            </View>

            <View style={styles.exitContainer}>
                <TouchableOpacity 
                    style={styles.exitButton}
                    onPress={logout}
                >
                    <Text style={styles.exitText}>התנתק</Text>
                    <FontAwesome6 name='door-open' size={15} style={styles.exitIcon}/>
                </TouchableOpacity>
            </View>
            
             
        </View>   
    
  )
}

const styles = StyleSheet.create({
    sideBarContainer: {
        position: 'absolute',
        right:0,
        width: '75%', 
        height: '100%',
        backgroundColor: '#abd8eb', 
        zIndex: 3
    },
    safeArea: {
        backgroundColor: '#095b80',
    },
    container: {
        flex:1,
        paddingTop:30,
        backgroundColor:'#1c749c',
    },
    user: {
        height:'15%',
        backgroundColor:'#238cba',
        padding:10,
        flexDirection:'row',
        alignItems:'center',
    },
    icon: {
        margin:10,
        backgroundColor:'#f0f0f0',
        padding:10,
        borderRadius:20,
        color:'#095b80'
    },
    textContainer: {
        flex:1,
        margin:5,
    },
    text: {
        color: '#f0f0f0',
        textAlign:'right',
        margin:3,
        marginRight:15

    },
    title: {
        fontSize:20,
    },
    card: {
        height:60,
        backgroundColor:'#095b80',
        padding:10,
        paddingRight:25,
        marginBottom:5,
        flexDirection:'row',
        alignContent:'center', 
        justifyContent:'flex-end',

        shadowColor:'#000',
        shadowOffset: {width:0, height:3},
        shadowOpacity: 0.2,  // Shadow transparency
        shadowRadius: 3,  // Shadow blur
        elevation: 5,  // For Android (similar to shadow)
    },
    cardText: {
        color: '#f0f0f0',
        fontSize: 16,
        marginRight:30,
        alignSelf:'center'
    },
    cardIcon: {
        color: '#f0f0f0',
        alignSelf:'center'
    },
    exitContainer: {
        paddingBottom: 50,
        backgroundColor: '#1c749c',
        alignItems: 'center',
    },
    exitButton: {
        padding:15,
        width:'50%',
        backgroundColor:'#095b80',
        flexDirection:'row',
        alignContent:'center', 
        justifyContent:'center',
        borderRadius:17
    },
    exitText: {
        color: '#f0f0f0',
        fontSize: 16,
        marginRight: 10,
    },
    exitIcon: {
        color: '#f0f0f0',
    },

})