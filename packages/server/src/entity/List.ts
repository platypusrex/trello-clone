import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Card } from './Card';
import { Board } from './Board';
import { Lazy } from '../types/shared';

@ObjectType()
@Entity()
export class List extends BaseEntity {
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
  @Column()
  position: number;

  @Field()
  @Column()
  boardId: number;

  @Field(() => Board)
  @ManyToOne(() => Board, board => board.lists, { lazy: true })
  board: Lazy<Board>;

  @Field(() => [Card], { nullable: true })
  @OneToMany(() => Card, card => card.list, { lazy: true, nullable: true })
  cards: Card[];
}
