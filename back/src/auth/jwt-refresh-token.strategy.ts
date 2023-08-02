import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { MatesService } from "src/relational/mates/mates.service";
import TokenPayload from "./interfaces/tokenPayload.interface";
import { Mate } from "src/relational/mates/entities/mate.entity";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
  constructor(
    private readonly mateService: MatesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.["refresh-token"];
      }]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true
    });
  }

  async validate(request: Request, payload: TokenPayload) : Promise<Mate> {
    return this.mateService.findByPayload(payload);
  }
}