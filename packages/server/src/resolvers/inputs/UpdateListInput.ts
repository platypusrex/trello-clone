import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { List } from '../../entity/List';
import { Card } from '../../entity/Card';

@InputType()
class CardInput implements Partial<Card> {
  @Field()
  id: number;

  @Field()
  position: number;
}

@InputType()
export class UpdateListInput implements Partial<List> {
  @Field()
  id: number;

  @Field({ nullable: true })
  @Length(1, 100)
  title: string;

  @Field({ nullable: true })
  position: number;

  @Field(() => [CardInput], { nullable: true })
  cardsInput: CardInput[];
}
