import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function RegisterScreen({ route, navigation }) {
  const role = route?.params?.role || "User";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // ✅ TEMP FRONTEND SUCCESS FLOW
    navigation.reset({
      index: 0,
      routes: [{ name: role === "User" ? "UserHome" : "TrainerHome" }],
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* BACK */}
        <Text style={styles.back} onPress={() => navigation.goBack()}>
          ← Back
        </Text>

        {/* HEADER */}
        <Text style={styles.title}>{role} Registration</Text>
        <Text style={styles.subtitle}>
          Create your account to{" "}
          {role === "User" ? "find trainers" : "share your skills"}
        </Text>

        {/* FORM CARD */}
        <View style={styles.card}>
          <Input
            icon="person-outline"
            label="Full Name"
            value={name}
            setValue={setName}
            placeholder="John Doe"
          />

          <Input
            icon="mail-outline"
            label="Email"
            value={email}
            setValue={setEmail}
            placeholder="john@example.com"
          />

          <Input
            icon="call-outline"
            label="Phone"
            value={phone}
            setValue={setPhone}
            placeholder="+91 98765 43210"
            keyboard="phone-pad"
          />

          <Input
            icon="lock-closed-outline"
            label="Password"
            value={password}
            setValue={setPassword}
            placeholder="••••••••"
            secure
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* LOGIN */}
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* INPUT COMPONENT */
function Input({
  icon,
  label,
  value,
  setValue,
  placeholder,
  secure = false,
  keyboard = "default",
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>
        <Ionicons name={icon} size={18} color={Colors.muted} />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={Colors.muted}
          secureTextEntry={secure}
          keyboardType={keyboard}
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  back: {
    color: Colors.muted,
    marginBottom: 16,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },
  subtitle: {
    color: Colors.muted,
    marginTop: 6,
    marginBottom: 28,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: Colors.muted,
    fontSize: 13,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.text,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginText: {
    color: Colors.muted,
    textAlign: "center",
    marginTop: 22,
  },
  login: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
