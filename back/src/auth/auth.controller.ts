import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Query, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Sex } from 'src/constants/sex.type';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

@Controller('auth')
@ApiTags("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  @HttpCode(200)
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    if (!await this.authService.login(loginDto))
      throw new HttpException("Identifiants incorrects", HttpStatus.UNAUTHORIZED)
    response.cookie("refresh-token", this.authService.getRefreshToken(loginDto.username), {
      expires: new Date(Date.now() + (+process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) * 1000),
      httpOnly: true,
      path: "/auth/refresh"
    })
    return {
      accessToken: this.authService.getAccessToken(loginDto.username)
    }
  }

  @HttpCode(200)
  @Post("register")
  async register(@Body() registerDto: RegisterDto, @Query("gender") gender: Sex) {
    return await this.authService.register(registerDto, gender);
  }

  @HttpCode(200)
  @Get("logout")
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie("refresh-token", "", {
      expires: new Date("1999"),
      httpOnly: true
    })
  }

  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  refresh(@Req() request: Request) {
    const refreshToken = request.cookies["refresh-token"]
    if (typeof refreshToken != "string")
      throw new UnauthorizedException("no refresh token")

    const accessToken = this.authService.refreshToken(refreshToken);

    return {
      accessToken
    }
  }

}
