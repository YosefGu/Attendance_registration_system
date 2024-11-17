import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './context/auth';
import { UserProvider } from './context/userContext';

import { Register } from './pages/register';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Attendance } from './pages/Home/attendance';
import { Setting } from './pages/Home/setting';
import { Profile } from './pages/Setting/profile';
import { ManageStudents } from './pages/Setting/manageStudents';
import { ManagedTeam } from './pages/Setting/managedTeam';
import { AddStudent } from './pages/Student/addStudent';
import { AddTeam } from './pages/Setting/addTeam';


const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => (
  <UserProvider>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ManageStudents" component={ManageStudents} />
      <Stack.Screen name="ManagedTeam" component={ManagedTeam} />
      <Stack.Screen name="AddStudent" component={AddStudent} />
      <Stack.Screen name='AddTeam' component={AddTeam}/>
    </Stack.Navigator>
  </UserProvider>
);

const UnauthenticatedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

function AppNavigator() {
  const { isAuthenticated } = useContext(AuthContext); 

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />}
    </NavigationContainer>
  );
}
