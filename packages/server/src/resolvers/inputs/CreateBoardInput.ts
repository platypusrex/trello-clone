import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @Field()
  @Length(1, 100)
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  teamId?: number
}