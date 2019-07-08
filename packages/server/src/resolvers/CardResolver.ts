import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateCardInput } from './inputs/CreateCardInput';
import { Context } from '../types/context';
import { isAuthenticated } from './middleware/isAuthenticated';
import { User } from '../entity/User';
import { List } from '../entity/List';
import { Card } from '../entity/Card';

@Resolver()
export class CardResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [Card], { nullable: true })
  async allCardsByListId (
    @Arg('listId') listId: number
  ): Promise<Card[] | null> {
    const cards = await Card.find({
      where: { listId } ,
      // order: { position: 'ASC' }
    });

    return !cards ? null : cards;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Card)
  async createCard (
    @Arg('input') { title, listId }: CreateCardInput,
    @Ctx() ctx: Context
  ): Promise<Card> {
    const creatorId = ctx.req.session!.userId;
    const creator = await User.findOne(creatorId);

    const list = await List.findOne(listId);

    if (!list) {
      throw new Error('A Card must be associated with a list.');
    }

    return await Card.create({
      title,
      creator,
      list,
    }).save();
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteCardById (
    @Arg('cardId') cardId: number
  ): Promise<boolean> {
    const card = await Card.findOne(cardId);

    if (!card) {
      return false;
    }

    await Card.delete(cardId);

    return true;
  }
}