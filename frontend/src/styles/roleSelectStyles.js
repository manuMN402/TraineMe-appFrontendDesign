import { StyleSheet, Platform } from "react-native";
import { Colors } from "../constants/colors";

export const roleSelectStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: Platform.OS === "web" ? 420 : "100%",
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: "center",
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
    marginBottom: 6,
  },

  subtitle: {
    color: Colors.muted,
    textAlign: "center",
    marginBottom: 40,
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

  loginText: {
    color: Colors.muted,
    marginTop: 30,
  },

  login: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
