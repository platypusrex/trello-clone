import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { List } from '../../entity/List';

@InputType()
export class CreateListInput implements Partial<List> {
  @Field()
  @Length(1, 100)
  title: string;

  @Field()
  boardId: number;
}
