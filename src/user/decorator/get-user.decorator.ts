import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../entitys/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const user: User = req.user;
    return user;
  },
);
