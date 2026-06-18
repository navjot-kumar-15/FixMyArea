import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import {
  getOtpTemplate,
  getResetPasswordTemplate,
} from 'src/common/templates/mail.templates';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('mailer.host');
    const port = this.configService.get<number>('mailer.port');
    const user = this.configService.get<string>('mailer.user');
    const pass = this.configService.get<string>('mailer.password');

    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for port 465, false for other ports
        auth:
          user && pass
            ? {
                user,
                pass,
              }
            : undefined,
      });
      this.logger.log(`Nodemailer configuration loaded for host: ${host}`);
    } else {
      this.logger.warn(
        'Nodemailer configuration missing host. Emails will be simulated in logger.',
      );
    }
  }

  /**
   * Sends a generic HTML email.
   * @param to Recipient email address
   * @param subject Email subject line
   * @param html HTML content of the email
   */
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const from =
      this.configService.get<string>('mailer.from') || 'noreply@fixmyarea.com';

    if (this.transporter) {
      try {
        const info = await this.transporter.sendMail({
          from,
          to,
          subject,
          html,
        });
        this.logger.log(`Email sent successfully: ${info.messageId}`);
      } catch (error) {
        this.logger.error(`Failed to send email to ${to}: ${error.message}`);
        throw error;
      }
    } else {
      this.logger.debug(
        `[Mail Simulation] From: ${from} | To: ${to} | Subject: ${subject}\nBody:\n${html}`,
      );
    }
  }

  /**
   * Sends an OTP verification email using the OTP template.
   * @param to Recipient email address
   * @param otp One-time password string
   * @param name Recipient name
   */
  async sendOtp(to: string, otp: number, name?: string): Promise<void> {
    const html = getOtpTemplate(otp, name);
    await this.sendEmail(to, 'Verify Your Account - OTP', html);
  }

  /**
   * Sends a password reset email using the password reset template.
   * @param to Recipient email address
   * @param resetUrl The complete password reset URL
   * @param name Recipient name
   */
  async sendResetPassword(
    to: string,
    resetUrl: string,
    name?: string,
  ): Promise<void> {
    const html = getResetPasswordTemplate(resetUrl, name);
    await this.sendEmail(to, 'Reset Your Password - FixMyArea', html);
  }
}
