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
import RegisterStyles from "../styles/registerStyles";
import { Colors } from "../constants/colors";
import { generateUniqueUserId } from "../utils/idGenerator";
import { emailExists, saveUser, getUserByEmail } from "../utils/userStorage";
import { validateField, validateRegistrationForm } from "../utils/validationRules";

const ROLE = "Trainer";
const PHONE_LENGTH = 10;

export default function TrainerRegisterScreen({ navigation }) {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Real-time field validation
  const handleFieldChange = useCallback((fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    const fieldError = validateField(fieldName, value, {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    setErrors((prev) => ({ ...prev, [fieldName]: fieldError }));
  }, [formData.password, formData.confirmPassword]);

  // Validate entire form before submission
  const validateForm = useCallback(() => {
    const { errors: validationErrors, isValid } = validateRegistrationForm(formData);
    setErrors(validationErrors);
    return isValid;
  }, [formData]);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    return (
      Object.values(errors).every((e) => e === "") &&
      Object.values(formData).every((v) => typeof v === "string" && v.trim().length > 0)
    );
  }, [errors, formData]);

  // Handle back navigation safely
  const handleBack = useCallback(() => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.navigate("RoleSelect");
    }
  }, [navigation]);

  // Navigate to login with safe navigation check
  const navigateToLogin = useCallback(() => {
    try {
      navigation.navigate("Login");
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Navigation Error", "Could not navigate to login. Please try again.");
    }
  }, [navigation]);

  // Navigate to trainer dashboard with safe navigation check
  const navigateToTrainerDashboard = useCallback((generatedUserId) => {
    try {
      navigation.navigate("TrainerDashboard", {
        userData: {
          userId: generatedUserId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        },
        role: ROLE,
      });
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Navigation Error", "Could not navigate to dashboard. Please try again.");
    }
  }, [navigation, formData]);

  // Handle duplicate email alert
  const showEmailExistsAlert = useCallback((userIdText) => {
    Alert.alert(
      "Email Already Exists",
      `This email is already registered. Please login instead.${userIdText}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Go to Login",
          onPress: navigateToLogin,
        },
      ]
    );
  }, [navigateToLogin]);

  // Handle successful registration
  const showSuccessAlert = useCallback((generatedUserId) => {
    Alert.alert(
      "Registration Successful!",
      `Your User ID: ${generatedUserId}\n\nSave this ID to login.`,
      [
        {
          text: "Continue",
          onPress: () => navigateToTrainerDashboard(generatedUserId),
        },
      ]
    );
  }, [navigateToTrainerDashboard]);

  // Main registration handler
  const handleRegister = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert("Form Error", "Please fill all fields correctly and fix any errors.");
      return;
    }

    if (loading) return; // Prevent duplicate submissions
    setLoading(true);

    try {
      // Check if email already exists
      const userExists = await emailExists(formData.email);

      if (userExists) {
        const existingUser = await getUserByEmail(formData.email);
        const userIdText = existingUser ? `\n\nYour User ID: ${existingUser.userId}` : "";
        showEmailExistsAlert(userIdText);
        setLoading(false);
        return;
      }

      // Generate user ID and prepare data
      const generatedUserId = generateUniqueUserId();
      const userData = {
        userId: generatedUserId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: ROLE,
        createdAt: new Date().toISOString(),
      };

      // Save user to storage
      const saved = await saveUser(userData);

      if (saved) {
        showSuccessAlert(generatedUserId);
      } else {
        Alert.alert("Error", "Failed to create account. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", error.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  }, [formData, loading, validateForm, showEmailExistsAlert, showSuccessAlert]);

  const headerStyles = {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  };

  return (
    <SafeAreaView style={RegisterStyles.safe} edges={["top"]}>
      {/* Header with back button */}
      <View style={headerStyles}>
        <TouchableOpacity
          onPress={handleBack}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
          accessibilityHint="Returns to previous screen"
        >
          <Ionicons name="arrow-back" size={24} color="whitesmoke" />
        </TouchableOpacity>
      </View>

      {/* Main form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 16,
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
        >
          {/* Title section */}
          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <Text style={RegisterStyles.title}>{ROLE} Registration</Text>
            <Text style={RegisterStyles.subtitle}>
              Join as a trainer and start earning
            </Text>
          </View>

          {/* Form card */}
          <View
            style={[
              RegisterStyles.card,
              {
                borderWidth: 1,
                borderColor: Colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 20,
              },
            ]}
          >
            {/* Form inputs */}
            <Input
              label="First Name"
              icon="person-outline"
              value={formData.firstName}
              onChange={(value) => handleFieldChange("firstName", value)}
              error={errors.firstName}
              placeholder="Enter first name"
            />

            <Input
              label="Last Name"
              icon="person-outline"
              value={formData.lastName}
              onChange={(value) => handleFieldChange("lastName", value)}
              error={errors.lastName}
              placeholder="Enter last name"
            />

            <Input
              label="Email"
              icon="mail-outline"
              value={formData.email}
              onChange={(value) => handleFieldChange("email", value)}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter email"
            />

            <Input
              label="Phone"
              icon="call-outline"
              value={formData.phone}
              onChange={(value) => handleFieldChange("phone", value)}
              error={errors.phone}
              keyboardType="numeric"
              maxLength={PHONE_LENGTH}
              placeholder="Enter 10-digit phone"
              showCounter
              maxLength={PHONE_LENGTH}
            />

            <PasswordInput
              label="Password"
              icon="lock-closed-outline"
              value={formData.password}
              onChange={(value) => handleFieldChange("password", value)}
              error={errors.password}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              placeholder="Enter password"
            />

            <PasswordInput
              label="Confirm Password"
              icon="lock-closed-outline"
              value={formData.confirmPassword}
              onChange={(value) => handleFieldChange("confirmPassword", value)}
              error={errors.confirmPassword}
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm password"
            />

            {/* Register button */}
            <TouchableOpacity
              style={[
                RegisterStyles.button,
                (!isFormValid() || loading) && { opacity: 0.6 },
              ]}
              disabled={!isFormValid() || loading}
              activeOpacity={0.85}
              onPress={handleRegister}
              accessibilityLabel="Register button"
              accessibilityHint="Submits the registration form"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={RegisterStyles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// ==================== INPUT COMPONENTS ====================

/**
 * Reusable text input component with validation feedback
 */
function Input({
  label,
  icon,
  value,
  onChange,
  error,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
  maxLength,
  showCounter = false,
}) {
  const isPhoneField = keyboardType === "numeric";
  const showCharCount = showCounter && isPhoneField && value;

  return (
    <View style={{ marginBottom: 16 }}>
      {/* Label with optional counter */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={RegisterStyles.label}>{label}</Text>
        {showCharCount && (
          <Text
            style={{
              fontSize: 12,
              color: value.length === PHONE_LENGTH ? "#10b981" : "#ef4444",
              fontWeight: "600",
            }}
          >
            {value.length}/{PHONE_LENGTH}
          </Text>
        )}
      </View>

      {/* Input box */}
      <View
        style={[
          RegisterStyles.inputBox,
          {
            borderColor: error ? "#ef4444" : Colors.primary,
          },
        ]}
      >
        <Ionicons name={icon} size={20} color={Colors.primary} />
        <TextInput
          style={{
            flex: 1,
            marginHorizontal: 12,
            color: "#fff",
            fontSize: 14,
          }}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          editable={!false} // Can be extended for disabled state
        />
      </View>

      {/* Error message */}
      {error && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
            gap: 6,
          }}
        >
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
 * Reusable password input component with show/hide toggle
 */
function PasswordInput({
  label,
  icon,
  value,
  onChange,
  error,
  showPassword,
  onTogglePassword,
  placeholder,
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      {/* Label */}
      <Text style={[RegisterStyles.label, { marginBottom: 8 }]}>
        {label}
      </Text>

      {/* Input box with toggle */}
      <View
        style={[
          RegisterStyles.inputBox,
          {
            borderColor: error ? "#ef4444" : Colors.primary,
          },
        ]}
      >
        <Ionicons name={icon} size={20} color={Colors.primary} />
        <TextInput
          style={{
            flex: 1,
            marginHorizontal: 12,
            color: "#fff",
            fontSize: 14,
          }}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChange}
          secureTextEntry={!showPassword}
          editable={!false} // Can be extended for disabled state
        />
        <TouchableOpacity
          onPress={onTogglePassword}
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

      {/* Error message */}
      {error && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
            gap: 6,
          }}
        >
          <Ionicons name="alert-circle" size={14} color="#ef4444" />
          <Text style={{ color: "#ef4444", fontSize: 12, flex: 1 }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
