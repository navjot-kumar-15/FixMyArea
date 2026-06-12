import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('jwt.secret') || 'defaultSecretChangeMe',
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.is_banned) {
        throw new UnauthorizedException('Account has been banned');
      }

      // Return the full user object to be injected into req.user
      return user;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
