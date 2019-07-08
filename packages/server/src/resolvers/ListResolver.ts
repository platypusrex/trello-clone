import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { CreateListInput } from './inputs/CreateListInput';
import { isAuthenticated } from './middleware/isAuthenticated';
import { List } from '../entity/List';
import { Board } from '../entity/Board';
import { UpdateListInput } from './inputs/UpdateListInput';

@Resolver()
export class ListResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [List], { nullable: true })
  async allListsByBoardId (
    @Arg('boardId') boardId: number
  ): Promise<List[] | null> {
    const lists = await List.find({ where: { boardId }, order: { position: 'ASC' }});

    if (!lists) {
      return null;
    }

    return lists;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => List)
  async createList (
    @Arg('input') { title, boardId }: CreateListInput,
  ): Promise<List> {
    const board = await Board.findOne(boardId);

    if (!board) {
      throw new Error('Sorry, we could not find the board')
    }

    const lists = await List.find({ where: { boardId } });
    const position = lists.length;

    const list = await List.create({
      title,
      board,
      position,
    }).save();

    return list;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => List)
  async updateListById (
    @Arg('input') { id, title, position }: UpdateListInput,
  ): Promise<List> {
    const list = await List.findOne(id);

    if (!list) {
      throw new Error('Sorry, we could not find the list you requested');
    }

    if (title && title !== list.title) {
      list.title = title;
    }

    // if (position !== undefined || position !== null) {
    list.position = position;
    // }

    await list.save();

    return list;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteListById (
    @Arg('listId') listId: number,
  ): Promise<boolean> {
    const list = await List.findOne(listId);

    if (!list) {
      return false;
    }

    await List.delete(listId);

    return true;
  }
}