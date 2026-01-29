/**
 * Generate a unique user ID
 * Format: USER-XXXXXX (6 random numeric digits)
 */
export const generateUniqueUserId = () => {
  const prefix = "USER";
  const randomNum = String(Math.floor(100000 + Math.random() * 900000));
  return `${prefix}-${randomNum}`;
};

/**
 * Generate a simple numeric user ID
 * Format: 6-digit number
 */
export const generateNumericUserId = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

/**
 * Generate UUID v4 format user ID
 */
export const generateUUIDUserId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
