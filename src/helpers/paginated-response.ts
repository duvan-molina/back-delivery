// import { ClassType, ObjectType, Field, Int } from 'type-graphql';

import { Field, Int, ObjectType } from '@nestjs/graphql';

export default function PaginatedResponse<TItem>(TItemClass: any) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: Promise<TItem[]>;

    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}
