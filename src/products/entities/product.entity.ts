import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column({ type: 'float' })
  @Field(() => Float)
  price: number;

  @Column({ default: 1 })
  @Field(() => Int, { nullable: true })
  unit: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  slug: string;

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;

  // @Column()
  // @Field(() => ID)
  // orderId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  creation_date: Date;
}
