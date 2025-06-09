import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
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
import { ArrivalData } from "./pages/arrivalData";
import { Documents } from "./pages/documents";
import { Buffer } from 'buffer';


global.Buffer = Buffer;


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
        options={{ title: "רישום נוכחות" }}
      />
      <Stack.Screen
        name="SendMessages"
        component={SendMessages}
        options={{ title: "לא נכחו היום" }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "פרופיל" }}
      />

      <Stack.Screen
        name="ManageStudents"
        component={ManageStudents}
        options={{ title: "תלמידים" }}
      />

      <Stack.Screen
        name="ManagedTeam"
        component={ManagedTeam}
        options={{ title: "צוות הגן" }}
      />

      <Stack.Screen
        name="AddStudent"
        component={AddStudent}
        options={{ title: "הוספת תלמיד", navigateTo: "ManageStudents" }}
      />

      <Stack.Screen
        name="AddTeam"
        component={AddTeam}
        options={{ title: "הוספת איש צוות", navigateTo: "ManagedTeam" }}
      />
      <Stack.Screen
        name="ArrivalData"
        component={ArrivalData}
        options={{ title: "נתוני הגעה" }}
      />
      <Stack.Screen
        name="Documents"
        component={Documents}
        options={{ title: "טופס נתוני הגעה" }}
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
  >
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#6bb095" />
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  </>
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
