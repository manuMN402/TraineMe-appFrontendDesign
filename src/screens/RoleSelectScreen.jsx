import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function RoleSelectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoCircle}>
        <MaterialCommunityIcons
          name="human-handsup"
          size={40}
          color="#fff"
        />
      </View>

      <Text style={styles.title}>TrainMe</Text>
      <Text style={styles.subtitle}>
        Connect with trainers or share your expertise
      </Text>

      {/* USER */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Register", { role: "User" })}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="person" size={24} color={Colors.primary} />
        </View>
        <View>
          <Text style={styles.cardTitle}>Continue as User</Text>
          <Text style={styles.cardSub}>
            Find and book training sessions
          </Text>
        </View>
      </TouchableOpacity>

      {/* TRAINER */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Register", { role: "Trainer" })}
      >
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="teach"
            size={24}
            color={Colors.primary}
          />
        </View>
        <View>
          <Text style={styles.cardTitle}>Continue as Trainer</Text>
          <Text style={styles.cardSub}>
            Share your skills and earn
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },
  subtitle: {
    color: Colors.muted,
    marginBottom: 40,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  cardSub: {
    color: Colors.muted,
    marginTop: 4,
    fontSize: 13,
  },
});
