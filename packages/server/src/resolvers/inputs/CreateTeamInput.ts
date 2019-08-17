import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { Team } from '../../entity/Team';

@InputType()
export class CreateTeamInput implements Partial<Team> {
  @Field()
  @Length(1, 50)
  name: string;

  @Field({ nullable: true })
  description: string;
}
