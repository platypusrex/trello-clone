import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateListInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  @Length(1, 100)
  title: string;

  @Field({ nullable: true })
  position: number;
}