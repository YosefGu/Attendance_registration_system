import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './context/auth';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';

const Stack = createNativeStackNavigator();
export default function App() {
  

  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthContext.Consumer>
          {({ isAuthenticated }) => (
            <Stack.Navigator>
              { isAuthenticated ? (
                <Stack.Screen  
                  name = 'Home'
                  component = {Home} 
                />
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
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
