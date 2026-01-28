import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RoleSelectScreen from "../screens/RoleSelectScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

import UserHome from "../user/UserHome";

import SearchTrainer from "../user/SearchTrainer";
import TrainerDetail from "../user/TrainerDetail";
import BookingHistory from "../user/BookingHistory";

import TrainerHome from "../trainer/TrainerHome";
import TrainerProfile from "../trainer/TrainerProfile";
import Availability from "../trainer/Availability";
import BookingRequests from "../trainer/BookingRequests";

// ...existing code...

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Role" component={RoleSelectScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* USER */}
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="SearchTrainer" component={SearchTrainer} />
        <Stack.Screen name="TrainerDetail" component={TrainerDetail} />
        <Stack.Screen name="BookingHistory" component={BookingHistory} />

        {/* TRAINER */}
        <Stack.Screen name="TrainerHome" component={TrainerHome} />
        <Stack.Screen name="TrainerProfile" component={TrainerProfile} />
        <Stack.Screen name="Availability" component={Availability} />
        <Stack.Screen name="BookingRequests" component={BookingRequests} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
