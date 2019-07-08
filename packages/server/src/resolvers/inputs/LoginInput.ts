import { InputType } from 'type-graphql';
import { Field } from 'type-graphql/dist/decorators/Field';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(5)
  password: string;
}