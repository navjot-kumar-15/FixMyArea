import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiResponse as CustomResponse } from '../../common/responses/api-response';
import { MESSAGES } from '../../common/constants/messages.constant';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserMapper } from '../user/mapper/user.mapper';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({
    status: 400,
    description: 'User already exists or invalid data',
  })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return CustomResponse.success(
      UserMapper.toDomain(user),
      MESSAGES.AUTH.REGISTER_SUCCESS,
      201,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT tokens' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return CustomResponse.success(
      {
        user: UserMapper.toDomain(result.user),
        tokens: result.tokens,
      },
      MESSAGES.AUTH.LOGIN_SUCCESS,
      // 200,
    );
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user and invalidate refresh token' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async logout(@Req() req: { user: { id: string } }) {
    const result = await this.authService.logout(req.user.id);
    return CustomResponse.success(result, MESSAGES.AUTH.LOGOUT_SUCCESS, 200);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access tokens' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const result = await this.authService.refreshTokens(refreshTokenDto);
      return CustomResponse.success(result, MESSAGES.AUTH.REFRESH_SUCCESS, 200);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException(MESSAGES.AUTH.INVALID_REFRESH_TOKEN);
    }
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send password reset link' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset link sent successfully',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    return CustomResponse.success(
      result,
      MESSAGES.AUTH.FORGOT_PASSWORD_SENT,
      200,
    );
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password has been reset successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      const result = await this.authService.resetPassword(resetPasswordDto);
      return CustomResponse.success(
        result,
        MESSAGES.AUTH.RESET_PASSWORD_SUCCESS,
        200,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(MESSAGES.AUTH.INVALID_RESET_TOKEN);
    }
  }
}
