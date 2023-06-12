import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderedProduct } from './orderedProduct.entity';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  // preparing
  // on the way
  // Delivery
  @Column({ default: 'preparing' })
  @Field()
  stateRequested: string;

  @ManyToOne(() => User, (user) => user.orders)
  @Field(() => User)
  user: User;

  @OneToMany(() => OrderedProduct, (ordered) => ordered.order)
  @Field(() => [OrderedProduct])
  orderedProduct: OrderedProduct[];

  @Column()
  @Field(() => ID)
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  creation_date: Date;
}
