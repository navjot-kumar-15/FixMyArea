export const MESSAGES = {
  USER: {
    CREATED: 'User successfully created!',
    FETCHED_ALL: 'All users retrieved successfully',
    FETCHED: 'User retrieved successfully',
    UPDATED: 'User updated successfully',
    DELETED: 'User deleted successfully',
    NOT_FOUND: 'User not found',
    ALREADY_EXISTS: 'User with this email or phone already exists',
  },
  // Add other resource messages here (e.g., AUTH, PRODUCT)
  AUTH: {
    REGISTER_SUCCESS: 'User registered successfully',
    LOGIN_SUCCESS: 'Logged in successfully',
    FORGOT_PASSWORD_SENT: 'Password reset link sent successfully',
    FORGOT_PASSWORD_INSTRUCTION:
      'If that email is in our database, we will send a password reset link to it.',
    FORGOT_PASSWORD_SIMULATION: 'Password reset email sent (Simulation)',
    RESET_PASSWORD_SUCCESS: 'Password has been reset successfully',
    LOGOUT_SUCCESS: 'Logged out successfully',
    REFRESH_SUCCESS: 'Tokens refreshed successfully',
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCESS_DENIED: 'Access Denied',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    INVALID_RESET_TOKEN: 'Invalid or expired reset token',
  },
  REPORT: {
    CREATED: 'Report successfully created!',
    FETCHED_ALL: 'All reports retrieved successfully',
    FETCHED: 'Report retrieved successfully',
    UPDATED: 'Report updated successfully',
    DELETED: 'Report deleted successfully',
    NOT_FOUND: 'Report not found',
  },
};
