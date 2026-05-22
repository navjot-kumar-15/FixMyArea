import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MESSAGES } from '../../common/constants/messages.constant';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException(MESSAGES.USER.ALREADY_EXISTS);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role_id?.toString(),
    };
    const { access_token, refresh_token } = await this.generateTokens(payload);

    await this.updateRefreshTokenHash(user._id.toString(), refresh_token);

    return {
      tokens: {
        access_token,
        refresh_token,
      },
      user: {
        id: user._id.toString(),
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
    return { message: MESSAGES.AUTH.LOGOUT_SUCCESS };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    // 1. Verify the refresh token
    const decoded = this.jwtService.verify(refreshTokenDto.refresh_token, {
      secret:
        this.configService.get<string>('jwt.refreshSecret') ||
        'super-refresh-secret',
    });

    // 2. Find the user
    const user = await this.userService.findOne(decoded.sub);

    // We need to fetch the raw user to get the refresh_token hash
    // But findOne returns IUser. Let's use findByEmail or we can add findById raw to UserService.
    // Since findByEmail returns raw Document, we can use that!
    const rawUser = await this.userService.findByEmail(user.email);
    if (!rawUser || !rawUser.refresh_token) {
      throw new UnauthorizedException(MESSAGES.AUTH.ACCESS_DENIED);
    }

    // 3. Compare hashed refresh token
    const isRefreshTokenMatch = await bcrypt.compare(
      refreshTokenDto.refresh_token,
      rawUser.refresh_token,
    );
    if (!isRefreshTokenMatch) {
      throw new UnauthorizedException(MESSAGES.AUTH.ACCESS_DENIED);
    }

    // 4. Generate new tokens
    const payload = {
      sub: rawUser._id.toString(),
      email: rawUser.email,
      role: rawUser.role_id?.toString(),
    };
    const tokens = await this.generateTokens(payload);

    // 5. Save new refresh token hash
    await this.updateRefreshTokenHash(
      rawUser._id.toString(),
      tokens.refresh_token,
    );

    return tokens;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      return { message: MESSAGES.AUTH.FORGOT_PASSWORD_INSTRUCTION };
    }

    const resetToken = this.jwtService.sign(
      { sub: user._id.toString() },
      { expiresIn: '15m' },
    );

    return {
      message: MESSAGES.AUTH.FORGOT_PASSWORD_SIMULATION,
      _simulateToken: resetToken,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const decoded = this.jwtService.verify(resetPasswordDto.token);
    // if(!decoded){
    //   throw new BadRequestException(MESSAGES.AUTH.INVALID_RESET_TOKEN);
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      resetPasswordDto.new_password,
      salt,
    );

    await this.userService.updatePassword(decoded.sub, hashedPassword);

    return { message: MESSAGES.AUTH.RESET_PASSWORD_SUCCESS };
  }

  // --- Helper Methods ---

  private async generateTokens(payload: any) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret:
          this.configService.get<string>('jwt.refreshSecret') ||
          'super-refresh-secret',
        expiresIn: (this.configService.get<string>('jwt.refreshExpiresIn') ||
          '7d') as any,
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  private async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(refreshToken, salt);
    await this.userService.updateRefreshToken(userId, hash);
  }
}
