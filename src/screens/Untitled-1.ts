import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function YourScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#070B1A" }}>
      {/* Header with Back Button */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Rest of your screen content */}
      <Text style={{ color: "white" }}>Your Content Here</Text>
    </View>
  );
}