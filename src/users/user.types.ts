import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class UserType {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phoneNumber: string;

  @Field()
  address: string;
}

@ObjectType()
class ErrorsType {
  @Field({ nullable: true })
  path?: string;

  @Field({ nullable: true })
  messages: string;
}

@ObjectType()
export default class UserResponse {
  @Field(() => [ErrorsType], { nullable: true })
  errors?: ErrorsType[];

  @Field(() => UserType, { nullable: true })
  user?: UserType;
}
