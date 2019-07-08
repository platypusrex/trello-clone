import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { List } from './List';
import { User } from './User';
import { Team } from './Team';
import { Lazy } from '../types/shared';

@ObjectType()
@Entity()
export class Board extends BaseEntity {
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
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Field()
  @Column('text', { nullable: true })
  description: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column({ nullable: true })
  teamId: number;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  @JoinColumn()
  creator: Lazy<User>;

  @Field(() => [User])
  @ManyToMany(() => User, user => user.boards, { lazy: true })
  @JoinTable()
  users: Lazy<User[]>;

  @Field(() => Team, { nullable: true })
  @ManyToOne(() => Team, team => team.boards, { lazy: true, nullable: true })
  @JoinColumn()
  team: Lazy<Team>;

  @Field(() => [List], { nullable: true })
  @OneToMany(() => List, list => list.board, { lazy: true })
  lists: Lazy<List[]>;
}