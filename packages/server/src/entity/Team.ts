import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Board } from './Board';
import { Lazy } from '../types/shared';

@ObjectType()
@Entity()
export class Team extends BaseEntity {
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
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Field()
  @Column('text', { nullable: true })
  description: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  @JoinColumn()
  creator: Lazy<User>;

  @Field(() => [Board])
  @OneToMany(() => Board, board => board.team, { lazy: true })
  boards: Lazy<Board[]>;

  @Field(() => [User])
  @ManyToMany(() => User, user => user.teams, { lazy: true })
  @JoinTable()
  members: Lazy<User[]>;
}