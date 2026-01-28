import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const trainerStyles = StyleSheet.create({
  section: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  heading: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  text: {
    color: Colors.muted,
    fontSize: 14,
  },
});
