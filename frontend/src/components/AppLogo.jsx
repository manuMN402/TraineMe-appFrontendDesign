import { View, Image, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export default function AppLogo() {
  return (
    <View style={styles.circle}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
});
