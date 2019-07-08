import { Arg, Query } from 'type-graphql';
import { HelloInput } from './inputs/HelloInput';

export class HelloResolver {
  @Query(() => String)
  async hello (
    @Arg('input') { name }: HelloInput
  ): Promise<string> {
    return `Hello ${name}!`;
  }
}