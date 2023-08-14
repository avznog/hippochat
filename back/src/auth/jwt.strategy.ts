import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import TokenPayload from "./interfaces/tokenPayload.interface";
import { MatesService } from "src/relational/mates/mates.service";
import { MateDto } from "src/relational/mates/dto/mate.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly matesService: MatesService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }
  
  async validate(request: Request, payload: TokenPayload) : Promise<MateDto>{
    const user = await this.matesService.findByPayload(payload);
    if (!user)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    request.user = user
    return user;
  }
}