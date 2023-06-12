import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
@ObjectType()
export class OrderedProduct {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ default: 1 })
  @Field()
  quantity: number;

  @ManyToOne(() => Order, (product) => product.orderedProduct)
  @Field(() => Order)
  order: Order;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}
