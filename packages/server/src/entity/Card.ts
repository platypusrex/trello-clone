import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { List } from './List';
import { User } from './User';
import { Lazy } from '../types/shared';

@ObjectType()
@Entity()
export class Card extends BaseEntity {
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
  @Column('text')
  title: string;

  @Field()
  @Column()
  position: number;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  listId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  assignedToId: number;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.cards, { lazy: true, nullable: true })
  assignedTo: Lazy<User>;

  @Field(() => List)
  @ManyToOne(() => List, list => list.cards, { lazy: true, onDelete: 'CASCADE' })
  list: Lazy<List>;
}
