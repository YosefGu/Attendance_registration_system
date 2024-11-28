import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider, AuthContext } from "./context/auth";
import { UserProvider } from "./context/userContext";

import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Attendance } from "./pages/Home/attendance";
import { Profile } from "./pages/Setting/profile";
import { ManageStudents } from "./pages/Setting/manageStudents";
import { ManagedTeam } from "./pages/Setting/managedTeam";
import { AddStudent } from "./pages/Student/addStudent";
import { AddTeam } from "./pages/Setting/addTeam";
import { CustomHeader } from "./utils/customHeader";
import { SideBar } from "./utils/sideBar";
import { SendMessages } from "./pages/Home/sendMessages";
import { Main } from "./pages/main";

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => (
  <UserProvider>
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        header: ({ options }) => (
          <CustomHeader
            title={options.title}
            navigation={navigation}
            navigateTo={options.navigateTo}
          />
        ),
        animation: "slide_from_right",
      })}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{ title: "Attendance" }}
      />
      <Stack.Screen
        name="SendMessages"
        component={SendMessages}
        options={{ title: "Send Messages" }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />

      <Stack.Screen
        name="ManageStudents"
        component={ManageStudents}
        options={{ title: "Manage Students" }}
      />

      <Stack.Screen
        name="ManagedTeam"
        component={ManagedTeam}
        options={{ title: "Managed Team" }}
      />

      <Stack.Screen
        name="AddStudent"
        component={AddStudent}
        options={{ title: "Add Student", navigateTo: "ManageStudents" }}
      />

      <Stack.Screen
        name="AddTeam"
        component={AddTeam}
        options={{ title: "Add Team", navigateTo: "ManagedTeam" }}
      />
      <Stack.Screen
        name="SideBar"
        component={SideBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </UserProvider>
);

const UnauthenticatedNavigator = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      header: ({ options }) => (
        <CustomHeader
          title={options.title}
          navigation={navigation}
          navigateTo={options.navigateTo}
        />
      ),
      animation: "slide_from_right",
    })}
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{ title: "Register", navigateTo: "Login" }}
    />
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
      {isAuthenticated ? (
        <AuthenticatedNavigator />
      ) : (
        <UnauthenticatedNavigator />
      )}
    </NavigationContainer>
  );
}
