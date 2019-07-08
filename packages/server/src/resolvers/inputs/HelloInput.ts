import { Field, InputType } from 'type-graphql';

@InputType()
export class HelloInput {
  @Field(() => String, { defaultValue: 'world', nullable: true })
  name: string;
}