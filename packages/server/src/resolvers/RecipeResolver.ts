import { Arg, Mutation, Query } from 'type-graphql';
import { Recipe } from '../entity/Recipe';
import { RecipeInput } from './inputs/RecipeInput';

export class RecipeResolver {
  @Query(() => [Recipe])
  async getAllRecipes (): Promise<Recipe[]> {
    return await Recipe.find();
  }

  @Mutation(() => Recipe)
  async addRecipe (
    @Arg('input') { title, description }: RecipeInput
  ): Promise<Recipe> {
    const recipe = await Recipe.create({
      title,
      description
    }).save();

    return recipe;
  }
}