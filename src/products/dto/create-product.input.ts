import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field()
  title: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @Field({ nullable: true })
  slug: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  unit: number;
}
