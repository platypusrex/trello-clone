import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Team } from '../entity/Team';
import { User } from '../entity/User';
import { CreateTeamInput } from './inputs/CreateTeamInput';
import { Context } from '../types/context';
import { isAuthenticated } from './middleware/isAuthenticated';
import { UpdateTeamInput } from './inputs/UpdateTeamInput';

@Resolver()
export class TeamResolver {
  @Query(() => [Team], { nullable: true })
  async allTeams(): Promise<Team[] | null> {
    return await Team.find();
  }

  @Query(() => Team, { nullable: true })
  async teamById (
    @Arg('teamId') teamId: number
  ): Promise<Team | null> {
    const team = await Team.findOne(teamId);

    if (!team) {
      return null;
    }

    return team;
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => [Team], { nullable: true })
  async allTeamsByUserId (
    @Ctx() ctx: Context
  ): Promise<Team[] | null> {
    const creatorId = ctx.req.session!.userId;
    const teams = await Team.find({ where: { creatorId } });

    if (!teams) {
      return null;
    }

    return teams;
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => [Team], { nullable: true })
  async allTeamBoardsByUserId (
    @Ctx() ctx: Context
  ): Promise<Team[] | null> {
    const creatorId = ctx.req.session!.userId;
    const teams = await Team
      .createQueryBuilder('team')
      .where('team.creatorId = :creatorId', { creatorId })
      .leftJoinAndSelect('team.boards', 'boards')
      .where('boards IS NOT NULL')
      .getMany();

    if (!teams) {
      return null;
    }

    return teams;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Team)
  async createTeam (
    @Arg('input') { name, description }: CreateTeamInput,
    @Ctx() ctx: Context
  ) {
    const creatorId = ctx.req.session!.userId;
    const creator = await User.findOne(creatorId);

    return await Team.create({
      name,
      description,
      creator,
      members: [creator]
    }).save();
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Team)
  async updateTeamById (
    @Arg('input') { id, name, description }: UpdateTeamInput,
    @Ctx() ctx: Context
  ): Promise<Team | null> {
    const creatorId = ctx.req.session!.userId;
    const team = await Team.findOne(id);

    if (!creatorId) {
      throw new Error('Must be logged in to update team.')
    }

    if (!team) {
      throw new Error('Sorry, we cannot find the team you requested.');
    }

    if (team.creatorId !== creatorId) {
      return null;
    }

    if (name && team.name !== name) {
      team.name = name;
    }

    if (description && team.description !== description) {
      team.description = description;
    }

    await team.save();

    return team;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Boolean)
  async deleteTeamById (
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const creatorId = ctx.req.session!.userId;

    if (!creatorId) {
      throw new Error('You must be logged in to perform this action.');
    }

    const team = await Team.findOne(id);

    if (!team) {
      throw new Error('Sorry, we cannot find the team you requested.');
    }

    if (team.creatorId !== creatorId) {
      return false;
    }

    await Team.delete(id);

    return true;
  }
}