import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ default: 1 })
  @Field()
  quantity: number;

  // preparing
  // on the way
  // Delivery
  @Column({ default: 'preparing' })
  @Field()
  stateRequested: string;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => ID)
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  creation_date: Date;
}
