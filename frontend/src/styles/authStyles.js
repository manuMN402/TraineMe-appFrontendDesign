import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    padding: 20,
  },

  back: {
    color: Colors.muted,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    color: Colors.muted,
    marginTop: 6,
    marginBottom: 24,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.text,
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
});
