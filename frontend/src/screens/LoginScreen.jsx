import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { authStyles as styles } from "../styles/authStyles";
import { Colors } from "../constants/colors";
import { findUser } from "../utils/userStorage";

// ==================== CONSTANTS ====================
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_ID_REGEX = /^USER-[0-9]{6}$/;
const PASSWORD_MIN_LENGTH = 6;

// ==================== LOGIN SCREEN COMPONENT ====================
export default function LoginScreen({ navigation }) {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ==================== VALIDATION LOGIC ====================

  /**
   * Real-time email validation
   * Accepts both email format and User ID format (USER-XXXXXX)
   */
  const validateEmail = useCallback((value) => {
    if (!value.trim()) {
      return "Email or User ID is required";
    }

    const isEmail = EMAIL_REGEX.test(value);
    const isUserId = USER_ID_REGEX.test(value);

    if (!isEmail && !isUserId) {
      return "Enter a valid email or User ID (USER-XXXXXX)";
    }

    return "";
  }, []);

  /**
   * Real-time password validation
   */
  const validatePassword = useCallback((value) => {
    if (!value) {
      return "Password is required";
    }

    if (value.length < PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }

    return "";
  }, []);

  /**
   * Handle field changes with real-time validation
   */
  const handleFieldChange = useCallback(
    (fieldName, value) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));

      // Real-time validation
      let fieldError = "";
      if (fieldName === "email") {
        fieldError = validateEmail(value);
      } else if (fieldName === "password") {
        fieldError = validatePassword(value);
      }

      setErrors((prev) => ({ ...prev, [fieldName]: fieldError }));
    },
    [validateEmail, validatePassword]
  );

  /**
   * Check if form is valid
   */
  const isFormValid = useCallback(() => {
    return (
      formData.email.trim().length > 0 &&
      formData.password.length > 0 &&
      !errors.email &&
      !errors.password
    );
  }, [formData, errors]);

  /**
   * Handle back navigation safely
   */
  const handleBack = useCallback(() => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate("RoleSelect");
    }
  }, [navigation]);

  /**
   * Handle navigation based on user role
   */
  const navigateByRole = useCallback(
    (user) => {
      try {
        const role = user?.role || "User";
        const navigationTarget = role === "Trainer" ? "TrainerTabs" : "UserTabs";

        navigation.reset({
          index: 0,
          routes: [
            {
              name: navigationTarget,
              params: {
                userData: user,
                role: role,
              },
            },
          ],
        });
      } catch (error) {
        console.error("Navigation error:", error);
        Alert.alert("Navigation Error", "Could not navigate to dashboard. Please try again.");
      }
    },
    [navigation]
  );

  /**
   * Main login handler
   */
  const handleLogin = useCallback(async () => {
    if (!isFormValid()) {
      Alert.alert("Validation Error", "Please check all fields and fix errors.");
      return;
    }

    if (loading) return; // Prevent duplicate submissions
    setLoading(true);

    try {
      const user = await findUser(formData.email, formData.password);

      if (user) {
        // Login successful - navigate based on role
        navigateByRole(user);
      } else {
        // Login failed
        Alert.alert(
          "Login Failed",
          "Invalid email/User ID or password. Please check and try again or register if you're new.",
          [{ text: "OK", style: "default" }]
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Error",
        error?.message || "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [isFormValid, formData, loading, navigateByRole]);

  /**
   * Handle forgot password navigation
   */
  const handleForgotPassword = useCallback(() => {
    try {
      navigation.navigate("ForgotPassword");
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Navigation Error", "Could not navigate to password reset.");
    }
  }, [navigation]);

  /**
   * Handle sign up navigation
   */
  const handleSignUp = useCallback(() => {
    try {
      navigation.navigate("RoleSelect");
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Navigation Error", "Could not navigate to sign up.");
    }
  }, [navigation]);

  // ==================== RENDER ====================
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header with back button */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="whitesmoke" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title section */}
          <View style={{ marginBottom: 32 }}>
            <Text style={[styles.title, { marginBottom: 8 }]}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Login to your account to continue
            </Text>
          </View>

          {/* Form card */}
          <View style={[styles.card, { paddingBottom: 24 }]}>
            {/* Email/User ID Input */}
            <EmailInput
              value={formData.email}
              onChange={(value) => handleFieldChange("email", value)}
              error={errors.email}
              editable={!loading}
            />

            {/* Password Input */}
            <PasswordInput
              value={formData.password}
              onChange={(value) => handleFieldChange("password", value)}
              error={errors.password}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              editable={!loading}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={{ marginBottom: 24, alignSelf: "flex-end" }}
              onPress={handleForgotPassword}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.button,
                (!isFormValid() || loading) && { opacity: 0.6 },
              ]}
              onPress={handleLogin}
              disabled={!isFormValid() || loading}
              activeOpacity={0.85}
              accessibilityLabel="Login button"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
              gap: 4,
            }}
          >
            <Text style={{ color: Colors.muted, fontSize: 14 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontWeight: "700",
                  fontSize: 14,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ==================== INPUT COMPONENTS ====================

/**
 * Email/User ID Input Component
 */
function EmailInput({ value, onChange, error, editable }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          color: Colors.text,
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Email or User ID
      </Text>

      <View
        style={[
          styles.inputBox,
          {
            borderWidth: 1.5,
            borderColor: error ? "#ef4444" : Colors.primary,
            backgroundColor: "#111827",
          },
        ]}
      >
        <Ionicons
          name="mail-outline"
          size={20}
          color={error ? "#ef4444" : Colors.primary}
        />
        <TextInput
          style={[
            styles.input,
            {
              color: "#fff",
            },
          ]}
          placeholder="Enter email or User ID"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={editable}
          selectTextOnFocus
          accessibilityLabel="Email or User ID input"
        />
      </View>

      {error && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, gap: 6 }}>
          <Ionicons name="alert-circle" size={14} color="#ef4444" />
          <Text style={{ color: "#ef4444", fontSize: 12, flex: 1 }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

/**
 * Password Input Component with Show/Hide Toggle
 */
function PasswordInput({
  value,
  onChange,
  error,
  showPassword,
  onTogglePassword,
  editable,
}) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          color: Colors.text,
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        Password
      </Text>

      <View
        style={[
          styles.inputBox,
          {
            borderWidth: 1.5,
            borderColor: error ? "#ef4444" : Colors.primary,
            backgroundColor: "#111827",
          },
        ]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={error ? "#ef4444" : Colors.primary}
        />
        <TextInput
          style={[
            styles.input,
            {
              color: "#fff",
            },
          ]}
          placeholder="Enter your password"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChange}
          secureTextEntry={!showPassword}
          editable={editable}
          selectTextOnFocus
          accessibilityLabel="Password input"
        />
        <TouchableOpacity
          onPress={onTogglePassword}
          disabled={!editable}
          activeOpacity={0.7}
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="rgba(255, 255, 255, 0.6)"
          />
        </TouchableOpacity>
      </View>

      {error && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, gap: 6 }}>
          <Ionicons name="alert-circle" size={14} color="#ef4444" />
          <Text style={{ color: "#ef4444", fontSize: 12, flex: 1 }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
