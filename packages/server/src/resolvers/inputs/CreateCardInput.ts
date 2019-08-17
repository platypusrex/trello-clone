import { Field, InputType } from 'type-graphql';
import { Card } from '../../entity/Card';

@InputType()
export class CreateCardInput implements Partial<Card> {
  @Field()
  title: string;

  @Field()
  listId: number;
}
