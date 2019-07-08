import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Board } from '../entity/Board';
import { User } from '../entity/User';
import { Team } from '../entity/Team';
import { Context } from '../types/context';
import { CreateBoardInput } from './inputs/CreateBoardInput';
import { isAuthenticated } from './middleware/isAuthenticated';


@Resolver()
export class BoardResolver {
  @Query(() => [Board], { nullable: true })
  async allBoards (): Promise<Board[] | null> {
    return await Board.find();
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => Board, { nullable: true })
  async boardById (
    @Arg('boardId') boardId: number,
    @Ctx() ctx: Context
  ): Promise<Board | null> {
    const userId = ctx.req.session!.userId;
    const board = await Board.findOne(boardId);

    if (!board) {
      return null;
    }

    const boardUsers = await board.users;

    const isUserAMember = boardUsers.find((member: User) => member.id === userId);

    if (!isUserAMember) {
      throw new Error('Sorry, you can only view a board you have joined.')
    }

    return board;
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => [Board], { nullable: true })
  async allBoardsByUserId (
    @Ctx() ctx: Context
  ): Promise<Board[] | null> {
    const creatorId = ctx.req.session!.userId;
    const boards = await Board.find({ where: { creatorId }});

    if (!boards) {
      return null;
    }

    return boards;
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => [Board], { nullable: true })
  async allPersonalBoardsByUserId (
    @Ctx() ctx: Context
  ): Promise<Board[] | null> {
    const creatorId = ctx.req.session!.userId;
    const boards = await Board
      .createQueryBuilder('board')
      .where('board.creatorId = :creatorId', { creatorId })
      .leftJoinAndSelect('board.team', 'team')
      .andWhere('team IS NULL')
      .getMany();

    if (!boards) {
      return null;
    }

    return boards;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Board)
  async createBoard (
    @Arg('input') { title, description, teamId }: CreateBoardInput,
    @Ctx() ctx: Context
  ) {
    const creatorId = ctx.req.session!.userId;
    const creator = await User.findOne(creatorId);
    let team;

    if (teamId) {
      team = await Team.findOne(teamId);
    }

    return await Board.create({
      title,
      description,
      creator,
      team,
      users: [creator]
    }).save();
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteBoardById (
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ) {
    const creatorId = ctx.req.session!.userId;

    if (!creatorId) {
      throw new Error('You must be logged in to perform this action.');
    }

    const board = await Board.findOne(id);

    if (!board) {
      throw new Error('Sorry, we could not find the board you requested.');
    }

    if (board.creatorId !== creatorId) {
      return false;
    }

    await Board.delete(id);

    return true;
  }
}