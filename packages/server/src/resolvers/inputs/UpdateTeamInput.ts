import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { Team } from '../../entity/Team';

@InputType()
export class UpdateTeamInput implements Partial<Team> {
  @Field()
  id: number;

  @Field({ nullable: true })
  @Length(1, 50)
  name: string;

  @Field({ nullable: true })
  description: string;
}
