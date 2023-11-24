import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Sex } from 'src/constants/sex.type';
import { Mate } from 'src/relational/mates/entities/mate.entity';
import { PublicProfile } from 'src/relational/public-profile/entities/public-profile.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import TokenPayload from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Mate)
    private readonly mateRepository: Repository<Mate>,

    @InjectRepository(PublicProfile)
    private readonly publicProfileRepository: Repository<PublicProfile>,

    private readonly jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto): Promise<boolean> {
    try {
      if (loginDto.username === "" || loginDto.password === "") throw 2

      const mate = await this.mateRepository.findOne({ where: { pseudo: loginDto.username } });

      if (!mate)
        throw 0

      if (await bcrypt.compare(loginDto.password, mate.password)) {
        return true
      } else {
        throw 1
      }
    } catch (error) {
      switch (error) {
        case 0:
          throw new HttpException("User does not exist", HttpStatus.BAD_REQUEST)

        case 1:
          throw new HttpException("Incorrect password", HttpStatus.UNAUTHORIZED)

        case 2:
          throw new HttpException("Empty credentials", HttpStatus.BAD_REQUEST)
      }
    }
  }

  getAccessToken(username: string): string {
    const payload: TokenPayload = { username };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`
    });
  }

  getRefreshToken(username: string): string {
    const payload: TokenPayload = { username };
    return this.jwtService.sign(payload, ({
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`
    }))
  }

  async register(registerDto: RegisterDto, gender: Sex): Promise<boolean | Mate> {
    try {
      if (await this.mateRepository.findOne({ where: { pseudo: registerDto.email } }))
        throw 0

      if (registerDto.password === "" || registerDto.email === "")
        throw 1

      const mate = await this.mateRepository.save({
        ...registerDto,
        password: bcrypt.hashSync(registerDto.password, await bcrypt.genSalt()),
        timezone: 'Europe/Paris'
      });

      if (!mate)
        throw 2

      mate.publicProfile = await this.publicProfileRepository.save({
        sex: gender
      })

      await this.mateRepository.update(mate.id, mate)

      return mate;
    } catch (error) {
      switch (error) {
        case 0:
          throw new HttpException("User already exists", HttpStatus.CONFLICT);

        case 1:
          throw new HttpException("Empty password or email", HttpStatus.BAD_REQUEST);

        case 2:
          throw new HttpException("Missing credentials", HttpStatus.NOT_ACCEPTABLE)
      }
    }
  }

  refreshToken(refreshToken: string) {
    const payload = this.decodeTokenWithSecurity<TokenPayload>(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    return this.getAccessToken(payload.username);
  }

  private decodeTokenWithSecurity<T>(token: string, secret: string) {
    if (!this.jwtService.verify(token, { secret }))
      throw new UnauthorizedException("bad refresh token")
    return this.jwtService.decode(token) as T
  }
}
