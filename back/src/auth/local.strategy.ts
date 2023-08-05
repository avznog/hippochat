import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { MatesService } from "src/relational/mates/mates.service";
import { MateDto } from "../relational/mates/dto/mate.dto"
import TokenPayload from "./interfaces/tokenPayload.interface";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private mateService: MatesService
  ) {
    super({
      usernameField: "username"
    })
  }

  async validate(payload: TokenPayload) : Promise<MateDto> {
    const user = await this.mateService.findByPayload(payload);
    if(!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}