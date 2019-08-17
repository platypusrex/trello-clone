import { InputType } from 'type-graphql';
import { Field } from 'type-graphql/dist/decorators/Field';
import { IsEmail, MinLength } from 'class-validator';
import { User } from '../../entity/User';

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(5)
  password: string;
}
