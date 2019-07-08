import { InputType } from 'type-graphql/dist/decorators/InputType';
import { Recipe } from '../../entity/Recipe';
import { Field } from 'type-graphql/dist/decorators/Field';

@InputType()
export class RecipeInput implements Partial<Recipe> {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}