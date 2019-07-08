import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateCardInput {
  @Field()
  title: string;

  @Field()
  listId: number;
}