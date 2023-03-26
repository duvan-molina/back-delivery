import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  creation_date: Date;
}
