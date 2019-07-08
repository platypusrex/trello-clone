import { Field, InputType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { IsEmailUnique } from '../decorators/IsEmailUnique';
import { PasswordMixin } from '../mixins/PasswordMixin';

@InputType()
export class RegisterInput extends PasswordMixin(class {}){
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailUnique()
  email: string;

  @Field()
  password: string;
}