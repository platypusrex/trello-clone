import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { Board } from '../../entity/Board';

@InputType()
export class CreateBoardInput implements Partial<Board> {
  @Field()
  @Length(1, 100)
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  teamId?: number
}
