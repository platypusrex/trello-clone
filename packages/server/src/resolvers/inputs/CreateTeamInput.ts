import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateTeamInput {
  @Field()
  @Length(1, 50)
  name: string;

  @Field({ nullable: true })
  description: string;
}