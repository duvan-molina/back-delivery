import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export default class GetProductsArgs {
  @Field(() => Int, { defaultValue: 12 })
  limit: number;

  @Field(() => Int, { defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  searchText?: string;
}
