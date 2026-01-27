import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";

// Responsive size calculator
const getResponsiveSizes = (width, height) => {
  const isSmallDevice = width < 375;
  const isMediumDevice = width >= 375 && width < 768;
  const isLargeDevice = width >= 768;
  const isLandscape = height < width;

  return {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isLandscape,
    padding: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
    titleSize: isSmallDevice ? 24 : isMediumDevice ? 28 : 32,
    subtitleSize: isSmallDevice ? 14 : isMediumDevice ? 15 : 16,
    iconSize: isSmallDevice ? 18 : isMediumDevice ? 20 : 22,
    buttonHeight: isSmallDevice ? 48 : isMediumDevice ? 52 : 56,
    inputPadding: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
    cardPadding: isSmallDevice ? 16 : isMediumDevice ? 20 : 24,
    cardMargin: isSmallDevice ? 16 : isMediumDevice ? 20 : 32,
    cardMaxWidth: isLargeDevice ? 480 : "100%",
  };
};

export default function RegisterScreen({ route, navigation }) {
  const { role } = route.params;
  const dimensions = useWindowDimensions();
  const [sizes, setSizes] = useState(getResponsiveSizes(dimensions.width, dimensions.height));

  useEffect(() => {
    console.log("📱 Register Screen Initialized", {
      role,
      screenWidth: dimensions.width,
      screenHeight: dimensions.height,
      orientation: sizes.isLandscape ? "landscape" : "portrait",
      deviceType: sizes.isSmallDevice ? "small" : sizes.isMediumDevice ? "medium" : "large",
      ...sizes,
    });
  }, []);

  useEffect(() => {
    const newSizes = getResponsiveSizes(dimensions.width, dimensions.height);
    setSizes(newSizes);
    console.log("📐 Screen Dimensions Changed:", {
      width: dimensions.width,
      height: dimensions.height,
      deviceType: newSizes.isSmallDevice ? "small" : newSizes.isMediumDevice ? "medium" : "large",
    });
  }, [dimensions.width, dimensions.height]);

  const handleBackPress = () => {
    console.log("↩️ Going back from", role, "registration");
    navigation.goBack();
  };

  const handleRegister = () => {
    console.log("✅ Register pressed for role:", role);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerWrapper}>
          <Text style={[styles.back, { fontSize: sizes.subtitleSize }]} onPress={handleBackPress}>
            ← Back
          </Text>

          <View style={styles.headerSection}>
            <Text style={[styles.title, { fontSize: sizes.titleSize }]}>{role} Registration</Text>
            <Text style={[styles.subtitle, { fontSize: sizes.subtitleSize }]}>
              Create your account to {role === "User" ? "find trainers" : "share your skills"}
            </Text>
          </View>

          <View style={[styles.card, { padding: sizes.cardPadding, width: sizes.cardMaxWidth }]}>
            <Input
              icon="person-outline"
              placeholder="Full Name"
              iconSize={sizes.iconSize}
              inputPadding={sizes.inputPadding}
              inputFontSize={sizes.subtitleSize}
            />
            <Input
              icon="mail-outline"
              placeholder="Email"
              iconSize={sizes.iconSize}
              inputPadding={sizes.inputPadding}
              inputFontSize={sizes.subtitleSize}
            />
            <Input
              icon="call-outline"
              placeholder="Phone"
              iconSize={sizes.iconSize}
              inputPadding={sizes.inputPadding}
              inputFontSize={sizes.subtitleSize}
            />
            <Input
              icon="lock-closed-outline"
              placeholder="Password"
              secure
              iconSize={sizes.iconSize}
              inputPadding={sizes.inputPadding}
              inputFontSize={sizes.subtitleSize}
            />

            <TouchableOpacity
              style={[styles.button, { height: sizes.buttonHeight }]}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { fontSize: sizes.subtitleSize + 2 }]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Input({ icon, placeholder, secure, iconSize, inputPadding, inputFontSize }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    console.log("🎯 Input focused:", placeholder);
  };

  const handleBlur = () => {
    setIsFocused(false);
    console.log("📝 Input blurred:", placeholder);
  };

  return (
    <View style={[styles.inputBox, { paddingVertical: inputPadding, borderColor: isFocused ? Colors.primary : Colors.border, borderWidth: isFocused ? 2 : 1 }]}>
      <Ionicons name={icon} size={iconSize} color={isFocused ? Colors.primary : Colors.muted} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.muted}
        secureTextEntry={secure}
        style={[styles.input, { fontSize: inputFontSize }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  innerWrapper: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  back: {
    color: Colors.muted,
    marginBottom: 20,
    marginTop: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    width: "100%",
  },
  headerSection: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "left",
  },
  subtitle: {
    color: Colors.muted,
    textAlign: "left",
    lineHeight: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: "center",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    color: Colors.text,
    marginLeft: 12,
    flex: 1,
    paddingVertical: 4,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
