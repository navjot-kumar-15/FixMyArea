/**
 * Generates an OTP verification email template with modern inline HTML/CSS.
 * @param otp The one-time password code
 * @param name Optional recipient name
 */
export function getOtpTemplate(otp: string, name?: string): string {
  const recipientName = name || 'Valued User';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #0f172a; padding: 30px 20px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">FixMyArea</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 700; line-height: 1.3;">Verify Your Account</h2>
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">Hello ${recipientName},</p>
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">Thank you for using FixMyArea. Please use the following One-Time Password (OTP) to complete your verification process. This code is valid for 10 minutes and should not be shared with anyone.</p>
              
              <!-- OTP Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 16px 40px; font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; color: #4f46e5; letter-spacing: 6px;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">If you did not request this code, you can safely ignore this email. Someone else may have typed your email address by mistake.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f8fafc; padding: 24px 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px;">&copy; 2026 FixMyArea. All rights reserved.</p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">This is an automated notification. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates a password reset email template with modern inline HTML/CSS.
 * @param resetUrl The URL to reset the password
 * @param name Optional recipient name
 */
export function getResetPasswordTemplate(resetUrl: string, name?: string): string {
  const recipientName = name || 'Valued User';
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #0f172a; padding: 30px 20px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">FixMyArea</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 20px; font-weight: 700; line-height: 1.3;">Password Reset Request</h2>
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">Hello ${recipientName},</p>
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">We received a request to reset the password for your FixMyArea account. Click the button below to set a new password. This link is valid for 1 hour.</p>
              
              <!-- Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" target="_blank" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; padding: 14px 30px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); transition: background-color 0.2s;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">If the button above does not work, copy and paste the following link into your web browser:</p>
              <p style="margin: 0 0 24px 0; word-break: break-all; color: #4f46e5; font-size: 14px; line-height: 1.6;"><a href="${resetUrl}" target="_blank" style="color: #4f46e5;">${resetUrl}</a></p>

              <p style="margin: 24px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6; border-top: 1px solid #e2e8f0; padding-top: 20px;">If you did not request a password reset, please ignore this email or contact support if you have concerns. Your password will remain secure.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f8fafc; padding: 24px 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px;">&copy; 2026 FixMyArea. All rights reserved.</p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">This is an automated notification. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
