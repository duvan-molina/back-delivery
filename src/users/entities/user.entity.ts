import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column()
  @Field()
  address: string;

  @OneToMany(() => Order, (order) => order.user)
  @Field(() => [Order], { nullable: true })
  orders: Order[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  creation_date: Date;
}
