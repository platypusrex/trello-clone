import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateListInput {
  @Field()
  @Length(1, 100)
  title: string;

  @Field()
  boardId: number;
}