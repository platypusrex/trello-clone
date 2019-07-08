import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ObjectType, Root } from 'type-graphql';
import { Team } from './Team';
import { Board } from './Board';
import { Card } from './Card';
import { Lazy } from '../types/shared';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp', name: 'createdAt'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt'})
  updatedAt: Date;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  fullName(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column('bool', { default: false })
  confirmed: boolean;

  @Field(() => [Team])
  @ManyToMany(() => Team, team => team.members, {  lazy: true })
  teams: Lazy<Team[]>;

  @Field(() => [Board])
  @ManyToMany(() => Board, board => board.users, { lazy: true })
  boards: Lazy<Board[]>;

  @OneToMany(() => Card, card => card.assignedTo, { lazy: true })
  cards: Lazy<Card[]>;
}