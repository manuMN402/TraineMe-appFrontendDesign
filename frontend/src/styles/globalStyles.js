import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    color: Colors.muted,
    fontSize: 14,
  },
});
