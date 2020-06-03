import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@/users/users.schema';


/**
 * get current user from request object
 * @type {(...dataOrPipes: Type<PipeTransform> | PipeTransform | any[]) => ParameterDecorator}
 */
export const LoggedInUser = createParamDecorator((data, context: ExecutionContext): Partial<User> => {
  return context.switchToHttp().getRequest().user;
});
