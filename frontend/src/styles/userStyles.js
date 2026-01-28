import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const userStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  name: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
  },

  skill: {
    color: Colors.muted,
    marginTop: 4,
  },

  fee: {
    color: Colors.primary,
    marginTop: 6,
    fontWeight: "600",
  },
});
