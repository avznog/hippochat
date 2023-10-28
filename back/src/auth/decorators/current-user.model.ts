import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Mate } from "src/relational/mates/entities/mate.entity";

export const CurrentUser = createParamDecorator(async (data: null, context: ExecutionContext) =>
  context.switchToHttp().getRequest().user as Mate)