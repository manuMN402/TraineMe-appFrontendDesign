import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import {
  FONT_SIZES,
  SPACING,
  DIMENSIONS,
  SHADOWS,
  IS_EXTRA_LARGE_DEVICE,
} from "../utils/responsiveDesign";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: SPACING.SCREEN_PADDING_H || 16,
    paddingVertical: SPACING.SCREEN_PADDING_V || 16,
  },

  back: {
    color: Colors.muted,
    marginBottom: SPACING.L,
    fontSize: FONT_SIZES.BODY_M,
  },

  title: {
    fontSize: FONT_SIZES.HEADING_L || 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: SPACING.S || 8,
    letterSpacing: 0.5,
  },

  subtitle: {
    color: Colors.muted,
    marginBottom: SPACING.XXL || 24,
    fontSize: FONT_SIZES.BODY_M || 14,
    lineHeight: (FONT_SIZES.BODY_M || 14) * 1.5,
    fontWeight: "500",
  },

  card: {
    backgroundColor: Colors.card || "#111827",
    borderRadius: SPACING.RADIUS_L || 16,
    padding: SPACING.L || 20,
    borderWidth: 1,
    borderColor: Colors.primary || "#6366F1",
    maxWidth: IS_EXTRA_LARGE_DEVICE ? 600 : "100%",
    alignSelf: IS_EXTRA_LARGE_DEVICE ? "center" : "auto",
    width: IS_EXTRA_LARGE_DEVICE ? 600 : "100%",
    ...SHADOWS.LIGHT || {},
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderRadius: SPACING.RADIUS_M || 12,
    paddingHorizontal: SPACING.M || 16,
    paddingVertical: SPACING.M || 16,
    minHeight: DIMENSIONS.INPUT_HEIGHT || 48,
    gap: 12,
  },

  input: {
    flex: 1,
    color: Colors.text,
    fontSize: FONT_SIZES.BODY_M || 14,
    fontWeight: "500",
  },

  label: {
    color: Colors.text,
    fontSize: FONT_SIZES.BODY_M || 14,
    fontWeight: "600",
    marginBottom: SPACING.S || 8,
    letterSpacing: 0.3,
  },

  button: {
    backgroundColor: Colors.primary || "#6366F1",
    paddingVertical: SPACING.L || 16,
    paddingHorizontal: SPACING.L || 16,
    borderRadius: SPACING.RADIUS_L || 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: DIMENSIONS.BUTTON_HEIGHT || 48,
    marginTop: SPACING.M || 16,
    ...SHADOWS.MEDIUM || {
      shadowColor: "#6366F1",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  },

  buttonText: {
    color: "#fff",
    fontSize: FONT_SIZES.BODY_L || 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  errorText: {
    color: "#ef4444",
    fontSize: FONT_SIZES.BODY_S || 12,
    fontWeight: "500",
    marginTop: SPACING.XS || 6,
  },

  successText: {
    color: "#10b981",
    fontSize: FONT_SIZES.BODY_S || 12,
    fontWeight: "500",
  },

  linkText: {
    color: Colors.primary || "#6366F1",
    fontWeight: "600",
    fontSize: FONT_SIZES.BODY_M || 14,
  },

  mutedText: {
    color: Colors.muted || "#9CA3AF",
    fontSize: FONT_SIZES.BODY_M || 14,
  },
});
