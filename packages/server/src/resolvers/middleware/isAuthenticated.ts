import { MiddlewareFn } from 'type-graphql';
import { Context } from '../../types/context';

export const isAuthenticated: MiddlewareFn<Context> = async ({ context }, next) => {
  const userId = context.req.session!.userId;

  if (!userId) {
    throw new Error('Sorry, you need to be authenticated to preform that action.');
  }

  return next();
};