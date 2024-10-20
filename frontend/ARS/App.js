import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './context/auth';
import { StudentProvider } from './context/studentsRequests';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import { Attendance } from './pages/Home/attendance';
import { Setting } from './pages/Home/setting';
import { Profile } from './pages/Setting/profile'
import { ManageStudents } from './pages/Setting/manageStudents';
import { ManagedTeam } from './pages/Setting/managedTeam'
import { AddStudent } from './pages/Student/addStudent';


const Stack = createNativeStackNavigator();
export default function App() {
  

  return (
    <AuthProvider>
      <StudentProvider>
      <NavigationContainer>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <Stack.Navigator>
              { isAuthenticated ? (
                <>
                  <Stack.Screen  
                    name = 'Home'
                    component = {Home} 
                  />
                  <Stack.Screen  
                    name = 'Attendance'
                    component = {Attendance} 
                  />
                  <Stack.Screen  
                    name = 'Setting'
                    component = {Setting} 
                  />
                  <Stack.Screen  
                    name = 'Profile'
                    component = {Profile} 
                  />
                  <Stack.Screen
                    name='ManageStudents'
                    component={ManageStudents}
                  />
                  <Stack.Screen
                    name='ManagedTeam'
                    component={ManagedTeam}
                  />
                  <Stack.Screen  
                    name = 'AddStudent'
                    component = {AddStudent} 
                  />
                </>
              ) : (
                <>
                 <Stack.Screen 
                    name="Login" 
                    component={Login} 
                  />
                  <Stack.Screen 
                    name="Register" 
                    component={Register} 
                  />
                </>
              )}
            </Stack.Navigator>
          )}
        </AuthContext.Consumer>
      </NavigationContainer>
      </StudentProvider>
    </AuthProvider>
  );
}
