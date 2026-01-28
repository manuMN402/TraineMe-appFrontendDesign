import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function InputField({ icon, ...props }) {
  return (
    <View style={styles.box}>
      <Ionicons name={icon} size={18} color={Colors.muted} />
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.muted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  input: {
    marginLeft: 10,
    color: Colors.text,
    flex: 1,
  },
});
