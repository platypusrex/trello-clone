import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { RegisterInput } from './inputs/RegisterInput';
import { LoginInput } from './inputs/LoginInput';
import { hashPassword, validatePassword } from '../utils/authUtils';
import { createRedisToken } from '../utils/createRedisToken';
import { sendEmail } from '../utils/sendEmail';
import { confirmUserPrefix } from '../constants/redisPrefixes';
import { Context } from '../types/context';
import { redis } from '../redis';

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async allUsers (): Promise<User[] | null> {
    return await User.find();
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async me (
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userId = ctx.req.session!.userId;

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => User)
  async register (
    @Arg('input') {
      firstName,
      lastName,
      email,
      password,
    }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    const confirmationToken = await createRedisToken(user.id, confirmUserPrefix);
    const url = `http://localhost:3000/confirm-email/${confirmationToken}`;

    await sendEmail(email, url);

    return user;
  }

  @Mutation(() => Boolean)
  async confirmUser (
    @Arg('token') token: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return true;
    }

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(token);

    ctx.req.session!.userId = userId;

    return true;
  }

  @Mutation(() => User, { nullable: true })
  async login (
    @Arg('input') { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const validated = await validatePassword(password, user.password);

    if (!validated) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}